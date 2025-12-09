# AI Coding Agent Instructions - ERC-20 Token Hardhat Project

## Project Overview

This is a **Hardhat-based Solidity smart contract project** for deploying an ERC-20 token to the **Sepolia testnet**. The core deliverable is the `MyToken` contract—a customized ERC-20 with minting caps and burn functionality, plus an automated deployment script.

**Key Tech Stack:**
- Solidity `^0.8.20` with OpenZeppelin ERC-20/Ownable
- Hardhat `^2.22.0` for development/testing/deployment
- Infura for Sepolia RPC connectivity
- Environment variables via `.env` for secrets management

## Architecture & Data Flow

### Smart Contract Layer (`contracts/MyToken.sol`)

The `MyToken` contract extends OpenZeppelin's ERC-20 and Ownable:

- **Constructor**: Takes `name`, `symbol`, `initialSupply`, `maxSupply`. Validates `initialSupply <= maxSupply` before minting initial tokens to deployer.
- **mint(address, uint256)**: Owner-only. Enforces `totalSupply + amount <= maxSupply` to prevent oversupply.
- **burn(uint256)**: Any holder can burn their own tokens. No supply cap check needed.
- **State**: Tracks `maxSupply` as custom property (OpenZeppelin ERC-20 has no built-in cap).

**Why this design:** Custom max supply prevents inflation beyond bounds while allowing burn-to-deflate. Ownership ensures only authorized minting.

### Deployment Flow (`scripts/deploy.js`)

1. Fetches hardhat ethers contract factory for `MyToken`
2. Deploys with: `name="MyToken"`, `symbol="MTK"`, `initialSupply=1M`, `maxSupply=10M`
3. Awaits deployment confirmation with `waitForDeployment()`
4. Logs deployed contract address to console for manual verification

**Configuration Location:** `hardhat.config.js` references `INFURA_API_KEY` and `PRIVATE_KEY` from `.env`.

## Critical Developer Workflows

### Setup & Compilation

```bash
npm install                    # Install Hardhat + dependencies
npx hardhat compile           # Compile Solidity → artifacts/
```

Artifacts stored in `artifacts/contracts/MyToken.sol/` contain ABI and bytecode.

### Deployment to Sepolia

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

**Requirements:** 
- `.env` must contain valid `INFURA_API_KEY` and `PRIVATE_KEY`
- Account holding `PRIVATE_KEY` needs Sepolia ETH for gas
- Logs deployed address for MetaMask import

### Testing (if test files added)

```bash
npx hardhat test              # Runs any .test.js files in test/ directory
```

Currently no tests exist; agents should create tests in `test/` following Hardhat conventions.

## Project-Specific Patterns & Conventions

1. **Token Parameters as Variables**: Initial supply (1M) and max supply (10M) hardcoded in `deploy.js` with `hre.ethers.parseEther()` for wei conversion. Modify these before deployment if token economics differ.

2. **Ownership Model**: Uses OpenZeppelin `Ownable` with `msg.sender` as initial owner. Only owner can mint. Agents should preserve this for security.

3. **Supply Validation**: Constructor validates `initialSupply <= maxSupply`. Mint validates `totalSupply + amount <= maxSupply`. Both are critical; do not bypass.

4. **Burn Unrestricted**: Any token holder can call `burn()` to destroy their own tokens. No owner approval needed. This is intentional for user control.

5. **Vietnamese Documentation**: README and comments use Vietnamese. Preserve this convention or use English consistently if expanding docs.

## Integration Points & Dependencies

- **OpenZeppelin Contracts (`@openzeppelin/contracts@^5.0.0`)**: ERC20.sol, Ownable.sol. Do not downgrade major versions without testing compatibility with Solidity 0.8.20.
- **Hardhat Toolbox**: Provides ethers, chai, hardhat-etherscan plugins. Used in config and deployment.
- **Infura RPC**: Sepolia network connected via `https://sepolia.infura.io/v3/{INFURA_API_KEY}`. If RPC calls fail, check API key validity and rate limits.
- **dotenv**: Loads `.env` in `hardhat.config.js`. Always git-ignore `.env`; commit `.env.example` instead.

## Common Agent Tasks & Guidance

### Adding Tests
Create `test/MyToken.test.js`. Use Hardhat's test patterns:
```javascript
const { expect } = require("chai");
describe("MyToken", () => {
  let myToken, owner, addr1;
  beforeEach(async () => {
    const MyToken = await hre.ethers.getContractFactory("MyToken");
    myToken = await MyToken.deploy("MyToken", "MTK", ethers.parseEther("1000000"), ethers.parseEther("10000000"));
    [owner, addr1] = await hre.ethers.getSigners();
  });
  it("should mint tokens within max supply", async () => {
    await myToken.mint(addr1.address, ethers.parseEther("100"));
    expect(await myToken.balanceOf(addr1.address)).to.equal(ethers.parseEther("100"));
  });
});
```

### Modifying Token Parameters
Edit `scripts/deploy.js` lines 5–8 (name, symbol, initialSupply, maxSupply) **before** running deploy command.

### Verifying Contract on Etherscan
After deployment, add `ETHERSCAN_API_KEY` to `.env`, then:
```bash
npx hardhat verify --network sepolia <CONTRACT_ADDRESS> "MyToken" "MTK" "1000000000000000000000000" "10000000000000000000000000"
```
(Arguments are constructor params in wei).

### Debugging Deployment Failures
1. Check `.env` variables exist and are valid
2. Verify account has Sepolia ETH
3. Check Infura API quota not exceeded
4. Inspect error logs for revert reasons (supply checks, etc.)

## File Reference Map

| File | Purpose |
|------|---------|
| `contracts/MyToken.sol` | ERC-20 contract definition with max supply & burn |
| `scripts/deploy.js` | Sepolia deployment automation |
| `hardhat.config.js` | Hardhat + Sepolia network config |
| `package.json` | Dependencies + npm scripts |
| `.env.example` | Template for environment variables |
| `.github/copilot-instructions.md` | This file |

---

**Last Updated:** December 2025  
**Solidity Version:** 0.8.20  
**Primary Network:** Sepolia Testnet
