
// SPDX-License-Identifier: MIT
/*
  ____   ____   ____  _            _        _           _          ____ _       _     
 |  _ \ / ___| | __ )| | ___   ___| | _____| |__   __ _(_)_ __    / ___| |_   _| |__  
 | |_) | |     |  _ \| |/ _ \ / __| |/ / __| '_ \ / _` | | '_ \  | |   | | | | | '_ \ 
 |  _ <| |___  | |_) | | (_) | (__|   < (__| | | | (_| | | | | | | |___| | |_| | |_) |
 |_| \_\\____| |____/|_|\___/ \___|_|\_\___|_| |_|\__,_|_|_| |_|  \____|_|\__,_|_.__/                                                                                       
*/

pragma solidity ^0.8.0;


import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";



contract triviaToken is ERC20, Ownable {
    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        // Mint 100 tokens to msg.sender
        // Similar to how
        // 1 dollar = 100 cents
        // 1 token = 1 * (10 ** decimals)
        _mint(msg.sender, 1000 * 10**uint(decimals()));
    }
    uint256 public constant tokenPrice=  0.01 ether;


    function mint(uint256 amount) public payable {
        // the value of ether that should be equal or greater than tokenPrice * amount;
        uint256 _requiredAmount = tokenPrice * amount;
        require(msg.value >= _requiredAmount, "Ether sent is incorrect");
        // total tokens + amount <= 10000, otherwise revert the transaction
        uint256 amountWithDecimals = amount * 10**18;
        // call the internal function from Openzeppelin's ERC20 contract
        _mint(msg.sender, amountWithDecimals);
    }

    
    function returnaddressvalue() view public returns(address) {
        return msg.sender;
    }
 
}

