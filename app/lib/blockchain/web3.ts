// web3.ts - Utilities for Web3 integration

/**
 * Constants for network configuration
 */
'use client';
export const NETWORK_CONFIG = {
  ethereum: {
    chainId: '0x1', // 1 in hex
    chainName: 'Ethereum Mainnet',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: ['https://mainnet.infura.io/v3/'],
    blockExplorerUrls: ['https://etherscan.io'],
  },
  goerli: {
    chainId: '0x5', // 5 in hex
    chainName: 'Goerli Testnet',
    nativeCurrency: {
      name: 'Goerli Ether',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: ['https://goerli.infura.io/v3/'],
    blockExplorerUrls: ['https://goerli.etherscan.io'],
  },
  bsc: {
    chainId: '0x38', // 56 in hex
    chainName: 'Binance Smart Chain',
    nativeCurrency: {
      name: 'Binance Coin',
      symbol: 'BNB',
      decimals: 18,
    },
    rpcUrls: ['https://bsc-dataseed.binance.org/'],
    blockExplorerUrls: ['https://bscscan.com'],
  },
  polygon: {
    chainId: '0x89', // 137 in hex
    chainName: 'Polygon Mainnet',
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18,
    },
    rpcUrls: ['https://polygon-rpc.com/'],
    blockExplorerUrls: ['https://polygonscan.com'],
  },
  arbitrum: {
    chainId: '0xa4b1', // 42161 in hex
    chainName: 'Arbitrum One',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: ['https://arb1.arbitrum.io/rpc'],
    blockExplorerUrls: ['https://arbiscan.io'],
  },
};

/**
 * Check if a Web3 provider is available in the browser
 * 
 * @returns boolean - true if a Web3 provider is available
 */
export const isWeb3Available = (): boolean => {
  if (typeof window !== 'undefined') {
    return Boolean(window.ethereum);
  }
  return false;
};

/**
 * Request account access from the user's wallet
 * 
 * @returns Promise<string[]> - An array of wallet addresses
 * @throws Error if user rejects the request or if ethereum is not available
 */
export const requestAccounts = async (): Promise<string[]> => {
  if (!isWeb3Available()) {
    throw new Error('No Ethereum provider found');
  }
  
  try {
    // Assert ethereum is defined since we checked with isWeb3Available
    const ethereum = window.ethereum!;
    
    // Request account access
    const accounts = await ethereum.request({ 
      method: 'eth_requestAccounts' 
    });
    
    if (!accounts || !Array.isArray(accounts)) {
      throw new Error('Invalid response from wallet');
    }
    
    return accounts as string[];
  } catch (error) {
    console.error('Error requesting accounts:', error);
    throw new Error('Failed to connect to wallet');
  }
};

/**
 * Get the current chain ID from the user's wallet
 * 
 * @returns Promise<string> - The chain ID in hex format
 * @throws Error if ethereum is not available
 */
export const getChainId = async (): Promise<string> => {
  if (!isWeb3Available()) {
    throw new Error('No Ethereum provider found');
  }
  
  try {
    // Assert ethereum is defined since we checked with isWeb3Available
    const ethereum = window.ethereum!;
    
    const chainId = await ethereum.request({ 
      method: 'eth_chainId' 
    });
    
    if (typeof chainId !== 'string') {
      throw new Error('Invalid chain ID response');
    }
    
    return chainId;
  } catch (error) {
    console.error('Error getting chain ID:', error);
    throw new Error('Failed to get chain ID');
  }
};

/**
 * Request a network switch to the specified chain
 * 
 * @param networkKey - Key of the network to switch to (e.g., 'ethereum', 'bsc')
 * @returns Promise<boolean> - true if successful
 */
export const switchNetwork = async (networkKey: keyof typeof NETWORK_CONFIG): Promise<boolean> => {
  if (!isWeb3Available()) {
    throw new Error('No Ethereum provider found');
  }
  
  // Assert ethereum is defined since we checked with isWeb3Available
  const ethereum = window.ethereum!;
  
  const network = NETWORK_CONFIG[networkKey];
  
  if (!network) {
    throw new Error(`Network ${networkKey} is not supported`);
  }
  
  try {
    // Try to switch to the network first
    await ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: network.chainId }],
    });
    
    return true;  } catch (error) {
    // If the error code indicates the chain needs to be added
    if (error && typeof error === 'object' && 'code' in error && error.code === 4902) {      try {
        await ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: network.chainId,
              chainName: network.chainName,
              nativeCurrency: network.nativeCurrency,
              rpcUrls: network.rpcUrls,
              blockExplorerUrls: network.blockExplorerUrls,
            },
          ],
        });
        
        return true;
      } catch (addError) {
        console.error('Error adding network:', addError);
        throw new Error('Failed to add network');
      }
    }
    
    console.error('Error switching network:', error);
    throw new Error('Failed to switch network');
  }
};

