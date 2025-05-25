'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/app/components/ui/dialog';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { Loader2, AlertCircle, CheckCircle2, ArrowRight, Info } from 'lucide-react';
import { Token } from '@/app/contexts/TokenContext';

interface Web3TransactionConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  fromToken: Token | null;
  toToken: Token | null;
  fromAmount: string;
  toAmount: string;
  priceImpact?: string;
  slippage: number;
  networkName?: string | null;
  isLoading: boolean;
  estimatedGas?: string;
  gasFee?: string;
}

export default function Web3TransactionConfirmation({
  isOpen,
  onClose,
  onConfirm,
  fromToken,
  toToken,
  fromAmount,
  toAmount,
  priceImpact = '0',
  slippage,
  networkName,
  isLoading,
  estimatedGas,
  gasFee
}: Web3TransactionConfirmationProps) {
  const { t } = useLanguage();
  const [isConfirming, setIsConfirming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [detailsExpanded, setDetailsExpanded] = useState(false);

  // Reset state when dialog opens
  useEffect(() => {
    if (isOpen) {
      setError(null);
      setIsConfirming(false);
      setDetailsExpanded(false);
    }
  }, [isOpen]);

  // Determine if price impact is high (>= 5%)
  const highImpact = parseFloat(priceImpact) >= 5;
  
  // Calculate minimum amount user will receive after slippage
  const minAmount = toAmount ? (parseFloat(toAmount) * (1 - slippage / 100)).toFixed(6) : '0';

  // Handle confirmation
  const handleConfirm = async () => {
    setIsConfirming(true);
    setError(null);
    
    try {
      await onConfirm();
      // onClose will be called by the parent component after the transaction is complete
    } catch (error) {
      console.error('Transaction failed:', error);
      
      // Enhanced error handling
      let errorMessage = t('web3.transaction_error');
      
      if (error instanceof Error) {
        const errorString = error.message.toLowerCase();
        
        if (errorString.includes('user rejected') || errorString.includes('user denied')) {
          errorMessage = t('web3.user_rejected');
        } else if (errorString.includes('insufficient funds') || errorString.includes('exceeds balance')) {
          errorMessage = t('web3.insufficient_funds');
        } else if (errorString.includes('gas') && errorString.includes('limit')) {
          errorMessage = t('web3.gas_limit_error');
        } else if (errorString.includes('nonce')) {
          errorMessage = t('web3.nonce_error');
        } else if (errorString.includes('underpriced')) {
          errorMessage = t('web3.gas_price_too_low');
        } else {
          errorMessage = error.message;
        }
      }
      
      setError(errorMessage);
      setIsConfirming(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !isConfirming && !isLoading && !open && onClose()}>
      <DialogContent className="bg-gray-800 border border-blue-500/30 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">
            {t('web3.confirm_transaction')}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Network info */}
          {networkName && (
            <div className="bg-blue-900/30 p-2 rounded-md text-center text-sm">
              {t('wallet.network')}: <span className="font-medium text-blue-300">{networkName.charAt(0).toUpperCase() + networkName.slice(1)}</span>
            </div>
          )}

          {/* Swap details */}
          <div className="bg-gray-700/50 rounded-lg p-4 flex flex-col items-center space-y-3">
            {/* From token */}
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-2">                <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-600 p-0.5">
                  <Image 
                    src={fromToken?.logoURI || fromToken?.icon || '/icons/placeholder-token.svg'} 
                    alt={fromToken?.symbol || 'token'}
                    width={32}
                    height={32}
                    className="w-full h-full object-contain"
                    onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                      // Using a type assertion for the error event target
                      const imgElement = e.target as HTMLImageElement;
                      imgElement.onerror = null; // Prevent infinite error loop
                      imgElement.src = '/icons/placeholder-token.svg';
                    }}
                  />
                </div>
                <div>
                  <div className="font-medium">{fromToken?.symbol || '-'}</div>
                  <div className="text-xs text-gray-300">{fromToken?.name || '-'}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold">{fromAmount}</div>
              </div>
            </div>

            {/* Arrow */}
            <div className="w-full flex justify-center">
              <ArrowRight className="text-blue-400" />
            </div>

            {/* To token */}
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-2">                <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-600 p-0.5">
                  <Image 
                    src={toToken?.logoURI || toToken?.icon || '/icons/placeholder-token.svg'} 
                    alt={toToken?.symbol || 'token'}
                    width={32}
                    height={32}
                    className="w-full h-full object-contain"
                    onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                      // Using a type assertion for the error event target
                      const imgElement = e.target as HTMLImageElement;
                      imgElement.onerror = null; // Prevent infinite error loop
                      imgElement.src = '/icons/placeholder-token.svg';
                    }}
                  />
                </div>
                <div>
                  <div className="font-medium">{toToken?.symbol || '-'}</div>
                  <div className="text-xs text-gray-300">{toToken?.name || '-'}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold">{toAmount}</div>
              </div>
            </div>
          </div>

          {/* Trade details - always displayed */}
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-300">{t('swap.slippage')}:</span>
              <span>{slippage}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">{t('swap.price_impact')}:</span>
              <span className={highImpact ? 'text-red-500' : ''}>
                {priceImpact}%
                {highImpact && <AlertCircle className="inline ml-1 w-4 h-4" />}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">{t('swap.min_received')}:</span>
              <span>{minAmount} {toToken?.symbol}</span>
            </div>
          </div>
          
          {/* Advanced Trade details - expandable */}
          <div>
            <button 
              onClick={() => setDetailsExpanded(!detailsExpanded)}
              className="flex items-center w-full text-sm text-blue-300 hover:text-blue-200 transition-colors"
            >
              <Info size={14} className="mr-1" />
              {detailsExpanded ? t('web3.hide_details') : t('web3.show_details')}
            </button>
            
            {detailsExpanded && (
              <div className="mt-2 space-y-2 text-sm bg-gray-700/30 p-3 rounded-md">
                {estimatedGas && (
                  <div className="flex justify-between">
                    <span className="text-gray-300">{t('web3.estimated_gas')}:</span>
                    <span>{estimatedGas}</span>
                  </div>
                )}
                {gasFee && (
                  <div className="flex justify-between">
                    <span className="text-gray-300">{t('web3.gas_fee')}:</span>
                    <span>{gasFee}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-300">{t('web3.network')}:</span>
                  <span>{networkName || 'Unknown'}</span>
                </div>
              </div>
            )}
          </div>

          {/* Warning for high price impact */}
          {highImpact && (
            <div className="bg-red-900/30 border border-red-500/50 rounded p-3 text-sm flex items-start">
              <AlertCircle className="text-red-400 mr-2 w-5 h-5 shrink-0 mt-0.5" />
              <span>{t('swap.high_price_impact_warning')}</span>
            </div>
          )}
          
          {/* Error display */}
          {error && (
            <div className="bg-red-900/30 border border-red-500/50 rounded p-3 text-sm flex items-start">
              <AlertCircle className="text-red-400 mr-2 w-5 h-5 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}
        </div>

        <DialogFooter>
          <div className="flex space-x-3 w-full">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 px-4 rounded bg-gray-700 hover:bg-gray-600 text-gray-200 transition-all duration-200 font-medium"
              disabled={isConfirming || isLoading}
            >
              {t('common.cancel')}
            </button>
            <button
              onClick={handleConfirm}
              className="flex-1 py-2.5 px-4 rounded font-medium flex justify-center items-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transition-all duration-200"
              disabled={isConfirming || isLoading || !!error}
            >
              {isConfirming || isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {t('common.confirming')}
                </>
              ) : highImpact ? (
                <>
                  <AlertCircle className="w-4 h-4 mr-1.5" />
                  {t('common.confirm_anyway')}
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 mr-1.5" />
                  {t('common.confirm')}
                </>
              )}
            </button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
