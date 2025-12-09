# Hướng dẫn Triển khai và Tương tác Token ERC-20

## 1. Chuẩn bị Môi trường

### 1.1 Cài đặt Dependencies
```bash
npm install
```

### 1.2 Tạo file `.env`
Sao chép từ `.env.example`:
```bash
cp .env.example .env
```

Chỉnh sửa `.env` và điền các giá trị:
```dotenv
# API key từ Infura (dùng cho mạng Sepolia)
INFURA_API_KEY=YOUR_INFURA_API_KEY_HERE

# Private key của ví MetaMask (KHÔNG dùng ví chính có tiền thật)
# Cách lấy: MetaMask → 3 chấm → Tài khoản chi tiết → Xuất private key
PRIVATE_KEY=0xYOUR_PRIVATE_KEY_HERE

# (Tùy chọn) API key dùng để verify contract trên Etherscan
ETHERSCAN_API_KEY=YOUR_ETHERSCAN_API_KEY_HERE
```

### 1.3 Có Sepolia ETH
- Truy cập: https://sepoliafaucet.com/
- Hoặc: https://www.alchemy.com/faucets/sepolia
- Dán địa chỉ MetaMask của bạn để nhận test ETH

---

## 2. Biên dịch Smart Contract

```bash
npm run compile
```

Hoặc:
```bash
npx hardhat compile
```

**Kết quả:** Artifacts được lưu trong `artifacts/contracts/MyToken.sol/`

---

## 3. Triển khai lên Sepolia Testnet

### 3.1 Chạy script deploy

```bash
npm run deploy:sepolia
```

Hoặc:
```bash
npx hardhat run scripts/deploy.js --network sepolia
```

### 3.2 Kết quả
Console sẽ in ra địa chỉ contract, ví dụ:
```
MyToken deployed to: 0x1234567890AbCdEf1234567890AbCdEf12345678
```

**Lưu lại địa chỉ này!** Bạn sẽ dùng nó để:
- Thêm token vào MetaMask
- Tương tác với token trên blockchain

---

## 4. Thêm Token vào MetaMask

### Bước 1: Mở MetaMask
- Đảm bảo bạn đang dùng mạng **Sepolia**
- Nếu chưa có, thêm Sepolia: Settings → Networks → Add Network

### Bước 2: Import Token
1. Chọn **Import tokens**
2. Dán địa chỉ contract vừa deploy vào ô "Token Contract Address"
3. Các thông tin như "Token Symbol" (MTK), "Decimals" (18) sẽ tự điền
4. Click **Add Custom Token** → **Import Tokens**

### Bước 3: Kiểm tra Số dư
- Bạn sẽ thấy 1,000,000 MTK trong ví (số lượng ban đầu được mint)

---

## 5. Tương tác với Token

### 5.1 Kiểm tra Số dư (balanceOf)
Sử dụng Etherscan hoặc một Dapp như Remix:

1. Truy cập: https://sepolia.etherscan.io/
2. Dán địa chỉ contract
3. Click tab **Contract** → **Read Contract**
4. Tìm hàm `balanceOf`
5. Dán địa chỉ ví cần kiểm tra → Click **Query**

**Hoặc sử dụng Hardhat:**
```bash
npx hardhat console --network sepolia
```

Trong console:
```javascript
const MyToken = await hre.ethers.getContractAt("MyToken", "0x1234567890AbCdEf...");
const balance = await MyToken.balanceOf("0xYourAddress");
console.log(hre.ethers.formatEther(balance));
```

---

### 5.2 Gửi Token cho Người Khác (transfer)

#### Cách 1: Dùng MetaMask
1. Mở MetaMask
2. Chọn token MTK
3. Click **Send**
4. Dán địa chỉ người nhận
5. Nhập số lượng token
6. Click **Next** → **Confirm**

#### Cách 2: Dùng Etherscan
1. Truy cập: https://sepolia.etherscan.io/
2. Dán địa chỉ contract
3. Click tab **Contract** → **Write Contract**
4. Click **Connect to Web3** (kết nối MetaMask)
5. Tìm hàm `transfer`
6. Nhập:
   - **to**: Địa chỉ người nhận
   - **amount**: Số lượng token (tính bằng wei, ví dụ: `1000000000000000000` = 1 token)
