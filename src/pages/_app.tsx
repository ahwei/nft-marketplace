import type { AppProps } from "next/app";
import Head from "next/head";
import React from "react";
import Router from "next/router";
import NProgress from "nprogress"; //nprogress module
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
// import "nprogress/nprogress.css"; //styles of nprogress

import Layout from "@/components/layout";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { ToastContainer } from "react-toastify";

import { theme } from "@/lib/theme";

Router.events.on("routeChangeStart", () => {
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <Head>
        <link rel="icon" sizes="192x192" href="/logo.png" />

        {/* <link
          href="https://fonts.googleapis.com/css?family=Noto+Sans+TC&display=swap"
          rel="stylesheet"
        /> */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
        <title>AhWeiHENGuEi NFT</title>
      </Head>
      <ThemeProvider theme={theme}>
        <Web3ReactProvider getLibrary={getLibrary}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
          <ToastContainer />
        </Web3ReactProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default MyApp;
