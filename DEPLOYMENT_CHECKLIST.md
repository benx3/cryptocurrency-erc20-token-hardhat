# ✅ SCOOBY-DOO TOKEN - DEPLOYMENT CHECKLIST

## Pre-Deployment Checklist

- [ ] Node.js installed (v16+)
- [ ] npm dependencies installed (`npm install`)
- [ ] `.env` file created with:
  - [ ] `INFURA_API_KEY` from Infura
  - [ ] `PRIVATE_KEY` from MetaMask (testnet account only!)
  - [ ] `ETHERSCAN_API_KEY` (optional)
- [ ] Sepolia ETH obtained from faucet
- [ ] MetaMask set to Sepolia network

---

## Deployment Steps

### Step 1: Verify Setup
```bash
cd e:\ThacSi\5.Blockchain\cryptocurrency-erc20-token-hardhat
npm install
```
- [ ] All packages installed successfully

### Step 2: Compile Contract
```bash
npm run compile
```
- [ ] Output: "Compiled 7 Solidity files successfully"

### Step 3: Run Tests (Optional but Recommended)
```bash
npm run test
```
- [ ] Expected: 34 passing tests

### Step 4: Deploy Token
```bash
npm run deploy:sepolia
```

**SAVE THIS OUTPUT!** You need:
- [ ] Contract Address (save as `CONTRACT_ADDRESS`)
- [ ] Owner Address (your wallet)
- [ ] Transaction Hash

Example output to expect:
```
========================================
🐕 DEPLOYING SCOOBY-DOO TOKEN 🐕
========================================
Contract Address: 0x1234567890AbCdEf1234567890AbCdEf12345678
========================================
✅ DEPLOYMENT SUCCESSFUL!
```

---

## Post-Deployment Verification

### Step 1: Verify on Etherscan
- [ ] Go to: https://sepolia.etherscan.io/
- [ ] Search for contract address
- [ ] Confirm:
  - Token Name: Scooby-Doo
  - Token Symbol: SBD
  - Total Supply: 1,000,000,000
  - Decimals: 18

### Step 2: Check Your Balance
Edit `scripts/checkBalance.js`:
```javascript
const contractAddress = "YOUR_CONTRACT_ADDRESS"; // ← Update
const accountToCheck = "YOUR_WALLET_ADDRESS";   // ← Update
```

Run:
```bash
npx hardhat run scripts/checkBalance.js --network sepolia
```
- [ ] Shows 1,000,000,000 SBD in your wallet

### Step 3: Get Token Info
Edit `scripts/tokenInfo.js`:
```javascript
const contractAddress = "YOUR_CONTRACT_ADDRESS"; // ← Update
const checkerAddress = "YOUR_WALLET_ADDRESS";   // ← Update
```

Run:
```bash
npx hardhat run scripts/tokenInfo.js --network sepolia
```
- [ ] Displays all token information correctly

---

## Add to MetaMask

- [ ] Open MetaMask
- [ ] Switch to Sepolia network
- [ ] Click "Import tokens"
- [ ] Paste contract address
- [ ] Click "Add Custom Token"
- [ ] Verify you see: **1,000,000,000 SBD**

---

## Test Token Functions

### Test Transfer
Edit `scripts/transfer.js`:
```javascript
const contractAddress = "YOUR_CONTRACT_ADDRESS";
const recipientAddress = "RECIPIENT_ADDRESS"; // Friend's wallet
const amountToTransfer = "1000000"; // 1 million tokens
```

Run:
```bash
npx hardhat run scripts/transfer.js --network sepolia
```
- [ ] Transaction succeeds
- [ ] Recipient receives tokens
- [ ] Your balance decreases

### Test Approve
Edit `scripts/approve.js`:
```javascript
const contractAddress = "YOUR_CONTRACT_ADDRESS";
const spenderAddress = "SPENDER_ADDRESS"; // Who can spend
const amountToApprove = "500000000"; // 500 million
```

Run:
```bash
npx hardhat run scripts/approve.js --network sepolia
```
- [ ] Transaction succeeds
- [ ] Allowance set correctly

