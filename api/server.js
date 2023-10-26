const express = require('express');
const bodyParser = require('body-parser');
const { ethers, JsonRpcProvider } = require('ethers');
const ABI = require('./ABI.json')
require('dotenv').config()
const app = express();
app.use(bodyParser.json());

app.post('/data', async (req, res) => {
    const { sensorId, siteId, value, unit } = req.body;

    if (!sensorId || !value || !siteId || !unit) {
        return res.status(400).json({ error: 'Please provide correct values.' });
    }

    try {
        const testnetProvider = new JsonRpcProvider(process.env.APOTHEM_NETWORK_URL);
        const wallet = new ethers.Wallet(process.env.APOTHEM_PRIVATE_KEY, testnetProvider)
        const walletSigner = wallet.connect(testnetProvider)
        // console.log(await walletSigner.address)

        const contract = new ethers.Contract(
            process.env.ACQUA_DASHBOARD_CONTRACT_ADDRESS,
            ABI,
            walletSigner
        )

        const receipt = await contract.pushData(
            sensorId,
            siteId,
            value,
            unit
        )
        //
        console.log(receipt)

        res.json({ success: true });

    } catch (error) {
        res.status(500).json({ error: 'Failed to send transaction', details: error.message });
    }
});

const PORT = 3092;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});