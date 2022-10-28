
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";

contract MyToken is ERC20, Ownable {
    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        // Mint 100 tokens to msg.sender
        // Similar to how
        // 1 dollar = 100 cents
        // 1 token = 1 * (10 ** decimals)
        _mint(msg.sender, 100 * 10**uint(decimals()));
    }

    function mint(address reciever, uint256 amount) public onlyOwner{
        _mint(reciever, amount);
    }

    function prize(address[] calldata _array) external returns(address[] memory) {
      address addressOwner = address(0);
      transferFrom(addressOwner,_array[0],1);
      transferFrom(addressOwner,_array[1],1);
      transferFrom(addressOwner,_array[2],1);
      transferFrom(addressOwner,_array[3],1);
      transferFrom(addressOwner,_array[4],1);
      transferFrom(addressOwner,_array[5],1);
      transferFrom(addressOwner,_array[6],1);
      transferFrom(addressOwner,_array[7],1);
      transferFrom(addressOwner,_array[8],1);
      transferFrom(addressOwner,_array[9],1);
      transferFrom(addressOwner,_array[10],1);
      transferFrom(addressOwner,_array[11],1);
      transferFrom(addressOwner,_array[12],1);
      transferFrom(addressOwner,_array[13],1);
      transferFrom(addressOwner,_array[14],1);
      transferFrom(addressOwner,_array[15],1);
    
  }
 
}