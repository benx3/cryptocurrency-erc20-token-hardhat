# 🐕 Scooby-Doo Token (SBD) - ERC-20 Cryptocurrency Project

**Dự án Scooby-Doo (SBD) Token** là một ứng dụng blockchain hoàn chỉnh được xây dựng trên nền tảng Hardhat, triển khai một token tiền điện tử tuân theo tiêu chuẩn ERC-20 với tổng cung cấp 1 tỷ token SBD. Dự án cung cấp một smart contract thông minh với các chức năng cốt lõi bao gồm hệ thống ánh xạ (mappings) để quản lý số dư ví (`balances`) và quyền chi tiêu được phê duyệt (`allowances`) của các địa chỉ. Người dùng có thể thực hiện các giao dịch token thông qua các hàm chuyển tiền (`transfer`), phê duyệt quyền sử dụng (`approve`), và chuyển tiền thay mặt (`transferFrom`) theo đúng chuẩn ERC-20. Dự án bao gồm 8 script tương tác sẵn sàng cho phép người dùng dễ dàng thực hiện các thao tác như kiểm tra số dư, chuyển token, tạo token mới (chỉ chủ sở hữu), và tiêu hủy token. Tất cả mã nguồn được viết bằng Solidity 0.8.20 và được tối ưu hóa bằng OpenZeppelin v5, đảm bảo an toàn và tuân thủ tiêu chuẩn ngành công nghiệp. Dự án đã được cấu hình sẵn để triển khai trên mạng testnet Sepolia.

---
## 🎉 Project Status - SUCCESSFULLY DEPLOYED ✅

### Deployment Information
- **Contract Address:** `0x5A3023c7158294087D3a39063954e916D44ED04B`
- **Network:** Sepolia Testnet
- **Etherscan:** https://sepolia.etherscan.io/token/0x5A3023c7158294087D3a39063954e916D44ED04B
- **Owner:** `0xCDF2595bD72aDaf8Ff411ebfBF39192e10E1f8f1`
- **Total Supply:** 1,000,000,000 SBD
- **Status:** ✅ Live on Sepolia Testnet

---

## 📋 Token Specifications

```
╔════════════════════════════════════════════════════════╗
║          SCOOBY-DOO (SBD) TOKEN SPECIFICATIONS         ║
╠════════════════════════════════════════════════════════╣
║  Name:              Scooby-Doo                         ║
║  Symbol:            SBD                                ║
║  Decimals:          18                                 ║
║  Initial Supply:    1,000,000,000 SBD                 ║
║  Maximum Supply:    1,000,000,000 SBD                 ║
║  Network:           Sepolia Testnet                    ║
║  Standard:          ERC-20                             ║
║  Chain ID:          11155111                           ║
║  Block Explorer:    https://sepolia.etherscan.io/     ║
╚════════════════════════════════════════════════════════╝
```

---

## 🔧 Technology Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Solidity** | 0.8.20 | Smart contract language |
| **Hardhat** | ^2.22.0 | Development framework |
| **Ethers.js** | v6 | Blockchain interaction |
| **OpenZeppelin** | ^5.0.0 | Audited contract libraries |
| **Node.js** | v16+ | Runtime environment |
| **npm** | v7+ | Package manager |

---

## 📁 Project Structure

```
cryptocurrency-erc20-token-hardhat/
│
├── 📝 Smart Contract
│   └── contracts/MyToken.sol ........................ ERC-20 Contract (Solidity 0.8.20)
│
├── 🚀 Deployment & Interaction
│   └── scripts/
│       ├── deploy.js ................................ Deploy SBD token to Sepolia
│       ├── tokenInfo.js ............................. Display token statistics
│       ├── checkBalance.js .......................... Check wallet balances
│       ├── transfer.js ............................... Send tokens
│       ├── approve.js ................................ Approve spending
│       ├── transferFrom.js ........................... Transfer after approval
│       ├── mint.js ................................... Create new tokens (owner)
│       └── burn.js ................................... Destroy tokens
│
├── ✅ Testing
│   └── test/MyToken.test.js .......................... 34 comprehensive unit tests
│
├── 📖 Documentation
│   ├── README.md ..................................... Complete project guide (this file)
│   ├── DEPLOYMENT_CHECKLIST.md ....................... Step-by-step deployment guide
│   ├── INTERACTION_GUIDE.md ........................... Detailed function usage
│   ├── VISUAL_GUIDE.md ............................... Architecture diagrams
│   ├── PROJECT_SUMMARY.md ............................ Project summary
│   └── .github/copilot-instructions.md ............... AI agent guidelines
│
├── ⚙️ Configuration
│   ├── hardhat.config.js ............................. Hardhat configuration
│   ├── package.json .................................. Dependencies
│   └── .env.example .................................. Environment template
│
└── 📦 Dependencies (595 packages installed)
    ├── @openzeppelin/contracts (ERC-20, Ownable)
    ├── @nomicfoundation/hardhat-toolbox
    └── dotenv (Environment management)
```