7. Click **Write** → Xác nhận trong MetaMask

#### Cách 3: Dùng Hardhat Script
Tạo file `scripts/transfer.js`:

```javascript
const hre = require("hardhat");

async function main() {
  const contractAddress = "0x1234567890AbCdEf1234567890AbCdEf12345678"; // Thay bằng địa chỉ contract
  const recipientAddress = "0xRecipientAddress"; // Địa chỉ người nhận
  const amount = hre.ethers.parseEther("100"); // 100 token

  const MyToken = await hre.ethers.getContractAt("MyToken", contractAddress);
  
  console.log("Đang gửi token...");
  const tx = await MyToken.transfer(recipientAddress, amount);
  
  console.log("Transaction hash:", tx.hash);
  console.log("Đang chờ xác nhận...");
  
  const receipt = await tx.wait();
  console.log("Gửi thành công! Block:", receipt.blockNumber);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

Chạy:
```bash
npx hardhat run scripts/transfer.js --network sepolia
```

---

### 5.3 Phê duyệt và Chuyển Token (approve + transferFrom)

Khi bạn muốn cho phép người khác sử dụng token của bạn (ví dụ: DEX, Smart Contract, v.v.)

#### Bước 1: Phê duyệt (approve)
```javascript
// Script: scripts/approve.js
const hre = require("hardhat");

