import { ethers } from "https://cdn-cors.ethers.io/lib/ethers-5.5.4.esm.min.js";
import { tokenAbi, cardAbi, token_address, card_address } from "./constants/index.js";

async function getContracts() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = await provider.getSigner(0);
    console.log("can you see this man");
    const userAddress = await signer.getAddress();
    const tokenContract = new ethers.Contract(token_address, tokenAbi, signer);
    const cardContract = new ethers.Contract(card_address, cardAbi, signer);

    return [tokenContract, cardContract, signer];
}

async function approveContract() {
    try {
        const [tokenContract, cardContract, signer] = await getContracts();
        const amountApproved = ethers.BigNumber.from("1000000000000000000000000");
        await tokenContract.approve(cardContract.address, amountApproved);
    } catch (err) {
        console.log(err);
    }
}

export async function mintRegularCard() {
    try {
        const [tokenContract, cardContract, signer] = await getContracts();
        let success = false;

        await approveContract();
        await cardContract.mintRegular();

        if (await cardContract.balanceOf(signer.getAddress(), 0) == 1) {
            success = true;
            console.log("succesfully minted a regular card");
        } else {
            console.log("unsuccesful transaction, failed to mint");
        }
        return success;

    } catch (err) {
        console.log(err.message);
        console.log(err);
        console.log(typeof err);
    }
}

export async function mintPremiumCard() {
    try {
        const [tokenContract, cardContract, signer] = await getContracts();
        let success = false;

        await approveContract();
        await cardContract.mintPremium();
        if (await cardContract.balanceOf(signer.getAddress(), 1) == 1) {
            success = true;
            console.log("succesfully minted a premium card");
        } else {
            console.log("unsuccesful transaction, failed to mint");
        }
        return success;

    } catch (err) {
        console.log(err.message);
        console.log(err);
        console.log(typeof err);
    }
}

export async function mintToken(_amount) {
    try {
        const [tokenContract, cardContract, signer] = await getContracts();
        const mintAmount = _amount.toString();
        const etherNeededInt = 0.01 * Number(_amount);
        const etherNeeded = { value: ethers.utils.parseEther(etherNeededInt.toString()) };

        let tx = await tokenContract.mint(mintAmount, etherNeeded);
        await tx.wait();

        // if (await tokenContract.balanceOf(signer.getAddress()) === mintAmount) {
        //     console.log("minted tokens with success");
        // } else {
        //     console.log("Unsuccesful mint,  debug");
        // }
    } catch (err) {
        return err.code;
    }
}

export async function seeBalance() {
    try {
        const [tokenContract, cardContract, signer] = await getContracts();
        console.log(signer);
        var tokenBalance;
        var regularCardBalance;
        var premiumCardBalance;

        tokenBalance = await tokenContract.balanceOf(signer.getAddress());
        regularCardBalance = await cardContract.balanceOf(signer.getAddress(), 0);
        premiumCardBalance = await cardContract.balanceOf(signer.getAddress(), 1);

        return [tokenBalance, regularCardBalance, premiumCardBalance];

    } catch (err) {
        console.log(err);
    }
}

export async function totalSupplyToken() {
    try {
        const [tokenContract, cardContract, signer] = await getContracts();

        var totalSupply = await tokenContract.totalSupply();
        return totalSupply;

    } catch (err) {
        console.log(err);
    }
}

export async function checkConnection() {
    const accounts = ethereum.request({ method: 'eth_accounts' });
    console.log("isundefined", accounts[0] == undefined);
    if ((accounts[0] == undefined)) {
        return false;
    } return true;
}









