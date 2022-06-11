import type { NextPage } from "next";
import Image from "next/image";
import React, { useEffect, useState, useCallback } from "react";
import { styled, alpha } from "@mui/material/styles";
import { Container, Grid, Button, Paper } from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import { connectors } from "@/connectors/index";
import { formatEther } from "@ethersproject/units";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import contract from "../contracts/NFTCollectible.json";
import OptionMenu from "@/components/ui_kit/OptionsMenu";
import { ethNetworkName } from "@/lib/networks";

import coinbase from "../../public/images/coinbase.png";
import metamask from "../../public/images/metamask.png";
import walletconnect from "../../public/images/walletconnect.png";

const contractAddress = "0x54b4eaC34bE490bD6a9a850E9a0534D3bE8489bb"; //合約位置
const abi = contract.abi; //合約abi

export const toHex = (num: number): string => {
  const val = Number(num);
  return "0x" + val.toString(16);
};

function BlockNumber() {
  const { chainId, library } = useWeb3React();

  const [blockNumber, setBlockNumber] = React.useState<any>();
  React.useEffect((): any => {
    if (!!library) {
      let stale = false;

      library
        .getBlockNumber()
        .then((blockNumber: number) => {
          if (!stale) {
            setBlockNumber(blockNumber);
          }
        })
        .catch(() => {
          if (!stale) {
            setBlockNumber(null);
          }
        });

      const updateBlockNumber = (blockNumber: number) => {
        setBlockNumber(blockNumber);
      };
      library.on("block", updateBlockNumber);

      return () => {
        stale = true;
        library.removeListener("block", updateBlockNumber);
        setBlockNumber(undefined);
      };
    }
  }, [library, chainId]); // ensures refresh if referential identity of library doesn't change across chainIds

  return (
    <Grid>
      <span>Block Number</span>
      <span role="img" aria-label="numbers"></span>
      <span>{blockNumber === null ? "Error" : blockNumber ?? ""}</span>
    </Grid>
  );
}

function Account() {
  const { account } = useWeb3React();

  return (
    <Grid>
      <span>Account</span>
      <span role="img" aria-label="robot">
        🤖
      </span>
      <span>
        {account === null
          ? "-"
          : account
          ? `${account.substring(0, 6)}...${account.substring(
              account.length - 4
            )}`
          : ""}
      </span>
    </Grid>
  );
}

function Balance() {
  const { account, library, chainId } = useWeb3React();

  const [balance, setBalance] = React.useState<any>();
  React.useEffect((): any => {
    if (!!account && !!library) {
      let stale = false;

      library
        .getBalance(account)
        .then((balance: any) => {
          if (!stale) {
            setBalance(balance);
          }
        })
        .catch(() => {
          if (!stale) {
            setBalance(null);
          }
        });

      return () => {
        stale = true;
        setBalance(undefined);
      };
    }
  }, [account, library, chainId]); // ensures refresh if referential identity of library doesn't change across chainIds

  return (
    <Grid>
      <span>Balance</span>
      <span role="img" aria-label="gold">
        💰
      </span>
      <span>
        {balance === null ? "Error" : balance ? `Ξ${formatEther(balance)}` : ""}
      </span>
    </Grid>
  );
}

const WalletButton = styled(Button)(({ theme }) => ({
  borderRadius: 12,
  height: 50,
  marginBottom: theme.spacing(2),
  width: 250,
  justifyContent: "flex-start",
}));

const WalletIcon = styled(Image)(({ theme }) => ({
  width: 50,
  height: 50,
  margin: theme.spacing(1),
}));

const Wallet: NextPage = () => {
  const { activate, active, deactivate, chainId, account, connector, library } =
    useWeb3React();

  // example of switching or adding network with Harmony Mainnet
  // const switchNetwork = async () => {
  //   try {
  //     await library.provider.request({
  //       method: "wallet_switchEthereumChain",
  //       params: [{ chainId: "0x63564c40" }],
  //     });
  //   } catch (switchError) {
  //     // 4902 error code indicates the chain is missing on the wallet
  //     if (switchError.code === 4902) {
  //       try {
  //         await library.provider.request({
  //           method: "wallet_addEthereumChain",
  //           params: [
  //             {
  //               chainId: "0x63564c40",
  //               rpcUrls: ["https://api.harmony.one"],
  //               chainName: "Harmony Mainnet",
  //               nativeCurrency: { name: "ONE", decimals: 18, symbol: "ONE" },
  //               blockExplorerUrls: ["https://explorer.harmony.one"],
  //               iconUrls: [
  //                 "https://harmonynews.one/wp-content/uploads/2019/11/slfdjs.png",
  //               ],
  //             },
  //           ],
  //         });
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     }
  //   }
  // };

  //mint nft
  const mintNftHandler = async () => {
    try {
      if (active) {
        const porvider = library.provider;
        const signer = library?.getSigner();

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

        toast.error("Ethereum object does not exist");
      }
    } catch (err) {
      toast.error("Mint Error check your network!!");
      console.log(err);
    }
  };

  const onDisconnect = () => {
    deactivate();
  };

  const onChangeNetwork = async (id: number) => {
    console.log("library", library);
    try {
      await library?.provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: toHex(id) }],
      });
    } catch (switchError) {
      // if (switchError.code === 4902) {
      //   try {
      //     await library.request({
      //       method: "wallet_addEthereumChain",
      //       params: [networkParams[toHex(network)]],
      //     });
      //   } catch (error) {
      //     setError(error);
      //   }
      // }
    }
  };

  // useEffect(() => {
  //   if (library) {
  //     console.log("library", library);
  //   }
  // }, [library]);

  return (
    <Grid
      container
      flexDirection={"column"}
      alignItems="center"
      justifyContent="center"
      sx={{ padding: 2 }}
    >
      <WalletButton
        onClick={() => {
          activate(connectors.injected);
        }}
        color="primary"
        variant="outlined"
      >
        <WalletIcon src={metamask} width={30} height={30} sx={{ margin: 5 }} />
        Metamask
      </WalletButton>
      <WalletButton
        onClick={() => {
          activate(connectors.coinbaseWallet);
        }}
        color="primary"
        variant="outlined"
      >
        <WalletIcon src={coinbase} width={30} height={30} sx={{ margin: 5 }} />
        Coinbase Wallet
      </WalletButton>
      <WalletButton
        onClick={() => {
          activate(connectors.walletConnect);
        }}
        color="primary"
        variant="outlined"
      >
        <WalletIcon
          src={walletconnect}
          width={30}
          height={30}
          sx={{ margin: 5 }}
        />
        Wallet Connect
      </WalletButton>
      <Button onClick={mintNftHandler} variant="contained" color="info">
        Mint NFT
      </Button>

      {active && (
        <Paper sx={{ padding: 3 }}>
          <Button onClick={onDisconnect} variant="contained" color="info">
            Disconnect
          </Button>

          <OptionMenu
            title={`Switch Network(${ethNetworkName[Number(chainId)]})`}
            options={Object.keys(ethNetworkName).map((keys) => {
              return {
                value: keys,
                name: ethNetworkName[Number(keys)],
              };
            })}
            onChange={(value) => {
              onChangeNetwork(Number(value));
            }}
          />
          <div>{`Connection Status: ${active}`}</div>
          <div>{`Account: ${account}`}</div>
          <div>{`Network ID: ${chainId}`}</div>
          <BlockNumber />
          <Balance />
        </Paper>
      )}
    </Grid>
  );
};

export default Wallet;
