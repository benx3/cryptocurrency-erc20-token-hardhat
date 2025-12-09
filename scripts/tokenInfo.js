const hre = require("hardhat");

/**
 * Interactive script to check Scooby-Doo Token details
 * 
 * Cách sử dụng:
 * npx hardhat run scripts/tokenInfo.js --network sepolia
 */

async function main() {
  // ========== CẤU HÌNH ==========
  const contractAddress = "0x5A3023c7158294087D3a39063954e916D44ED04B"; // Thay bằng địa chỉ contract
  const checkerAddress = "0xcdf2595bd72adaf8ff411ebfbf39192e10e1f8f1"; // Thay bằng địa chỉ cần kiểm tra

  console.log("\n🐕 SCOOBY-DOO TOKEN INFO 🐕\n");
  
  try {
    const SBD = await hre.ethers.getContractAt("MyToken", contractAddress);
    
    // ========== LẤY THÔNG TIN ==========
    const [name, symbol, decimals, totalSupply, maxSupply, owner, balance] = 
      await Promise.all([
        SBD.name(),
        SBD.symbol(),
        SBD.decimals(),
        SBD.totalSupply(),
        SBD.maxSupply(),
        SBD.owner(),
        SBD.balanceOf(checkerAddress)
      ]);
    
    // ========== HIỂN THỊ THÔNG TIN ==========
    console.log("═══════════════════════════════════════════════════");
    console.log("📊 TOKEN INFORMATION");
    console.log("═══════════════════════════════════════════════════");
    console.log(`Token Name:          ${name}`);
    console.log(`Token Symbol:        ${symbol}`);
    console.log(`Decimals:            ${decimals}`);
    console.log(`Total Supply:        ${hre.ethers.formatEther(totalSupply)} ${symbol}`);
    console.log(`Max Supply:          ${hre.ethers.formatEther(maxSupply)} ${symbol}`);
    console.log(`Contract Owner:      ${owner}`);
    console.log("═══════════════════════════════════════════════════\n");
    
    console.log("═══════════════════════════════════════════════════");
    console.log("💰 YOUR BALANCE");
    console.log("═══════════════════════════════════════════════════");
    console.log(`Address:             ${checkerAddress}`);
    console.log(`Balance:             ${hre.ethers.formatEther(balance)} ${symbol}`);
    console.log("═══════════════════════════════════════════════════\n");
    
    // ========== TÍNH TOÁN THÔNG TIN THÊM ==========
    const percentageOfTotal = (Number(balance) / Number(totalSupply)) * 100;
    const remainingToMint = maxSupply - totalSupply;
    
    console.log("═══════════════════════════════════════════════════");
    console.log("📈 SUPPLY INFORMATION");
    console.log("═══════════════════════════════════════════════════");
    console.log(`Percentage of Total: ${percentageOfTotal.toFixed(6)}%`);
    console.log(`Remaining to Mint:   ${hre.ethers.formatEther(remainingToMint)} ${symbol}`);
    console.log(`Supply Utilization:  ${((Number(totalSupply) / Number(maxSupply)) * 100).toFixed(2)}%`);
    console.log("═══════════════════════════════════════════════════\n");
    
    console.log("🔗 Etherscan Link:");
    console.log(`   https://sepolia.etherscan.io/token/${contractAddress}\n`);
    
  } catch (error) {
    console.error("❌ Error:", error.message);
    console.error("\n⚠️  Make sure to:");
    console.error("   1. Set contractAddress to your deployed contract address");
    console.error("   2. Set checkerAddress to the wallet you want to check");
    console.error("   3. Run with: npx hardhat run scripts/tokenInfo.js --network sepolia\n");
    process.exitCode = 1;
  }
}

main();
