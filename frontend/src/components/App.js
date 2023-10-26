import './App.css';
// import Table from 'react-bootstrap/Table';}
import DataTable from './dataTable';
import { useState } from 'react';

const App = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [wallet, setWallet] = useState();
  async function requestAccount() {
    console.log('requesting account');
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        setWalletAddress(accounts[0]);
        setWallet(accounts);
      } catch (error) {
        console.log('error connecting');
      }
    } else {
      alert('meta mask ot detected');
    }
  }

  if (walletAddress == '') {
    return (
      <div>
        <h1>Acqua Management Console</h1>
        <button onClick={requestAccount}>Connect Wallet</button>
        <h3>Address :{walletAddress} </h3>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Acqua Management Console</h1>
        <button onClick={requestAccount}>Connect Wallet</button>
        <h3>Address :{walletAddress} </h3>
      </div>
    );
  }
};

export default App;
