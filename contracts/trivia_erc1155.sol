// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC1155/ERC1155.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";

contract trivia is ERC1155, Ownable {
    
  string public name;
  string public symbol;
  uint256 public id;

  mapping(uint256 => uint256) public totalId;
  mapping(uint => string) public tokenURI;

  constructor() ERC1155("") {
    name = "Trivia2";
    symbol = "TRV2";
  }

  function mint(address _to, uint _id, uint _amount) external onlyOwner {
    _mint(_to, _id, _amount, "");
    if (_id > id) {
        id = _id;
    }
    totalId[_id] += _amount;
  }

  function mintBatch(address _to, uint[] memory _ids, uint[] memory _amounts) external onlyOwner {
    _mintBatch(_to, _ids, _amounts, "");
  }

  function burn(uint _id, uint _amount) external {
    _burn(msg.sender, _id, _amount);
  }

  function burnBatch(uint[] memory _ids, uint[] memory _amounts) external {
    _burnBatch(msg.sender, _ids, _amounts);
  }

  function burnForMint(address _from, uint[] memory _burnIds, uint[] memory _burnAmounts, uint[] memory _mintIds, uint[] memory _mintAmounts) external onlyOwner {
    _burnBatch(_from, _burnIds, _burnAmounts);
    _mintBatch(_from, _mintIds, _mintAmounts, "");
  }

  function setURI(uint _id, string memory _uri) external onlyOwner {
    tokenURI[_id] = _uri;
    emit URI(_uri, _id);
  }
ü
  function uri(uint _id) public override view returns (string memory) {
    return tokenURI[_id];
  }

  function totalBalance(address _address) external view returns (uint256) {
      uint256 total;
      for (uint256 i = 1; i <= id; i++) {
          total += balanceOf(_address, i);
      }
      return total;
  }

  function totalSupply() external view returns (uint256 total) {
      for (uint256 i = 1; i <= id; i++) {
          total += totalId[i];
      }
  }

  function prize(uint[] calldata _array) external returns(uint[] memory) {
      address addressOwner = 0;
      safeTransferFrom(addressOwner,_array[0],1,40,);
      safeTransferFrom(addressOwner,_array[1],1,30,);
      safeTransferFrom(addressOwner,_array[2],1,20,);
      safeTransferFrom(addressOwner,_array[3],1,20,);
      safeTransferFrom(addressOwner,_array[4],1,10,);
      safeTransferFrom(addressOwner,_array[5],1,10,);
      safeTransferFrom(addressOwner,_array[6],1,10,);
      safeTransferFrom(addressOwner,_array[7],1,10,);
      safeTransferFrom(addressOwner,_array[8],1,5,);
      safeTransferFrom(addressOwner,_array[9],1,5,);
      safeTransferFrom(addressOwner,_array[10],1,5,);
      safeTransferFrom(addressOwner,_array[11],1,5,);
      safeTransferFrom(addressOwner,_array[12],1,5,);
      safeTransferFrom(addressOwner,_array[13],1,5,);
      safeTransferFrom(addressOwner,_array[14],1,5,);
      safeTransferFrom(addressOwner,_array[15],1,5,);
    
  }
}