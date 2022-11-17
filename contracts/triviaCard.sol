// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";


contract triviaCard is Ownable, ERC1155 , ReentrancyGuard{
    IERC20 public triviaToken;
    string public name;
    string public symbol;
    uint256 public regularPrice = 5e18;
    uint256 public premiumPrice = 15e18;

    constructor(
        string memory _name,
        string memory _symbol,
        address _tokenAddress
    ) ERC1155("") {
        name = _name;
        symbol = _symbol;
        triviaToken = IERC20(_tokenAddress);
    }

    function setRegularPrice(uint256 amount) external onlyOwner {
        regularPrice = amount * 1e18;
    }

    function setPremiumPrice(uint256 amount) external onlyOwner {
        premiumPrice = amount * 1e18;
    }

    //only allows users to mind tokens of id 0, and an amount of 1
    //requires 5 triviaTokens to mint a regular triviaCard
    function mintRegular() public nonReentrant{
        require(
            balanceOf(msg.sender, 0) == 0,
            "You cannot own more than one regular TriviaCard"
        );
        require(
            triviaToken.balanceOf(msg.sender) >= regularPrice,
            "Insufficient triviaTokens"
        );

        triviaToken.transferFrom(msg.sender, address(this), regularPrice);
        _mint(msg.sender, 0, 1, "");
    }

    function mintPremium() public nonReentrant{
        require(
            balanceOf(msg.sender, 1) == 0,
            "You cannot own more than one premium TriviaCard"
        );
        require(
            triviaToken.balanceOf(msg.sender) >= premiumPrice,
            "Insufficient triviaTokens"
        );

        triviaToken.transferFrom(msg.sender, address(this), premiumPrice);
        _mint(msg.sender, 1, 1, "");
    }

    function burn(
        address _address,
        uint256 _id,
        uint256 _amount
    ) external onlyOwner {
        _burn(_address, _id, _amount);
    }
}
