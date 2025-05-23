// filepath: app/lib/api/coin-market.fixed.ts
import axios, { AxiosError } from 'axios';

// Import rate limiter and key manager
import { trackApiRequest } from './rate-limiter';
import { getApiKey, reportApiKeyError } from './key-manager';

// API configuration
const COINAPI_URL = 'https://rest.coinapi.io/v1';
const ETHERSCAN_API_URL = 'https://api.etherscan.io/api';
const BSC_API_URL = 'https://api.bscscan.com/api';

// Get keys from environment variables - used internally by methods
// We define but don't export these to avoid linting errors
// These are used internally by the class methods
const COINAPI_KEY = process.env.COINAPI_KEY || '';
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || '';

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

export interface TokenMarketData {
  marketCap?: number;
  volume24h?: number;
  allTimeHigh?: number;
  allTimeHighDate?: string;
  circulatingSupply?: number;
  totalSupply?: number;
  maxSupply?: number;
  description?: string;
  websites?: string[];
  explorer?: string;
}

// In-memory cache with 5-minute expiry
const priceCache: Record<string, { price: number; timestamp: number }> = {};
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes in milliseconds

/**
 * API wrapper for cryptocurrency and blockchain data
 */
export class CoinMarketAPI {
  private coinApiKey: string;
  private etherscanApiKey: string;
  