/**
 * Handle wallet connection to provide a consistent interface for different wallet providers
 * 
 * @returns Promise<{address: string, chainId: string}> - Wallet connection details
 */
export const connectWallet = async (): Promise<{address: string, chainId: string}> => {
  if (!isWeb3Available()) {
    throw new Error('No Ethereum provider found');
  }

  try {
    const accounts = await requestAccounts();
    if (!accounts || accounts.length === 0) {
      throw new Error('No accounts found');
    }

    const chainId = await getChainId();
    return {
      address: accounts[0],
      chainId,
    };
  } catch (error) {
    console.error('Wallet connection error:', error);
    throw error;
  }
};

/**
 * Get the balance of ETH/native token for an address
 * 
 * @param address - The wallet address
 * @returns Promise<string> - The balance in ETH/native token
 */
export const getBalance = async (address: string): Promise<string> => {
  if (!isWeb3Available()) {
    throw new Error('No Ethereum provider found');
  }

  // Assert ethereum is defined since we checked with isWeb3Available
  const ethereum = window.ethereum!;

  try {
    // Get balance in wei
    const balance = await ethereum.request({
      method: 'eth_getBalance',
      params: [address, 'latest'],
    });

    if (typeof balance !== 'string') {
      throw new Error('Invalid balance response');
    }

    // Convert from wei to ETH
    const ethBalance = parseInt(balance, 16) / 1e18;
    return ethBalance.toString();
  } catch (error) {
    console.error('Error getting balance:', error);
    throw new Error('Failed to get balance');
  }
};

/**
 * Get token balance for an ERC20 token
 * This requires a token contract instance which is not implemented here
 * You would typically need a library like ethers.js or web3.js to implement this
 */

/**
 * Register event listeners for wallet events
 * 
 * @param handlers - Object containing event handlers
 * @returns Function - A cleanup function to remove event listeners
 */
export const registerWalletEvents = (handlers: {
  onAccountsChanged?: (accounts: string[]) => void;
  onChainChanged?: (chainId: string) => void;
  onDisconnect?: () => void;
}): (() => void) => {
  if (!isWeb3Available()) {
    return () => {}; // Return a no-op function if Web3 is not available
  }

  // Assert ethereum is defined since we checked with isWeb3Available
  const ethereum = window.ethereum!;

  // Account changes
  if (handlers.onAccountsChanged) {
    ethereum.on('accountsChanged', handlers.onAccountsChanged as EthereumEventHandler);
  }
  
  // Network/chain changes
  if (handlers.onChainChanged) {
    ethereum.on('chainChanged', handlers.onChainChanged as EthereumEventHandler);
  }
  
  // Disconnect events (mostly for WalletConnect)
  if (handlers.onDisconnect) {
    ethereum.on('disconnect', handlers.onDisconnect as EthereumEventHandler);
  }

  // Return cleanup function
  return () => {
    if (handlers.onAccountsChanged) {
      ethereum.removeListener('accountsChanged', handlers.onAccountsChanged as EthereumEventHandler);
    }
    if (handlers.onChainChanged) {
      ethereum.removeListener('chainChanged', handlers.onChainChanged as EthereumEventHandler);
    }
    if (handlers.onDisconnect) {
      ethereum.removeListener('disconnect', handlers.onDisconnect as EthereumEventHandler);
    }
  };
};

// Define the types for ethereum methods and events
type EthereumRequest = { method: string; params?: unknown[] };
type EthereumResponse = string | string[] | Record<string, unknown> | undefined | null;
type AccountsChangedHandler = (accounts: string[]) => void;
type ChainChangedHandler = (chainId: string) => void;
type DisconnectHandler = () => void;
type EthereumEventHandler = AccountsChangedHandler | ChainChangedHandler | DisconnectHandler;

// Add TypeScript declarations for window.ethereum
declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean;
      request: (request: EthereumRequest) => Promise<EthereumResponse>;
      on: (eventName: string, handler: EthereumEventHandler) => void;
      removeListener: (eventName: string, handler: EthereumEventHandler) => void;
    };
  }
}