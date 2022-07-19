import { ethers } from "https://cdn-cors.ethers.io/lib/ethers-5.5.4.esm.min.js";

function kek256(message) {
  const hashed = ethers.utils.id(message);
  const firstBytes = hashed.slice(0, 10) + "000000000000000000000000000000000000000000000000000000000000000";
  return firstBytes;
}

function getParamsObj(contractAddress, ticketPrice = "0", func, data = "") {
  const obj = {
    from: window.ethereum.selectedAddress,
    to: contractAddress,
    gas: "0x76c0", // 30400
    gasPrice: "0x9184e72a000", // 10000000000000
    value: ticketPrice,
    data: kek256(func) + data,
  }
  return obj;
}

export default getParamsObj;
