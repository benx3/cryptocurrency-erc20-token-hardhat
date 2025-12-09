const hre = require("hardhat");

/**
 * Script kiểm tra số dư của một địa chỉ
 * 
 * Cách sử dụng:
 * npx hardhat run scripts/checkBalance.js --network sepolia
 * 
 * Sau đó nhập địa chỉ cần kiểm tra khi được nhắc
 */

async function main() {
  // ========== CẤU HÌNH ==========
  const contractAddress = "0x5A3023c7158294087D3a39063954e916D44ED04B"; // Thay bằng địa chỉ contract của bạn
  const accountToCheck = "0xcdf2595bd72adaf8ff411ebfbf39192e10e1f8f1"; // Thay bằng địa chỉ cần kiểm tra

  // ========== KẾT NỐI CONTRACT ==========
  console.log("⏳ Đang kết nối contract...\n");
  
  try {
    const MyToken = await hre.ethers.getContractAt("MyToken", contractAddress);
    
    // ========== LẤY THÔNG TIN CHUNG ==========
    const name = await MyToken.name();
    const symbol = await MyToken.symbol();
    const decimals = await MyToken.decimals();
    const totalSupply = await MyToken.totalSupply();
    const maxSupply = await MyToken.maxSupply();
    
    console.log("════════════════════════════════════════");
    console.log("📊 THÔNG TIN TOKEN");
    console.log("════════════════════════════════════════");
    console.log(`Tên (Name):        ${name}`);
    console.log(`Ký hiệu (Symbol):  ${symbol}`);
    console.log(`Số chữ số (Dec):   ${decimals}`);
    console.log(`Tổng cung cấp:     ${hre.ethers.formatEther(totalSupply)} ${symbol}`);
    console.log(`Cung cấp tối đa:   ${hre.ethers.formatEther(maxSupply)} ${symbol}`);
    console.log("════════════════════════════════════════\n");
    
    // ========== LẤY SỐ DƯ ==========
    const balance = await MyToken.balanceOf(accountToCheck);
    
    console.log(`👛 SỐ DƯ CỦA ĐỊA CHỈ: ${accountToCheck}`);
    console.log(`   ${hre.ethers.formatEther(balance)} ${symbol}`);
    console.log("\n");
    
  } catch (error) {
    console.error("❌ Lỗi:", error.message);
    process.exitCode = 1;
  }
}

main();
