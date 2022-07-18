// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "./Dependencies/CloneFactory.sol";
import "./TicketNFT.sol";

contract Factory is CloneFactory {
  address public ticketNftImplementation;
  address[] public clonedContracts;

  event EventCreated(address);

  constructor(address _ticketNftAddress) {
    ticketNftAddress = _ticketNftAddress;
  }

  function createNewEvent(string memory name, string memory symbol) {
    address clone = createClone(ticketNftImplementation);
    ERC721Upgradeable(clone).initialize(name, symbol);

    emit EventCreated(clone);
    
    clonedContracts.push(clone);
  }
}