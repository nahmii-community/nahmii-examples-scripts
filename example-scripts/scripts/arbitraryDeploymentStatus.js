const ethers = require('ethers')
const { getContractInterface } = require('@nahmii/contracts')
const { networks } = require('../utils/networks');

async function main() {
    // Set up our L2 RPC provider connection.
    // Switching networks can be done by replacing `networks.*.{l1,l2}` by either mainnet, testnet or localhost.
    const l2RpcProvider = new ethers.providers.JsonRpcProvider(networks.mainnet.l2)

    // Retrieve the whitelist address interface and construct an Ethers Contract around it.
    const DeployerWhitelist = new ethers.Contract(
        '0x4200000000000000000000000000000000000002', // Deployer whitelist address.
        getContractInterface('NVM_DeployerWhitelist'),
        l2RpcProvider
    )

    // Check the status of arbitrary deployments.
    console.log(`Allow Arbitrary Deployments: ${await DeployerWhitelist.allowArbitraryDeployment()}`)
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error)
        process.exit(1)
    })