  constructor(
    coinApiKey = COINAPI_KEY,
    etherscanApiKey = ETHERSCAN_API_KEY
  ) {
    this.coinApiKey = coinApiKey;
    this.etherscanApiKey = etherscanApiKey;
    
    // Log API key availability status on initialization
    console.log(`CoinMarketAPI initialized:`);
    console.log(`- CoinAPI key: ${this.coinApiKey ? 'Available' : 'Missing'}`);
    console.log(`- Etherscan API key: ${this.etherscanApiKey ? 'Available' : 'Missing'}`);
  }
  /**
   * Get token price from CoinAPI or mock data
   */
  async getTokenPrice(tokenSymbol: string): Promise<PriceData | ApiErrorResponse> {
    try {
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
      
      // Check API rate limits before making the request
      const apiLimitStatus = trackApiRequest('coinapi');
      
      // Get an API key (potentially rotated if needed)
      const activeApiKey = getApiKey('coinapi') || this.coinApiKey;

      if (activeApiKey && apiLimitStatus.canProceed) {
        try {
          // Format the asset pair for CoinAPI (e.g., BTC/USD)
          const assetPair = `${symbol}/USD`;
          
          // Call CoinAPI for current exchange rate
          const response = await axios.get(`${COINAPI_URL}/exchangerate/${assetPair}`, {
            headers: {
              'X-CoinAPI-Key': activeApiKey
            },
            timeout: 10000 // 10 seconds timeout
          });
          
          price = response.data.rate;
          source = 'api';
          console.log(`CoinAPI price for ${symbol}: $${price}`);
        } catch (apiError) {
          console.error(`CoinAPI error for ${symbol}:`, apiError);
          // Report API key error for potential rotation
          reportApiKeyError('coinapi', activeApiKey);
          // Fall back to mock prices if API call fails
          price = this.getMockPrice(symbol);
        }
      } else {
        if (!apiLimitStatus.canProceed) {
          console.warn(`CoinAPI rate limit reached, using mock data. Reset in ${Math.ceil(apiLimitStatus.resetInMs! / 1000 / 60)} minutes`);
        }
        // Use mock prices when API key is not available or rate limit reached
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
      const apiUrl = this.getApiUrl(network);
      
      // Check API key explicitly and log it for debugging (partially masked)
      if (!this.etherscanApiKey || this.etherscanApiKey.trim() === '') {
        console.warn(`No API key found for ${network} block explorer. Using minimal functionality.`);
        return {
          error: true,
          message: `Missing ${network} block explorer API key`,
          details: { missingApiKey: true }
        };
      }
      
      // Log masked API key for debugging
      const maskedKey = this.etherscanApiKey.substring(0, 6) + '...' + 
        this.etherscanApiKey.substring(this.etherscanApiKey.length - 4);
      console.log(`Using ${network} API key: ${maskedKey}`);
      
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
      if (response.data.error) {
        return {
          error: true,
          message: response.data.error.message || 'API returned an error',
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
      const apiUrl = this.getApiUrl(network);
      
      // Check API rate limits before making the request
      const apiLimitStatus = trackApiRequest('etherscan');
      
      // Get an API key (potentially rotated if needed)
      const activeApiKey = getApiKey('etherscan') || this.etherscanApiKey;
      
      // Check API key explicitly before making the request
      if (!activeApiKey || activeApiKey.trim() === '') {
        console.warn(`No API key found for ${network} block explorer. Using minimal functionality.`);
        return {
          error: true,
          message: `Missing ${network} block explorer API key`,
          details: { missingApiKey: true }
        };
      }
      
      // Check if we can proceed with the request
      if (!apiLimitStatus.canProceed) {
        console.warn(`Etherscan API rate limit reached. Reset in ${Math.ceil(apiLimitStatus.resetInMs! / 1000 / 60)} minutes`);
        return {
          error: true,
          message: `API rate limit reached. Please try again later.`,
          details: { rateLimitReached: true, resetInMinutes: Math.ceil(apiLimitStatus.resetInMs! / 1000 / 60) }
        };
      }
      
      const response = await axios.get(apiUrl, {
        params: {
          module: 'proxy',
          action: 'eth_gasPrice',
          apikey: activeApiKey
        },
        timeout: 10000
      });
      
      // Check for various error formats in Etherscan response
      if (response.data.error !== undefined) {
        // Report API error for potential key rotation
        reportApiKeyError('etherscan', activeApiKey);
        
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

  /**
   * Get extended market data for a token
   */
  async getTokenMarketData(tokenSymbol: string): Promise<TokenMarketData | ApiErrorResponse> {
    try {
      // Normalize symbol
      const symbol = tokenSymbol.toUpperCase();
        // Use CoinAPI if API key is available
      let data: TokenMarketData = {};
      
      // Check API rate limits before making the request
      const apiLimitStatus = trackApiRequest('coinapi');
      
      // Get an API key (potentially rotated if needed)
      const activeApiKey = getApiKey('coinapi') || this.coinApiKey;

      if (activeApiKey && apiLimitStatus.canProceed) {
        try {
          // Call CoinAPI for token details
          const response = await axios.get(`${COINAPI_URL}/assets/${symbol}`, {
            headers: {
              'X-CoinAPI-Key': activeApiKey
            },
            timeout: 15000 // 15 seconds timeout
          });
          
          // Process API response into our TokenMarketData format
          const apiData = response.data;
          
          data = {
            marketCap: apiData.market_cap_usd,
            volume24h: apiData.volume_1day_usd,
            circulatingSupply: apiData.circulating_supply,
            totalSupply: apiData.total_supply,
            maxSupply: apiData.max_supply,
            // Additional data if available
            description: apiData.description,
            websites: apiData.url_website ? [apiData.url_website] : [],
            explorer: apiData.url_explorer
          };
          
          // Get historical data to find all-time high
          const historicalPrices = await this.getHistoricalPrices(symbol, 2000); // ~5.5 years
          
          if (!('error' in historicalPrices) && historicalPrices.length > 0) {
            const highestPrice = historicalPrices.reduce(
              (max, point) => point.price_high > max.price ? 
                { price: point.price_high, date: point.time_period_start } : max,
              { price: 0, date: '' }
            );
            
            data.allTimeHigh = highestPrice.price;
            data.allTimeHighDate = highestPrice.date;
          }
            console.log(`CoinAPI market data fetched for ${symbol}`);
        } catch (apiError) {
          console.error(`CoinAPI error for ${symbol} market data:`, apiError);
          // Report API key error for potential rotation
          reportApiKeyError('coinapi', activeApiKey);
          // Fall back to mock data if API call fails
          data = this.getMockMarketData(symbol);
        }
      } else {
        if (!apiLimitStatus.canProceed) {
          console.warn(`CoinAPI rate limit reached, using mock market data. Reset in ${Math.ceil(apiLimitStatus.resetInMs! / 1000 / 60)} minutes`);
        }
        // Use mock data when API key is not available or rate limit reached
        data = this.getMockMarketData(symbol);
      }

      return data;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error(`Error getting market data for ${tokenSymbol}:`, error);
      
      return {
        error: true,
        message: `Failed to get market data for ${tokenSymbol}: ${errorMessage}`,
        details: error
      };
    }
  }

  /**
   * Get price change for a specific time period
   */
  async getTokenPriceChange(tokenSymbol: string, days: number): Promise<number | null> {
    try {
      const historicalPrices = await this.getHistoricalPrices(tokenSymbol, days);
      
      if ('error' in historicalPrices || historicalPrices.length < 2) {
        return null;
      }
      
      const oldestPrice = historicalPrices[0].price_close;
      const newestPrice = historicalPrices[historicalPrices.length - 1].price_close;
      
      const percentageChange = ((newestPrice - oldestPrice) / oldestPrice) * 100;
      return parseFloat(percentageChange.toFixed(2));
    } catch (error) {
      console.error(`Error calculating price change for ${tokenSymbol}:`, error);
      return null;
    }
  }

  /**
   * Get related tokens (similar market category)
   */
  async getRelatedTokens(tokenSymbol: string): Promise<string[] | ApiErrorResponse> {
    try {
      // For mock implementation, return fixed related tokens based on the symbol
      const relatedTokenMap: Record<string, string[]> = {
        'BTC': ['ETH', 'LTC', 'BCH', 'DOGE', 'XRP'],
        'ETH': ['BTC', 'BNB', 'SOL', 'ADA', 'DOT'],
        'USDT': ['USDC', 'DAI', 'BUSD', 'UST', 'TUSD'],
        'BNB': ['ETH', 'SOL', 'ADA', 'AVAX', 'DOT'],
        'USDC': ['USDT', 'DAI', 'BUSD', 'UST', 'TUSD'],
        'XRP': ['XLM', 'ADA', 'DOT', 'ALGO', 'BTC'],
        'SOL': ['ETH', 'ADA', 'AVAX', 'DOT', 'MATIC'],
        'ADA': ['SOL', 'DOT', 'ALGO', 'XTZ', 'ETH'],
        'DOGE': ['SHIB', 'BTC', 'LTC', 'BCH', 'XRP'],
        'DOT': ['KSM', 'ADA', 'ETH', 'SOL', 'AVAX']
      };
      
      const symbol = tokenSymbol.toUpperCase();
      
      // Return related tokens if defined, otherwise return most popular tokens
      return relatedTokenMap[symbol] || ['BTC', 'ETH', 'USDT', 'BNB', 'XRP'];
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error(`Error getting related tokens for ${tokenSymbol}:`, error);
      
      return {
        error: true,
        message: `Failed to get related tokens for ${tokenSymbol}: ${errorMessage}`,
        details: error
      };
    }
  }

  /**
   * Generate mock market data for testing
   */
  private getMockMarketData(symbol: string): TokenMarketData {
    // Base market caps for major tokens
    const baseMarketCaps: Record<string, number> = {
      'BTC': 1000000000000, // $1 trillion
      'ETH': 300000000000,  // $300 billion
      'USDT': 80000000000,  // $80 billion
      'BNB': 50000000000,   // $50 billion
      'USDC': 40000000000,  // $40 billion
      'XRP': 30000000000,   // $30 billion
      'SOL': 25000000000,   // $25 billion
      'ADA': 15000000000,   // $15 billion
      'DOGE': 12000000000,  // $12 billion
      'DOT': 8000000000     // $8 billion
    };
    
    // Default if not in our list
    const defaultMarketCap = 5000000000; // $5 billion
    
    const tokenSymbol = symbol.toUpperCase();
    const marketCap = baseMarketCaps[tokenSymbol] || defaultMarketCap;
    const price = this.getMockPrice(tokenSymbol);
    
    // Calculate mock supplies based on price and market cap
    const circulatingSupply = Math.floor(marketCap / price);
    const totalSupply = Math.floor(circulatingSupply * (Math.random() * 0.3 + 1.05)); // 5-35% more than circulating
    
    // 80% chance of having a max supply
    const hasMaxSupply = Math.random() > 0.2;
    const maxSupply = hasMaxSupply ? Math.floor(totalSupply * (Math.random() * 0.5 + 1.2)) : undefined; // 20-70% more than total
    
    // Generate mock volume (typically 2-10% of market cap)
    const volumeFactor = Math.random() * 0.08 + 0.02; // 2-10%
    const volume24h = Math.floor(marketCap * volumeFactor);
    
    // Generate mock all-time high (10-300% higher than current price)
    const athFactor = Math.random() * 2.9 + 1.1; // 1.1x to 4x
    const allTimeHigh = price * athFactor;
    
    // Random date in the past 1-3 years
    const daysAgo = Math.floor(Math.random() * 730) + 365; // Between 365 and 1095 days ago
    const allTimeHighDate = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000).toISOString();
    
    // Mock description and links
    const description = `${tokenSymbol} is a digital asset that aims to revolutionize the way we think about digital transactions and store of value. Built on advanced blockchain technology, it offers secure, transparent, and efficient solutions for various use cases.`;
    
    // Mock websites and explorer links
    const websites = [`https://www.${tokenSymbol.toLowerCase()}.org`, `https://www.${tokenSymbol.toLowerCase()}.io`];
    const explorer = `https://explorer.${tokenSymbol.toLowerCase()}.org`;
    
    return {
      marketCap,
      volume24h,
      allTimeHigh,
      allTimeHighDate,
      circulatingSupply,
      totalSupply,
      maxSupply,
      description,
      websites,
      explorer
    };
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
export const getTokenMarketData = (symbol: string) => coinMarketAPI.getTokenMarketData(symbol);
export const getTokenPriceChange = (symbol: string, days: number) => coinMarketAPI.getTokenPriceChange(symbol, days);
export const getRelatedTokens = (symbol: string) => coinMarketAPI.getRelatedTokens(symbol);
