// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const EventNFT = await hre.ethers.getContractFactory("EventNFT")
  const Factory = await hre.ethers.getContractFactory("Factory")

  const eventNFT = await EventNFT.deploy();
  await eventNFT.deployed()

  const factory = await Factory.deploy(eventNFT.address, eventNFT.address)
  await factory.deployed()

  console.log(`Factory address: ${factory.address}`)
  console.log(`EventNFT implementation address: ${eventNFT.address}`)

  const price = hre.ethers.utils.parseEther("10");

  const testEventAddress = await factory.createEvent(10, price);

  console.log(`EventNFT proxy address: ${testEventAddress}`)

  const testEvent = EventNFT.attach(testEventAddress);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
