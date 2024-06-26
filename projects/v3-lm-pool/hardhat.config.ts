import { HardhatUserConfig } from 'hardhat/config'
import '@nomicfoundation/hardhat-toolbox'
import '@typechain/hardhat'
import 'dotenv/config'
import { NetworkUserConfig } from 'hardhat/types'
import 'solidity-docgen'
require('dotenv').config({ path: require('find-config')('.env') })

const bscTestnet: NetworkUserConfig = {
  url: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
  chainId: 97,
  accounts: [process.env.KEY_TESTNET!],
}

const bscMainnet: NetworkUserConfig = {
  url: 'https://bsc-dataseed.binance.org/',
  chainId: 56,
  accounts: [process.env.KEY_MAINNET!],
}

const goerli: NetworkUserConfig = {
  url: 'https://rpc.ankr.com/eth_goerli',
  chainId: 5,
  accounts: [process.env.KEY_GOERLI!],
}

const eth: NetworkUserConfig = {
  url: 'https://eth.llamarpc.com',
  chainId: 1,
  accounts: [process.env.KEY_ETH!],
}

const immutableZkevmTestnet: NetworkUserConfig = {
  url: 'https://wider-blue-wind.imx-testnet.quiknode.pro//',
  chainId: 13473,
  accounts: [process.env.PRIVATE_KEY!],
  gasPrice: 100000000000,
}

const immutableZkevm: NetworkUserConfig = {
  url: 'https://orbital-convincing-forest.imx-mainnet.quiknode.pro/',
  chainId: 13371,
  accounts: [process.env.PRIVATE_KEY!],
  gasPrice: 10000000000,
}

const sepolia: NetworkUserConfig = {
  url: 'https://sepolia.infura.io/v3/',
  chainId: 11155111,
  accounts: [process.env.PRIVATE_KEY!],
  gasPrice: 35000000000,
}

const l3Base: NetworkUserConfig = {
  url: 'https://rpc.l3.3base.org',
  chainId: 48220505331,
  accounts: [process.env.PRIVATE_KEY!],
  gasPrice: 35000000000,
}

const config = {
  solidity: {
    version: '0.7.6',
  },
  networks: {
    hardhat: {},
    ...(process.env.KEY_TESTNET && { bscTestnet }),
    ...(process.env.KEY_MAINNET && { bscMainnet }),
    ...(process.env.KEY_GOERLI && { goerli }),
    ...(process.env.KEY_ETH && { eth }),
    ...(process.env.PRIVATE_KEY && { immutableZkevmTestnet }),
    ...(process.env.PRIVATE_KEY && { immutableZkevm }),
    ...(process.env.PRIVATE_KEY && { sepolia }),
    ...(process.env.PRIVATE_KEY && { l3Base }),
  },
  etherscan: {
    apiKey: {
      bscTestnet: process.env.BSCSCAN_API_KEY,
      bscMainnet: process.env.BSCSCAN_API_KEY,
      goerli: process.env.ETHERSCAN_API_KEY,
      eth: process.env.ETHERSCAN_API_KEY,
      immutableZkevmTestnet: process.env.ETHERSCAN_API_KEY,
      sepolia: process.env.ETHERSCAN_API_KEY,
    },
    chainIds: [5, 56, 97, 1, 13473, 11155111],
  },
  paths: {
    sources: './contracts/',
    tests: './test',
    cache: './cache',
    artifacts: './artifacts',
  },
}

export default config
