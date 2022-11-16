
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";

/*
  ____   ____   ____  _            _        _           _          ____ _       _     
 |  _ \ / ___| | __ )| | ___   ___| | _____| |__   __ _(_)_ __    / ___| |_   _| |__  
 | |_) | |     |  _ \| |/ _ \ / __| |/ / __| '_ \ / _` | | '_ \  | |   | | | | | '_ \ 
 |  _ <| |___  | |_) | | (_) | (__|   < (__| | | | (_| | | | | | | |___| | |_| | |_) |
 |_| \_\\____| |____/|_|\___/ \___|_|\_\___|_| |_|\__,_|_|_| |_|  \____|_|\__,_|_.__/                                                                                       
*/

contract triviaToken is ERC20, Ownable {
    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        // Mint 100 tokens to msg.sender
        // Similar to how
        // 1 dollar = 100 cents
        // 1 token = 1 * (10 ** decimals)
        _mint(msg.sender, 100 * 10**uint(decimals()));
    }

    uint256 public constant tokenPrice=  0.01 ether;
    mapping(address=> uint256) public rewardList;
    event hasPayed(address payer, uint256 blockTime);
    mapping(address=> mapping(address=> uint256)) public allowedAmount;
    uint256 public constant enterPrice = 3e18;
    address public treasuryAddress; 
    
            
    function mint(uint256 amount) public payable {
        // the value of ether that should be equal or greater than tokenPrice * amount;
        uint256 _requiredAmount = tokenPrice * amount;
        require(msg.value >= _requiredAmount, "Ether sent is incorrect");
        // total tokens + amount <= 10000, otherwise revert the transaction
        uint256 amountWithDecimals = amount * 10**18;
        // call the internal function from Openzeppelin's ERC20 contract
        _mint(msg.sender, amountWithDecimals);
    }

    function setTreasuryWallet(address _treasuryAddress) external onlyOwner {
        treasuryAddress= _treasuryAddress;
    }
    
    function returnaddressvalue() view public returns(address) {
        return msg.sender;
    }

        function addPrizeBalance(address[] calldata _addressList, uint256[] calldata _prizeList ) onlyOwner external
    {
        require(_addressList.length == _prizeList.length, "arrays are not the same length");
        
        for (uint256 i = 0; i < _addressList.length; i++)
        {
            rewardList[_addressList[i]] += _prizeList[i];
        }
    }


    function claim(uint256 amount) external {
        //amount 1e18
        require(amount <= rewardList[msg.sender], "not enough balance");
        transferFrom(treasuryAddress , msg.sender, amount);
        rewardList[msg.sender] -= amount;
    }

    function enterTrivia() external {
        require( enterPrice<= balanceOf(msg.sender), "Not enough ");
        transfer(treasuryAddress, enterPrice);
        emit hasPayed(msg.sender,block.timestamp);
    }


    function withdraw() public onlyOwner  {
        address _owner = owner();
        uint256 amount = address(this).balance;
        (bool sent, ) =  _owner.call{value: amount}("");
        require(sent, "Failed to send Ether");
    }

    function approve(address delegate, uint256 numTokens) public override returns (bool) {
    allowedAmount[msg.sender][delegate] = numTokens;
    emit Approval(msg.sender, delegate, numTokens);
    return true;

    }







 
}

