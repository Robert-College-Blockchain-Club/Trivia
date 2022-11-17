import { ethers } from "https://cdn-cors.ethers.io/lib/ethers-5.5.4.esm.min.js";
//import { abi,token_address, card_address, prizes_address } from "../constants";
import {
    getContract,
    mintRegularCard,
    mintPremiumCard,
    mintToken,
    seeBalance,
    totalSupplyCard,
    totalSupplyToken
} from "./getFunctions.js"

const connectButton = document.getElementById("connect-btn");
connectButton.addEventListener("click", connect);




async function connect() {
    if  (typeof window.ethereum == "undefined") {
        connectButton.innerText= "Please install MM";
        
    } 
    else {
        const accounts= await ethereum.request({method:"eth_requestAccounts"});
        const account = accounts[0];
        connectButton.innerText= "connected";
} }

