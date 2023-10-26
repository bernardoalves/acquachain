require('dotenv').config()
const ABI = require('./ABI.json')
const { ethers, JsonRpcProvider } = require('ethers');

const testnetProvider = new JsonRpcProvider(process.env.APOTHEM_NETWORK_URL);
const wallet = new ethers.Wallet(process.env.APOTHEM_PRIVATE_KEY, testnetProvider)
const walletSigner = wallet.connect(testnetProvider)

async function main() {
  const contract = new ethers.Contract(
      process.env.ACQUA_DASHBOARD_CONTRACT_ADDRESS,
      ABI,
      walletSigner
  )

  const receipt = await contract.transferGovernment("1000000000000000000");

  console.log(receipt)
}

main()