async function main() {
  const contractAddress = "0x1234567890AbCdEf..."; // Địa chỉ contract
  const spenderAddress = "0xSpenderAddress";      // Địa chỉ được phê duyệt
  const approveAmount = hre.ethers.parseEther("500"); // 500 token

  const MyToken = await hre.ethers.getContractAt("MyToken", contractAddress);
  
  console.log("Đang phê duyệt...");
  const tx = await MyToken.approve(spenderAddress, approveAmount);
  
  console.log("Transaction hash:", tx.hash);
  console.log("Đang chờ xác nhận...");
  
  const receipt = await tx.wait();
  console.log("Phê duyệt thành công!");
  
  // Kiểm tra lại allowance
  const allowance = await MyToken.allowance(await hre.ethers.provider.getSigner().getAddress(), spenderAddress);
  console.log("Allowance:", hre.ethers.formatEther(allowance));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

Chạy:
```bash
npx hardhat run scripts/approve.js --network sepolia
```

#### Bước 2: Chuyển Token Thay Mặt (transferFrom)
Sau khi approve, người khác có thể gọi `transferFrom`:

```javascript
// Script: scripts/transferFrom.js
const hre = require("hardhat");

async function main() {
  const contractAddress = "0x1234567890AbCdEf..."; // Địa chỉ contract
  const fromAddress = "0xOwnerAddress";           // Người sở hữu token
  const toAddress = "0xRecipientAddress";         // Người nhận
  const transferAmount = hre.ethers.parseEther("100"); // 100 token

  const MyToken = await hre.ethers.getContractAt("MyToken", contractAddress);
  
  console.log("Đang chuyển token thay mặt...");
  const tx = await MyToken.transferFrom(fromAddress, toAddress, transferAmount);
  
  console.log("Transaction hash:", tx.hash);
  console.log("Đang chờ xác nhận...");
  
  const receipt = await tx.wait();
  console.log("Chuyển token thành công!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

---

### 5.4 Mint Token Mới (chỉ chủ sở hữu)

```javascript
// Script: scripts/mint.js
const hre = require("hardhat");

async function main() {
  const contractAddress = "0x1234567890AbCdEf..."; // Địa chỉ contract
  const recipientAddress = "0xRecipientAddress";  // Địa chỉ nhận token mới
  const mintAmount = hre.ethers.parseEther("1000000"); // 1,000,000 token

  const MyToken = await hre.ethers.getContractAt("MyToken", contractAddress);
  
  console.log("Đang mint token mới...");
  const tx = await MyToken.mint(recipientAddress, mintAmount);
  
  console.log("Transaction hash:", tx.hash);
  console.log("Đang chờ xác nhận...");
  
  const receipt = await tx.wait();
  console.log("Mint thành công!");
  
  // Kiểm tra tổng cung cấp
  const totalSupply = await MyToken.totalSupply();
  console.log("Tổng cung cấp hiện tại:", hre.ethers.formatEther(totalSupply));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

**Lưu ý:** Chỉ chủ sở hữu (người deploy contract) mới có thể mint token

---

### 5.5 Tiêu Hủy Token (burn)

Bất kỳ ai cũng có thể tiêu hủy token của chính họ:

```javascript
// Script: scripts/burn.js
const hre = require("hardhat");

async function main() {
  const contractAddress = "0x1234567890AbCdEf..."; // Địa chỉ contract
  const burnAmount = hre.ethers.parseEther("100"); // 100 token

  const MyToken = await hre.ethers.getContractAt("MyToken", contractAddress);
  
  console.log("Đang tiêu hủy token...");
  const tx = await MyToken.burn(burnAmount);
  
  console.log("Transaction hash:", tx.hash);
  console.log("Đang chờ xác nhận...");
  
  const receipt = await tx.wait();
  console.log("Tiêu hủy token thành công!");
  
  // Kiểm tra tổng cung cấp
  const totalSupply = await MyToken.totalSupply();
  console.log("Tổng cung cấp sau burn:", hre.ethers.formatEther(totalSupply));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

---

## 6. Verify Contract trên Etherscan (Tùy chọn)

Verify giúp mọi người nhìn thấy mã nguồn contract trên Etherscan:

```bash
npx hardhat verify --network sepolia <CONTRACT_ADDRESS> \
  "MyToken" \
  "MTK" \
  "1000000000000000000000000" \
  "10000000000000000000000000"
```

Thay `<CONTRACT_ADDRESS>` bằng địa chỉ contract thực tế.

---

## 7. Các Hàm Chính của MyToken

| Hàm | Tác dụng | Ai có thể gọi |
|-----|---------|---------------|
| `transfer(to, amount)` | Chuyển token cho người khác | Bất kỳ ai |
| `approve(spender, amount)` | Phê duyệt cho phép chi tiêu | Chủ sở hữu token |
| `transferFrom(from, to, amount)` | Chuyển token thay mặt người khác | Bất kỳ ai (nếu được phê duyệt) |
| `balanceOf(account)` | Kiểm tra số dư | Bất kỳ ai |
| `allowance(owner, spender)` | Kiểm tra lượng được phê duyệt | Bất kỳ ai |
| `totalSupply()` | Kiểm tra tổng cung cấp | Bất kỳ ai |
| `mint(to, amount)` | Tạo token mới | Chỉ chủ sở hữu |
| `burn(amount)` | Tiêu hủy token của bạn | Bất kỳ ai |
| `burnFrom(from, amount)` | Tiêu hủy token của người khác | Chỉ chủ sở hữu |

---

## 8. Troubleshooting (Khắc phục sự cố)

### Lỗi: "Error: Account does not have balance..."
**Nguyên nhân:** Ví không có đủ Sepolia ETH để trả gas
**Giải pháp:** Xin thêm ETH từ faucet: https://sepoliafaucet.com/

### Lỗi: "Max supply exceeded"
**Nguyên nhân:** Bạn đang mint quá số lượng maxSupply cho phép
**Giải pháp:** Kiểm tra `totalSupply()` và `maxSupply` trước khi mint

### Lỗi: "Insufficient allowance"
**Nguyên nhân:** Bạn chưa được phê duyệt (approve) để sử dụng token của người khác
**Giải pháp:** Người sở hữu cần gọi `approve()` trước

### Lỗi: "Only owner..."
**Nguyên nhân:** Bạn không phải chủ sở hữu contract, không thể gọi hàm này
**Giải pháp:** Chỉ người deploy contract mới có quyền mint/burnFrom

---

## 9. Công Cụ Hữu Ích

- **Etherscan Sepolia**: https://sepolia.etherscan.io/
- **Remix IDE**: https://remix.ethereum.org/
- **MetaMask**: https://metamask.io/
- **Sepolia Faucet**: https://sepoliafaucet.com/

---

**Cập nhật lần cuối:** Tháng 12, 2025
**Mạng:** Sepolia Testnet
**Solidity Version:** 0.8.20
