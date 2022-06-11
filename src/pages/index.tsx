import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Banner from "@/components/homeSection/banner";
import Collection from "@/components/homeSection/collection";

import { Ethereumish } from "../types/ethereum";
import Web3 from "web3";
import { ethers } from "ethers";

declare global {
  interface Window {
    ethereum: Ethereumish;
  }
}
import contract from "../contracts/NFTCollectible.json";
const contractAddress = "0x54b4eaC34bE490bD6a9a850E9a0534D3bE8489bb"; //合約位置
const abi = contract.abi; //合約abi

type Props = {
  abc: string | number;
};

const Home: NextPage<Props> = ({ abc }) => {
  const [currentAccount, setCurrentAccount] = useState<string | null>(null);

  const checkWalletIsConnected = () => {
    if (!window.ethereum) {
      console.log("你沒有錢包拉滾蛋");
    } else {
      console.log("有錢包可以開始囉");
    }
  };

  const connectWalletHandler = async () => {
    console.log("connectWalletHandler");
    if (!window.ethereum) {
      alert("你沒有錢包拉滾蛋");
      return;
    }

    try {
      const web3 = new Web3(window.ethereum);
      // Ask User permission to connect to Metamask
      const account: string[] = await web3.eth.getAccounts();

      if (account[0]) {
        console.log(account);
        setCurrentAccount(account[0]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const mintNftHandler = async () => {
    try {
      if (window.ethereum) {
        const porvider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = porvider.getSigner();
        const nftContract = new ethers.Contract(contractAddress, abi, signer);

        console.log("Initialize payment");
        let nftTxn = await nftContract.mintNFTs(1, {
          value: ethers.utils.parseEther("0.01"),
        });

        console.log("Mining... please wait");
        await nftTxn.wait();

        console.log(
          `Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`
        );
      } else {
        console.log("Ethereum object does not exist");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    checkWalletIsConnected();
  }, []);

  return (
    <React.Fragment>
      <Banner />
      <Collection />

      {/* <h1>Scrappy Squirrels Tutorial</h1>
      {currentAccount && <h2>{currentAccount}</h2>}
      <div>
        {currentAccount ? (
          <button
            onClick={mintNftHandler}
            className="cta-button mint-nft-button"
          >
            Mint NFT
          </button>
        ) : (
          <button
            onClick={connectWalletHandler}
            className="cta-button connect-wallet-button"
          >
            Connect Wallet
          </button>
        )}
      </div> */}
    </React.Fragment>
  );
};

// export const getStaticProps: GetStaticProps = async (context) => {
//   // ...
//   return {
//     props: { abc: "getStaticProps" },
//   };
// };

// export const getStaticPaths: GetStaticPaths = async () => {
//   // ...
//    return {
//      props: { abc: 123 },
//    };
// };

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   // ...

//   return {
//     props: { abc: "getServerSideProps" },
//   };
// };

export default Home;
