const { ethers } = require('hardhat');
const { Options } = require('@layerzerolabs/lz-v2-utilities');

async function main() {

    privateKey = process.env.PRIVATE_KEY;
    const signer = new ethers.Wallet(privateKey, ethers.provider);

    // 输出 Signer 地址
    const network = await ethers.provider.getNetwork();
    console.log('network', network);
    console.log('Chain ID:', network.chainId);
    console.log(`Signer address: ${signer.address}`);
    const balance = await ethers.provider.getBalance(signer.address);
    console.log('balance bofore format', balance)
    const balanceInEth = ethers.utils.formatEther(balance);
    console.log(`Balance: ${balanceInEth} ETH`);
    const gasPrice = await ethers.provider.getGasPrice();
    const networkname = "swell"

    console.log(`Current gas price: ${ethers.utils.formatUnits(gasPrice, "gwei")} gwei`);

    console.log(`Deploying contracts with the account: ${signer.address}`);
    console.log(`Account balance: ${(await signer.getBalance()).toString()}`);

    myONFT721 = (await ethers.getContractFactory('MyONFT721',signer)).attach("0xb22765e20f9b70F380292ebBAc782ac8bD30384c");  
    const initialTokenId = 0
    //await myONFT721.setMintAdmin(signer.address)
    //await myONFT721.mint(signer.address, initialTokenId)
    // Defining extra message execution options for the send operation
    const options = Options.newOptions().addExecutorLzReceiveOption(200000, 0).toHex().toString()
    const eidB = 40231
    const sendParam = [eidB, ethers.utils.zeroPad(signer.address, 32), initialTokenId, options, '0x', '0x']

    // Fetching the native fee for the token send operation
    const [nativeFee] = await myONFT721.quoteSend(sendParam, false)

    // Executing the send operation from myONFT721A contract
    await myONFT721.send(sendParam, [nativeFee, 0], signer.address, { value: nativeFee })

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});




