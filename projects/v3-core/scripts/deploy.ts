import { tryVerify } from '@pancakeswap/common/verify'
import { ContractFactory } from 'ethers'
import { ethers, network } from 'hardhat'
import fs from 'fs'

type ContractJson = { abi: any; bytecode: string }
const artifacts: { [name: string]: ContractJson } = {
  // eslint-disable-next-line global-require
  PancakeV3PoolDeployer: require('../artifacts/contracts/PancakeV3PoolDeployer.sol/PancakeV3PoolDeployer.json'),
  // eslint-disable-next-line global-require
  PancakeV3Factory: require('../artifacts/contracts/PancakeV3Factory.sol/PancakeV3Factory.json'),
}

async function main() {
  const [owner] = await ethers.getSigners()
  const networkName = network.name
  console.log('owner', owner.address)

  let pancakeV3PoolDeployer_address = ""

  //'0xA3fB67d10BC4aC872CCa37B20647B6eB3d172362'
  let pancakeV3PoolDeployer
  const PancakeV3PoolDeployer = new ContractFactory(
    artifacts.PancakeV3PoolDeployer.abi,
    artifacts.PancakeV3PoolDeployer.bytecode,
    owner
  )

  if (!pancakeV3PoolDeployer_address) {
    console.log('pancakeV3PoolDeployer 1...')

    pancakeV3PoolDeployer = await PancakeV3PoolDeployer.deploy()
    console.log('PancakeV3PoolDeployer deployed to:', pancakeV3PoolDeployer.address)
    pancakeV3PoolDeployer_address = pancakeV3PoolDeployer.address
    console.log('pancakeV3PoolDeployer', pancakeV3PoolDeployer_address)
  } else {
    console.log('pancakeV3PoolDeployer 2...')

    pancakeV3PoolDeployer = new ethers.Contract(
      pancakeV3PoolDeployer_address,
      artifacts.PancakeV3PoolDeployer.abi,
      owner
    )

    console.log('done deployment')
  }

  let pancakeV3Factory_address = ''
  
  // '0x9d8A9Ca3bA2e9295069b5738d1e493488f2CB871'
  let pancakeV3Factory
  if (!pancakeV3Factory_address) {
    const PancakeV3Factory = new ContractFactory(
      artifacts.PancakeV3Factory.abi,
      artifacts.PancakeV3Factory.bytecode,
      owner
    )
    pancakeV3Factory = await PancakeV3Factory.deploy(pancakeV3PoolDeployer_address)

    pancakeV3Factory_address = pancakeV3Factory.address
    console.log('pancakeV3Factory', pancakeV3Factory_address)
  } else {
    pancakeV3Factory = new ethers.Contract(pancakeV3Factory_address, artifacts.PancakeV3Factory.abi, owner)
  }

  // Set FactoryAddress for pancakeV3PoolDeployer.
  await pancakeV3PoolDeployer.setFactoryAddress(pancakeV3Factory_address)

  const contracts = {
    PancakeV3Factory: pancakeV3Factory_address,
    PancakeV3PoolDeployer: pancakeV3PoolDeployer_address,
  }

  fs.writeFileSync(`./deployments/${networkName}.json`, JSON.stringify(contracts, null, 2))
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
