const hre = require("hardhat");

/**
 * Script burn (tiêu hủy) token của bạn
 * 
 * Bất kỳ ai cũng có thể burn token của chính họ
 * 
 * Cách sử dụng:
 * npx hardhat run scripts/burn.js --network sepolia
 */

async function main() {
  // ========== CẤU HÌNH ==========
  const contractAddress = "0x1234567890AbCdEf1234567890AbCdEf12345678"; // Thay bằng địa chỉ contract
  const amountToBurn = "100"; // Số lượng token burn

  // ========== KẾT NỐI CONTRACT ==========
  console.log("⏳ Đang kết nối contract...\n");
  
  try {
    const MyToken = await hre.ethers.getContractAt("MyToken", contractAddress);
    const signer = await hre.ethers.provider.getSigner();
    const burnerAddress = await signer.getAddress();
    
    const symbol = await MyToken.symbol();
    const amount = hre.ethers.parseEther(amountToBurn);
    const userBalance = await MyToken.balanceOf(burnerAddress);
    const totalSupply = await MyToken.totalSupply();
    
    // ========== KIỂM TRA SỐ DƯ ==========
    console.log("════════════════════════════════════════");
    console.log("🔥 THÔNG TIN BURN TOKEN");
    console.log("════════════════════════════════════════");
    console.log(`Địa chỉ burn: ${burnerAddress}`);
    console.log(`Số lượng burn: ${amountToBurn} ${symbol}`);
    console.log(`Số dư hiện tại: ${hre.ethers.formatEther(userBalance)} ${symbol}`);
    console.log(`Tổng cung cấp trước: ${hre.ethers.formatEther(totalSupply)} ${symbol}`);
    console.log("════════════════════════════════════════\n");
    
    if (userBalance < amount) {
      console.error(
        `❌ Số dư không đủ! Bạn có ${hre.ethers.formatEther(userBalance)}, cần ${amountToBurn}`
      );
      process.exitCode = 1;
      return;
    }
    
    // ========== THỰC HIỆN BURN ==========
    console.log("⏳ Đang tiêu hủy token...");
    const tx = await MyToken.burn(amount);
    console.log(`✅ Transaction gửi đi! Hash: ${tx.hash}\n`);
    
    console.log("⏳ Đang chờ xác nhận...");
    const receipt = await tx.wait();
    
    // ========== KIỂM TRA LẠI TỔNG CUNG CẤP ==========
    const newTotalSupply = await MyToken.totalSupply();
    const newBalance = await MyToken.balanceOf(burnerAddress);
    
    console.log("\n════════════════════════════════════════");
    console.log("✅ BURN TOKEN THÀNH CÔNG!");
    console.log("════════════════════════════════════════");
    console.log(`Block Number: ${receipt.blockNumber}`);
    console.log(`Số dư mới: ${hre.ethers.formatEther(newBalance)} ${symbol}`);
    console.log(`Tổng cung cấp mới: ${hre.ethers.formatEther(newTotalSupply)} ${symbol}`);
    console.log(`Lượng đã burn: ${hre.ethers.formatEther(totalSupply - newTotalSupply)} ${symbol}`);
    console.log(`Transaction: https://sepolia.etherscan.io/tx/${tx.hash}`);
    console.log("════════════════════════════════════════\n");
    
  } catch (error) {
    console.error("❌ Lỗi:", error.message);
    process.exitCode = 1;
  }
}

main();
