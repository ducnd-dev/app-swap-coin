import { ethers } from 'ethers';
import { prisma } from '../utils/prisma';

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
  slippage: number = 0.5
): Promise<{
  fromAmount: string;
  toAmount: string;
  rate: number;
  estimatedGas: string;
}> {
  try {
    // In a real implementation, this would call a DEX API or smart contract
    // For this simulation, we'll use a mock implementation

    // Get token prices from database or external API
    const fromTokenData = await prisma.token.findUnique({
      where: { symbol: fromToken },
    });

    const toTokenData = await prisma.token.findUnique({
      where: { symbol: toToken },
    });

    if (!fromTokenData || !toTokenData) {
      throw new Error('Token not found');
    }

    // Mock price calculation (in real app, would fetch from API)
    // In a real implementation, use CoinGecko, 1inch, or other price APIs
    const mockFromPrice = 1000; // Mock price for demonstration
    const mockToPrice = 50;    // Mock price for demonstration

    const rate = mockToPrice / mockFromPrice;
    const parsedAmount = parseFloat(amount);
    const toAmount = (parsedAmount * rate).toFixed(6);
    
    // Mock gas estimation
    const estimatedGas = '0.005'; // In the native token of the chain

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
