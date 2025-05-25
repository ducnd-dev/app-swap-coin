import { ethers } from 'ethers';
import { prisma } from '../utils/prisma';
import { getGasPrice } from './etherscan';
import { getTokenPrice } from '../api/prices';

// API configuration
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || '';

// Standard ERC20 ABI for token interactions
const ERC20_ABI = [
  'function balanceOf(address owner) view returns (uint256)',
  'function decimals() view returns (uint8)',
  'function symbol() view returns (string)',
  'function transfer(address to, uint amount) returns (boolean)',
  'function allowance(address owner, address spender) view returns (uint256)',
  'function approve(address spender, uint256 amount) returns (boolean)',
  'event Transfer(address indexed from, address indexed to, uint amount)',
];

/**
 * Get provider for a specific network
 * @param network - The network identifier (ETH, BSC, etc.)
 * @returns An ethers provider for the specified network
 */
export function getProvider(network: string): ethers.providers.Provider {
  switch (network.toUpperCase()) {
    case 'ETH':
      return new ethers.providers.JsonRpcProvider(
        process.env.ETH_RPC_URL || 'https://mainnet.infura.io/v3/your-infura-key'
      );
    case 'BSC':
      return new ethers.providers.JsonRpcProvider(
        process.env.BSC_RPC_URL || 'https://bsc-dataseed.binance.org/'
      );
    // Add other networks as needed
    default:
      throw new Error(`Unsupported network: ${network}`);
  }
}

/**
 * Get token contract instance
 * @param tokenAddress - The token contract address
 * @param network - The network identifier
 * @returns An ethers Contract instance for the token
 */
export function getTokenContract(tokenAddress: string, network: string): ethers.Contract {
  const provider = getProvider(network);
  return new ethers.Contract(tokenAddress, ERC20_ABI, provider);
}

/**
 * Get token balance for a wallet address
 * @param walletAddress - The wallet address
 * @param tokenAddress - The token contract address
 * @param network - The network identifier
 * @returns The token balance as a formatted string
 */
export async function getTokenBalance(
  walletAddress: string,
  tokenAddress: string,
  network: string
): Promise<string> {
  try {
    const contract = getTokenContract(tokenAddress, network);
    const balance = await contract.balanceOf(walletAddress);
    const decimals = await contract.decimals();
    return ethers.utils.formatUnits(balance, decimals);
  } catch (error) {
    console.error('Error getting token balance:', error);
    return '0';
  }
}

/**
 * Get native token (ETH, BNB, etc.) balance
 * @param walletAddress - The wallet address
 * @param network - The network identifier
 * @returns The native token balance as a formatted string
 */
export async function getNativeBalance(
  walletAddress: string,
  network: string
): Promise<string> {
  try {
    const provider = getProvider(network);
    const balance = await provider.getBalance(walletAddress);
    return ethers.utils.formatEther(balance);
  } catch (error) {
    console.error('Error getting native balance:', error);
    return '0';
  }
}

/**
 * Simulate a swap between two tokens
 * @param fromToken - The source token
 * @param toToken - The target token
 * @param amount - The amount to swap
 * @param slippage - Acceptable slippage percentage
 * @returns Simulated swap result
 */
export async function simulateSwap(
  fromToken: string,
  toToken: string,
  amount: string,
  _slippage = 0.5 // Slippage tham số không được sử dụng trong triển khai hiện tại
): Promise<{
  fromAmount: string;
  toAmount: string;
  rate: number;
  estimatedGas: string;
}> {
  try {
    // Get token data from database
    const fromTokenData = await prisma.token.findUnique({
      where: { symbol: fromToken },
    });

    const toTokenData = await prisma.token.findUnique({
      where: { symbol: toToken },
    });

    if (!fromTokenData || !toTokenData) {
      throw new Error('Token not found');
    }

    // Get real token prices from CoinAPI
    let fromPrice: number;
    let toPrice: number;
    
    try {
      fromPrice = await getTokenPrice(fromToken);
      toPrice = await getTokenPrice(toToken);
    } catch (priceError) {
      console.error('Error fetching token prices, using mock prices:', priceError);
      // Fall back to mock prices if API call fails
      fromPrice = (fromToken === 'BTC') ? 50000 : (fromToken === 'ETH') ? 3000 : 100;
      toPrice = (toToken === 'BTC') ? 50000 : (toToken === 'ETH') ? 3000 : 100;
    }    const rate = toPrice / fromPrice;
    const parsedAmount = parseFloat(amount);
      // Áp dụng slippage cho giá trị chuyển đổi (giá trị tối thiểu có thể chấp nhận)
    // Slippage 0.5% nghĩa là giá trị có thể giảm tối đa 0.5%
    const slippageFactor = 1 - (_slippage / 100);
    const toAmountRaw = parsedAmount * rate;
    
    // Tính giá trị tối thiểu có thể chấp nhận (đã áp dụng slippage)
    // Chúng ta không sử dụng giá trị này trực tiếp trong kết quả nhưng tính toán để
    // mô phỏng cách mà một giao dịch thực sự sẽ hoạt động
    const minAcceptableAmount = toAmountRaw * slippageFactor;
    console.log(`Minimum amount with ${_slippage}% slippage: ${minAcceptableAmount}`);
    
    const toAmount = toAmountRaw.toFixed(6);
    
    // Get current gas price from network
    let estimatedGas = '0.005'; // Default fallback
    
    // Try to get real gas price from Etherscan API
    try {
      if (ETHERSCAN_API_KEY && (fromTokenData.network === 'ETH' || toTokenData.network === 'ETH')) {
        const gasPrice = await getGasPrice(fromTokenData.network);
        // Convert from wei to gwei for readability
        const gasPriceGwei = ethers.utils.formatUnits(gasPrice, 'gwei');
        
        // Estimate gas units for a swap (this is a rough estimate)
        const estimatedGasUnits = 150000; // Typical gas for a swap
        
        // Calculate estimated gas cost in ETH
        const gasEth = ethers.utils.formatEther(
          ethers.BigNumber.from(gasPrice).mul(estimatedGasUnits)
        );
        
        estimatedGas = gasEth;
        console.log(`Estimated gas for swap: ${gasEth} ETH (${gasPriceGwei} Gwei)`);
      }
    } catch (gasError) {
      console.error('Error fetching gas price:', gasError);
      // Keep using the default value
    }

    return {
      fromAmount: amount,
      toAmount,
      rate,
      estimatedGas,
    };
  } catch (error) {
    console.error('Error simulating swap:', error);
    throw error;
  }
}

/**
 * Get transaction receipt from blockchain
 * @param txHash - The transaction hash
 * @param network - The network identifier
 * @returns Transaction receipt or null if not found
 */
export async function getTransactionReceipt(
  txHash: string,
  network: string
): Promise<ethers.providers.TransactionReceipt | null> {
  try {
    const provider = getProvider(network);
    return await provider.getTransactionReceipt(txHash);
  } catch (error) {
    console.error('Error getting transaction receipt:', error);
    return null;
  }
}

/**
 * Verify if a wallet address is valid
 * @param address - The wallet address to verify
 * @returns Whether the address is valid
 */
export function isValidAddress(address: string): boolean {
  return ethers.utils.isAddress(address);
}