### Test Burn
Run:
```bash
npx hardhat run scripts/burn.js --network sepolia
```
- [ ] Transaction succeeds
- [ ] Total supply decreases
- [ ] Your balance decreases

### Test Mint (Owner Only)
Edit `scripts/mint.js`:
```javascript
const contractAddress = "YOUR_CONTRACT_ADDRESS";
const recipientAddress = "RECIPIENT_ADDRESS";
const amountToMint = "500000"; // Must not exceed 1B total
```

Run:
```bash
npx hardhat run scripts/mint.js --network sepolia
```
- [ ] Transaction succeeds (if you're the owner)
- [ ] Recipient receives new tokens
- [ ] Total supply increases

---

## Verify on Etherscan (Optional)

Make your contract source code public:

```bash
npx hardhat verify --network sepolia YOUR_CONTRACT_ADDRESS \
  "Scooby-Doo" "SBD" \
  "1000000000000000000000000000" \
  "1000000000000000000000000000"
```

- [ ] Contract verified on Etherscan
- [ ] Source code visible publicly

---

## Important Files Reference

| File | Update Before Deploying |
|------|------------------------|
| `.env` | ✅ Add API keys |
| `scripts/deploy.js` | ✅ Token params already set |
| `scripts/transfer.js` | ✅ Update addresses before running |
| `scripts/checkBalance.js` | ✅ Update contract address |
| `scripts/approve.js` | ✅ Update contract address |
| `scripts/mint.js` | ✅ Update if needed |
| `scripts/burn.js` | ✅ Ready to use |

---

## Troubleshooting

### Problem: "Account does not have balance"
```
Solution: Get Sepolia ETH from https://sepoliafaucet.com/
```

### Problem: "Invalid INFURA_API_KEY"
```
Solution: Create free account at https://infura.io/ and generate API key
```

### Problem: "Cannot deploy, insufficient funds"
```
Solution: You need Sepolia ETH for gas fees (not testnet tokens)
```

### Problem: "Transfer failed - insufficient allowance"
```
Solution: The spender must approve first using approve()
```

### Problem: "Max supply exceeded"
```
Solution: Total minted + new mint cannot exceed 1,000,000,000 SBD
```

---

## Security Reminders

⚠️ **CRITICAL:**
- [ ] Never share your PRIVATE_KEY
- [ ] Don't commit `.env` to git
- [ ] Use testnet account, not main wallet
- [ ] Always verify contract address on Etherscan

✅ **BEST PRACTICES:**
- [ ] Keep backup of contract address and deployment tx hash
- [ ] Verify contract on Etherscan after deployment
- [ ] Test all functions on testnet before mainnet
- [ ] Use strong passwords for accounts

---

## Success Metrics

You'll know deployment succeeded when:

✅ Contract deploys without errors  
✅ Contract address displayed in console  
✅ Balance shows 1,000,000,000 SBD in MetaMask  
✅ Can transfer tokens to other addresses  
✅ All 34 tests pass  
✅ Token visible on Etherscan Sepolia  

---

## Next Steps After Successful Deployment

1. **Share Token Address** with friends/testers
2. **Add to Etherscan Watchlist** for easy monitoring
3. **Create Token Icon** (for MetaMask display)
4. **Document Tokenomics** (supply distribution, burn rate, etc.)
5. **Test on DEX** (Uniswap, SushiSwap, etc.)
6. **Plan Marketing** if going live to mainnet

---

## Token Summary

| Property | Value |
|----------|-------|
| **Name** | Scooby-Doo |
| **Symbol** | SBD |
| **Total Supply** | 1,000,000,000 |
| **Decimals** | 18 |
| **Network** | Sepolia Testnet |
| **Standard** | ERC-20 |
| **Owner** | Your Wallet |
| **Burnable** | Yes |
| **Mintable** | Yes (owner only) |

---

**Created:** December 2025  
**Status:** Ready for Deployment ✅  
**Network:** Sepolia Testnet
