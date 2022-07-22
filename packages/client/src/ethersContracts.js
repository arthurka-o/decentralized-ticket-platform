import { ethers } from "ethers";
import Web3Modal from "web3modal";
import NFT from "./abis/testEventNFT.json";
import FACTORY from "./abis/Factory.json";

const contractAddress = getEventContractAddress();
let provider = new ethers.providers.Web3Provider(window.ethereum);
let signer;

async function getEventContractAddress() {
  const factoryAddress = "0x4b964dCe7D75c995dc873daEF1fd7E413B8C88A8";
  const contract = new ethers.Contract(factoryAddress, FACTORY.abi, provider);
  const arrayOfContracts = await contract.allEvents();
  return arrayOfContracts[arrayOfContracts.length - 1];
}


async function determineUserStatus() {

  const web3Modal = new Web3Modal();
  const connection = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);
  const signer = provider.getSigner();

  let contract = new ethers.Contract(contractAddress(abi), NFT.abi, signer);
  const ownerAddress = await contract.isCreator();
  const hasTicket = parseInt(await contract.balanceOf(await signer.getAddress()));

  if (ownerAddress) {
    setIsCreator(true);
  }
  if (hasTicket > 0) {
    setIsTicketHolder(true);
  }

  setIsLoggedIn(true);
};

async function buyTicket(price) {
  const web3Modal = new Web3Modal();
  const connection = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);
  const signer = provider.getSigner();

  let contract = new ethers.Contract(contractAddress, abi, signer);
  const withSigner = contract.connect(signer);
  await withSigner.buyTicket({ value: ethers.utils.parseEther(price.toString()) });
  if (contract.balanceOf(await contract.balanceOf(await signer.getAddress())) > 1){
    return true;
  } else { return false };
}

export { getEventContractAddress, determineUserStatus, buyTicket };
