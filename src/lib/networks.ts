type networkParamsTyps = {
  [key: string]: {
    chainId: string;
    rpcUrls: string[];
    chainName: string;
    nativeCurrency: { name: string; decimals: number; symbol: string };
    blockExplorerUrls?: string[];
    blockExplorerUrl?: string[];
    iconUrls: string[];
  };
};

export const networkParams: networkParamsTyps = {
  "0x63564c40": {
    chainId: "0x63564c40",
    rpcUrls: ["https://api.harmony.one"],
    chainName: "Harmony Mainnet",
    nativeCurrency: { name: "ONE", decimals: 18, symbol: "ONE" },
    blockExplorerUrls: ["https://explorer.harmony.one"],
    iconUrls: ["https://harmonynews.one/wp-content/uploads/2019/11/slfdjs.png"],
  },
  "0xa4ec": {
    chainId: "0xa4ec",
    rpcUrls: ["https://forno.celo.org"],
    chainName: "Celo Mainnet",
    nativeCurrency: { name: "CELO", decimals: 18, symbol: "CELO" },
    blockExplorerUrl: ["https://explorer.celo.org"],
    iconUrls: [
      "https://celo.org/images/marketplace-icons/icon-celo-CELO-color-f.svg",
    ],
  },
};

type ethNetworkNameType = {
  [key: number]: string;
};

export const ethNetworkName: ethNetworkNameType = {
  1: "Main",
  3: "Ropsten",
  4: "Rinkeby",
  42: "Kovan",
  1666600000: "Harmony",
  42220: "Celo",
};
