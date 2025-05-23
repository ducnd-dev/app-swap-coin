# API Integration Guide

This document outlines how CoinAPI and Etherscan API are integrated into the application.

## CoinAPI Integration

The CoinAPI is used to fetch real-time and historical cryptocurrency price data.

### API Key Configuration

1. The API key is stored in `.env` file as `COINAPI_KEY`
2. This key is used securely on the server-side only

### Integration Points

- `app/lib/api/prices.ts` - Main file for CoinAPI integration
  - `getTokenPrice()` - Fetches current price data for a token
  - `getHistoricalPrices()` - Fetches historical OHLCV data for charts
  - `getMultipleTokenPrices()` - Fetches prices for multiple tokens at once

- `app/lib/api/prices.improved.ts` - Database-independent implementation
  - Can be used in environments without database dependency
  - Fully typed responses with proper error handling
  - Same API surface with improved reliability

### Fallback Mechanism

The app includes a fallback to mock data generation when:
- Running in development mode
- API key is not provided
- API rate limits are exceeded

### UI Components

- `app/components/tokens/TokenPriceChart.tsx` - Chart component using CoinAPI data
- `app/tokens/page.tsx` - Token explorer page

## Etherscan API Integration

The Etherscan API is used to fetch blockchain data such as transactions, contract verification status, and gas prices.

### API Key Configuration

1. The API key is stored in `.env` file as `ETHERSCAN_API_KEY`
2. This key is used securely on the server-side only

### Integration Points

- `app/lib/blockchain/etherscan.ts` - Main file for Etherscan API integration
  - `getTransactionDetails()` - Fetches transaction information
  - `getTokenTransactions()` - Fetches token transfers for an address
  - `getTokenInfo()` - Gets token contract details
  - `getGasPrice()` - Gets current gas prices
  - `isContractVerified()` - Checks if a contract is verified

- `app/lib/blockchain/etherscan.improved.ts` - Enhanced implementation
  - Fully typed responses with proper TypeScript interfaces
  - Improved error handling with structured error responses
  - Better handling of rate limits and API failures
  - More consistent networking timeouts

- `app/lib/blockchain/ethereum.ts` - Uses Etherscan for gas price estimation

### UI Components

- `app/blockchain/page.tsx` - Blockchain explorer/demo page

## Testing

You can test all API integrations with:

```bash
# Original API test
npm run test:api

# Enhanced version independent of implementation details
npm run test:api:enhanced

# Unified CoinMarketAPI test
npm run test:market
```

### Test Scripts

1. **Original Test (`app/scripts/api-test.ts`)**:
   - Tests the original implementation
   - Provides basic output

2. **Enhanced Test (`app/scripts/api-test-enhanced.ts`)**:
   - Comprehensive testing of both APIs
   - Visual output with success/warning/error indicators
   - Works independently of implementation details
   - Can function without database dependencies
   - Detailed error reporting for debugging

3. **CoinMarketAPI Test (`app/scripts/coin-market-test.ts`)**:
   - Tests the unified API implementation
   - Provides detailed output with proper formatting
   - Better error handling and reporting

## Unified API

A unified API is available for simpler integration:

```typescript
// Import the unified API
import { coinMarketAPI } from '@/app/lib/api/coin-market';

// Get current price data
const btcPrice = await coinMarketAPI.getTokenPrice('BTC');
const ethPrice = await coinMarketAPI.getTokenPrice('ETH');

// Get historical price data
const historicalData = await coinMarketAPI.getHistoricalPrices('BTC', 7);

// Get blockchain data
const txDetails = await coinMarketAPI.getTransactionDetails(transactionHash);
const isContractVerified = await coinMarketAPI.isContractVerified(contractAddress);
const gasPrice = await coinMarketAPI.getGasPrice();
```

Benefits of the unified API:
- Type-safe responses with proper TypeScript interfaces
- Consistent error handling across all API calls
- Built-in caching for price data
- Works without database dependency
- Automatic fallback to mock data when needed

## Deployment Considerations

- Make sure to add both API keys to your production environment
- Consider enabling API key rotation or monitoring usage for high-traffic applications
- Implement additional caching for price data in production
- Consider using the unified API for better type safety and error handling
