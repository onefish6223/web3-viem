import { MetaMaskInpageProvider } from '@metamask/providers';

declare global {
  interface Window {
    // 精确声明 ethereum 的类型
    ethereum?: MetaMaskInpageProvider;
  }
}

