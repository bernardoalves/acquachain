# AcquaChain

Imagine a world where every drop of water saved by companies translates to a tangible digital asset. Welcome to Acqua Credits!

We've merged IoT with blockchain to create a revolutionary system where companies are rewarded for water conservation.

Every liter saved below industry benchmarks converts to Acqua Credits, which they can trade, offset against excess usage, or even showcase as a testament to their sustainability efforts.

With growing global water scarcity, Acqua Credits isn't just a project; it's a step towards a sustainable future. Let's make every drop count, together!

![AcquaChain](https://github.com/asusrid/acquaticos/assets/48621389/57d34783-78af-4526-9df6-8f5bf2742651)


[AcquaChain Presentation](https://docs.google.com/presentation/d/1DDBla7AUtseXCUN5hWVWqzcv6fCvPaB6rCm46-xtADw/edit?usp=sharing)
[AcquaChain Video](https://www.youtube.com/watch?v=E4QuJm_7rHM)

# Applications

- IoT Simulators
- API Gateway
- Smart-Contracts
- Dashboard

---

# IoT Water Consumption Sensors

This repository simulates the AcquaChain IoT water consumption sensors, designed to measure water consumption by companies in real-time and send this data directly to the blockchain for transparency, efficiency, and rewards.

## Overview

The AcquaChain IoT sensors are pivotal in the Acqua ecosystem. By providing accurate, real-time water consumption data, they allow companies to monitor their usage, earn rewards through the AcquaCoin ERC20 token for water conservation, and maintain a transparent record on the AcquaDashboard blockchain.

## Features

- **Real-Time Monitoring**: Simulated sensors can generate water consumption data in real-time.
- **Blockchain Integration**: Sensors are integrated to push the data directly to the AcquaDashboard smart contract on the blockchain.
- **Tamper-Proof**: The design ensures that once data is sent to the blockchain, it cannot be altered, ensuring integrity and transparency.

---

# AcquaChain IoT Sensor API Gateway

The AcquaChain IoT Sensor API Gateway is a bridge that facilitates seamless communication between AcquaChain simulated water consumption sensors and the blockchain. It ensures data integrity, secure transmission, and accurate representation of water consumption data on the AcquaDashboard blockchain.

## Overview

The primary function of the API Gateway is to provide an interface for the Acqua IoT sensors to send real-time water consumption data. Once this data is received, the API processes, validates, and then pushes the data to the AcquaDashboard smart contract on the blockchain.

## Features

- **Data Validation**: Ensures that the data sent by the IoT sensors is consistent and free of anomalies.
- **Secure Transmission**: Incorporates security measures to protect data during transmission.
- **Blockchain Integration**: Facilitates direct data transmission to the AcquaDashboard smart contract.

---

# AcquaDashboard

AcquaDashboard is an application where companies can monitor their AcquaToken credits and retrieve their water consumption data directly from the Ethereum blockchain.

## Features
- **Token Balance Check**: Companies can easily see their current AcquaToken credits.
- **Water Consumption Data**: Fetch water consumption data registered on the blockchain.
- **Wallet-based Authentication**: Companies can securely access the dashboard using their Ethereum wallets. No username or password required.

## Usage
- **Check AcquaToken Balance**: Upon logging in, your AcquaToken balance will be displayed on the main dashboard.
- **Pull Water Consumption Data**: Navigate to the designated section and retrieve your company's water consumption data.

## Security
The AcquaToken Dashboard uses wallet-based authentication. Ensure you never share your private keys and always use the application in a secure environment.

---

# AcquaChain Smart Contracts

Contains the smart contracts for the AcquaChain ecosystem, designed to promote and reward water conservation by companies.

## Smart-Contracts

### 1. AcquaCoin

- **Type**: ERC20 Token
- **Purpose**: This token is awarded to companies when they achieve measurable water savings. These tokens can be exchanged for tax credits, providing financial incentives for companies to minimize their water usage.

### 2. AcquaDashboard

- **Type**: Data Management Contract
- **Purpose**: Companies use this smart contract to push data from their IoT sensors, providing a transparent and tamper-proof record of their water consumption.
