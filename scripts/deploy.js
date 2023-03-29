// const hre = require("hardhat")
const { ethers } = require("hardhat");
require("dotenv").config({ path: ".env" });
const fs = require("fs"); //file system

async function main() {
  //deploy the contract
  const Grandvote = await ethers.getContractFactory("Grandvote");

  // deploy the contract
  const grandvote = await Grandvote.deploy();

  // wait for the contract to finish deploying
  await grandvote.deployed();

  // save the contract address to a local file.
  fs.writeFileSync(
    "./context/contractAddress.js",
    `
  import grandvote from "./Grandvote.json"

  export const contractAddress = "${grandvote.address}";
  export const ownerAddress = "${grandvote.signer.address}";
  export const electionABI = grandvote.abi;
  `
  );

  console.log(
    "Open the ./context/config.js file to find the deployment details."
  );

  // print the address of the deployed contract
  console.log("Verify Contract Address:", grandvote.address);

  console.log("Sleeping.....");
  // Wait for etherscan to notice that the contract has been deployed
  await sleep(40000);

  // Verify the contract after deploying
  await hre.run("verify:verify", {
    address: grandvote.address,
    constructorArguments: [],
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
