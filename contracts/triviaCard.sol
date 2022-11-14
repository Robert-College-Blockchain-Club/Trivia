// SPDX-License-Identifier: MIT


/*
  ____   ____   ____  _            _        _           _          ____ _       _     
 |  _ \ / ___| | __ )| | ___   ___| | _____| |__   __ _(_)_ __    / ___| |_   _| |__  
 | |_) | |     |  _ \| |/ _ \ / __| |/ / __| '_ \ / _` | | '_ \  | |   | | | | | '_ \ 
 |  _ <| |___  | |_) | | (_) | (__|   < (__| | | | (_| | | | | | | |___| | |_| | |_) |
 |_| \_\\____| |____/|_|\___/ \___|_|\_\___|_| |_|\__,_|_|_| |_|  \____|_|\__,_|_.__/                                                                                       
*/

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract triviaCard is Ownable, ERC1155 {
    IERC20 public triviaToken;
    string public name;
    string public symbol;
    uint256 public regularPrice = 5 * 10**18;
    uint256 public premiumPrice= 15 * 10**18;

    constructor(address _tokenAddress) ERC1155("") {
        triviaToken= IERC20(_tokenAddress);
        name = "triviaCard";
        symbol ="TRCD";
    }


    function setRegularPrice(uint256 amount) onlyOwner public {
        regularPrice= amount * 10**18;
    }

    function setPremiumPrice(uint256 amount) onlyOwner public {
        premiumPrice= amount * 10 ** 18;
    }

    //only allows users to mind tokens of id 0, and an amount of 1
    //requires 5 triviaTokens to mint a regular triviaCard
    function mintRegular() public {
        address ownerAddress= owner();
        
        require(balanceOf(msg.sender, 0)== 0, "You cannot own more than one regular TriviaCard" );
        require(triviaToken.balanceOf(msg.sender) > regularPrice, "Insufficient triviaTokens" );
        
        triviaToken.transfer(ownerAddress, regularPrice);
        _mint(msg.sender, 0, 1, "");
    }

    function mintPremium() public {
        address ownerAddress= owner();
        
        require(balanceOf(msg.sender, 1)== 0, "You cannot own more than one premium TriviaCard" );
        require(triviaToken.balanceOf(msg.sender) > premiumPrice, "Insufficient triviaTokens" );

        triviaToken.transfer(ownerAddress, regularPrice);
        _mint(msg.sender, 1, 1, "");
    }

        function burn(address _address, uint _id, uint _amount) onlyOwner external {
             _burn(_address, _id, _amount);
        }


}