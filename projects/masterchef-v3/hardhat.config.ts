/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */
import type { HardhatUserConfig, NetworkUserConfig } from "hardhat/types";
import "@nomiclabs/hardhat-ethers";
import "@nomicfoundation/hardhat-verify";
import "@nomiclabs/hardhat-waffle";
import "@openzeppelin/hardhat-upgrades";
import "@typechain/hardhat";
import "hardhat-abi-exporter";
import "hardhat-contract-sizer";
import "solidity-coverage";
import "solidity-docgen";
import "dotenv/config";

require("dotenv").config({ path: require("find-config")(".env") });

const bscTestnet: NetworkUserConfig = {
  url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
  chainId: 97,
  accounts: [process.env.KEY_TESTNET!],
};

const bscMainnet: NetworkUserConfig = {
  url: "https://bsc-dataseed.binance.org/",
  chainId: 56,
  accounts: [process.env.KEY_MAINNET!],
};

const goerli: NetworkUserConfig = {
  url: "https://rpc.ankr.com/eth_goerli",
  chainId: 5,
  accounts: [process.env.KEY_GOERLI!],
};

const eth: NetworkUserConfig = {
  url: "https://eth.llamarpc.com",
  chainId: 1,
  accounts: [process.env.KEY_ETH!],
};

const immutableZkevmTestnet: NetworkUserConfig = {
  url: "https://wider-blue-wind.imx-testnet.quiknode.pro/3f38de94a68fde8c4c73946f2eb95cc6b831c6fa/",
  chainId: 13473,
  accounts: [process.env.PRIVATE_KEY!],
  gasPrice: 100000000000,
};

const immutablezkEVM: NetworkUserConfig = {
  url: "https://orbital-convincing-forest.imx-mainnet.quiknode.pro/c936618fee68fb1f858c0a4a5461d28dd7b880a2/",
  chainId: 13371,
  accounts: [process.env.PRIVATE_KEY!],
  gasPrice: 10000000000,
};

const sepolia: NetworkUserConfig = {
  url: "https://sepolia.infura.io/v3/a87e699e4c3f494887ff154736faef5c",
  chainId: 11155111,
  accounts: [process.env.PRIVATE_KEY!],
  gasPrice: 100000000000,
};

const m1: NetworkUserConfig = {
  url: "https://mevm.devnet.m1.movementlabs.xyz",
  chainId: 336,
  accounts: [process.env.PRIVATE_KEY!],
  gasPrice: 100000000000,
};

const config = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    ...(process.env.KEY_TESTNET && { bscTestnet }),
    ...(process.env.KEY_MAINNET && { bscMainnet }),
    ...(process.env.KEY_GOERLI && { goerli }),
    ...(process.env.KEY_ETH && { eth }),
    ...(process.env.PRIVATE_KEY && { immutableZkevmTestnet }),
    ...(process.env.PRIVATE_KEY && { immutablezkEVM }),

    ...(process.env.PRIVATE_KEY && { sepolia }),
    ...(process.env.PRIVATE_KEY && { m1 }),
    // testnet: bscTestnet,
    // mainnet: bscMainnet,
  },
  etherscan: {
    apiKey: {
      bscTestnet: process.env.BSCSCAN_API_KEY,
      bscMainnet: process.env.BSCSCAN_API_KEY,
      goerli: process.env.ETHERSCAN_API_KEY,
      eth: process.env.ETHERSCAN_API_KEY,
      immutableZkevmTestnet: process.env.ETHERSCAN_API_KEY,
      immutablezkEVM: process.env.ETHERSCAN_API_KEY,
      sepolia: process.env.ETHERSCAN_API_KEY,
    },
    customChains: [
      {
        network: "immutablezkEVM",
        chainId: 13371,
        urls: {
          apiURL: "https://explorer.immutable.com/api",
          browserURL: "https://explorer.immutable.com",
        },
      },
    ],
    chainIds: [5, 56, 97, 1, 13473, 13371, 11155111],
  },
  solidity: {
    compilers: [
      {
        version: "0.8.10",
        settings: {
          optimizer: {
            enabled: true,
            runs: 999,
          },
        },
      },
      {
        version: "0.7.6",
        settings: {
          optimizer: {
            enabled: true,
            runs: 999,
          },
        },
      },
    ],
  },
  paths: {
    sources: "./contracts/",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  docgen: {
    pages: "files",
  },
};

export default config;
