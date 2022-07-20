// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.12;

import "./Interfaces/IERC721UpgradeableInitializable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";
import "./EventNFT.sol";
import "@tableland/evm/contracts/ITablelandTables.sol";

contract Factory {
  using Counters for Counters.Counter;

  address private ticketNftImplementation;
  mapping(address => address[]) private _clonedContractsByAddress;
  address[] private _clonedContracts;

  Counters.Counter private _eventIds;

  ITablelandTables private _tableland;
  string private _metadataTable;
  uint256 private _metadataTableId;

  event EventCreated(address);

  constructor(address _ticketNftAddress, address _registry) {
    ticketNftImplementation = _ticketNftAddress;

    _tableland = ITablelandTables(_registry);

    /*
    * Stores the unique ID for the newly created table.
    */
    _metadataTableId = _tableland.createTable(
      address(this),
      string.concat(
        "CREATE TABLE event_",
        Strings.toString(block.chainid),
        " (id int, name text, description text, image text, total_supply int, price uint, date int);"
      )
    );

    /*
    * Stores the full tablename for the new table. 
    * {prefix}_{chainid}_{tableid}
    */
    _metadataTable = string.concat(
      "event_",
      Strings.toString(block.chainid),
      "_",
      Strings.toString(_metadataTableId)
    );
  }

  function createNewEvent(uint _totalSupply, uint _price) public returns(address clone) {
    address clone = Clones.clone(ticketNftImplementation);
    IERC721UpgradeableInitializable(clone).initialize(_totalSupply, _price, address(_tableland));
    
    // write to table with eventId
    _tableland.runSQL(
      address(this),
      _metadataTableId,
      string.concat(
        "INSERT INTO ",
        _metadataTable,
        " (id, total_supply, price) VALUES (",
        Strings.toString(_eventIds.current()),
        ", ",
        Strings.toString(_totalSupply),
        ", ",
        Strings.toString(_price),
        ")"
      )
    );

    _eventIds.increment();

    emit EventCreated(clone);

    _clonedContractsByAddress[msg.sender].push(clone);
    _clonedContracts.push(clone);
  }

  funciton allEvents() view external returns(address[]) {
    return _clonedContracts;
  }

  funciton allEvents(address _owner) view external returns(address[]) {
    return _clonedContractsByAddress[_owner];
  }
}