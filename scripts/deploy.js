const hre = require("hardhat");

async function main() {
  // Token Information - Scooby-Doo Token
  const name = "Scooby-Doo";
  const symbol = "SBD";
  const initialSupply = hre.ethers.parseEther("1000000000");  // 1 billion SBD
  const maxSupply = hre.ethers.parseEther("1000000000");      // 1 billion SBD (max supply)

  console.log("========================================");
  console.log("🐕 DEPLOYING SCOOBY-DOO TOKEN 🐕");
  console.log("========================================");
  console.log(`Token Name:    ${name}`);
  console.log(`Token Symbol:  ${symbol}`);
  console.log(`Initial Supply: ${hre.ethers.formatEther(initialSupply)} ${symbol}`);
  console.log(`Max Supply:     ${hre.ethers.formatEther(maxSupply)} ${symbol}`);
  console.log("========================================\n");

  const MyToken = await hre.ethers.getContractFactory("MyToken");
  console.log("⏳ Deploying contract...");
  const myToken = await MyToken.deploy(name, symbol, initialSupply, maxSupply);

  console.log("⏳ Waiting for deployment confirmation...");
  await myToken.waitForDeployment();

  const contractAddress = await myToken.getAddress();
  console.log("\n========================================");
  console.log("✅ DEPLOYMENT SUCCESSFUL!");
  console.log("========================================");
  console.log(`Contract Address: ${contractAddress}`);
  console.log(`View on Etherscan: https://sepolia.etherscan.io/token/${contractAddress}`);
  console.log("========================================\n");

  // Display token details
  const totalSupply = await myToken.totalSupply();
  const owner = await myToken.owner();
  console.log("📊 TOKEN DETAILS:");
  console.log(`Total Supply: ${hre.ethers.formatEther(totalSupply)} ${symbol}`);
  console.log(`Owner: ${owner}`);
  console.log("\n🚀 Next steps:");
  console.log(`1. Add this token to MetaMask: ${contractAddress}`);
  console.log(`2. Run: npx hardhat run scripts/transfer.js --network sepolia`);
  console.log(`3. Or verify on Etherscan for visibility\n`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
