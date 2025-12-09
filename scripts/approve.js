const hre = require("hardhat");

/**
 * Script phê duyệt (approve) cho phép người khác sử dụng token của bạn
 * 
 * Cách sử dụng:
 * npx hardhat run scripts/approve.js --network sepolia
 */

async function main() {
  // ========== CẤU HÌNH ==========
  const contractAddress = "0x1234567890AbCdEf1234567890AbCdEf12345678"; // Thay bằng địa chỉ contract
  const spenderAddress = "0xSpenderAddress123"; // Thay bằng địa chỉ được phê duyệt
  const amountToApprove = "1000"; // Số lượng token được phê duyệt

  // ========== KẾT NỐI CONTRACT ==========
  console.log("⏳ Đang kết nối contract...\n");
  
  try {
    const MyToken = await hre.ethers.getContractAt("MyToken", contractAddress);
    const signer = await hre.ethers.provider.getSigner();
    const ownerAddress = await signer.getAddress();
    
    const symbol = await MyToken.symbol();
    const amount = hre.ethers.parseEther(amountToApprove);
    
    // ========== HIỂN THỊ THÔNG TIN ==========
    console.log("════════════════════════════════════════");
    console.log("✅ THÔNG TIN PHÊ DUYỆT (APPROVE)");
    console.log("════════════════════════════════════════");
    console.log(`Chủ sở hữu (Owner): ${ownerAddress}`);
    console.log(`Người được phê duyệt: ${spenderAddress}`);
    console.log(`Số lượng được phê duyệt: ${amountToApprove} ${symbol}`);
    console.log("════════════════════════════════════════\n");
    
    // ========== THỰC HIỆN PHÊ DUYỆT ==========
    console.log("⏳ Đang phê duyệt...");
    const tx = await MyToken.approve(spenderAddress, amount);
    console.log(`✅ Transaction gửi đi! Hash: ${tx.hash}\n`);
    
    console.log("⏳ Đang chờ xác nhận...");
    const receipt = await tx.wait();
    
    // ========== KIỂM TRA LẠI ALLOWANCE ==========
    const allowance = await MyToken.allowance(ownerAddress, spenderAddress);
    
    console.log("\n════════════════════════════════════════");
    console.log("✅ PHÊ DUYỆT THÀNH CÔNG!");
    console.log("════════════════════════════════════════");
    console.log(`Block Number: ${receipt.blockNumber}`);
    console.log(`Allowance hiện tại: ${hre.ethers.formatEther(allowance)} ${symbol}`);
    console.log(`Transaction: https://sepolia.etherscan.io/tx/${tx.hash}`);
    console.log("════════════════════════════════════════\n");
    
  } catch (error) {
    console.error("❌ Lỗi:", error.message);
    process.exitCode = 1;
  }
}

main();
