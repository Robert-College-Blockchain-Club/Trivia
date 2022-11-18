
import {// tokenContract, cardcontract, signer
    mintRegularCard, //buton 5 token
    mintPremiumCard, //buton  10 token
    mintToken, //amount input  0.01 ether tanesi
    // returns bool success above success
    seeBalance, //erc20 balance, erc1155 regular balance, erc115 premium balance
    totalSupplyToken,
    checkConnection
} from "./getFunctions.js";

const container = document.getElementById("container");
const connectButton = document.getElementById("connect-btn");
const mintRegularButton = document.getElementById("mint-regular-btn");
const mintPremiumButton = document.getElementById("mint-premium-btn");
const premiumBalance = document.getElementById("premium-balance");
const regularBalance = document.getElementById("regular-balance");
const tokenBalance = document.getElementById("token-balance");
const mintTokenButton = document.getElementById("mint-token-btn");
const mintTokenInput = document.getElementById("amount-input");
const tokenSupply = document.getElementById("token-supply");
const costHolder = document.getElementById("display-cost");
const errorPart = document.getElementById("error");

connectButton.addEventListener("click", connect);
mintTokenButton.addEventListener("click", mintTriviaToken)
mintRegularButton.addEventListener("click", mintRegularCardFunc);
mintPremiumButton.addEventListener("click", mintPremiumCardFunc); 
mintTokenInput.addEventListener("input",displayCost)


const vals = await getBalances();
tokenBalance.innerText = ("Token Balance:" + vals[0]);
premiumBalance.innerText = ("Premium Balance:" + vals[2]);
regularBalance.innerText = ("Regular Balance:" + vals[1]);
tokenSupply.innerText = ("Total Supply:" + vals[3]);

async function mintRegularCardFunc() {
    const vals = await getBalances();
    console.log(vals)
    if (vals[1] == 1) {
        errorPart.innerHTML= "You cant own more than 1 TRVR"
    } else if (vals[0] < 5) 
    {
        errorPart.innerHTML = "Insufficient TriviaTokens"
    }
    else {
        mintRegularCard();
    }
}

async function mintPremiumCardFunc() {
    const vals = await getBalances();
    console.log(vals)
    if (vals[2] == 1) {
        errorPart.innerHTML= "You cant own more than 1 TRVP"
    } else if (vals[0] < 15) 
    {
        errorPart.innerHTML = "Insufficient TriviaTokens"
    } 
    else {
        mintPremiumCard();
    }
}

function connectionChecker() {
    console.log(checkConnection());
    if (checkConnection())
    {
        connectButton.style.display = "none";
    } else {
        connectButton.style.display= "block"
    }
}


function isNumeric(str) {
    if (typeof str != "string") return false 
    return !isNaN(str) && !isNaN(parseFloat(str)) 
  }

async function mintTriviaToken() {
    var inputVal = mintTokenInput.value;    
    const result = await mintToken(inputVal);
    mintTokenInput.value= "";
    if (result == "INSUFFICIENT_FUNDS") {
        errorPart.innerHTML= "Insufficient funds"
    }

    

    await mintToken(inputVal);
}


async function displayCost() {
    const inputVal = mintTokenInput.value
    if (isNumeric(inputVal)) 
    {
        const inputValInt = Number(inputVal);
        const totalCost = inputValInt * 0.01;
        costHolder.innerHTML= "Cost: "+  totalCost.toString();
    } else {
        costHolder.innerHTML = "Enter a Number"
    }

}
async function getBalances() {
    // vals[0] = tokenBalance
    // vals[1] = regular card balance
    // vals[2] = premium card balance
    // vals[3] = totalSupply
    const vals = await seeBalance();
    for (let i = 0; i< vals.length; i++) 
    {
        console.log(vals[i].toString())
        vals[i] = vals[i].toString();
        if (vals[i].startsWith("0"))
        {
            vals[i] = "0";
        } else 
        {
            vals[i] = vals[i].split("0").shift();
        }
    } 

    const totalSupplyBigNum = await totalSupplyToken();
    const totalSupplyStr = totalSupplyBigNum.toString().split("000000000000000000").shift();
    vals.push(totalSupplyStr);

    return vals
}


async function connect() {
    if  (typeof window.ethereum == "undefined") {
        connectButton.innerText= "Please install MM";
        
    } 
    else {
        const accounts= await ethereum.request({method:"eth_requestAccounts"});
        const account = accounts[0];
        connectButton.innerText= "connected";
} }

