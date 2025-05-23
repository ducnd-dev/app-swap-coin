import axios from 'axios';

// API configuration
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || '';
const ETHERSCAN_API_URL = 'https://api.etherscan.io/api';
const BSC_API_URL = 'https://api.bscscan.com/api';

/**
 * Get API URL based on network
 * @param network - The network identifier
 * @returns The API URL for the network
 */
function getApiUrl(network: string): string {
  switch (network.toUpperCase()) {
    case 'ETH':
      return ETHERSCAN_API_URL;
    case 'BSC':
      return BSC_API_URL;
    default:
      throw new Error(`Unsupported network for block explorer API: ${network}`);
  }
}

/**
 * Get API key for all networks
 * @returns The API key for the network
 */
function getApiKey(): string {
  // For this implementation, we'll use the same key for all networks
  // In a production app, you might have different keys for different networks
  return ETHERSCAN_API_KEY;
}

/**
 * Get transaction details from block explorer API
 * @param txHash - The transaction hash
 * @param network - The network identifier
 * @returns Transaction details from block explorer
 */
export async function getTransactionDetails(txHash: string, network = 'ETH'): Promise<Record<string, unknown>> {
  try {    const apiUrl = getApiUrl(network);
    const apiKey = getApiKey();
    
    if (!apiKey) {
      console.warn(`No API key found for ${network} block explorer. Some functionality may be limited.`);
    }
    
    const response = await axios.get(apiUrl, {
      params: {
        module: 'proxy',
        action: 'eth_getTransactionByHash',
        txhash: txHash,
        apikey: apiKey
      },
      // Add timeout to prevent hanging requests
      timeout: 10000
    });
    
    if (response.data.error) {
      throw new Error(response.data.error.message);
    }
    
    if (!response.data.result) {
      throw new Error(`No transaction found with hash: ${txHash}`);
    }
    
    return response.data.result;
  } catch (error) {
    console.error(`Error getting transaction details from ${network} block explorer:`, error);
    // Return a structured error response instead of throwing
    return {
      error: true, 
      message: error instanceof Error ? error.message : 'Unknown error',
      hash: txHash,
      network
    };
  }
}

/**
 * Get token transaction history for an address
 * @param address - The wallet address
 * @param tokenAddress - The token contract address (optional, for specific token)
 * @param network - The network identifier
 * @returns Array of token transactions
 */
export async function getTokenTransactions(
  address: string, 
  tokenAddress?: string, 
  network = 'ETH'
): Promise<Record<string, unknown>[]> {
  try {
    const apiUrl = getApiUrl(network);
    const apiKey = getApiKey();
    
    const params: Record<string, string> = {
      module: 'account',
      action: tokenAddress ? 'tokentx' : 'txlist',
      address: address,
      sort: 'desc',
      apikey: apiKey
    };
    
    if (tokenAddress) {
      params.contractaddress = tokenAddress;
    }
    
    const response = await axios.get(apiUrl, { params });
    
    if (response.data.status === '0') {
      console.warn(`No transactions found or error: ${response.data.message}`);
      return [];
    }
    
    return response.data.result || [];
  } catch (error) {
    console.error(`Error getting token transactions from ${network} block explorer:`, error);
    return [];
  }
}

/**
 * Get token information from block explorer API
 * @param tokenAddress - The token contract address
 * @param network - The network identifier
 * @returns Token information
 */
export async function getTokenInfo(tokenAddress: string, network = 'ETH'): Promise<Record<string, unknown>> {
  try {
    const apiUrl = getApiUrl(network);
    const apiKey = getApiKey();
    
    const response = await axios.get(apiUrl, {
      params: {
        module: 'token',
        action: 'tokeninfo',
        contractaddress: tokenAddress,
        apikey: apiKey
      }
    });
    
    if (response.data.status === '0') {
      throw new Error(response.data.message);
    }
    
    return response.data.result[0] || null;
  } catch (error) {
    console.error(`Error getting token info from ${network} block explorer:`, error);
    throw error;
  }
}

/**
 * Get gas price from block explorer API
 * @param network - The network identifier
 * @returns Current gas price information
 */
export async function getGasPrice(network = 'ETH'): Promise<string> {
  try {
    const apiUrl = getApiUrl(network);
    const apiKey = getApiKey();
    
    const response = await axios.get(apiUrl, {
      params: {
        module: 'proxy',
        action: 'eth_gasPrice',
        apikey: apiKey
      }
    });
    
    if (response.data.error) {
      throw new Error(response.data.error.message);
    }
    
    return response.data.result;
  } catch (error) {
    console.error(`Error getting gas price from ${network} block explorer:`, error);
    throw error;
  }
}

/**
 * Verify a smart contract on the block explorer
 * @param contractAddress - The contract address
 * @param network - The network identifier
 * @returns Whether the contract is verified
 */
export async function isContractVerified(contractAddress: string, network = 'ETH'): Promise<boolean> {
  try {
    const apiUrl = getApiUrl(network);
    const apiKey = getApiKey();
    
    const response = await axios.get(apiUrl, {
      params: {
        module: 'contract',
        action: 'getabi',
        address: contractAddress,
        apikey: apiKey
      }
    });
    
    // If we can get the ABI, the contract is verified
    return response.data.status === '1';
  } catch (error) {
    console.error(`Error checking contract verification status from ${network} block explorer:`, error);
    return false;
  }
}
