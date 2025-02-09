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

    myONFT721 = (await ethers.getContractFactory('MyONFT721',signer)).attach("0x7FeB16A838CaCF3e44cf97530DAfabdbf82711d8");  
    const finalBalanceA = await myONFT721.balanceOf(signer.address)
    console.log(finalBalanceA)

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});




