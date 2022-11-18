const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Unit", function () {
  describe("TriviaCard Tests", function () {
    let triviaToken;
    let triviaCard;
    let owner, acc1, acc2;
    beforeEach(async () => {
      // get accounts
      [owner, acc1, acc2] = await ethers.getSigners();

      // deploy triviaToken
      const TriviaToken = await ethers.getContractFactory("triviaToken");
      triviaToken = await TriviaToken.deploy("Trivia Token", "TRVT");
      await triviaToken.deployed();

      // deploy triviaCard
      const TriviaCard = await ethers.getContractFactory("triviaCard");
      triviaCard = await TriviaCard.deploy("Trivia Card", "TRVC", triviaToken.address);
      await triviaCard.deployed();
    });
    it("Should initialize with right owner", async function () {
      expect(await triviaCard.owner()).to.equal(owner.address);
    });

    it("Should get and update regularPrice", async function () {
      expect(await triviaCard.regularPrice()).to.equal(ethers.utils.parseEther("5"));
      let setPriceTx = await triviaCard.setRegularPrice(7);
      await setPriceTx.wait();
      expect(await triviaCard.regularPrice()).to.equal(ethers.utils.parseEther("7"));
    });

    it("Should mint 9 ERC20 token to acc1", async function () {
      let tx = await triviaToken.connect(acc1).mint(9, { value: ethers.utils.parseEther("0.09") });
      await tx.wait();
      expect(await triviaToken.balanceOf(acc1.address)).to.equal(ethers.BigNumber.from("9000000000000000000"));
    });

    it("Should let acc1 Approve ERC1155 contract", async function () {
      const amountApproved = ethers.BigNumber.from("100000000000000000000000");
      await triviaToken.connect(acc1).approve(triviaCard.address, amountApproved);
      expect(await triviaToken.allowance(acc1.address, triviaCard.address)).to.equal(amountApproved);
    });

    it("should mint Regular Card for acc1", async function () {
      let tx = await triviaToken.connect(acc1).mint(9, { value: ethers.utils.parseEther("0.09") });
      await tx.wait();

      const amountApproved = ethers.BigNumber.from("100000000000000000000000");
      await triviaToken.connect(acc1).approve(triviaCard.address, amountApproved);

      await triviaCard.connect(acc1).mintRegular();
      expect(await triviaCard.balanceOf(acc1.address, 0)).to.equal(1);
      expect(await triviaToken.balanceOf(acc1.address)).to.equal(ethers.BigNumber.from("4000000000000000000"));
    });

    it("should let acc1 to enter Trivia", async function () {
      // mint
      let tx = await triviaToken.connect(acc1).mint(9, { value: ethers.utils.parseEther("0.09") });
      await tx.wait();

      // enter
      await triviaToken.connect(acc1).enterTrivia();
      expect(await triviaToken.balanceOf(acc1.address)).to.equal(ethers.BigNumber.from("6000000000000000000"));
    });

    it("should let acc1 claim its reward", async function () {
      // mint
      // console.log("Balance before mint:", await triviaToken.balanceOf(acc1.address));
      let mint_tx = await triviaToken.connect(acc1).mint(9, { value: ethers.utils.parseEther("0.09") });
      await mint_tx.wait();

      // enter
      // console.log("Balance before entering:", await triviaToken.balanceOf(acc1.address));
      await triviaToken.connect(acc1).enterTrivia();

      // addPrize
      let add_prize_tx = await triviaToken.addPrizeBalance([acc1.address], [ethers.BigNumber.from("3000000000000000000")]);
      await add_prize_tx.wait();
      expect(await triviaToken.getReward(acc1.address)).to.equal(ethers.BigNumber.from("3000000000000000000"));

      //
      // console.log("Balance before claim:", await triviaToken.balanceOf(acc1.address));
      await triviaToken.connect(acc1).claim(ethers.BigNumber.from("2000000000000000000"));
      expect(await triviaToken.balanceOf(acc1.address)).to.equal(ethers.BigNumber.from("8000000000000000000"));
      expect(await triviaToken.balanceOf(triviaToken.address)).to.equal(ethers.BigNumber.from("1000000000000000000"));
    });
  });
});
