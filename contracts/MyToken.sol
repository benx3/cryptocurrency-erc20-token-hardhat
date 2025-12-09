// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title MyToken
 * @dev Triển khai giao diện ERC-20 với khả năng mint/burn có giới hạn
 * 
 * Các ánh xạ cốt lõi (Core Mappings):
 * - balances: mapping(address => uint256) - Số dư token của mỗi địa chỉ
 * - allowances: mapping(address => mapping(address => uint256)) - Quyền chi tiêu được phê duyệt
 * 
 * Các hàm cốt lõi (Core Functions):
 * - transfer(to, amount) - Chuyển token từ bạn tới địa chỉ khác
 * - approve(spender, amount) - Cấp quyền cho người khác sử dụng token của bạn
 * - transferFrom(from, to, amount) - Chuyển token thay mặt người khác
 * - balanceOf(account) - Kiểm tra số dư của một địa chỉ
 * - allowance(owner, spender) - Kiểm tra lượng token được phê duyệt
 */
contract MyToken is ERC20, Ownable {
    // Giới hạn cung cấp tối đa của token
    uint256 public maxSupply;

    // Events
    event TokensMinted(address indexed to, uint256 amount);
    event TokensBurned(address indexed from, uint256 amount);
    event AllowanceSet(address indexed owner, address indexed spender, uint256 amount);

    constructor(
        string memory name_,
        string memory symbol_,
        uint256 initialSupply_,
        uint256 maxSupply_
    ) ERC20(name_, symbol_) Ownable(msg.sender) {
        require(initialSupply_ <= maxSupply_, "Initial supply exceeds max supply");
        require(maxSupply_ > 0, "Max supply must be greater than 0");
        
        maxSupply = maxSupply_;
        _mint(msg.sender, initialSupply_);
        emit TokensMinted(msg.sender, initialSupply_);
    }

    /**
     * @dev Mint token mới (chỉ chủ sở hữu)
     * @param to Địa chỉ nhận token
     * @param amount Số lượng token cần mint
     * 
     * Yêu cầu:
     * - Chỉ chủ sở hữu contract mới được gọi
     * - totalSupply + amount <= maxSupply (không vượt quá giới hạn)
     */
    function mint(address to, uint256 amount) external onlyOwner {
        require(to != address(0), "Cannot mint to zero address");
        require(amount > 0, "Amount must be greater than 0");
        require(totalSupply() + amount <= maxSupply, "Max supply exceeded");
        
        _mint(to, amount);
        emit TokensMinted(to, amount);
    }

    /**
     * @dev Burn (tiêu hủy) token từ tài khoản của bạn
     * @param amount Số lượng token cần burn
     * 
     * Bất kỳ người nào cũng có thể burn token của chính họ
     * Không cần phê duyệt của chủ sở hữu
     */
    function burn(uint256 amount) external {
        require(amount > 0, "Amount must be greater than 0");
        _burn(msg.sender, amount);
        emit TokensBurned(msg.sender, amount);
    }

    /**
     * @dev Burn token từ một địa chỉ cụ thể (chỉ chủ sở hữu)
     * @param from Địa chỉ cần burn token
     * @param amount Số lượng token cần burn
     */
    function burnFrom(address from, uint256 amount) external onlyOwner {
        require(from != address(0), "Cannot burn from zero address");
        require(amount > 0, "Amount must be greater than 0");
        require(balanceOf(from) >= amount, "Insufficient balance");
        
        _burn(from, amount);
        emit TokensBurned(from, amount);
    }

    /**
     * @dev Lấy số dư token của một địa chỉ
     * @param account Địa chỉ cần kiểm tra
     * @return Số lượng token của địa chỉ
     */
    function balanceOf(address account) public view override returns (uint256) {
        return super.balanceOf(account);
    }

    /**
     * @dev Lấy tổng cung cấp token hiện tại
     * @return Tổng số token đã được mint
     */
    function totalSupply() public view override returns (uint256) {
        return super.totalSupply();
    }

    /**
     * @dev Chuyển token từ bạn tới một địa chỉ khác
     * @param to Địa chỉ nhận token
     * @param amount Số lượng token cần chuyển
     * @return Trả về true nếu thành công
     * 
     * Yêu cầu:
     * - Bạn phải có đủ token để chuyển
     * - Địa chỉ nhận không thể là zero address
     */
    function transfer(address to, uint256 amount) public override returns (bool) {
        require(to != address(0), "Cannot transfer to zero address");
        require(amount > 0, "Amount must be greater than 0");
        return super.transfer(to, amount);
    }

    /**
     * @dev Phê duyệt cho địa chỉ khác được sử dụng một lượng token của bạn
     * @param spender Địa chỉ được phê duyệt
     * @param amount Số lượng token được phê duyệt
     * @return Trả về true nếu thành công
     * 
     * Sau khi approve, spender có thể sử dụng transferFrom để chuyển token
     * được phê duyệt này
     */
    function approve(address spender, uint256 amount) public override returns (bool) {
        require(spender != address(0), "Cannot approve zero address");
        super.approve(spender, amount);
        emit AllowanceSet(msg.sender, spender, amount);
        return true;
    }

    /**
     * @dev Chuyển token thay mặt một người khác (cần phê duyệt trước)
     * @param from Địa chỉ gửi token
     * @param to Địa chỉ nhận token
     * @param amount Số lượng token cần chuyển
     * @return Trả về true nếu thành công
     * 
     * Yêu cầu:
     * - Bạn phải được phê duyệt bởi 'from' để sử dụng 'amount' token
     * - 'from' phải có đủ token để chuyển
     */
    function transferFrom(address from, address to, uint256 amount) public override returns (bool) {
        require(from != address(0), "Cannot transfer from zero address");
        require(to != address(0), "Cannot transfer to zero address");
        require(amount > 0, "Amount must be greater than 0");
        return super.transferFrom(from, to, amount);
    }

    /**
     * @dev Lấy lượng token mà spender được phép sử dụng từ owner
     * @param owner Địa chỉ chủ sở hữu token
     * @param spender Địa chỉ được phê duyệt
     * @return Số lượng token được phê duyệt
     */
    function allowance(address owner, address spender) public view override returns (uint256) {
        return super.allowance(owner, spender);
    }
}
