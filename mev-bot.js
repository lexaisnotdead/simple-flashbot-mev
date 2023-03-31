const { Wallet, BigNumber, ethers, providers} = require("ethers")
const { FlashbotsBundleProvider, FlashbotsTransactionResolution } = require('@flashbots/ethers-provider-bundle');

require('dotenv').config();

const { URL, PRIVATE_KEY, TO_ADDRESS } = process.env;
const FLASHBOTS_ENDPOINT = "https://relay-goerli.flashbots.net";

const provider = new providers.JsonRpcProvider(URL);
const authSigner = new Wallet(PRIVATE_KEY, provider);

const start = async() => {
    const flashbotsProvider = await FlashbotsBundleProvider.create(
        provider,
		authSigner,
		FLASHBOTS_ENDPOINT,
	);
    
    const GWEI = BigNumber.from(10).pow(9);
	const LEGACY_GAS_PRICE = GWEI.mul(13);
    const GAS_LIMIT = BigNumber.from(21000);
    const blockNumber = await provider.getBlockNumber();
    const ethAmount = '0.001';

    const transaction = {
        from: authSigner.address,
        to: TO_ADDRESS,
        gasPrice: LEGACY_GAS_PRICE,
        gasLimit: GAS_LIMIT,
        chainId: 5,
        value: ethers.utils.parseEther(ethAmount),
    };

    const res = await flashbotsProvider.sendPrivateTransaction(
        { transaction: transaction, signer: authSigner },
        { maxBlockNumber: blockNumber + 10 },
    );
    const waitRes = await res.wait();

    if (waitRes === FlashbotsTransactionResolution.TransactionIncluded) {
        console.log('Transaction successfully included.');
    } else if (waitRes === FlashbotsTransactionResolution.TransactionDropped) {
        console.log('Transaction was not included in a block and has been removed from the system.');
    }

};

start();