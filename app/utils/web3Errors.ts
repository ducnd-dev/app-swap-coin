/**
 * Extracts and formats error messages from Web3 errors
 */

interface ErrorWithMessage {
  message: string;
  reason?: string;
  code?: string | number;
}

export function formatWeb3Error(error: unknown): string {
  if (!error) return 'Unknown error occurred';
  
  // Try to extract message from the error
  let errorMessage = 'Transaction failed';
  
  if (typeof error === 'string') {
    errorMessage = error;
  } else if (error && typeof error === 'object') {
    const errorObj = error as ErrorWithMessage;
    
    // Check for common error patterns in different providers
    if (errorObj.reason) {
      // Some providers include a reason field
      errorMessage = errorObj.reason;
    } else if (errorObj.message) {
      errorMessage = errorObj.message;
      
      // Clean up common MetaMask error messages
      if (errorMessage.includes('User denied transaction signature')) {
        return 'Transaction rejected';
      }
      
      if (errorMessage.includes('insufficient funds')) {
        return 'Insufficient funds for gas * price + value';
      }
      
      // Extract only the useful part of the message for common errors
      const metaMaskMatch = errorMessage.match(/\{.*"message":"([^"]+)".*\}/);
      if (metaMaskMatch && metaMaskMatch[1]) {
        errorMessage = metaMaskMatch[1];
      }
      
      // Remove extra technical details
      errorMessage = errorMessage.replace(/\[ethjs-query\]|Error:|\(action=.*\)/gi, '').trim();
    }
  }
  
  return errorMessage;
}

/**
 * Determines if the error is due to the user rejecting the transaction
 */
export function isUserRejectionError(error: unknown): boolean {
  if (!error) return false;
  
  const errorString = typeof error === 'string' 
    ? error 
    : (error as ErrorWithMessage)?.message || '';
  
  return errorString.includes('User denied') || 
         errorString.includes('user rejected') ||
         errorString.includes('rejected by user') ||
         errorString.includes('User rejected the request');
}

/**
 * Determines if the error is due to insufficient funds
 */
export function isInsufficientFundsError(error: unknown): boolean {
  if (!error) return false;
  
  const errorString = typeof error === 'string' 
    ? error 
    : (error as ErrorWithMessage)?.message || '';
  
  return errorString.includes('insufficient funds') || 
         errorString.includes('not enough') ||
         errorString.includes('Insufficient balance');
}

/**
 * Determines if the error is due to network or RPC issues
 */
export function isNetworkError(error: unknown): boolean {
  if (!error) return false;
  
  const errorString = typeof error === 'string' 
    ? error 
    : (error as ErrorWithMessage)?.message || '';
  
  return errorString.includes('network') || 
         errorString.includes('RPC') ||
         errorString.includes('connection') ||
         errorString.includes('disconnected');
}
