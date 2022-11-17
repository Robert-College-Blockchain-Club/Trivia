import { ethers } from "https://cdn-cors.ethers.io/lib/ethers-5.5.4.esm.min.js";
//import { abi,token_address, card_address, prizes_address } from "../constants";
import {// tokenContract, cardcontract, signer
    mintRegularCard, //buton 5 token
    mintPremiumCard, //buton  10 token
    mintToken, //amount input  0.01 ether tanesi
    // returns bool success above success
    seeBalance, //erc20 balance, erc1155 regular balance, erc115 premium balance
    totalSupplyToken
} from "./getFunctions.js"

const connectButton = document.getElementById("connect-btn");
const mintRegularButton = document.getElementById("mint-regular-btn");
const mintPremiumButton = document.getElementById("mint-premium-btn");
const premiumBalance = document.getElementById("premium-balance");
const regularBalance = document.getElementById("regular-balance");
const tokenBalance = document.getElementById("token-balance");
const mintTokenButton = document.getElementById("mint-token-btn");
const mintTokenInput = document.getElementById("amount-input")
const tokenSupply = document.getElementById("token-supply")

connectButton.addEventListener("click", connect);
mintTokenButton.addEventListener("click", getMintInput())


function getMintInput() {
    mintToken(mintTokenInput.value)
}


mintRegularButton.addEventListener("click", mintRegularCard());
mintPremiumButton.addEventListener("click", mintPremiumCard());

tokenBalance.innerText = ("Token Balance:" + seeBalance()[0])
premiumBalance.innerText = ("Premium Balance:" + seeBalance()[1])
regularBalance.innerText = ("Regular Balance:" + seeBalance()[2])
tokenSupply.innerText = ("Total Supply:" + totalSupplyToken)





async function connect() {
    if  (typeof window.ethereum == "undefined") {
        connectButton.innerText= "Please install MM";
        
    } 
    else {
        const accounts= await ethereum.request({method:"eth_requestAccounts"});
        const account = accounts[0];
        connectButton.innerText= "connected";
} }

