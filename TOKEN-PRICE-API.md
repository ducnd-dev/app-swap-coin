# Token Price API Documentation

## Overview

The Token Price API endpoint provides real-time and historical price data for various cryptocurrencies. The API has been enhanced with error handling and fallback mechanisms to ensure reliability.

## API Endpoints

### GET /api/tokens/price

Fetches token price data with optional historical and market data.

#### Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| symbol | string | Token symbol (e.g., "BTC", "ETH") |
| tokenId | string | Token ID, can follow the pattern "symbol-id" (e.g., "btc-123") |
| days | integer | Number of days of historical data to retrieve |
| includeMarketData | boolean | Whether to include market data in the response |

Note: Either `symbol` or `tokenId` must be provided.

#### Response Format

```json
{
  "token": {
    "symbol": "BTC",
    "name": "Bitcoin",
    "network": "BTC"
  },
  "price": 50000.45,
  "history": [
    {
      "time_period_start": "2025-05-17T00:00:00.000Z",
      "time_period_end": "2025-05-18T00:00:00.000Z",
      "price_open": 49850.25,
      "price_high": 51200.75,
      "price_low": 49500.50,
      "price_close": 50750.25,
      "volume_traded": 12500000,
      "trades_count": 845000
    }
    // More data points...
  ],
  "marketData": {
    "marketCap": 950000000000,
    "volume24h": 45000000000,
    "supply": {
      "circulating": 19000000,
      "total": 19000000,
      "max": 21000000
    },
    "ath": 68000.00,
    "atl": 3000.00
  },
  "lastUpdated": "2025-05-24T04:09:44.082Z"
}
```

## Error Handling

The API implements multiple layers of error handling:

1. **Database Error Handling**:
   - If the database connection fails, the API falls back to mock data
   - If a token can't be found in the database, it attempts to extract the symbol from the tokenId

2. **Price Data Fallbacks**:
   - If CoinAPI data retrieval fails, mock prices are generated
   - Mock price generation is calibrated to provide realistic values based on the token

3. **Symbol Extraction**:
   - If tokenId follows the pattern "symbol-123", the API can extract the symbol part
   - This ensures that requests with tokenId values still receive meaningful data

## Testing

The API can be tested using the provided test script:

```bash
node app/scripts/test-token-price-api-simple.js
```

This script tests both symbol-based and tokenId-based queries to ensure the API is functioning correctly.

## Usage in Components

The TokenPriceChart component uses this API to display historical price data and market information. When implementing new components, use the following pattern:

```typescript
const response = await axiosClient.get('/api/tokens/price', {
  params: { 
    symbol: 'BTC', 
    days: 7,
    includeMarketData: true 
  }
});
```

## Future Improvements

1. Implement advanced caching mechanisms
2. Add support for currency conversion (USD, EUR, etc.)
3. Include more detailed market data
4. Add WebSocket support for real-time price updates
