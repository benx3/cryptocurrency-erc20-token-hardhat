const hre = require("hardhat");

/**
 * Script chuyển token cho người khác
 * 
 * Cách sử dụng:
 * npx hardhat run scripts/transfer.js --network sepolia
 */

async function main() {
  // ========== CẤU HÌNH ==========
  const contractAddress = "0x1234567890AbCdEf1234567890AbCdEf12345678"; // Thay bằng địa chỉ contract
  const recipientAddress = "0xRecipientAddress123"; // Thay bằng địa chỉ người nhận
  const amountToTransfer = "100"; // Số lượng token (không tính wei)

  // ========== KẾT NỐI CONTRACT ==========
  console.log("⏳ Đang kết nối contract...\n");
  
  try {
    const MyToken = await hre.ethers.getContractAt("MyToken", contractAddress);
    const signer = await hre.ethers.provider.getSigner();
    const senderAddress = await signer.getAddress();
    
    // ========== KIỂM TRA SỐ DƯ ==========
    const senderBalance = await MyToken.balanceOf(senderAddress);
    const symbol = await MyToken.symbol();
    const amount = hre.ethers.parseEther(amountToTransfer);
    
    console.log("════════════════════════════════════════");
    console.log("📤 THÔNG TIN CHUYỂN TOKEN");
    console.log("════════════════════════════════════════");
    console.log(`Từ (From):      ${senderAddress}`);
    console.log(`Đến (To):       ${recipientAddress}`);
    console.log(`Số lượng:       ${amountToTransfer} ${symbol}`);
    console.log(`Số dư hiện tại: ${hre.ethers.formatEther(senderBalance)} ${symbol}`);
    console.log("════════════════════════════════════════\n");
    
    // ========== KIỂM TRA SỐ DƯ CÓ ĐỦ KHÔNG ==========
    if (senderBalance < amount) {
      console.error(`❌ Số dư không đủ! Bạn có ${hre.ethers.formatEther(senderBalance)}, cần ${amountToTransfer}`);
      process.exitCode = 1;
      return;
    }
    
    // ========== THỰC HIỆN CHUYỂN ==========
    console.log("⏳ Đang chuyển token...");
    const tx = await MyToken.transfer(recipientAddress, amount);
    console.log(`✅ Transaction gửi đi! Hash: ${tx.hash}\n`);
    
    console.log("⏳ Đang chờ xác nhận transaction...");
    const receipt = await tx.wait();
    
    console.log("\n════════════════════════════════════════");
    console.log("✅ CHUYỂN TOKEN THÀNH CÔNG!");
    console.log("════════════════════════════════════════");
    console.log(`Block Number:    ${receipt.blockNumber}`);
    console.log(`Gas Used:        ${receipt.gasUsed.toString()}`);
    console.log(`Transaction:     https://sepolia.etherscan.io/tx/${tx.hash}`);
    console.log("════════════════════════════════════════\n");
    
  } catch (error) {
    console.error("❌ Lỗi:", error.message);
    process.exitCode = 1;
  }
}

main();
