import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState, useLayoutEffect } from "react";
import { Grid, TextField, Button, Typography, Link } from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import abi from "@/contracts/Store.json";
import { toast } from "react-toastify";
import { ethers } from "ethers";

const contractAddress = "0xB99dD273f9E2550E8C2bFAd401f616854D4Bf9f1";
const ethAddress = `https://rinkeby.etherscan.io/address/${contractAddress}`;

const NextjsPage: NextPage = () => {
  const router = useRouter();

  const [num, setNum] = useState<string>("0");
  const [value, setValue] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { activate, active, deactivate, chainId, account, connector, library } =
    useWeb3React();

  const onGetValue = async () => {
    try {
      if (active) {
        const signer = library?.getSigner();

        const _Contract = new ethers.Contract(contractAddress, abi, signer);
        setLoading(true);
        let number: {
          _hex: string;
          _isBigNumber: boolean;
        } = await _Contract.retrieve();
        console.log(number, parseInt(number._hex, 16));
        if (number?._hex) {
          setValue(parseInt(number?._hex, 16));
        }
        setLoading(false);
      } else {
        router.push("/wallet");
        setLoading(false);
      }
    } catch (err) {
      toast.error(`${err}`);
    }
  };

  const onStoreNum = async () => {
    try {
      if (active) {
        const signer = library?.getSigner();
        setLoading(true);
        const _Contract = new ethers.Contract(contractAddress, abi, signer);
        await _Contract.store(parseInt(num));
        await _Contract.wait();
        console.log("finish");
        onGetValue();
        setLoading(false);
      } else {
        toast.error("Ethereum object does not exist");
        setLoading(false);
      }
    } catch (err) {
      toast.error(`${err}`);
    }
  };

  const onTakeNum = async () => {
    try {
      if (active) {
        const signer = library?.getSigner();
        setLoading(true);
        const _Contract = new ethers.Contract(contractAddress, abi, signer);
        await _Contract.take(parseInt(num));
        await _Contract.wait();
        onGetValue();
        setLoading(false);
      } else {
        toast.error("Ethereum object does not exist");
        setLoading(false);
      }
    } catch (err) {
      toast.error(`${err}`);
    }
  };

  useLayoutEffect(() => {
    onGetValue();
  }, []);

  return (
    <Grid
      container
      sx={{ width: "100%", height: "100vh" }}
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      {loading && <Typography variant="h4">Loading...</Typography>}
      <TextField
        value={num}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setNum(e.target.value)
        }
      />

      <Typography variant="h4">store {value}</Typography>
      <Grid item>
        <Grid container justifyContent="center" alignItems="center">
          <Button variant="contained" onClick={onGetValue} disabled={!active}>
            getNumber
          </Button>
          <Button variant="contained" onClick={onStoreNum} disabled={!active}>
            store
          </Button>
          <Button variant="outlined" onClick={onTakeNum} disabled={!active}>
            take
          </Button>
        </Grid>
      </Grid>
      <Link href={ethAddress} target="_blank">
        ethAddress
      </Link>
    </Grid>
  );
};

export default NextjsPage;
