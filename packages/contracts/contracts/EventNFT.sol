// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.12;

import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/StringsUpgradeable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@tableland/evm/contracts/ITablelandTables.sol";
import "@tableland/evm/contracts/ITablelandController.sol";

contract EventNFT is
    Initializable,
    OwnableUpgradeable,
    ERC721URIStorageUpgradeable
{
    using CountersUpgradeable for CountersUpgradeable.Counter;

    CountersUpgradeable.Counter private _tokenIds;
    address public constant usdcAddress =
        0xe11A86849d99F524cAC3E7A0Ec1241828e332C62;
    string private constant _firstURIString =
        "https://testnet.tableland.network/query?mode=list&s=SELECT+json_object%28%27id%27%2C+id%2C+%27name%27%2C+name%2C+%27description%27%2C+description%2C+%27image%27%2C+image%2C+%27total_supply%27%2C+total_supply%2C+%27price%27%2C+price%2C+%27date%27%2C+date%29+FROM+";
    string private constant _secondURIString = "+WHERE+id%3D1";

    uint256 public price;
    uint256 public totalSupply;
    address public creator;

    ITablelandTables private _tableland;
    string private _metadataTable;
    uint256 private _metadataTableId;

    function initialize(
        uint256 _totalSupply,
        uint256 _price,
        address _registery,
        address _creator
    ) external initializer {
        __ERC721_init("EventNFT", "TICKET");
        __Ownable_init();

        price = _price;
        totalSupply = _totalSupply;
        _tableland = ITablelandTables(_registery);
        creator = _creator;

        /*
         * Stores the unique ID for the newly created table.
         */
        _metadataTableId = _tableland.createTable(
            address(this),
            string.concat(
                "CREATE TABLE event_",
                StringsUpgradeable.toString(block.chainid),
                " (id int, name text, description text, image text, total_supply int, price int, date int);"
            )
        );

        /*
         * Stores the full tablename for the new table.
         * {prefix}_{chainid}_{tableid}
         */
        _metadataTable = string.concat(
            "ticket_",
            StringsUpgradeable.toString(block.chainid),
            "_",
            StringsUpgradeable.toString(_metadataTableId)
        );

        // _tableland.setController(
        //   address(this),
        //   _metadataTableId,
        //   address(this)
        // );
    }

    function buyTicket() external {
        IERC20 token = IERC20(usdcAddress);

        require(token.balanceOf(msg.sender) >= price, "Not enough USDC");
        require(_tokenIds.current() <= totalSupply, "All tickets are minted");
        token.transferFrom(msg.sender, address(this), price);

        _safeMint(msg.sender, _tokenIds.current());

        emit TicketBought(msg.sender, _tokenIds.current());

        _tokenIds.increment();
    }

    function setMetadata(
        string memory _name,
        string memory _description,
        string memory _image,
        uint256 _date
    ) external {
        /*
         * Inserting a row for a default values
         */
        _tableland.runSQL(
            address(this),
            _metadataTableId,
            string.concat(
                "INSERT INTO ",
                _metadataTable,
                " (id, name, description, image, total_supply, price, date) VALUES (1, '",
                _name,
                "', '",
                _description,
                "', '",
                _image,
                "', ",
                StringsUpgradeable.toString(totalSupply),
                ", ",
                StringsUpgradeable.toString(price),
                ", ",
                StringsUpgradeable.toString(_date),
                ")"
            )
        );
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        return string.concat(_firstURIString, _metadataTable, _secondURIString);
    }

    function getPolicy(address sender)
        public
        payable
        returns (ITablelandController.Policy memory)
    {
        /*
         * Add any custom ACL check here.
         */
        if (sender == owner()) {
            return
                ITablelandController.Policy({
                    allowInsert: true,
                    allowUpdate: true,
                    allowDelete: false,
                    whereClause: "",
                    withCheck: "",
                    updatableColumns: new string[](0)
                });
        } else if (sender == creator) {
            return
                ITablelandController.Policy({
                    allowInsert: false,
                    allowUpdate: true,
                    allowDelete: false,
                    whereClause: "",
                    withCheck: "",
                    updatableColumns: new string[](0)
                });
        } else {
            return
                ITablelandController.Policy({
                    allowInsert: false,
                    allowUpdate: false,
                    allowDelete: false,
                    whereClause: "",
                    withCheck: "",
                    updatableColumns: new string[](0)
                });
        }
    }

    event TicketBought(address, uint256);
}
