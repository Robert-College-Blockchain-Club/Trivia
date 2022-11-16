const {ethers} = require("hardhat");
const fs = require("fs");
require("dotenv").config({path: ".env"});


async function main() {
  
  const triviaTokenC= await ethers.getContractFactory("triviaToken");
  const triviaCardC = await ethers.getContractFactory("triviaCard");

  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString())

  const triviaTokenD = await triviaTokenC.deploy(
    "RCBTriviaToken",
    "RCBTT"
  );
  const triviaTokenAddress= triviaTokenD.address;

  const triviaCardD = await triviaCardC.deploy(
    "RCBTriviaCard",
    "RCBTD",
    triviaTokenAddress
  );
  const triviaCardAddress = triviaCardD.address;

  
  const data= {
    triviaTokenAddress: triviaTokenAddress,
    triviaCardAddress: triviaCardAddress,
  };
  const dataS = JSON.stringify(data,null,2);
  fs.writeFile("./data.json", dataS, err=> {
    if (err) {
      console.log(err);
    }
  })   

  console.log("deployed trivia Token on address: \n", triviaTokenAddress);
  console.log("deployed Triivia Card at address:  \n", triviaCardAddress );


    //APPROVALS
  const amount = ethers.BigNumber.from("10000000000000000000000");
  await triviaTokenD.approve(triviaCardAddress, amount);
  
}

  main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
