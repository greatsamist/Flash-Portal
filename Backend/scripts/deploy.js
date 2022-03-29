const main = async () => {
  const [deployer] = await hre.ethers.getSigners();
  const accountBalance = await deployer.getBalance();

  console.log("Deploying contracts with account: ", deployer.address);
  console.log("Account balance: ", accountBalance.toString());

  const flashContractFactory = await hre.ethers.getContractFactory(
    "FlashPortal"
  );
  const flashContract = await flashContractFactory.deploy();
  await flashContract.deployed();

  console.log("FlashPortal address: ", flashContract.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
