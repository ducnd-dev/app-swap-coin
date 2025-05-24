# Blockchain Backend Integration

This document outlines the architecture changes to move blockchain functionality to the backend and integrate with the frontend via API.

## Architecture Overview

```
Frontend Components
      ↓
  React Hooks
      ↓
   API Client
      ↓
API Routes (Next.js)
      ↓
Backend Services
      ↓
Blockchain Integration
```

## Components

### API Client (`lib/api/oracle-price-api.ts`)
- Provides a clean TypeScript interface for frontend components
- Handles API requests, error handling, and timeouts
- Exports type definitions for use throughout the application

### Backend Service (`services/blockchain/price-oracle-service.ts`)
- Contains all blockchain-related code
- Manages Ethereum provider connections with fallbacks
- Implements caching for improved performance
- Provides error handling and retry mechanisms
- Contains mock data generation for when blockchain is unavailable

### API Routes (`api/tokens/oracle-price/route.ts`)
- Provides HTTP endpoints for token price data
- Uses the backend service to retrieve blockchain data
- Returns structured responses with performance metrics

### Frontend Hook (`hooks/useOraclePrices.ts`)
- Uses the API client to fetch data
- Provides a React-friendly interface for components
- Handles loading states, errors, and updates
- Maintains backwards compatibility with existing UI

## Benefits of This Architecture

1. **Separation of Concerns**
   - Frontend code no longer needs blockchain dependencies
   - Backend handles all blockchain interactions

2. **Improved Performance**
   - Caching at multiple levels (blockchain, API, frontend)
   - Reduced client-side bundle size without blockchain libraries

3. **Better Error Handling**
   - Centralized error management in the backend
   - Graceful fallbacks with mock data when blockchain is unavailable

4. **Type Safety**
   - Consistent TypeScript interfaces throughout the stack
   - Better IDE autocompletion and error checking

5. **Maintenance Benefits**
   - Blockchain code changes don't require frontend updates
   - Easier to test each layer independently

## Usage Examples

### Fetching Token Prices in a Component

```tsx
import { useOraclePrices } from '@/app/hooks/useOraclePrices';

function TokenPriceDisplay() {
  const { prices, isLoading, error } = useOraclePrices({
    symbols: ['ETH', 'BTC', 'USDT'],
    refreshInterval: 30000
  });

  if (isLoading) return <p>Loading prices...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {Object.values(prices).map(token => (
        <div key={token.symbol}>
          <h3>{token.symbol}</h3>
          <p>Price: ${token.price.toFixed(2)}</p>
          <p className={token.change24h >= 0 ? 'text-green' : 'text-red'}>
            24h: {token.change24h > 0 ? '+' : ''}{token.change24h.toFixed(2)}%
          </p>
        </div>
      ))}
    </div>
  );
}
```

### Accessing the API Directly

```typescript
import { getOraclePrices, getTokenOraclePrice } from '@/app/lib/api/oracle-price-api';

// Get a single token price
const ethPrice = await getTokenOraclePrice('ETH');
console.log(`ETH: $${ethPrice.price}`);

// Get multiple token prices
const prices = await getOraclePrices(['BTC', 'ETH', 'USDT']);
console.log(`Retrieved ${prices.count} token prices`);
```

## Testing

The application includes test scripts for validating the API and blockchain services:

- `scripts/test-oracle-api.ts` - Tests both direct service calls and API client
- `scripts/test-oracle-prices.ts` - Basic blockchain service test
- `scripts/test-oracle-prices-enhanced.ts` - Enhanced testing with detailed reporting
- `scripts/test-oracle-enhanced.ts` - Comparison between original and new implementations

Run any test with:
```
npx ts-node app/scripts/test-oracle-api.ts
```

## Future Improvements

1. Add more robust caching strategies (Redis, etc.)
2. Implement WebSockets for real-time price updates
3. Add more comprehensive error logging and monitoring
4. Expand support for additional tokens and blockchains
5. Develop a circuit breaker pattern for blockchain outages
