import { useState } from 'react';
import Web3 from 'web3';

const ConnectWallet = () => {
  const [account, setAccount] = useState('');
  const [web3, setWeb3] = useState(null); 

  const connectWalletHandler = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        setAccount(account);

        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance); 
      } catch (error) {
        console.error("Error connecting to MetaMask", error);
      }
    } else {
      alert('Please install MetaMask or another Ethereum wallet.');
    }
  };

  return (
    <div>
      {account ? (
        <p>Connected with <strong>{account}</strong></p>
      ) : (
        <button className='btn btn-light btn-lg' onClick={connectWalletHandler}>Connect Wallet</button>
      )}
    </div>
  );
};

export default ConnectWallet;
