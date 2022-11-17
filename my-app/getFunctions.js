import { ethers } from "https://cdn-cors.ethers.io/lib/ethers-5.5.4.esm.min.js";
import { abi,token_address, card_address} from "../constants";


const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = await provider.getSigner(0);
console.log("can you see this man");
const userAddress = await signer.getAddress();
const tokenContract = new ethers.Contract(token_address, abi, signer);
const cardContract = new ethers.Contract(card_address, abi, signer);



async function approveContract()  {
    try {
        const amountApproved = ethers.BigNumber.from("1000000000000000000000000");
        await tokenContract.approve(cardContract.address, amountApproved);
    } catch (err) {
        console.log(err)
    }
}

 export async function mintRegularCard() {
    try {
        let success= false;
        
        await approveContract();
        await cardContract.mintRegular();
        if (await cardContract.balanceOf(signer.getAddress(), 0) == 1) 
        {
            success= true;
            console.log("succesfully minted a regular card")
        } else 
        {
            console.log("unsuccesful transaction, failed to mint")
        }
        return success;

    } catch (err) {
        console.log(err)
    }
}


 export async function mintPremiumCard() {
    try {

        let success= false;
        
        await approveContract();
        await cardContract.mintPremium();
        if (await cardContract.balanceOf(signer.getAddress(), 1) == 1) 
        {
            success= true;
            console.log("succesfully minted a premium card")
        } else 
        {
            console.log("unsuccesful transaction, failed to mint")
        }
        return success;

    } catch (err) {
        console.log(err)
    }
}

 export async function mintToken(_amount){
    try {
        let success= false;
        //amount to be an int 
        const mintAmount = _amount.toString() + "00000000000000000";
        console.log(mintAmount);

        const etherNeededInt = 0.01 * _amount;
        const etherNeeded = {value: ethers.utils.parseEther(etherNeededInt.toString())};

        console.log(etherNeeded);

        await tokenContract.mint(mintAmount, etherNeeded);
        
        if (await tokenContract.balanceOf(signer.getAddress()) === mintAmount)
        {
            success= true;
            console.log("minted tokens with success");
        } else {
            console.log("Unsuccesful mint,  debug")
        }
        return success
    } catch (err) {
        console.log(err)
    }
}

 export async function seeBalance() {
    try {
        var tokenBalance;
        var regularCardBalance;
        var premiumCardBalance;

        tokenBalance = await tokenContract.balanceOf(signer.getAddress());
        regularCardBalance = await cardContract.balanceOf(signer.getAddress(), 0);
        premiumCardBalance = await cardContract.balanceOf(signer.getAddress(), 1);
        
        return [tokenBalance, regularCardBalance, premiumCardBalance];
    } catch (err) {
        console.log(err)
    }
}

 export async function totalSupplyToken() {
    try {
        var totalSupply = await tokenContract.totalSupply();
        return totalSupply;

    } catch (err) {
        console.log(err)
    }
}









