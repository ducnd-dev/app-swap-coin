import { NextRequest, NextResponse } from 'next/server';
import { getTokenPriceFromChainlink, getMultipleTokenPrices } from '@/app/services/blockchain/price-oracle-service';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const symbol = searchParams.get('symbol')?.toUpperCase();
    
    if (searchParams.get('symbols')) {
      const symbols = searchParams.get('symbols')?.split(',').map(s => s.trim().toUpperCase());
      return handleMultipleTokens(symbols || []);
    }
    
    if (!symbol) {
      return handleMultipleTokens(['ETH', 'BTC', 'USDT']);
    }

    const tokenPrice = await getTokenPriceFromChainlink(symbol);
    return NextResponse.json(tokenPrice);
    
  } catch (error) {
    console.error("Error fetching token price:", error);
    return NextResponse.json(
      { error: "Unable to retrieve price data" }, 
      { status: 500 }
    );
  }
}

async function handleMultipleTokens(symbols: string[]) {
  try {
    const limitedSymbols = symbols.slice(0, 10);
    
    // Use the blockchain service to get multiple token prices
    const prices = await getMultipleTokenPrices(limitedSymbols);
    
    const chainlinkSources = prices.filter(p => p.source === 'chainlink').length;
    const mockSources = prices.filter(p => p.source === 'mock').length;
    const responseStatus = chainlinkSources > 0 ? 200 : 206;
    
    return NextResponse.json({
      prices,
      count: prices.length,
      timestamp: new Date().toISOString(),
      performance: {
        requestedTokens: limitedSymbols.length,
        successfulRequests: prices.length,
        chainlinkSources,
        mockSources,
        status: chainlinkSources > 0 ? 'partial' : 'all-mock'
      }
    }, { status: responseStatus });
    
  } catch (error) {
    console.error("Error fetching multiple token prices:", error);
    return NextResponse.json(
      { error: "Unable to retrieve data for multiple tokens" }, 
      { status: 500 }
    );
  }
}
