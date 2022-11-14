// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";


/*
  ____   ____   ____  _            _        _           _          ____ _       _     
 |  _ \ / ___| | __ )| | ___   ___| | _____| |__   __ _(_)_ __    / ___| |_   _| |__  
 | |_) | |     |  _ \| |/ _ \ / __| |/ / __| '_ \ / _` | | '_ \  | |   | | | | | '_ \ 
 |  _ <| |___  | |_) | | (_) | (__|   < (__| | | | (_| | | | | | | |___| | |_| | |_) |
 |_| \_\\____| |____/|_|\___/ \___|_|\_\___|_| |_|\__,_|_|_| |_|  \____|_|\__,_|_.__/                                                                                       
*/


contract prizes is Ownable {
    IERC20 public triviaToken;
    IERC1155 public triviaCard;
    uint256 regularPrice = 10 * 10 **18;
    uint256 premiumPrice = 30 * 10 ** 18;



    constructor(address _tokenAddress, address _cardAddress)
    {
        triviaToken= IERC20(_tokenAddress);
        triviaCard= IERC1155(_cardAddress);
    }


    function distributor(address[] calldata _array) onlyOwner external  {
        for (uint i =0; i< _array.length; i++) 
        {
            require(triviaCard.balanceOf(_array[i], 0)>0 || triviaCard.balanceOf(_array[i],1)>0, "A RECEIVER DOES NOT HAVE A CARD");

            if (triviaCard.balanceOf(_array[i], 0)>0)
            {
                triviaToken.transfer(_array[i], regularPrice);
            } 
            else if (triviaCard.balanceOf(_array[i],1)>0)
            {
                triviaToken.transfer(_array[i], premiumPrice);
            } 
        }
     }


}