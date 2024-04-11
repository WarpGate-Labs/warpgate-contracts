# WarpGate Contract

## Deployments

1. Add Key in `.env` file. It's a private key of the account that will deploy the contracts and should be gitignored.
2. add `ETHERSCAN_API_KEY` in `.env` file. It's an API key for etherscan.
3. `yarn` in root directory
4. `NETWORK=$NETWORK yarn zx v3-deploy.mjs` where `$NETWORK` is either `eth`, `goerli`, `immutablezkEVM`, `immutableZkevmTestnet` or `hardhat` (for local testing)
5. `NETWORK=$NETWORK yarn zx v3-verify.mjs` where `$NETWORK` is either `eth`, `goerli`, `immutablezkEVM`, `immutableZkevmTestnet` or `hardhat` (for local testing)
