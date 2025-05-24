import { NextRequest, NextResponse } from 'next/server';
import { getTokenPriceFromChainlink, generateMockTokenPrice } from '@/app/lib/blockchain/price-oracle';


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
    console.error("Lỗi khi lấy giá token:", error);
    return NextResponse.json(
      { error: "Không thể lấy dữ liệu giá" }, 
      { status: 500 }
    );
  }
}

async function handleMultipleTokens(symbols: string[]) {
  try {
    const limitedSymbols = symbols.slice(0, 10);
    
    const pricePromises = limitedSymbols.map(async (symbol) => {
      try {
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error(`Timeout khi lấy giá ${symbol}`)), 8000);
        });
        
        const dataPromise = getTokenPriceFromChainlink(symbol);
        
        const result = await Promise.race([dataPromise, timeoutPromise])
          .catch((error) => {
            console.warn(`Timeout khi lấy giá cho ${symbol}, sử dụng giá giả:`, error);
            
            console.log(`Lỗi xảy ra lúc: ${new Date().toISOString()}`);
            
            return {
              ...generateMockTokenPrice(symbol),
              source: 'mock',
              mockReason: 'timeout'
            };
          });
          
        return result;
      } catch (error) {
        console.log(`Lỗi khi lấy giá cho ${symbol}:`, error);
        
        return {
          ...generateMockTokenPrice(symbol),
          source: 'mock', 
          mockReason: 'error'
        };
      }
    });
    
    const results = await Promise.allSettled(pricePromises);
    
    const prices = results
      .map(result => result.status === 'fulfilled' ? result.value : null)
      .filter(Boolean) as { source: string }[];
    
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
    console.error("Lỗi khi lấy giá nhiều token:", error);
    return NextResponse.json(
      { error: "Không thể lấy dữ liệu giá cho nhiều token" }, 
      { status: 500 }
    );
  }
}
