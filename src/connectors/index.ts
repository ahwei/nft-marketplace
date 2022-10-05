import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";

//Meta Mask
const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42],
});

//CoinBase
const walletlink = new WalletLinkConnector({
  url: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
  appName: "nft",
});

//Wallet Connect
const walletconnect = new WalletConnectConnector({
  rpc: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
});

export const connectors = {
  injected: injected,
  walletConnect: walletconnect,
  coinbaseWallet: walletlink,
};
