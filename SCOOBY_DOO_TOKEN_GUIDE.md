# 🐕 SCOOBY-DOO TOKEN - QUICK START GUIDE

## Token Specifications
- **Token Name:** Scooby-Doo
- **Symbol:** SBD
- **Initial Supply:** 1,000,000,000 (1 Billion)
- **Max Supply:** 1,000,000,000 (1 Billion)
- **Network:** Sepolia Testnet
- **Decimals:** 18
- **Standard:** ERC-20

---

## Step 1: Setup Environment

### 1.1 Ensure Dependencies are Installed
```bash
npm install
```

### 1.2 Create `.env` File
```bash
cp .env.example .env
```

Edit `.env` and add:
```dotenv
INFURA_API_KEY=YOUR_INFURA_API_KEY
PRIVATE_KEY=0xYOUR_PRIVATE_KEY
ETHERSCAN_API_KEY=YOUR_ETHERSCAN_API_KEY (optional)
```

### 1.3 Get Sepolia ETH
Visit: https://sepoliafaucet.com/ and request test ETH

---

## Step 2: Compile Smart Contract

```bash
npm run compile
```

Or:
```bash
npx hardhat compile
```

**Expected Output:**
```
Compiled 7 Solidity files successfully
```

---

## Step 3: Deploy to Sepolia

```bash
npm run deploy:sepolia
```

Or:
```bash
npx hardhat run scripts/deploy.js --network sepolia
```

**Expected Output:**
```
========================================
🐕 DEPLOYING SCOOBY-DOO TOKEN 🐕
========================================
Token Name:     Scooby-Doo
Token Symbol:   SBD
Initial Supply: 1000000000 SBD
Max Supply:     1000000000 SBD
========================================

⏳ Deploying contract...
⏳ Waiting for deployment confirmation...

========================================
✅ DEPLOYMENT SUCCESSFUL!
========================================
Contract Address: 0x1234567890AbCdEf1234567890AbCdEf12345678
View on Etherscan: https://sepolia.etherscan.io/token/0x1234567890AbCdEf...
========================================

📊 TOKEN DETAILS:
Total Supply: 1000000000 SBD
Owner: 0xYourAddress
```

**💾 SAVE THE CONTRACT ADDRESS!**

---

## Step 4: Add Token to MetaMask

### Method 1: Manual Import
1. Open **MetaMask**
2. Switch to **Sepolia** network
3. Click **Import tokens**
4. Paste the contract address from Step 3
5. Token details will auto-populate
6. Click **Add Custom Token** → **Import Tokens**

### Method 2: Direct Link (if verified on Etherscan)
Click on token in Etherscan → **Add to MetaMask** button

**✅ You should now see 1,000,000,000 SBD in your wallet!**

---

## Step 5: Interact with Token

### Check Balance
```bash
npx hardhat run scripts/checkBalance.js --network sepolia
```

Edit `scripts/checkBalance.js` and update:
```javascript
const contractAddress = "0x1234567890AbCdEf..."; // Your contract address
const accountToCheck = "0xYourAddress";
```

### Transfer SBD to Someone

Create `scripts/transferSBD.js`:
```javascript
const hre = require("hardhat");

async function main() {
  const contractAddress = "0x1234567890AbCdEf..."; // Your contract address
  const recipientAddress = "0xRecipientAddress";
  const amountToTransfer = "1000000"; // 1,000,000 SBD

  const SBD = await hre.ethers.getContractAt("MyToken", contractAddress);
  const amount = hre.ethers.parseEther(amountToTransfer);

  console.log(`📤 Transferring ${amountToTransfer} SBD...`);
  const tx = await SBD.transfer(recipientAddress, amount);
  
  console.log(`✅ Transaction: ${tx.hash}`);
  const receipt = await tx.wait();
  console.log(`✅ Confirmed in block ${receipt.blockNumber}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

Run:
```bash
npx hardhat run scripts/transferSBD.js --network sepolia
```

---

## Core ERC-20 Functions

### Transfer Token
```javascript
await token.transfer(recipientAddress, amount);
```

### Approve Spending
```javascript
await token.approve(spenderAddress, amount);
```

### Transfer From (after approval)
```javascript
await token.transferFrom(fromAddress, toAddress, amount);
```

### Check Balance
```javascript
const balance = await token.balanceOf(addressToCheck);
console.log(hre.ethers.formatEther(balance)); // Convert from wei
```

### Check Allowance
```javascript
const allowed = await token.allowance(ownerAddress, spenderAddress);
```

### Mint New Tokens (Owner Only)
```javascript
await token.mint(recipientAddress, amountInWei);
```

### Burn Tokens
```javascript
await token.burn(amountInWei); // Burn your own
await token.burnFrom(addressToBurn, amountInWei); // Owner burns others
```

### Get Total Supply
```javascript
const total = await token.totalSupply();
```

---

## Run Tests

```bash
npm run test
```

Or:
```bash
npx hardhat test
```

**All 34 tests should pass!**

---

## Verify on Etherscan (Optional)

After deployment, make your contract source code public:

```bash
npx hardhat verify --network sepolia 0x1234567890AbCdEf... \
  "Scooby-Doo" \
  "SBD" \
  "1000000000000000000000000000" \
  "1000000000000000000000000000"
```

---

## Useful Links

| Link | Purpose |
|------|---------|
| https://sepolia.etherscan.io/ | View transactions/tokens on Sepolia |
| https://sepoliafaucet.com/ | Get free Sepolia ETH |
| https://metamask.io/ | Download MetaMask wallet |
| https://remix.ethereum.org/ | Browser-based Solidity IDE |
| https://infura.io/ | RPC provider for Ethereum |

---

## Troubleshooting

### "Account does not have balance..."
→ Get more Sepolia ETH from faucet

### "Invalid character in string"
→ Don't use Vietnamese characters in error messages (Solidity limitation)

### "Max supply exceeded"
→ You can't mint more than 1,000,000,000 SBD total

### "Only owner..."
→ Only the deployer wallet can call owner-only functions

---

## Key Addresses

**MyToken Contract:** [Will be printed during deployment]

**Owner (Your Wallet):** [Your private key's address]

**Network:** Sepolia Testnet
- RPC: https://sepolia.infura.io/v3/{INFURA_API_KEY}
- Chain ID: 11155111
- Block Explorer: https://sepolia.etherscan.io/

---

**Created:** December 2025
**Token:** Scooby-Doo (SBD)
**Network:** Sepolia Testnet
**Standard:** ERC-20
