import type { HardhatUserConfig, NetworkUserConfig } from 'hardhat/types'
import '@nomiclabs/hardhat-ethers'
import '@nomiclabs/hardhat-web3'
import '@nomiclabs/hardhat-truffle5'
import 'hardhat-abi-exporter'
import 'hardhat-contract-sizer'
import 'dotenv/config'
import 'hardhat-tracer'
import '@nomiclabs/hardhat-etherscan'
import 'solidity-docgen'
require('dotenv').config({ path: require('find-config')('.env') })

// const bscTestnet: NetworkUserConfig = {
//   url: 'https://rpc.ankr.com/bsc_testnet_chapel',
//   chainId: 97,
//   accounts: [process.env.KEY_TESTNET!],
// }

// const goerli: NetworkUserConfig = {
//   url: `https://eth-goerli.g.alchemy.com/v2/${process.env.GOERLI_API_KEY}`,
//   chainId: 5,
//   // accounts: [process.env.KEY_GOERLI!],
// }

// const bscMainnet: NetworkUserConfig = {
//   url: 'https://bsc-dataseed.binance.org/',
//   chainId: 56,
//   // accounts: [process.env.KEY_MAINNET!],
// }

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
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      forking: {
        url: bscTestnet.url || '',
      },
    },
    ...(process.env.KEY_TESTNET && { bscTestnet }),
    ...(process.env.KEY_MAINNET && { bscMainnet }),
    ...(process.env.KEY_GOERLI && { goerli }),
    ...(process.env.KEY_ETH && { eth }),
    ...(process.env.PRIVATE_KEY && { immutableZkevmTestnet }),
    ...(process.env.PRIVATE_KEY && { immutableZkevm }),
    ...(process.env.PRIVATE_KEY && { sepolia }),
    ...(process.env.PRIVATE_KEY && { l3Base })

    // goerli: goerli,
    // mainnet: bscMainnet,
  },
  etherscan: {
    apiKey: {
      bscTestnet: process.env.ETHERSCAN_API_KEY,
      bscMainnet: process.env.ETHERSCAN_API_KEY,
      goerli: process.env.ETHERSCAN_API_KEY,
      eth: process.env.ETHERSCAN_API_KEY,
      immutableZkevmTestnet: process.env.ETHERSCAN_API_KEY,
      sepolia: process.env.ETHERSCAN_API_KEY,
    },
    chainIds: [5, 56, 97, 1, 13473, 11155111],
  },
  solidity: {
    compilers: [
      {
        version: '0.7.6',
        settings: {
          optimizer: {
            enabled: true,
            runs: 10,
          },
        },
      },
      {
        version: '0.8.10',
        settings: {
          optimizer: {
            enabled: true,
            runs: 10,
          },
        },
      },
      {
        version: '0.6.6',
        settings: {
          optimizer: {
            enabled: true,
            runs: 10,
          },
        },
      },
      {
        version: '0.5.16',
        settings: {
          optimizer: {
            enabled: true,
            runs: 10,
          },
        },
      },
      {
        version: '0.4.18',
        settings: {
          optimizer: {
            enabled: true,
            runs: 10,
          },
        },
      },
    ],
    overrides: {
      '@pancakeswap/v3-core/contracts/libraries/FullMath.sol': {
        version: '0.7.6',
        settings: {},
      },
      '@pancakeswap/v3-core/contracts/libraries/TickBitmap.sol': {
        version: '0.7.6',
        settings: {},
      },
      '@pancakeswap/v3-core/contracts/libraries/TickMath.sol': {
        version: '0.7.6',
        settings: {},
      },
      '@pancakeswap/v3-periphery/contracts/libraries/PoolAddress.sol': {
        version: '0.7.6',
        settings: {},
      },
      'contracts/libraries/PoolTicksCounter.sol': {
        version: '0.7.6',
        settings: {},
      },
    },
  },
  paths: {
    sources: './contracts',
    tests: './test',
    cache: './cache',
    artifacts: './artifacts',
  },
  // abiExporter: {
  //   path: "./data/abi",
  //   clear: true,
  //   flat: false,
  // },
  docgen: {
    pages: 'files',
  },
}

export default config
