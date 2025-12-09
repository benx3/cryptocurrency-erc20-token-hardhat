const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyToken ERC-20", function () {
  let myToken;
  let owner;
  let addr1;
  let addr2;
  const TOKEN_NAME = "MyToken";
  const TOKEN_SYMBOL = "MTK";
  const INITIAL_SUPPLY = ethers.parseEther("1000000"); // 1,000,000 tokens
  const MAX_SUPPLY = ethers.parseEther("10000000"); // 10,000,000 tokens

  beforeEach(async function () {
    // Lấy signers (tài khoản test)
    [owner, addr1, addr2] = await ethers.getSigners();

    // Deploy contract
    const MyToken = await ethers.getContractFactory("MyToken");
    myToken = await MyToken.deploy(TOKEN_NAME, TOKEN_SYMBOL, INITIAL_SUPPLY, MAX_SUPPLY);
    await myToken.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Nên set đúng tên token", async function () {
      expect(await myToken.name()).to.equal(TOKEN_NAME);
    });

    it("Nên set đúng symbol token", async function () {
      expect(await myToken.symbol()).to.equal(TOKEN_SYMBOL);
    });

    it("Nên set đúng maxSupply", async function () {
      expect(await myToken.maxSupply()).to.equal(MAX_SUPPLY);
    });

    it("Nên mint cung cấp ban đầu cho owner", async function () {
      expect(await myToken.balanceOf(owner.address)).to.equal(INITIAL_SUPPLY);
    });

    it("Nên set tổng cung cấp bằng cung cấp ban đầu", async function () {
      expect(await myToken.totalSupply()).to.equal(INITIAL_SUPPLY);
    });

    it("Chỉ chủ sở hữu có thể deploy contract", async function () {
      expect(await myToken.owner()).to.equal(owner.address);
    });
  });

  describe("Transfer", function () {
    it("Nên chuyển token từ owner tới addr1", async function () {
      const amount = ethers.parseEther("100");
      await myToken.transfer(addr1.address, amount);
      expect(await myToken.balanceOf(addr1.address)).to.equal(amount);
    });

    it("Nên giảm số dư owner sau khi chuyển", async function () {
      const amount = ethers.parseEther("100");
      const initialBalance = await myToken.balanceOf(owner.address);
      await myToken.transfer(addr1.address, amount);
      expect(await myToken.balanceOf(owner.address)).to.equal(initialBalance - amount);
    });

    it("Không nên chuyển tới địa chỉ zero", async function () {
      const amount = ethers.parseEther("100");
      await expect(myToken.transfer(ethers.ZeroAddress, amount)).to.be.revertedWith(
        "Cannot transfer to zero address"
      );
    });

    it("Không nên chuyển khi số dư không đủ", async function () {
      const amount = ethers.parseEther("2000000");
      await expect(myToken.connect(addr1).transfer(addr2.address, amount)).to.be.reverted;
    });

    it("Không nên chuyển lượng 0", async function () {
      await expect(myToken.transfer(addr1.address, 0)).to.be.revertedWith(
        "Amount must be greater than 0"
      );
    });
  });

  describe("Approve & TransferFrom", function () {
    it("Nên phê duyệt chi tiêu token", async function () {
      const amount = ethers.parseEther("500");
      await myToken.approve(addr1.address, amount);
      expect(await myToken.allowance(owner.address, addr1.address)).to.equal(amount);
    });

    it("Nên emit sự kiện khi approve", async function () {
      const amount = ethers.parseEther("500");
      await expect(myToken.approve(addr1.address, amount)).to.emit(myToken, "AllowanceSet");
    });

    it("Nên chuyển token thay mặt khi có phê duyệt", async function () {
      const amount = ethers.parseEther("500");
      await myToken.approve(addr1.address, amount);
      await myToken.connect(addr1).transferFrom(owner.address, addr2.address, amount);
      expect(await myToken.balanceOf(addr2.address)).to.equal(amount);
    });

    it("Không nên chuyển quá lượng được phê duyệt", async function () {
      const approveAmount = ethers.parseEther("100");
      const transferAmount = ethers.parseEther("200");
      await myToken.approve(addr1.address, approveAmount);
      await expect(
        myToken.connect(addr1).transferFrom(owner.address, addr2.address, transferAmount)
      ).to.be.reverted;
    });

    it("Không nên phê duyệt cho địa chỉ zero", async function () {
      const amount = ethers.parseEther("500");
      await expect(myToken.approve(ethers.ZeroAddress, amount)).to.be.revertedWith(
        "Cannot approve zero address"
      );
    });
  });

  describe("Mint", function () {
    it("Chỉ chủ sở hữu có thể mint", async function () {
      const amount = ethers.parseEther("100");
      await expect(myToken.connect(addr1).mint(addr1.address, amount)).to.be.reverted;
    });

    it("Nên mint token mới", async function () {
      const amount = ethers.parseEther("1000000");
      const initialSupply = await myToken.totalSupply();
      await myToken.mint(addr1.address, amount);
      expect(await myToken.balanceOf(addr1.address)).to.equal(amount);
      expect(await myToken.totalSupply()).to.equal(initialSupply + amount);
    });

    it("Không nên mint quá maxSupply", async function () {
      const amount = ethers.parseEther("9000001");
      await expect(myToken.mint(addr1.address, amount)).to.be.revertedWith(
        "Max supply exceeded"
      );
    });

    it("Emit sự kiện TokensMinted khi mint", async function () {
      const amount = ethers.parseEther("100");
      await expect(myToken.mint(addr1.address, amount)).to.emit(myToken, "TokensMinted");
    });

    it("Không nên mint tới địa chỉ zero", async function () {
      const amount = ethers.parseEther("100");
      await expect(myToken.mint(ethers.ZeroAddress, amount)).to.be.revertedWith(
        "Cannot mint to zero address"
      );
    });

    it("Không nên mint lượng 0", async function () {
      await expect(myToken.mint(addr1.address, 0)).to.be.revertedWith(
        "Amount must be greater than 0"
      );
    });
  });

  describe("Burn", function () {
    it("Bất kỳ ai cũng có thể burn token của chính họ", async function () {
      const amount = ethers.parseEther("100");
      await myToken.transfer(addr1.address, amount);
      const initialBalance = await myToken.balanceOf(addr1.address);
      await myToken.connect(addr1).burn(amount);
      expect(await myToken.balanceOf(addr1.address)).to.equal(initialBalance - amount);
    });

    it("Nên giảm tổng cung cấp sau khi burn", async function () {
      const amount = ethers.parseEther("100");
      const initialSupply = await myToken.totalSupply();
      await myToken.burn(amount);
      expect(await myToken.totalSupply()).to.equal(initialSupply - amount);
    });

    it("Emit sự kiện TokensBurned khi burn", async function () {
      const amount = ethers.parseEther("100");
      await expect(myToken.burn(amount)).to.emit(myToken, "TokensBurned");
    });

    it("Không nên burn lượng 0", async function () {
      await expect(myToken.burn(0)).to.be.revertedWith("Amount must be greater than 0");
    });

    it("Không nên burn quá số dư", async function () {
      const amount = ethers.parseEther("2000000");
      await expect(myToken.connect(addr1).burn(amount)).to.be.reverted;
    });
  });

  describe("BurnFrom", function () {
    it("Chỉ chủ sở hữu có thể burnFrom", async function () {
      const amount = ethers.parseEther("100");
      await myToken.transfer(addr1.address, amount);
      await expect(myToken.connect(addr2).burnFrom(addr1.address, amount)).to.be.reverted;
    });

    it("Chủ sở hữu có thể burn token từ người khác", async function () {
      const amount = ethers.parseEther("100");
      await myToken.transfer(addr1.address, amount);
      const initialBalance = await myToken.balanceOf(addr1.address);
      await myToken.burnFrom(addr1.address, amount);
      expect(await myToken.balanceOf(addr1.address)).to.equal(initialBalance - amount);
    });

    it("Emit sự kiện TokensBurned khi burnFrom", async function () {
      const amount = ethers.parseEther("100");
      await myToken.transfer(addr1.address, amount);
      await expect(myToken.burnFrom(addr1.address, amount)).to.emit(myToken, "TokensBurned");
    });

    it("Không nên burnFrom khi không đủ số dư", async function () {
      const amount = ethers.parseEther("2000000");
      await expect(myToken.burnFrom(addr1.address, amount)).to.be.revertedWith(
        "Insufficient balance"
      );
    });
  });

  describe("Balance & Allowance", function () {
    it("Nên kiểm tra số dư của một địa chỉ", async function () {
      const amount = ethers.parseEther("100");
      await myToken.transfer(addr1.address, amount);
      expect(await myToken.balanceOf(addr1.address)).to.equal(amount);
    });

    it("Nên kiểm tra allowance", async function () {
      const amount = ethers.parseEther("500");
      await myToken.approve(addr1.address, amount);
      expect(await myToken.allowance(owner.address, addr1.address)).to.equal(amount);
    });

    it("Allowance mặc định nên là 0", async function () {
      expect(await myToken.allowance(owner.address, addr1.address)).to.equal(0);
    });
  });
});
