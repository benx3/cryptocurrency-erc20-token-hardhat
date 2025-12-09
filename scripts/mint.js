const hre = require("hardhat");

/**
 * Script mint (tạo) token mới - CHỈ CHỦSỞ HỮU
 * 
 * Cách sử dụng:
 * npx hardhat run scripts/mint.js --network sepolia
 */

async function main() {
  // ========== CẤU HÌNH ==========
  const contractAddress = "0x1234567890AbCdEf1234567890AbCdEf12345678"; // Thay bằng địa chỉ contract
  const recipientAddress = "0xRecipientAddress123"; // Địa chỉ nhận token mới
  const amountToMint = "500000"; // Số lượng token mint

  // ========== KẾT NỐI CONTRACT ==========
  console.log("⏳ Đang kết nối contract...\n");
  
  try {
    const MyToken = await hre.ethers.getContractAt("MyToken", contractAddress);
    
    const symbol = await MyToken.symbol();
    const totalSupply = await MyToken.totalSupply();
    const maxSupply = await MyToken.maxSupply();
    const amount = hre.ethers.parseEther(amountToMint);
    
    // ========== KIỂM TRA CÓ VƯỢT QUÁN MAX SUPPLY KHÔNG ==========
    const newTotal = totalSupply + amount;
    
    console.log("════════════════════════════════════════");
    console.log("🔨 THÔNG TIN MINT TOKEN");
    console.log("════════════════════════════════════════");
    console.log(`Địa chỉ nhận: ${recipientAddress}`);
    console.log(`Số lượng mint: ${amountToMint} ${symbol}`);
    console.log(`Tổng cung cấp hiện tại: ${hre.ethers.formatEther(totalSupply)} ${symbol}`);
    console.log(`Cung cấp tối đa: ${hre.ethers.formatEther(maxSupply)} ${symbol}`);
    console.log(`Tổng cung cấp sau mint: ${hre.ethers.formatEther(newTotal)} ${symbol}`);
    console.log("════════════════════════════════════════\n");
    
    if (newTotal > maxSupply) {
      console.error(
        `❌ Vượt quá maxSupply! `
      );
      console.error(
        `   Có thể mint tối đa: ${hre.ethers.formatEther(maxSupply - totalSupply)} ${symbol}`
      );
      process.exitCode = 1;
      return;
    }
    
    // ========== THỰC HIỆN MINT ==========
    console.log("⏳ Đang mint token...");
    const tx = await MyToken.mint(recipientAddress, amount);
    console.log(`✅ Transaction gửi đi! Hash: ${tx.hash}\n`);
    
    console.log("⏳ Đang chờ xác nhận...");
    const receipt = await tx.wait();
    
    // ========== KIỂM TRA LẠI TỔNG CUNG CẤP ==========
    const newTotalSupply = await MyToken.totalSupply();
    
    console.log("\n════════════════════════════════════════");
    console.log("✅ MINT TOKEN THÀNH CÔNG!");
    console.log("════════════════════════════════════════");
    console.log(`Block Number: ${receipt.blockNumber}`);
    console.log(`Tổng cung cấp mới: ${hre.ethers.formatEther(newTotalSupply)} ${symbol}`);
    console.log(`Transaction: https://sepolia.etherscan.io/tx/${tx.hash}`);
    console.log("════════════════════════════════════════\n");
    
  } catch (error) {
    if (error.message.includes("Only owner")) {
      console.error("❌ Lỗi: Chỉ chủ sở hữu contract mới được phép mint token!");
    } else if (error.message.includes("Max supply exceeded")) {
      console.error("❌ Lỗi: Vượt quá giới hạn cung cấp tối đa!");
    } else {
      console.error("❌ Lỗi:", error.message);
    }
    process.exitCode = 1;
  }
}

main();
