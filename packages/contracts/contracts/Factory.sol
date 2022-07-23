// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.12;

import "./Interfaces/IERC721UpgradeableInitializable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";

contract Factory {
  using Counters for Counters.Counter;

  address private ticketNftImplementation;
  mapping(address => address[]) private _clonedContractsByAddress;
  address[] private _clonedContracts;

  Counters.Counter private _eventIds;

  address private _tablelandAddress;
  string private _metadataTable;
  uint256 private _metadataTableId;

  event EventCreated(address);

  constructor(address _ticketNftAddress) {
    ticketNftImplementation = _ticketNftAddress;

    //_tablelandAddress = _registry;
  }

  function createEvent(uint _totalSupply, uint _price, string memory _uri) public returns(address clone) {
    clone = Clones.clone(ticketNftImplementation);
    IERC721UpgradeableInitializable(clone).initialize(_totalSupply, _price, msg.sender, _uri);

    _eventIds.increment();

    emit EventCreated(clone);

    _clonedContractsByAddress[msg.sender].push(clone);
    _clonedContracts.push(clone);
  }

  function allEvents() view external returns(address[] memory) {
    return _clonedContracts;
  }

  function allEventsByOwner(address _owner)
        external
        view
        returns (address[] memory)
    {
        return _clonedContractsByAddress[_owner];
    }
}
