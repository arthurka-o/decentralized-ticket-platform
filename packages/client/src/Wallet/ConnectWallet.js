import React, {useState} from 'react';

export default function ConnectWallet() {
  // 4 is rinkeby network
  const HARDHAT_NETWORK_ID = '4';
 
  // Create object to store state for users wallet address
  const [initialState, setInitialState] = useState({
   userAddress: '',
  })
  
  function checkNetwork() {
   if(window.ethereum.networkVersion === HARDHAT_NETWORK_ID) {
    return true;
   }
   
   return "Please connect Metamask to Rinkeby";
  }
  
  function initialize(usersAddress) {
   setInitialState({userAddress: usersAddress})
  }
  
  function resetState() {
   setInitialState(initialState);
  }
 
  async function connect() {
    const [userAddress] = await window.ethereum.request({ method: 'eth_requestAccounts' });
    
    if(!checkNetwork()) {
      return true;
    }
   
   initialize(userAddress);
   
    window.ethereum.on("accountsChanged", ([newAddress]) => {
      if(newAddress === undefined) {
        return resetState();
      }
      initialize(newAddress);
    });
  }
  return (
    <button
      className="btn"
      type="button"
      onClick={connect}
    >
      <img src="metamask.png" width={30} height={30}/>
   </button>
 )
}