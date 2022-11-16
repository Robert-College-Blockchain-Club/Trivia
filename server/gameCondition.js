const { ethers } = require("ethers");

/* Initializing the contract */
// You can also use an ENS name for the contract address
const contract_address = "";

// The ERC-20 Contract ABI, which is a common contract interface
// for tokens (this is the Human-Readable ABI format)
const contract_abi = "";

// The Contract object
const contract = new ethers.Contract(contract_address, contract_abi, provider);

// Checks if the user has already token(s) to start game
function hasERC1155(address, id) { // id will be later filled in
    if (balanceOf(address, id) !== 0) {
        return true;
    } else {
        return false;
    }

}