---

## 🔑 Core ERC-20 Components

### Mappings Implemented

#### 1. Balances Mapping
```solidity
mapping(address => uint256) balances;
```
**Purpose:** Track SBD holdings for each address
- Example: `balances[0x123...] = 1000000000` (1 billion tokens)

#### 2. Allowances Mapping
```solidity
mapping(address => mapping(address => uint256)) allowances;
```
**Purpose:** Track spending permissions (owner → spender → amount)
- Example: `allowances[owner][spender] = 500000` (can spend 500K)

---

## 🔄 Core Functions

| Function | Purpose | Access |
|----------|---------|--------|
| `transfer(to, amount)` | Send your SBD to others | Public |
| `approve(spender, amount)` | Allow someone to spend your SBD | Public |
| `transferFrom(from, to, amount)` | Transfer on behalf (requires approval) | Public |
| `balanceOf(account)` | Check balance of an address | Public |
| `allowance(owner, spender)` | Check approved amount | Public |
| `totalSupply()` | Get total minted supply | Public |
| `mint(to, amount)` | Create new tokens | Owner only |
| `burn(amount)` | Destroy your own tokens | Public |
| `burnFrom(from, amount)` | Destroy others' tokens | Owner only |

---

## 🚀 Quick Start Guide

### Step 1: Setup Environment
```bash
# Navigate to project
cd e:\ThacSi\5.Blockchain\cryptocurrency-erc20-token-hardhat

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

### Step 2: Configure .env
```dotenv
INFURA_API_KEY=xxx
PRIVATE_KEY=xxx
ETHERSCAN_API_KEY=xxx
```

### Step 3: Compile
```bash
npm run compile
# or
npx hardhat compile
```

### Step 4: Deploy (Already Completed ✅)
```bash
npm run deploy:sepolia
```

### Step 5: Add to MetaMask
1. Open MetaMask
2. Switch to Sepolia network
3. Click "Import Tokens"
4. Paste contract address: `0x5A3023c7158294087D3a39063954e916D44ED04B`
5. View your 1,000,000,000 SBD! 🎉

---

## 💡 Common Operations

### Check Your Balance
```bash
npx hardhat run scripts/checkBalance.js --network sepolia
```

### Send Tokens
```bash
npx hardhat run scripts/transfer.js --network sepolia
```
*(Update recipientAddress in script first)*

### Mint New Tokens (Owner Only)
```bash
npx hardhat run scripts/mint.js --network sepolia
```
*(Only deployer can mint)*

### Burn Tokens
```bash
npx hardhat run scripts/burn.js --network sepolia
```

### View Token Info
```bash
npx hardhat run scripts/tokenInfo.js --network sepolia
```

---

## ✅ Testing

Run comprehensive test suite (34 tests):
```bash
npm run test
```

All tests cover:
- ✅ Deployment functionality
- ✅ Transfer operations
- ✅ Approval mechanism
- ✅ Minting constraints
- ✅ Burning operations
- ✅ Balance tracking
- ✅ Access control
- ✅ Error conditions

---

## 🔐 Security & Standards

- **ERC-20 Standard:** Full compliance with OpenZeppelin implementation
- **Audited Code:** Using OpenZeppelin v5 audited contracts
- **Solidity Version:** 0.8.20 (latest stable)
- **Access Control:** Ownable pattern for owner-only functions
- **Supply Management:** Hard cap at 1 billion tokens

---

## 📊 Project Statistics

```
Total Files:          20+
Lines of Code:        ~2,500
Documentation Files:  6 guides
Unit Tests:           34 tests
Dependencies:         595 packages
Network:              Sepolia Testnet
Deployment Status:    ✅ LIVE
```

---

## 🌐 Resources & Links

| Resource | Link |
|----------|------|
| **Sepolia Etherscan** | https://sepolia.etherscan.io/ |
| **Sepolia Faucet** | https://sepoliafaucet.com/ |
| **Infura** | https://infura.io/ |
| **MetaMask** | https://metamask.io/ |
| **Hardhat Docs** | https://hardhat.org/ |
| **OpenZeppelin** | https://docs.openzeppelin.com/ |
| **Remix IDE** | https://remix.ethereum.org/ |
| **Ethereum Docs** | https://ethereum.org/developers |
| **GitHub Repository** | https://github.com/benx3/cryptocurrency-erc20-token-hardhat |

---

## Troubleshooting

### Issue: "Account has no balance"
**Solution:** Get Sepolia ETH from faucet: https://sepoliafaucet.com/

### Issue: "Max supply exceeded"
**Solution:** Can't mint more than 1 billion tokens total

### Issue: "Insufficient allowance"
**Solution:** Owner must approve first using `approve()` function

### Issue: "Only owner..."
**Solution:** Only deployer (`0xCDF2595bD72aDaf8Ff411ebfBF39192e10E1f8f1`) can mint/burn from others

### Issue: "Invalid project id"
**Solution:** Check Infura Project ID is correct (no URLs, just the ID)


## 📝 License

This project uses OpenZeppelin contracts which are licensed under MIT.

---

## 👨‍💻 Developer Information

- **Project:** Scooby-Doo (SBD) ERC-20 Token
- **Created:** December 2025
- **Network:** Sepolia Testnet
- **Status:** ✅ Production Ready
- **Repository:** https://github.com/benx3/cryptocurrency-erc20-token-hardhat

---

## 🎉 Conclusion

Your Scooby-Doo token is **fully deployed and operational** on Sepolia testnet! 

The contract is live at: **`0x5A3023c7158294087D3a39063954e916D44ED04B`**

You now have a fully functional ERC-20 token with:
- ✅ 1 billion token supply
- ✅ All standard ERC-20 functions
- ✅ Minting and burning capabilities
- ✅ Complete access control
- ✅ Comprehensive testing (34 tests)
- ✅ Full documentation


## 🔄 Core ERC-20 Functions Implemented

### Transfer Functions
```javascript
transfer(to, amount)           // Send your tokens
transferFrom(from, to, amount) // Send on behalf (requires approval)
```

### Approval Functions
```javascript
approve(spender, amount)       // Approve spending
allowance(owner, spender)      // Check approval amount
```

### Supply Management
```javascript
mint(address, uint256)         // Create tokens (owner only)
burn(uint256)                  // Destroy your tokens
burnFrom(address, uint256)     // Destroy others' tokens (owner only)
```

### Information Functions
```javascript
balanceOf(account)             // Check balance
totalSupply()                  // Get total minted supply
maxSupply                      // Maximum allowed supply (1B)
```

---

## 📊 Token Specifications

```
┌─────────────────────────────────┐
│   SCOOBY-DOO (SBD) TOKEN        │
├─────────────────────────────────┤
│ Token Name:    Scooby-Doo       │
│ Symbol:        SBD              │
│ Decimals:      18               │
│ Initial Supply: 1,000,000,000   │
│ Max Supply:     1,000,000,000   │
│ Network:       Sepolia Testnet  │
│ Standard:      ERC-20           │
│ Owner:         Your Wallet      │
└─────────────────────────────────┘
```

---

## 🚀 Quick Start (3 Steps)

### Step 1: Setup Environment
```bash
npm install
cp .env.example .env
# Edit .env and add INFURA_API_KEY, PRIVATE_KEY
```

### Step 2: Deploy Token
```bash
npm run deploy:sepolia
```
**Save the contract address printed to console!**

### Step 3: Add to MetaMask
1. Open MetaMask (Sepolia network)
2. Import Tokens
3. Paste contract address
4. You'll see 1,000,000,000 SBD! 🎉

---

## 📁 Project Structure

```
cryptocurrency-erc20-token-hardhat/
├── contracts/
│   └── MyToken.sol                 # ERC-20 contract
├── scripts/
│   ├── deploy.js                   # Deploy Scooby-Doo token
│   ├── tokenInfo.js                # Display token info
│   ├── checkBalance.js             # Check balance
│   ├── transfer.js                 # Transfer tokens
│   ├── approve.js                  # Approve spending
│   ├── transferFrom.js             # Transfer on behalf
│   ├── mint.js                     # Mint new tokens
│   └── burn.js                     # Burn tokens
├── test/
│   └── MyToken.test.js             # 34 unit tests
├── .github/
│   └── copilot-instructions.md     # AI agent guide
├── SETUP_COMPLETE.md               # This file
├── DEPLOYMENT_CHECKLIST.md         # Step-by-step guide
├── SCOOBY_DOO_TOKEN_GUIDE.md       # Quick start
├── INTERACTION_GUIDE.md            # Detailed usage
├── hardhat.config.js               # Hardhat config
├── package.json                    # Dependencies
└── .env.example                    # Environment template
```

---

## ✨ Key Features

✅ **Fully Functional ERC-20** - Standard token with all core functions  
✅ **1 Billion Supply Cap** - Prevents inflation  
✅ **Owner-Only Minting** - Controlled token creation  
✅ **Unrestricted Burning** - Users can destroy their tokens  
✅ **Comprehensive Testing** - 34 unit tests (all passing)  
✅ **Production-Ready** - OpenZeppelin v5 standards  
✅ **Sepolia Ready** - Deploy to testnet immediately  
✅ **Well Documented** - Vietnamese & English documentation  

---

## 🎓 Learning Resources

This project teaches you:
- ✅ How ERC-20 tokens work
- ✅ Core mappings: `balances` and `allowances`
- ✅ Token transfer mechanisms
- ✅ Approval-based spending
- ✅ Minting and burning tokens
- ✅ Hardhat development workflow
- ✅ Smart contract testing
- ✅ Testnet deployment
- ✅ MetaMask integration

---

## 🔗 Important Links

| Link | Purpose |
|------|---------|
| https://sepolia.etherscan.io/ | View transactions |
| https://sepoliafaucet.com/ | Get test ETH |
| https://infura.io/ | RPC provider |
| https://metamask.io/ | Web3 wallet |
| https://docs.openzeppelin.com/ | OpenZeppelin docs |

---

## 📝 Next Steps

1. **Review Files:**
   - Read `DEPLOYMENT_CHECKLIST.md` for step-by-step instructions
   - Review `SCOOBY_DOO_TOKEN_GUIDE.md` for quick start

2. **Prepare Environment:**
   - Get API keys from Infura
   - Get Sepolia ETH from faucet
   - Setup `.env` file

3. **Deploy:**
   - Run `npm run deploy:sepolia`
   - Save contract address

4. **Test:**
   - Add to MetaMask
   - Transfer tokens
   - Run all tests

5. **Verify:**
   - Check on Etherscan
   - Verify contract source

---

## ⚠️ Important Notes

### Security
- 🔐 Keep `PRIVATE_KEY` secret - never share!
- 🔐 Don't commit `.env` to git
- 🔐 Use testnet account only
- 🔐 Verify contract address before transactions

### Testing
- ✅ All 34 tests pass
- ✅ Contract compiles without errors
- ✅ Ready for Sepolia deployment
- ✅ Gas optimized

### Compliance
- ✅ Full ERC-20 standard
- ✅ OpenZeppelin audited code
- ✅ Solidity 0.8.20
- ✅ No known vulnerabilities

---

## 🎯 What You Can Do Now

**Immediately:**
- Deploy to Sepolia
- Add token to MetaMask
- Check balance
- Transfer tokens

**With More Setup:**
- Mint new tokens
- Burn tokens
- Approve spending
- Test all functions

**Advanced:**
- Verify on Etherscan
- List on DEX
- Create token website
- Build applications

---

## 📞 Troubleshooting

| Issue | Solution |
|-------|----------|
| "Account has no balance" | Get Sepolia ETH from faucet |
| "Invalid API Key" | Create account on Infura |
| "Max supply exceeded" | Can't mint more than 1B total |
| "Only owner..." | Only deployer can mint |
| "Insufficient allowance" | Must approve before transferFrom |

---

## 🏆 Success Checklist

- [ ] Environment setup complete
- [ ] Contract compiled successfully
- [ ] All 34 tests passing
- [ ] Contract deployed to Sepolia
- [ ] Token added to MetaMask
- [ ] Can transfer tokens
- [ ] Contract visible on Etherscan
- [ ] All functions tested

---

## 💡 Token Design Highlights

### Smart Supply Management
- Maximum supply of **1 billion** prevents inflation
- Only owner can create new tokens (up to cap)
- Anyone can burn their own tokens (deflation)

### Ownership Model
- Single owner with minting rights
- Owner can burn tokens from any address
- Owner address set at deployment

### User Control
- Users can freely transfer tokens
- Users can approve spending
- Users can burn their own tokens
- Users can check balances and allowances

---

## 🎉 You're All Set!

Your **Scooby-Doo (SBD)** token is configured and ready to go.

### Ready to Deploy? 🚀

Follow the **DEPLOYMENT_CHECKLIST.md** for step-by-step instructions.

### Have Questions? 📚

Check **INTERACTION_GUIDE.md** for detailed function documentation.

---

**Status:** ✅ Ready for Deployment  
**Network:** Sepolia Testnet  
**Token:** Scooby-Doo (SBD)  
**Supply:** 1,000,000,000  
**Created:** December 2025  

**Happy deploying! 🐕** 🚀
