require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
require('dotenv').config()

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.4.23"
      },
      {
        version: "0.8.12"
      }
    ]
  },
  networks: {
    hardhat: {
        gas: 100000000,  // tx gas limit
        blockGasLimit: 150000000, 
        gasPrice: 200000000000,
        initialBaseFeePerGas: 0,
    }, 
    mumbai: {
        url: process.env.ALCHEMY_MUMBAI_URL,
        accounts: [process.env.PRIVATE_KEY]
    },
  },
  etherscan: {
    apiKey: process.env.POLYGONSCAN_API_KEY,
  }
};
