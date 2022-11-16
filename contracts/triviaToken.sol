// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";


contract triviaToken is ERC20, Ownable, ReentrancyGuard {
    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        // Mint 100 tokens to msg.sender
        // Similar to how
        // 1 dollar = 100 cents
        // 1 token = 1 * (10 ** decimals)
        _mint(msg.sender, 100 * 10**uint(decimals()));
    }

    uint256 public constant tokenPrice = 0.01 ether;
    mapping(address => uint256) public rewardList;
    mapping(address => bool) public hasPayed;
    uint256 public constant enterPrice = 3e18;

    function getReward(address _account) public view returns (uint256) {
        return rewardList[_account];
    }

    function mint(uint256 amount) public payable {
        // the value of ether that should be equal or greater than tokenPrice * amount;
        uint256 _requiredAmount = tokenPrice * amount;
        require(msg.value >= _requiredAmount, "Ether sent is incorrect");
        // total tokens + amount <= 10000, otherwise revert the transaction
        uint256 amountWithDecimals = amount * 10**18;
        // call the internal function from Openzeppelin's ERC20 contract
        _mint(msg.sender, amountWithDecimals);
    }

    function returnaddressvalue() public view returns (address) {
        return msg.sender;
    }

    function addPrizeBalance(
        address[] calldata _addressList,
        uint256[] calldata _prizeList
    ) external onlyOwner nonReentrant {
        require(
            _addressList.length == _prizeList.length,
            "arrays are not the same length"
        );

        for (uint256 i = 0; i < _addressList.length; i++) {
            rewardList[_addressList[i]] += _prizeList[i];
        }
    }

    function claim(uint256 amount)  external nonReentrant {
        //amount 1e18
        require(amount <= rewardList[msg.sender], "not enough balance");
        rewardList[msg.sender] -= amount;
        _transfer(address(this), msg.sender, amount);
    }

    function enterTrivia() external nonReentrant {
        require(enterPrice <= balanceOf(msg.sender), "Not enough");
        _transfer(msg.sender, address(this), enterPrice);
    }
}
