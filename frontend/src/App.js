import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.css';

const AcquaTokenApp = () => {
  const [balance, setBalance] = useState('');
  const [supply, setSupply] = useState('');
  const [remaining, setRemaining] = useState('');
  const [pullDataByCompany, setPullDataByCompany] = useState('');
  const [sensorData, setSensorData] = useState([]);
  const [loading, setLoading] = useState(true);

  const contractAddress = '0x9AeFc71ca54a7752CC3A00362b7F0CAa8E69b959';
  const acquaDashboardAddress = '0x54b2749d9eF694f815C760f6A2BB5963e7670231';
  const erc20Abi = [
    {
      constant: true,
      inputs: [],
      name: 'name',
      outputs: [{ name: '', type: 'string' }],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: false,
      inputs: [
        { name: '_spender', type: 'address' },
        { name: '_value', type: 'uint256' },
      ],
      name: 'approve',
      outputs: [{ name: '', type: 'bool' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: true,
      inputs: [],
      name: 'totalSupply',
      outputs: [{ name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: false,
      inputs: [
        { name: '_from', type: 'address' },
        { name: '_to', type: 'address' },
        { name: '_value', type: 'uint256' },
      ],
      name: 'transferFrom',
      outputs: [{ name: '', type: 'bool' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: true,
      inputs: [],
      name: 'decimals',
      outputs: [{ name: '', type: 'uint8' }],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: true,
      inputs: [{ name: '_owner', type: 'address' }],
      name: 'balanceOf',
      outputs: [{ name: 'balance', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: true,
      inputs: [],
      name: 'symbol',
      outputs: [{ name: '', type: 'string' }],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: false,
      inputs: [
        { name: '_to', type: 'address' },
        { name: '_value', type: 'uint256' },
      ],
      name: 'transfer',
      outputs: [{ name: '', type: 'bool' }],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: true,
      inputs: [
        { name: '_owner', type: 'address' },
        { name: '_spender', type: 'address' },
      ],
      name: 'allowance',
      outputs: [{ name: '', type: 'uint256' }],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    { payable: true, stateMutability: 'payable', type: 'fallback' },
    {
      anonymous: false,
      inputs: [
        { indexed: true, name: 'owner', type: 'address' },
        { indexed: true, name: 'spender', type: 'address' },
        { indexed: false, name: 'value', type: 'uint256' },
      ],
      name: 'Approval',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        { indexed: true, name: 'from', type: 'address' },
        { indexed: true, name: 'to', type: 'address' },
        { indexed: false, name: 'value', type: 'uint256' },
      ],
      name: 'Transfer',
      type: 'event',
    },
  ];
  const dashboardAbi = [
    {
      inputs: [
        { internalType: 'address', name: '_acquaAddress', type: 'address' },
        { internalType: 'address', name: '_government', type: 'address' },
        { internalType: 'string[]', name: '_sites', type: 'string[]' },
        { internalType: 'uint256[]', name: '_benchmarks', type: 'uint256[]' },
      ],
      stateMutability: 'nonpayable',
      type: 'constructor',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'company',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'string',
          name: 'sensorID',
          type: 'string',
        },
        {
          indexed: false,
          internalType: 'string',
          name: 'message',
          type: 'string',
        },
      ],
      name: 'PushData',
      type: 'event',
    },
    {
      inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      name: 'companies',
      outputs: [{ internalType: 'address', name: '', type: 'address' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: '', type: 'address' },
        { internalType: 'uint256', name: '', type: 'uint256' },
      ],
      name: 'companyToSensorData',
      outputs: [
        { internalType: 'string', name: 'sensorID', type: 'string' },
        { internalType: 'string', name: 'siteID', type: 'string' },
        { internalType: 'uint256', name: 'value', type: 'uint256' },
        {
          internalType: 'enum AcquaDashboard.Unit',
          name: 'unit',
          type: 'uint8',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'string', name: 'a', type: 'string' },
        { internalType: 'string', name: 'b', type: 'string' },
      ],
      name: 'compareStrings',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      stateMutability: 'pure',
      type: 'function',
    },
    {
      inputs: [],
      name: 'governmentAddress',
      outputs: [{ internalType: 'address', name: '', type: 'address' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: '_companyAddress', type: 'address' },
      ],
      name: 'pullDataByCompany',
      outputs: [
        {
          components: [
            { internalType: 'string', name: 'sensorID', type: 'string' },
            { internalType: 'string', name: 'siteID', type: 'string' },
            { internalType: 'uint256', name: 'value', type: 'uint256' },
            {
              internalType: 'enum AcquaDashboard.Unit',
              name: 'unit',
              type: 'uint8',
            },
          ],
          internalType: 'struct AcquaDashboard.SensorData[]',
          name: '',
          type: 'tuple[]',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'string', name: '_sensorID', type: 'string' }],
      name: 'pullDataBySensorID',
      outputs: [
        {
          components: [
            { internalType: 'string', name: 'sensorID', type: 'string' },
            { internalType: 'string', name: 'siteID', type: 'string' },
            { internalType: 'uint256', name: 'value', type: 'uint256' },
            {
              internalType: 'enum AcquaDashboard.Unit',
              name: 'unit',
              type: 'uint8',
            },
          ],
          internalType: 'struct AcquaDashboard.SensorData[]',
          name: '',
          type: 'tuple[]',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'string', name: '_sensorID', type: 'string' },
        { internalType: 'string', name: '_siteID', type: 'string' },
        { internalType: 'uint256', name: '_value', type: 'uint256' },
        { internalType: 'string', name: '_unit', type: 'string' },
      ],
      name: 'pushData',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'address', name: '', type: 'address' }],
      name: 'remaining',
      outputs: [{ internalType: 'int256', name: '', type: 'int256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'string', name: '', type: 'string' },
        { internalType: 'uint256', name: '', type: 'uint256' },
      ],
      name: 'sensorIDToSensorData',
      outputs: [
        { internalType: 'string', name: 'sensorID', type: 'string' },
        { internalType: 'string', name: 'siteID', type: 'string' },
        { internalType: 'uint256', name: 'value', type: 'uint256' },
        {
          internalType: 'enum AcquaDashboard.Unit',
          name: 'unit',
          type: 'uint8',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'string', name: '', type: 'string' }],
      name: 'sitesToBenchmark',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'uint256', name: '_amount', type: 'uint256' }],
      name: 'transferGovernment',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      stateMutability: 'nonpayable',
      type: 'function',
    },
  ];

  const fetchDataFromSM = async (pullDataByCompanyResult) => {
    var data = [];
    for (var i = 0; i < pullDataByCompanyResult.toArray().length; i++) {
      data.push(pullDataByCompanyResult[i].toArray());
    }
    setSensorData(data);
  };

  useEffect(() => {
    async function fetchData() {
      if (typeof window.ethereum !== 'undefined') {
        const ethersProvider = new ethers.BrowserProvider(window.ethereum);
        const signer = await ethersProvider.getSigner();

        const erc20Contract = new ethers.Contract(
          contractAddress,
          erc20Abi,
          signer
        );
        const acquaDashboardContract = new ethers.Contract(
          acquaDashboardAddress,
          dashboardAbi,
          signer
        );

        const balanceResult = await erc20Contract.balanceOf(
          await signer.getAddress()
        );
        const supplyResult = await erc20Contract.totalSupply();
        const remainingResult = await acquaDashboardContract.remaining(
          await signer.getAddress()
        );
        const pullDataByCompanyResult =
          await acquaDashboardContract.pullDataByCompany(
            await signer.getAddress()
          );

        await fetchDataFromSM(pullDataByCompanyResult);

        setBalance(ethers.formatEther(balanceResult));
        setSupply(ethers.formatEther(supplyResult));
        setRemaining(remainingResult);
        setPullDataByCompany(pullDataByCompanyResult.toArray());
      } else {
        alert('Please install MetaMask to use this application.');
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [sensorData]);

  return (
    <div style={{ padding: '5%' }}>
      <div style={{ marginBottom: '5%' }}>
        <h1>Acqua Token</h1>
        <hr />
        <div>
          <h3>Your Balance: {balance}</h3>
          <h3>Total Supply: {supply}</h3>
        </div>
      </div>
      <h1>Acqua Dashboard</h1>
      <hr />
      <div>
        <h3>Remaining: {remaining.toString()}</h3>
        <div style={{ padding: '5%' }}>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Sensor</th>
                <th>Site</th>
                <th>Value</th>
                <th>Unit</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td>'Loading...'</td>
                </tr>
              ) : (
                sensorData.map((item, index) => (
                  <tr key={index}>
                    <td>{item[0]}</td>
                    <td>{item[1]}</td>
                    <td>{item[2].toString()}</td>
                    <td>{item[3].toString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AcquaTokenApp;
