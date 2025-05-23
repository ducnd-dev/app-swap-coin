// filepath: app/lib/api/coin-market.solution.ts
import axios, { AxiosError } from 'axios';

// API configuration
const COINAPI_URL = 'https://rest.coinapi.io/v1';
const ETHERSCAN_API_URL = 'https://api.etherscan.io/api';
const BSC_API_URL = 'https://api.bscscan.com/api';

// Type definitions
export interface PriceData {
  symbol: string;
  price: number;
  timestamp: number;
  source: 'api' | 'mock';
}

export interface PriceDataPoint {
  time_period_start: string;
  time_period_end: string;
  time_open?: string;
  time_close?: string;
  price_open: number;
  price_high: number;
  price_low: number;
  price_close: number;
  volume_traded?: number;
  trades_count?: number;
  source?: 'api' | 'mock';
}

export interface Transaction {
  hash?: string;
  from?: string;
  to?: string;
  value?: string;
  blockNumber?: string;
  blockHash?: string;
  gas?: string;
  gasPrice?: string;
  input?: string;
}

export interface TokenInfo {
  name?: string;
  symbol?: string;
  totalSupply?: string;
  decimals?: string;
  contractAddress?: string;
  divisor?: string;
}

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

export interface ApiErrorResponse {
  error: true;
  message: string;
  details?: unknown;
}

// In-memory cache with 5-minute expiry
const priceCache: Record<string, { price: number; timestamp: number }> = {};
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes in milliseconds

/**
 * API wrapper for cryptocurrency and blockchain data
 */
export class CoinMarketAPI {
  // Make API keys public so they can be set manually if needed
  public coinApiKey: string;
  public etherscanApiKey: string;
  
  constructor(coinApiKey?: string, etherscanApiKey?: string) {
    // Get API keys from environment or constructor parameters
    this.coinApiKey = coinApiKey || process.env.COINAPI_KEY || '';
    this.etherscanApiKey = etherscanApiKey || process.env.ETHERSCAN_API_KEY || '';
    
    // Log API key availability status on initialization
    console.log(`CoinMarketAPI initialized:`);
    console.log(`- CoinAPI key: ${this.coinApiKey ? 'Available' : 'Missing'}`);
    console.log(`- Etherscan API key: ${this.etherscanApiKey ? 'Available' : 'Missing'}`);
    
    // Check keys on initialization and warm them up
    this.refreshKeys();
  }
  
  /**
   * Refresh API keys from environment variables
   */
  public refreshKeys(): void {
    if (!this.coinApiKey) {
      this.coinApiKey = process.env.COINAPI_KEY || '';
      console.log(`CoinAPI key refreshed: ${this.coinApiKey ? 'Available' : 'Still missing'}`);
    }
    
    if (!this.etherscanApiKey) {
      this.etherscanApiKey = process.env.ETHERSCAN_API_KEY || '';
      console.log(`Etherscan API key refreshed: ${this.etherscanApiKey ? 'Available' : 'Still missing'}`);
      
      // Log masked key for debugging if available
      if (this.etherscanApiKey) {
        const keyLength = this.etherscanApiKey.length;
        if (keyLength > 10) {
          const maskedKey = this.etherscanApiKey.substring(0, 6) + '...' + 
            this.etherscanApiKey.substring(keyLength - 4);
          console.log(`Using Etherscan API key: ${maskedKey} (${keyLength} chars)`);
        }
      }
    }
  }

