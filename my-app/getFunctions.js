import { ethers } from "https://cdn-cors.ethers.io/lib/ethers-5.5.4.esm.min.js";
//import { abi,token_address, card_address, prizes_address } from "../constants";


 export async function getContract() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = await provider.getSigner(0);
    console.log("can you see this man");
    const userAddress = await signer.getAddress();

    const tokenContract = new ethers.Contract(token_address, abi, signer);
    const cardContract = new ethers.Contract(card_address, abi, signer);

    return tokenContract, cardContract, signer;
}

 export async function mintRegularCard() {
    try {
        tokenContract, cardContract, signer = getContract();
        let success= false;
        
        await cardContract.mintRegular();
        //if (await cardContract.balanceOf())
        

    } catch (err) {
        console.log(err)
    }
}

 export async function mintPremiumCard() {
    try {
        tokenContract, cardContract= getContract();


    } catch (err) {
        console.log(err)
    }
}

 export async function mintToken(_amount){
    try {
        tokenContract, cardContract, signer = getContract();
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
        tokenContract, cardContract= getContract();

    } catch (err) {
        console.log(err)
    }
}

 export async function totalSupplyCard() {
    try {
        tokenContract, cardContract= getContract();

    } catch (err) {
        console.log(err)
    }
}

 export async function totalSupplyToken() {
    try {
        tokenContract, cardContract= getContract();

    } catch (err) {
        console.log(err)
    }
}

 export async function displayInventory() {
    try {
        tokenContract, cardContract= getContract();

    } catch (err) {
        console.log(err)
    }
}







