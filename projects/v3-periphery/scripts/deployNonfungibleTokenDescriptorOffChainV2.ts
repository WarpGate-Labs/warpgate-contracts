import { ethers, upgrades } from 'hardhat'

import NftDescriptorOffchainArtifact from '../artifacts/contracts/NonfungibleTokenPositionDescriptorOffChain.sol/NonfungibleTokenPositionDescriptorOffChain.json'

async function main() {
  const [owner] = await ethers.getSigners()
  console.log('owner', owner.address)

  const NonfungibleTokenPositionDescriptor = await ethers.getContractFactoryFromArtifact(NftDescriptorOffchainArtifact)
  const baseTokenUri = 'https://assets.warpgate.pro/3b912215-5878-4516-9c86-63746ebbead0.jpg/'
  const nonfungibleTokenPositionDescriptor = await upgrades.deployProxy(NonfungibleTokenPositionDescriptor, [
    baseTokenUri,
  ])
  await nonfungibleTokenPositionDescriptor.deployed()
  console.log('NonfungibleTokenPositionDescriptor deployed at', nonfungibleTokenPositionDescriptor.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
