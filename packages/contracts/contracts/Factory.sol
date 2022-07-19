// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.12;

import "./Interfaces/IERC721UpgradeableInitializable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";
import "./EventNFT.sol";
import "@tableland/evm/contracts/ITablelandTables.sol";

contract Factory {
  address public ticketNftImplementation;
  mapping(address => address[]) public clonedContracts;

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
        " (id int, description text, image text, name text);"
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

  function createNewEvent(string memory name, uint price) public {
    address clone = Clones.clone(ticketNftImplementation);
    IERC721UpgradeableInitializable(clone).initialize(name, price, address(_tableland));

    emit EventCreated(clone);

    clonedContracts[msg.sender].push(clone);
  }
}