import { ethers } from "https://cdn-cors.ethers.io/lib/ethers-5.5.4.esm.min.js";
import { abi,token_address, card_address, prizes_address } from "../constants";


const connectButton = document.getElementById("connect-btn");
connectButton.addEventListener("click", connect);

const mintTokenButton = document.getElementById("mint-btn");
mintTokenButton.addEventListener("click", mintToken);




export async function connect() {
    if (typeof window.ethereum == "undefined") {
        connectButton.innerText= "Please install MM";
    } 
    else {
        const accounts= await ethereum.request({method:"eth_requestAccounts"});
        const account = accounts[0];
        connectButton.innerText= "connected";
    }
}


export async function getContract() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = await provider.getSigner(0);
    console.log("can you see this man");
    const userAddress = await signer.getAddress();

    const tokenContract = new ethers.Contract(token_address, abi, signer);
    const cardContract = new ethers.Contract(card_address, abi, signer);
    const prizesContract = new ethers.Contract(prizes_address, abi, signer);

    return tokenContract, cardContract, prizesContract;
}

export async function mintRegularCard() {
    try {
        tokenContract, cardContract, prizesContract= getContract();
        

    } catch (err) {
        console.log(err)
    }
}

export async function mintPremiumCard() {
    try {
        tokenContract, cardContract, prizesContract= getContract();


    } catch (err) {
        console.log(err)
    }
}

export async function mintToken(amount) {
    try {
        tokenContract, cardContract, prizesContract= getContract();

    } catch (err) {
        console.log(err)
    }
}

export async function seeBalance() {
    try {
        tokenContract, cardContract, prizesContract= getContract();

    } catch (err) {
        console.log(err)
    }
}

export async function totalSupplyCard() {
    try {
        tokenContract, cardContract, prizesContract= getContract();

    } catch (err) {
        console.log(err)
    }
}

export async function totalSupplyToken() {
    try {
        tokenContract, cardContract, prizesContract= getContract();

    } catch (err) {
        console.log(err)
    }
}

export async function displayInventory() {
    try {
        tokenContract, cardContract, prizesContract= getContract();

    } catch (err) {
        console.log(err)
    }
}