  /**
   * Get token price from CoinAPI or mock data
   */
  async getTokenPrice(tokenSymbol: string): Promise<PriceData | ApiErrorResponse> {
    try {
      // Refresh keys if needed
      this.refreshKeys();
      
      // Normalize symbol
      const symbol = tokenSymbol.toUpperCase();
      
      // Check cache first
      const cachedData = priceCache[symbol];
      const now = Date.now();
      
      if (cachedData && now - cachedData.timestamp < CACHE_TTL) {
        return {
          symbol,
          price: cachedData.price,
          timestamp: cachedData.timestamp,
          source: 'mock' // Mark as coming from cache
        };
      }

      // Use CoinAPI if API key is available
      let price: number;
      let source: 'api' | 'mock' = 'mock';

      if (this.coinApiKey) {
        try {
          // Format the asset pair for CoinAPI (e.g., BTC/USD)
          const assetPair = `${symbol}/USD`;
          
          // Call CoinAPI for current exchange rate
          const response = await axios.get(`${COINAPI_URL}/exchangerate/${assetPair}`, {
            headers: {
              'X-CoinAPI-Key': this.coinApiKey
            },
            timeout: 10000 // 10 seconds timeout
          });
          
          price = response.data.rate;
          source = 'api';
          console.log(`CoinAPI price for ${symbol}: $${price}`);
        } catch (apiError) {
          console.error(`CoinAPI error for ${symbol}:`, apiError);
          // Fall back to mock prices if API call fails
          price = this.getMockPrice(symbol);
        }
      } else {
        // Use mock prices when API key is not available
        price = this.getMockPrice(symbol);
      }

      // Update cache
      priceCache[symbol] = {
        price,
        timestamp: now,
      };

      return {
        symbol,
        price,
        timestamp: now,
        source
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error(`Error getting price for ${tokenSymbol}:`, error);
      
      return {
        error: true,
        message: `Failed to get price for ${tokenSymbol}: ${errorMessage}`,
        details: error
      };
    }
  }

  /**
   * Get historical price data
   */
  async getHistoricalPrices(
    tokenSymbol: string, 
    days: number = 7
  ): Promise<PriceDataPoint[] | ApiErrorResponse> {
    try {
      // Refresh keys if needed
      this.refreshKeys();
      
      // Normalize symbol
      const symbol = tokenSymbol.toUpperCase();
      
      // If no API key is available, return mock data right away
      if (!this.coinApiKey) {
        return this.generateMockHistoricalPrices(symbol, days);
      }

      // Format the asset pair for CoinAPI (e.g., BTC/USD)
      const assetPair = `${symbol}/USD`;
      
      // Calculate the start and end dates
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);
      
      // Format dates for API
      const startDateStr = startDate.toISOString();
      const endDateStr = endDate.toISOString();
      
      // Call CoinAPI for historical data
      try {
        const response = await axios.get(
          `${COINAPI_URL}/ohlcv/${assetPair}/history`, {
            headers: {
              'X-CoinAPI-Key': this.coinApiKey
            },
            params: {
              period_id: '1DAY',  // Daily data
              time_start: startDateStr,
              time_end: endDateStr,
              limit: days
            },
            timeout: 10000 // 10 seconds timeout
          }
        );
        
        // Add source information to each data point
        const apiData = response.data.map((point: PriceDataPoint) => ({
          ...point,
          source: 'api' as const
        }));
        
        console.log(`CoinAPI historical data for ${symbol}: ${apiData.length} points`);
        return apiData;
      } catch (apiError) {
        const axiosError = apiError as AxiosError;
        console.error(`CoinAPI historical data error for ${symbol}:`, 
          axiosError.response?.data || axiosError.message);
        
        // Fall back to mock data if API call fails
        return this.generateMockHistoricalPrices(symbol, days);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error(`Error getting historical prices for ${tokenSymbol}:`, error);
      
      return {
        error: true,
        message: `Failed to get historical prices for ${tokenSymbol}: ${errorMessage}`,
        details: error
      };
    }
  }

  /**
   * Get transaction details from Etherscan
   */  
  async getTransactionDetails(
    txHash: string, 
    network = 'ETH'
  ): Promise<Transaction | ApiErrorResponse> {
    try {
      // Refresh keys if needed
      this.refreshKeys();
      
      const apiUrl = this.getApiUrl(network);
      
      // Check API key explicitly and log it for debugging
      if (!this.etherscanApiKey || this.etherscanApiKey.trim() === '') {
        console.warn(`No API key found for ${network} block explorer. Using minimal functionality.`);
        return {
          error: true,
          message: `Missing ${network} block explorer API key`,
          details: { missingApiKey: true }
        };
      }
      
      const response = await axios.get(apiUrl, {
        params: {
          module: 'proxy',
          action: 'eth_getTransactionByHash',
          txhash: txHash,
          apikey: this.etherscanApiKey
        },
        timeout: 10000
      });
      
      // Check for different error formats in Etherscan response
      if (response.data.error !== undefined) {
        return {
          error: true,
          message: typeof response.data.error === 'object' && response.data.error.message 
            ? response.data.error.message 
            : String(response.data.error) || 'API returned an error',
          details: response.data.error
        };
      }
      
      if (response.data.status === '0') {
        return {
          error: true,
          message: response.data.message || 'API returned status 0',
          details: response.data
        };
      }
      
      if (!response.data.result) {
        return {
          error: true,
          message: `No transaction found with hash: ${txHash}`,
          details: response.data
        };
      }
      
      return response.data.result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error(`Error getting transaction details from ${network} block explorer:`, error);
      
      return {
        error: true, 
        message: errorMessage,
        details: error
      };
    }
  }

  /**
   * Get token information from Etherscan
   */
  async getTokenInfo(
    tokenAddress: string, 
    network = 'ETH'
  ): Promise<TokenInfo | ApiErrorResponse> {
    try {
      // Refresh keys if needed
      this.refreshKeys();
      
      const apiUrl = this.getApiUrl(network);
      
      // Check API key explicitly
      if (!this.etherscanApiKey || this.etherscanApiKey.trim() === '') {
        console.warn(`No API key found for ${network} block explorer. Using minimal functionality.`);
        return {
          error: true,
          message: `Missing ${network} block explorer API key`,
          details: { missingApiKey: true }
        };
      }
      
      const response = await axios.get(apiUrl, {
        params: {
          module: 'token',
          action: 'tokeninfo',
          contractaddress: tokenAddress,
          apikey: this.etherscanApiKey
        },
        timeout: 10000
      });
      
      if (response.data.status === '0') {
        return {
          error: true,
          message: response.data.message || 'API returned status 0',
          details: response.data
        };
      }
      
      const result = response.data.result;
      
      if (Array.isArray(result) && result.length > 0) {
        return result[0];
      }
      
      return {
        error: true,
        message: 'No token information found',
        details: response.data
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error(`Error getting token info from ${network} block explorer:`, error);
      
      return {
        error: true,
        message: errorMessage,
        details: error
      };
    }
  }

  /**
   * Get current gas price from Etherscan
   */
  async getGasPrice(network = 'ETH'): Promise<string | ApiErrorResponse> {
    try {
      // Refresh keys if needed
      this.refreshKeys();
      
      const apiUrl = this.getApiUrl(network);
      
      // Check API key explicitly before making the request
      if (!this.etherscanApiKey || this.etherscanApiKey.trim() === '') {
        console.warn(`No API key found for ${network} block explorer. Using minimal functionality.`);
        return {
          error: true,
          message: `Missing ${network} block explorer API key`,
          details: { missingApiKey: true }
        };
      }
      
      const response = await axios.get(apiUrl, {
        params: {
          module: 'proxy',
          action: 'eth_gasPrice',
          apikey: this.etherscanApiKey
        },
        timeout: 10000
      });
      
      // Safeguard against error response
      if (typeof response.data !== 'object') {
        return {
          error: true,
          message: `Unexpected API response: ${String(response.data)}`,
          details: response.data
        };
      }
      
      // Check for various error formats in Etherscan response
      if (response.data.error !== undefined) {
        return {
          error: true,
          message: typeof response.data.error === 'object' && response.data.error.message 
            ? response.data.error.message 
            : String(response.data.error) || 'API returned an error',
          details: response.data.error
        };
      }
      
      if (response.data.status === '0') {
        return {
          error: true,
          message: response.data.message || response.data.result || 'API returned status 0',
          details: response.data
        };
      }
      
      return response.data.result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error(`Error getting gas price from ${network} block explorer:`, error);
      
      return {
        error: true,
        message: errorMessage,
        details: error
      };
    }
  }

  /**
   * Check if a contract is verified on Etherscan
   */
  async isContractVerified(contractAddress: string, network = 'ETH'): Promise<boolean> {
    try {
      // Refresh keys if needed
      this.refreshKeys();
      
      const apiUrl = this.getApiUrl(network);
      
      // Check API key explicitly
      if (!this.etherscanApiKey || this.etherscanApiKey.trim() === '') {
        console.warn(`No API key found for ${network} block explorer. Using minimal functionality.`);
        return false;
      }
      
      const response = await axios.get(apiUrl, {
        params: {
          module: 'contract',
          action: 'getabi',
          address: contractAddress,
          apikey: this.etherscanApiKey
        },
        timeout: 10000
      });
      
      // If we can get the ABI, the contract is verified
      return response.data.status === '1';
    } catch (error) {
      console.error(`Error checking contract verification status from ${network} block explorer:`, error);
      return false;
    }
  }

  /**
   * Get token transactions from Etherscan
   */
  async getTokenTransactions(
    address: string,
    tokenAddress?: string,
    network = 'ETH'
  ): Promise<TokenTransaction[]> {
    try {
      // Refresh keys if needed
      this.refreshKeys();
      
      const apiUrl = this.getApiUrl(network);
      
      // Check API key explicitly
      if (!this.etherscanApiKey || this.etherscanApiKey.trim() === '') {
        console.warn(`No API key found for ${network} block explorer. Using minimal functionality.`);
        return [];
      }
      
      const params: Record<string, string> = {
        module: 'account',
        action: tokenAddress ? 'tokentx' : 'txlist',
        address: address,
        sort: 'desc',
        apikey: this.etherscanApiKey
      };
      
      if (tokenAddress) {
        params.contractaddress = tokenAddress;
      }
      
      const response = await axios.get(apiUrl, { params, timeout: 10000 });
      
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

  // Helper methods
  private getMockPrice(tokenSymbol: string): number {
    // For demo purposes, use some recognizable mock prices
    switch (tokenSymbol.toUpperCase()) {
      case 'BTC':
        return 50000 + (Math.random() * 1000 - 500); // Around 50,000
      case 'ETH':
        return 3000 + (Math.random() * 100 - 50);   // Around 3,000
      case 'USDT':
      case 'USDC':
        return 0.995 + (Math.random() * 0.01);      // Around 1.00
      case 'BNB':
        return 400 + (Math.random() * 20 - 10);     // Around 400
      default:
        return 10 + (Math.random() * 5 - 2.5);      // Random ~10
    }
  }

  private generateMockHistoricalPrices(symbol: string, days: number): PriceDataPoint[] {
    const data: PriceDataPoint[] = [];
    const endDate = new Date();
    let basePrice: number;
    
    // Set a realistic base price for known tokens
    switch (symbol.toUpperCase()) {
      case 'BTC':
        basePrice = 50000;
        break;
      case 'ETH':
        basePrice = 3000;
        break;
      case 'USDT':
      case 'USDC':
        basePrice = 1;
        break;
      case 'BNB':
        basePrice = 400;
        break;
      default:
        basePrice = 10;
    }
    
    // Generate daily price data with a random walk
    for (let i = 0; i < days; i++) {
      const date = new Date(endDate);
      date.setDate(date.getDate() - (days - i));
      
      // Add some randomness to create price fluctuation
      // The volatility is proportional to the base price
      const volatility = basePrice * 0.02; // 2% daily volatility
      const change = (Math.random() - 0.5) * volatility;
      basePrice = Math.max(0.01, basePrice + change);
      
      data.push({
        time_period_start: date.toISOString(),
        time_period_end: new Date(date.getTime() + 24 * 60 * 60 * 1000).toISOString(),
        time_open: date.toISOString(),
        time_close: new Date(date.getTime() + 23 * 60 * 60 * 1000).toISOString(),
        price_open: basePrice - (Math.random() * 0.01 * basePrice),
        price_high: basePrice + (Math.random() * 0.02 * basePrice),
        price_low: basePrice - (Math.random() * 0.02 * basePrice),
        price_close: basePrice,
        volume_traded: Math.random() * 10000,
        trades_count: Math.floor(Math.random() * 1000),
        source: 'mock'
      });
    }
    
    return data;
  }

  private getApiUrl(network: string): string {
    switch (network.toUpperCase()) {
      case 'ETH':
        return ETHERSCAN_API_URL;
      case 'BSC':
        return BSC_API_URL;
      default:
        throw new Error(`Unsupported network for block explorer API: ${network}`);
    }
  }
}

// Create an instance for direct usage
export const coinMarketAPI = new CoinMarketAPI();

// Export individual functions for backwards compatibility
export const getTokenPrice = (symbol: string) => coinMarketAPI.getTokenPrice(symbol);
export const getHistoricalPrices = (symbol: string, days?: number) => coinMarketAPI.getHistoricalPrices(symbol, days);
export const getTransactionDetails = (txHash: string, network?: string) => coinMarketAPI.getTransactionDetails(txHash, network);
export const getTokenInfo = (address: string, network?: string) => coinMarketAPI.getTokenInfo(address, network);
export const getGasPrice = (network?: string) => coinMarketAPI.getGasPrice(network);
export const isContractVerified = (address: string, network?: string) => coinMarketAPI.isContractVerified(address, network);
export const getTokenTransactions = (address: string, tokenAddress?: string, network?: string) => 
  coinMarketAPI.getTokenTransactions(address, tokenAddress, network);
