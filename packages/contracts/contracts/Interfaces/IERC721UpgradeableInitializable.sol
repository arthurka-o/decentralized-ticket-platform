// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/token/ERC721/IERC721Upgradeable.sol";

interface IERC721UpgradeableInitializable is IERC721Upgradeable {
  function initialize(uint _totalSupply, uint _price, address _registery) external;
}