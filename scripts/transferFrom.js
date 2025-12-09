const hre = require("hardhat");

/**
 * Script chuyển token thay mặt người khác (transferFrom)
 * 
 * Yêu cầu: Trước tiên người sở hữu phải gọi approve()
 * 
 * Cách sử dụng:
 * npx hardhat run scripts/transferFrom.js --network sepolia
 */

async function main() {
  // ========== CẤU HÌNH ==========
  const contractAddress = "0x5A3023c7158294087D3a39063954e916D44ED04B"; // Thay bằng địa chỉ contract
  const ownerAddress = "0xcdf2595bd72adaf8ff411ebfbf39192e10e1f8f1"; // Địa chỉ người sở hữu token
  const recipientAddress = "0x3281caddd4d639022a35980568544599c36b9b9a"; // Địa chỉ người nhận
  const amountToTransfer = "100000"; // Số lượng token

  // ========== KẾT NỐI CONTRACT ==========
  console.log("⏳ Đang kết nối contract...\n");
  
  try {
    const MyToken = await hre.ethers.getContractAt("MyToken", contractAddress);
    const signer = await hre.ethers.provider.getSigner();
    const signerAddress = await signer.getAddress();
    
    const symbol = await MyToken.symbol();
    const amount = hre.ethers.parseEther(amountToTransfer);
    
    // ========== KIỂM TRA ALLOWANCE ==========
    const allowance = await MyToken.allowance(ownerAddress, signerAddress);
    
    console.log("════════════════════════════════════════");
    console.log("🔄 THÔNG TIN CHUYỂN THAY MẶT");
    console.log("════════════════════════════════════════");
    console.log(`Chủ sở hữu:      ${ownerAddress}`);
    console.log(`Người chuyển (Caller): ${signerAddress}`);
    console.log(`Người nhận:      ${recipientAddress}`);
    console.log(`Số lượng chuyển: ${amountToTransfer} ${symbol}`);
    console.log(`Allowance hiện tại: ${hre.ethers.formatEther(allowance)} ${symbol}`);
    console.log("════════════════════════════════════════\n");
    
    // ========== KIỂM TRA ALLOWANCE CÓ ĐỦ KHÔNG ==========
    if (allowance < amount) {
      console.error(
        `❌ Allowance không đủ!`
      );
      console.error(
        `   Chủ sở hữu cần approve ${amountToTransfer} ${symbol} cho bạn trước`
      );
      console.error(
        `   Hiện tại allowance chỉ có: ${hre.ethers.formatEther(allowance)} ${symbol}`
      );
      process.exitCode = 1;
      return;
    }
    
    // ========== THỰC HIỆN CHUYỂN ==========
    console.log("⏳ Đang chuyển token...");
    const tx = await MyToken.transferFrom(ownerAddress, recipientAddress, amount);
    console.log(`✅ Transaction gửi đi! Hash: ${tx.hash}\n`);
    
    console.log("⏳ Đang chờ xác nhận...");
    const receipt = await tx.wait();
    
    console.log("\n════════════════════════════════════════");
    console.log("✅ CHUYỂN THAY MẶT THÀNH CÔNG!");
    console.log("════════════════════════════════════════");
    console.log(`Block Number: ${receipt.blockNumber}`);
    console.log(`Gas Used: ${receipt.gasUsed.toString()}`);
    console.log(`Transaction: https://sepolia.etherscan.io/tx/${tx.hash}`);
    console.log("════════════════════════════════════════\n");
    
  } catch (error) {
    console.error("❌ Lỗi:", error.message);
    process.exitCode = 1;
  }
}

main();
