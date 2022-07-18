// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";

contract TicketNFT is Initializable, OwnableUpgradeable, ERC721Upgradeable {
  function initialize(string memory name, string memory symbol) external {
     __ERC721_init(name, symbol);
     __Ownable_init();
  }
}