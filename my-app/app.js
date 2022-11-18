
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
const mintTokenInput = document.getElementById("amount-input");
const tokenSupply = document.getElementById("token-supply");


connectButton.addEventListener("click", connect);
mintTokenButton.addEventListener("click", mintTriviaToken)

async function mintTriviaToken() {
    var inputVal = mintTokenInput.value;
    await mintToken(inputVal);
}

mintRegularButton.addEventListener("click", mintRegularCard);
mintPremiumButton.addEventListener("click", mintPremiumCard); 


const [tokenBalanceVal, regularBalanceVal, premiumBalanceVal] = await seeBalance();
tokenBalance.innerText = ("Token Balance:" + tokenBalanceVal);
premiumBalance.innerText = ("Premium Balance:" + premiumBalanceVal);
regularBalance.innerText = ("Regular Balance:" + regularBalanceVal);
tokenSupply.innerText = ("Total Supply:" + await  totalSupplyToken());





async function connect() {
    if  (typeof window.ethereum == "undefined") {
        connectButton.innerText= "Please install MM";
        
    } 
    else {
        const accounts= await ethereum.request({method:"eth_requestAccounts"});
        const account = accounts[0];
        connectButton.innerText= "connected";
} }
