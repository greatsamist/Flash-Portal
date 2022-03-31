import { ethers } from "ethers";
import React, { useEffect, useState } from "react";

import "./App.css";
import abi from "./utils/FlashPortal.json";

export default function App() {
  const contractAddress = "0x18335a592718dc64F6fd360EA3Be46e4A51D6F33";

  const contractABI = abi;
  /*
   * Just a state variable we use to store our user's public wallet.
   */
  const [currentAccount, setCurrentAccount] = useState("");
  const [nickNameInput, setNickNameInput] = useState("");
  const [totalCount, setTotalCount] = useState("");

  const checkIfWalletIsConnected = async () => {
    /*
     * First make sure we have access to window.ethereum
     */
    try {
      const { ethereum } = window;
      // const chainId = ethereum.networkVersion;
      // console.log(chainId);
      if (!ethereum) {
        alert("Make sure you have metamask!");
      } else {
        // console.log("We have the ethereum object", ethereum);
      }

      /*
       * Check if we're authorized to access the user's wallet
       */
      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        // console.log("Found an authorized account:", account);
        setCurrentAccount(account);
      } else {
        alert("No authorized account found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Implement your connectWallet method here
   */
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };
  let wavePortalContract;
  const getUser = () => {
    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      wavePortalContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
    } else {
      console.log("Use ethereum enabled browser");
    }
  };

  const TotalCount = async () => {
    try {
      getUser();
      let count = await wavePortalContract.getTotalFlash();
      setTotalCount(count.toNumber());
    } catch (error) {
      console.log(error);
    }
  };

  /*
   * This runs our function when the page loads.
   */
  useEffect(() => {
    checkIfWalletIsConnected();
    TotalCount();
  });

  const onChangeInput = ({ target }) => {
    setNickNameInput(target.value);
  };

  const flash = async (e) => {
    try {
      e.preventDefault();

      getUser();

      let count = await wavePortalContract.getTotalFlash();
      setTotalCount(count.toNumber());
      console.log("Retrieved total wave count...", count.toNumber());
      /*
       * Execute the actual wave from your smart contract
       */
      const waveTxn = await wavePortalContract.flash(nickNameInput);
      console.log("Mining...", waveTxn.hash);

      await waveTxn.wait();
      console.log("Mined -- ", waveTxn.hash);

      setNickNameInput("");
      count = await wavePortalContract.getTotalFlash();
      setTotalCount(count.toNumber());
      // console.log("Retrieved total wave count...", count.toNumber());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mainContainer">
      <div className="dataContainer">
        {/* @ ignore */}
        <div className="header">👋 Hey there!</div>

        <div className="bio">
          I am Samuel and I worked on smart contracts so that's pretty cool
          right? Connect your Ethereum wallet and flash at me!
        </div>
        <form onSubmit={flash} className="form">
          <input
            type="text"
            placeholder="Enter Nickname"
            required
            className="input"
            value={nickNameInput}
            onChange={onChangeInput}
            id="nickname"
          />
          <button
            className="waveButton"
            type="submit"
            disabled={!currentAccount}
          >
            Flash Me
          </button>
        </form>

        <div className="totalCount">
          <h5>Total flash: +{totalCount}</h5>
        </div>

        {/*
         * If there is no currentAccount render this button
         */}
        {!currentAccount && (
          <button className="waveButton" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}
        <div className="footer">
          <p>
            <em>Your must be on the rinkeby network</em>
          </p>
          <p>Copyright @ Samuel Ojo</p>
        </div>
      </div>
    </div>
  );
}
