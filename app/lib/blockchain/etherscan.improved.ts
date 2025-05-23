import axios, { AxiosError, AxiosRequestConfig } from 'axios';

// API configuration
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || '';
const ETHERSCAN_API_URL = 'https://api.etherscan.io/api';
const BSC_API_URL = 'https://api.bscscan.com/api';

// For backwards compatibility with other files that use the older API
export * from './etherscan';

// Error handling types
export interface ApiErrorResponse {
  error: true;
  message: string;
  network?: string;
  details?: unknown;
}

// Transaction types
export interface Transaction {
  hash?: string;
  from?: string;
  to?: string;
  value?: string;
  blockNumber?: string;
  blockHash?: string;
  gas?: string;
  gasPrice?: string;
  nonce?: string;
  transactionIndex?: string;
  input?: string;
  error?: boolean;
  message?: string;
  network?: string;
}

// Token information types
export interface TokenInfo {
  name?: string;
  symbol?: string;
  totalSupply?: string;
  decimals?: string;
  contractAddress?: string;
  divisor?: string;
  tokenType?: string;
  error?: boolean;
  message?: string;
}

// Token transaction types
export interface TokenTransaction {
  hash?: string;
  from?: string;
  to?: string;
  value?: string;
  tokenName?: string;
  tokenSymbol?: string;
  contractAddress?: string;
  blockNumber?: string;
  timeStamp?: string;
  gasPrice?: string;
  gasUsed?: string;
  error?: boolean;
  message?: string;
}

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
 * Get API key for API requests
 * @returns The API key for the network
 */
function getApiKey(): string {
  // For this implementation, we'll use the same key for all networks
  return ETHERSCAN_API_KEY;
}

/**
 * Make a safe API request with proper error handling
 * @param apiUrl - The API URL
 * @param params - The request parameters
 * @param network - The network identifier (for error context)
 * @returns The API response data or error information
 */
async function makeApiRequest<T>(
  apiUrl: string,
  params: Record<string, string | number | boolean>,
  network: string
): Promise<T | ApiErrorResponse> {
  try {
    const config: AxiosRequestConfig = {
      params,
      timeout: 10000, // 10 seconds timeout
    };
    
    const response = await axios.get(apiUrl, config);
    
    // Handle various error formats
    if (response.data.error) {
      return {
        error: true,
        message: response.data.error.message || 'API returned an error',
        network,
        details: response.data.error
      };
    }
    
    if (response.data.status === '0') {
      return {
        error: true,
        message: response.data.message || 'API returned status 0',
        network,
        details: response.data
      };
    }
    
    return response.data.result as T;
    
  } catch (error) {
    const axiosError = error as AxiosError;
    const errorMessage = axiosError.response
      ? `API error: ${axiosError.response.status} - ${axiosError.response.statusText}`
      : axiosError.message || 'Unknown API error';
      
    return {
      error: true,
      message: errorMessage,
      network,
      details: axiosError.response?.data || axiosError
    };
  }
}

/**
 * Get transaction details from block explorer API
 * @param txHash - The transaction hash
 * @param network - The network identifier
 * @returns Transaction details from block explorer
 */
export async function getTransactionDetails(
  txHash: string, 
  network = 'ETH'
): Promise<Transaction | ApiErrorResponse> {
  const apiUrl = getApiUrl(network);
  const apiKey = getApiKey();
  
  if (!apiKey) {
    console.warn(`No API key found for ${network} block explorer. Some functionality may be limited.`);
  }
  
  const params = {
    module: 'proxy',
    action: 'eth_getTransactionByHash',
    txhash: txHash,
    apikey: apiKey
  };
  
  const result = await makeApiRequest<Transaction>(apiUrl, params, network);
  
  if ('error' in result && result.error) {
    return result;
  }
  
  // Add some context to the result
  return {
    ...result,
    network
  };
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
): Promise<TokenTransaction[]> {
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
  
  const result = await makeApiRequest<TokenTransaction[]>(apiUrl, params, network);
  
  // If we got an error response, return empty array
  if ('error' in result && result.error) {
    console.warn(`Error getting token transactions: ${result.message}`);
    return [];
  }
  
  return result as TokenTransaction[];
}

/**
 * Get token information from block explorer API
 * @param tokenAddress - The token contract address
 * @param network - The network identifier
 * @returns Token information
 */
export async function getTokenInfo(
  tokenAddress: string, 
  network = 'ETH'
): Promise<TokenInfo | ApiErrorResponse> {
  const apiUrl = getApiUrl(network);
  const apiKey = getApiKey();
  
  const params = {
    module: 'token',
    action: 'tokeninfo',
    contractaddress: tokenAddress,
    apikey: apiKey
  };
  
  const result = await makeApiRequest<TokenInfo[]>(apiUrl, params, network);
  
  if ('error' in result && result.error) {
    return result;
  }
  
  // The API returns an array, but we only need the first item
  return Array.isArray(result) && result.length > 0 
    ? result[0] 
    : { error: true, message: 'No token information found' };
}

/**
 * Get gas price from block explorer API
 * @param network - The network identifier
 * @returns Current gas price information
 */
export async function getGasPrice(
  network = 'ETH'
): Promise<string | ApiErrorResponse> {
  const apiUrl = getApiUrl(network);
  const apiKey = getApiKey();
  
  const params = {
    module: 'proxy',
    action: 'eth_gasPrice',
    apikey: apiKey
  };
  
  const result = await makeApiRequest<string>(apiUrl, params, network);
  return result;
}

/**
 * Verify a smart contract on the block explorer
 * @param contractAddress - The contract address
 * @param network - The network identifier
 * @returns Whether the contract is verified
 */
export async function isContractVerified(
  contractAddress: string, 
  network = 'ETH'
): Promise<boolean> {
  const apiUrl = getApiUrl(network);
  const apiKey = getApiKey();
  
  const params = {
    module: 'contract',
    action: 'getabi',
    address: contractAddress,
    apikey: apiKey
  };
  
  const result = await makeApiRequest<string>(apiUrl, params, network);
  
  // If we can get the ABI, the contract is verified
  return typeof result === 'object' ? !('error' in result) : true;
}
