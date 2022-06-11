import type { NextPage } from "next";
import React, { useEffect, useState, useCallback } from "react";
import { Grid } from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import { connectors } from "@/connectors/index";

const NextjsPage: NextPage = () => {
  const { activate, active, chainId, account } = useWeb3React();

  useEffect(() => {}, []);

  return <Grid>NextjsPage</Grid>;
};

export default NextjsPage;
