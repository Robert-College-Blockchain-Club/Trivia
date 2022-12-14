import { ethers } from "https://cdn-cors.ethers.io/lib/ethers-5.5.4.esm.min.js";
import { ERC20ABI, ERC1155ABI } from "./constants/constants.js";
//require("dotenv").config();


const network = "sepolia";
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner(0);

// ERC20

//status update:
//claim, distributeRewards, enterTrivia works.
//TODO: make sure this is in-line with user flow, as in, we use provider.getSigner(0); and getDefaultProvider(window.ethereum); etc.
const contractAddressERC20 = "0x7A6441985E03C6891E7926Df3B32d491B26E855A";
const triviaContract = new ethers.Contract(contractAddressERC20, ERC20ABI, signer);
// const privateKey = process.env.PRIVATE_KEY;
//console.log("private key",privateKey)


//const signer = new ethers.Wallet(privateKey,provider)
//const triviaContractSigner = new ethers.Contract(contractAddressERC20,ERC20ABI, signer)

/* ERC1155 */
const contractAddressERC1155 = "0x3264bc9BEb62B6420041eF07075802DeC634f137";
const contractERC1155 = new ethers.Contract(contractAddressERC1155, ERC1155ABI, provider);

// Returns true if user has ERC1155 tokens (!=0)
export async function hasERC1155(accountAddress) {
    const balanceRegular = await contractERC1155.balanceOf(accountAddress, 0);
    const balancePremium = await contractERC1155.balanceOf(accountAddress, 1);
    if (balanceRegular !== 0 || balancePremium !== 0) {
        return true;
    } return false;
}

export async function amountAvailable() {
    console.log("called amountAvailable");
    console.log(signer.getAddress());
    const amount = await triviaContract.rewardList(signer.getAddress());
    return amount;
}

export async function claim(_amount) {
    try {
        // amount to be an integer 
        let amountstr = _amount.toString() + "000000000000000000";
        let amount = ethers.BigNumber.from(amountstr);
        await triviaContract.claim(amount); // TODO: should we use a signer for enterTrivia?


    } catch (error) {
        console.log(error);
    }
}

export function enterTrivia() { // read or write-only?
    try {

        triviaContract.enterTrivia(); // TODO: should we use a signer for enterTrivia?

    } catch (error) {

        console.log(error);

    }
};

const distributeRewardsListGenerator = (playerList, totalPrizeAmount) => {
    const totPlayers = playerList.length;
    const addressesList = [];
    const rewardList = [];
    for (let i = 0; i < totPlayers; i++) {
        rewardI = 2 * (totPlayers - i) / (totPlayers * (totPlayers + 1)) * totalPrizeAmount;
        addressesList.push(playerList[0][0]);
        rewardList.push(rewardI);
        //console.log("rewardI",rewardI)
    }
    //console.log("rewardList",rewardList)
    return [addressesList, rewardList];
}

export const hasPayed = async (address) => {
    const filter = triviaContract.filters.hasPayed(address, null);
    const query = await triviaContract.queryFilter(filter);
    if (query.length == 0) { return false; }
    let blockTime = query[query.length - 1].args.blockTime.toNumber(); //check which index should be used

    const triviaHour = 19;
    const triviaMinute = 0;
    const triviaTimeYesterday = new Date();
    triviaTimeYesterday.setHours(triviaHour);
    triviaTimeYesterday.setMinutes(triviaMinute);
    triviaTimeYesterday.setSeconds(0);
    triviaTimeYesterday.setUTCMilliseconds(0);
    const rightNow = new Date();

    while (rightNow.getTime() > triviaTimeYesterday.getTime()) {
        triviaTimeYesterday.setDate(triviaTimeYesterday.getDate() + 1);
    }
    triviaTimeYesterday.setDate(triviaTimeYesterday.getDate() - 1);

    return blockTime * 1000 > triviaTimeYesterday.getTime();
}


/**
 * 
 * @param {*} playerList 
 * @param {*} totalPrizeAmount
 * 
 * 
 * THIS IS AN ONLY OWNER FUNCTION 
 */
export const distributeRewards = async (playerList, totalPrizeAmount) => {
    const inputs = distributeRewardsListGenerator(playerList, totalPrizeAmount);
    await triviaContract.addPrizeBalance(inputs[0], inputs[1]); // TODO: Naming gives an error (previously it was triviaContractSigner)
};



