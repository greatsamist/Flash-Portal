const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners();
  const flashContractFactory = await hre.ethers.getContractFactory(
    "FlashPortal"
  );
  const flashContract = await flashContractFactory.deploy();
  await flashContract.deployed();

  console.log("Contract deployed to:", flashContract.address);
  console.log("Contract deployed by:", owner.address);

  let flashCount;
  flashCount = await flashContract.getTotalFlash();

  let flashTxn = await flashContract.flash("greatsam");
  await flashTxn.wait();

  flashCount = await flashContract.getTotalFlash();

  flashTxn = await flashContract.connect(randomPerson).flash("spider");
  await flashTxn.wait();

  flashCount = await flashContract.getTotalFlash();
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
