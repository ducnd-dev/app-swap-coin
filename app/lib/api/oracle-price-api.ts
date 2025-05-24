// Service API client for Oracle Price
import axios from 'axios';

export interface TokenPrice {
  symbol: string;
  price: number;
  change24h: number;
  lastUpdated: string;
  source: string;
}

export interface OraclePriceResponse {
  prices: TokenPrice[];
  count: number;
  timestamp: string;
  performance: {
    requestedTokens: number;
    successfulRequests: number;
    chainlinkSources: number;
    mockSources: number;
    status: 'success' | 'partial' | 'all-mock' | 'error';
  };
}

/**
 * Token information with metadata
 */
export interface Token {
  symbol: string;
  name: string;
  address?: string;
  decimals: number;
  logoUrl?: string;
  isPopular?: boolean;
  isStablecoin?: boolean;
  chainId?: number;
}

/**
 * Response for token list API
 */
export interface TokenListResponse {
  tokens: Token[];
  count: number;
  timestamp: string;
}

/**
 * Get token prices from Oracle API
 * @param symbols Token symbols to fetch prices for (max 10)
 * @param options Request options
 * @returns Promise with token prices
 */
export async function getOraclePrices(
  symbols: string[] = ['ETH', 'BTC', 'USDT'], 
  options: { timeout?: number } = {}
): Promise<OraclePriceResponse> {
  try {
    const symbolsParam = symbols.map(s => s.trim().toUpperCase()).join(',');
    const timeout = options.timeout || 8000;

    const response = await axios.get<OraclePriceResponse>(
      `/api/tokens/oracle-price?symbols=${symbolsParam}`,
      { timeout }
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching oracle prices:', error);
    throw new Error('Failed to fetch token prices from oracle');
  }
}

/**
 * Get price for a specific token from Oracle API
 * @param symbol Token symbol
 * @param options Request options
 * @returns Promise with token price
 */
export async function getTokenOraclePrice(
  symbol: string,
  options: { timeout?: number } = {}
): Promise<TokenPrice> {
  try {
    const normalizedSymbol = symbol.trim().toUpperCase();
    const timeout = options.timeout || 5000;

    const response = await axios.get<TokenPrice>(
      `/api/tokens/oracle-price?symbol=${normalizedSymbol}`,
      { timeout }
    );

    return response.data;
  } catch (error) {
    console.error(`Error fetching price for ${symbol}:`, error);
    throw new Error(`Failed to fetch price for ${symbol}`);
  }
}

/**
 * Get list of available tokens for selection
 * @returns Promise with token list
 */
export async function getAvailableTokens(
  options: { includePopular?: boolean; includeStablecoins?: boolean; timeout?: number } = {}
): Promise<TokenListResponse> {
  try {
    const { includePopular = true, includeStablecoins = true, timeout = 5000 } = options;
    
    // Build query parameters
    const params = new URLSearchParams();
    if (includePopular) params.append('popular', 'true');
    if (includeStablecoins) params.append('stablecoins', 'true');
    
    const queryString = params.toString();
    const url = `/api/tokens${queryString ? `?${queryString}` : ''}`;

    const response = await axios.get<TokenListResponse>(url, { timeout });

    return response.data;
  } catch (error) {
    console.error('Error fetching available tokens:', error);
    throw new Error('Failed to fetch available tokens');
  }
}
