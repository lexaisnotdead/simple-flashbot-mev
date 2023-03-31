# Flashbot Auction Bot
This is a simple Flashbots auction bot written in JavaScript using the Flashbots Bundle Provider. The bot submits a private transaction to a specific Ethereum address using the ```sendPrivateTransaction``` method of the provider, bypassing the traditional mempool and avoiding the risk of front-running.

## Setup
1. Clone the repository and navigate to the project directory:
```bash 
git clone https://github.com/lexaisnotdead/simple-flashbot-mev.git
cd ./simple-flshbot-mev
```
2. Install the required dependencies:
```bash
npm install
```
3. Create a new ```.env``` file in the project directory with the following variables:
```bash
URL = <ethereum_node_url>
PRIVATE_KEY = <your_ethereum_private_key>
TO_ADDRESS = <target_ethereum_address>
```
## Usage
To start the bot, run the following command in the project directory:
```bash
node mev-bot.js
```

The bot will create a new transaction with a gas price of 13 Gwei and a gas limit of 21,000, and submit it to the Flashbots auction using the Flashbots Bundle Provider. The transaction will be directed to the target Ethereum address specified in the .env file.

If the transaction is included in a block within the next 10 blocks, the bot will output "Transaction successfully included." to the console. Otherwise, it will output "Transaction was not included in a block and has been removed from the system."
