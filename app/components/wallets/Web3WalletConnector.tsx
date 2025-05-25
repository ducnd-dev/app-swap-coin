'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useWeb3Wallet } from '@/app/hooks/useWeb3Wallet';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/app/components/ui/dialog';

export default function Web3WalletConnector() {
  const { t } = useLanguage();
  const { 
    isConnected, 
    isConnecting, 
    address, 
    networkName, 
    balance,
    connect, 
    disconnect,
    isWeb3Available,
    switchNetwork 
  } = useWeb3Wallet();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [networkStatus, setNetworkStatus] = useState<'supported' | 'unsupported' | 'unknown'>('unknown');

  // Effect to check if the current network is supported
  useEffect(() => {
    if (networkName) {
      if (networkName === 'ethereum' || networkName === 'bsc' || networkName === 'polygon') {
        setNetworkStatus('supported');
      } else {
        setNetworkStatus('unsupported');
      }
    } else {
      setNetworkStatus('unknown');
    }
  }, [networkName]);

  // Format wallet address for display
  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  // Format balance with 4 decimal places
  const formatBalance = (balance: string) => {
    return parseFloat(balance).toFixed(4);
  };
  // Handle wallet connection
  const handleConnect = async () => {
    await connect();
    setIsDialogOpen(false);
  };

  // Handle network switch
  const handleSwitchNetwork = async (network: 'ethereum' | 'bsc' | 'polygon') => {
    await switchNetwork(network);
  };

  return (
    <>
      {!isConnected ? (
        <button
          onClick={() => setIsDialogOpen(true)}
          className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow-md hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
          disabled={isConnecting}
        >
          {isConnecting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              {t('wallet.connecting')}
            </>
          ) : (
            t('wallet.connect')
          )}
        </button>      ) : (
        <div className="flex flex-col w-full">
          <div className="flex items-center space-x-2 mb-2">
            <div className="flex-1 px-4 py-2 bg-gray-800 rounded-lg border border-blue-500/30">
              <div className="flex items-center">
                <span className={`w-2 h-2 rounded-full mr-2 ${
                  networkName === 'ethereum' ? 'bg-blue-500' : 
                  networkName === 'bsc' ? 'bg-yellow-500' : 
                  networkName === 'polygon' ? 'bg-purple-500' : 
                  'bg-gray-500'
                }`}></span>
                <span className="text-sm font-medium text-gray-200">
                  {address && formatAddress(address)}
                </span>
                {balance && (
                  <span className="ml-2 text-sm text-gray-400">
                    ({formatBalance(balance)} {networkName === 'bsc' ? 'BNB' : networkName === 'polygon' ? 'MATIC' : 'ETH'})
                  </span>
                )}
              </div>
              <div className="mt-1 flex items-center justify-between">
                <span className="text-xs text-blue-300">{networkName ? networkName.charAt(0).toUpperCase() + networkName.slice(1) : 'Unknown'} Network</span>
                {networkStatus === 'unsupported' && (
                  <span className="ml-2 text-xs px-1.5 py-0.5 bg-yellow-600/30 text-yellow-400 rounded-sm">
                    {t('swap.use_main_networks')}
                  </span>
                )}
              </div>
              
              {/* Network selector */}
              {isConnected && (
                <div className="mt-2 flex gap-1 text-xs">
                  <button 
                    onClick={() => handleSwitchNetwork('ethereum')}
                    className={`px-2 py-1 rounded ${networkName === 'ethereum' ? 'bg-blue-500 text-white' : 'bg-gray-700 hover:bg-gray-600 text-gray-300'}`}
                  >
                    ETH
                  </button>
                  <button 
                    onClick={() => handleSwitchNetwork('bsc')}
                    className={`px-2 py-1 rounded ${networkName === 'bsc' ? 'bg-yellow-500 text-black' : 'bg-gray-700 hover:bg-gray-600 text-gray-300'}`}
                  >
                    BSC
                  </button>
                  <button 
                    onClick={() => handleSwitchNetwork('polygon')}
                    className={`px-2 py-1 rounded ${networkName === 'polygon' ? 'bg-purple-500 text-white' : 'bg-gray-700 hover:bg-gray-600 text-gray-300'}`}
                  >
                    Polygon
                  </button>
                </div>
              )}
            </div>
            <button
              onClick={disconnect}
              className="p-2 text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors duration-200 border border-gray-700"
              title={t('wallet.disconnect')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Connect Wallet Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="border-blue-500/30">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold mb-2 text-center">
              {t('wallet.connect')}
            </DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            {!isWeb3Available ? (
              <div className="text-center">
                <p className="text-red-400 mb-4">{t('web3.provider_error')}</p>
                <p className="text-gray-300 mb-2">{t('wallet.installed', { wallet: 'MetaMask' })}</p>
                <div className="flex justify-center my-4">
                  <a 
                    href="https://metamask.io/download/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors duration-200"
                  >
                    <Image 
                      src="https://metamask.io/images/metamask-fox.svg" 
                      alt="MetaMask" 
                      width={24} 
                      height={24} 
                      className="mr-2" 
                    />
                    Install MetaMask
                  </a>
                </div>
              </div>
            ) : (
              <div className="space-y-4">                <button
                  onClick={handleConnect}
                  className="w-full flex items-center justify-center px-4 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors duration-200"
                  disabled={isConnecting}
                >
                  {isConnecting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      {t('wallet.connecting')}
                    </>
                  ) : (
                    <>
                      <Image 
                        src="https://metamask.io/images/metamask-fox.svg" 
                        alt="MetaMask" 
                        width={24} 
                        height={24} 
                        className="mr-2" 
                      />
                      {t('web3.metamask')}
                    </>
                  )}
                </button>
                  <button
                  onClick={handleConnect}
                  className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
                  disabled={isConnecting}
                >
                  {isConnecting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      {t('wallet.connecting')}
                    </>
                  ) : (
                    <>
                      <svg width="24" height="24" viewBox="0 0 32 32" className="mr-2">
                        <path
                          fill="#3396ff"
                          d="M16 0C7.163 0 0 7.163 0 16s7.163 16 16 16 16-7.163 16-16S24.837 0 16 0z"
                        />
                        <path
                          fill="#fff"
                          d="M16.25 7a2.25 2.25 0 110 4.5 2.25 2.25 0 010-4.5zm-5.5 9.5a2.25 2.25 0 110 4.5 2.25 2.25 0 010-4.5zm11 0a2.25 2.25 0 110 4.5 2.25 2.25 0 010-4.5z"
                        />
                      </svg>
                      {t('web3.wallet_connect')}
                    </>
                  )}
                </button>
                  <button
                  onClick={handleConnect}
                  className="w-full flex items-center justify-center px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200"
                  disabled={isConnecting}
                >
                  {isConnecting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      {t('wallet.connecting')}
                    </>
                  ) : (
                    <>
                      <svg width="24" height="24" viewBox="0 0 1024 1024" className="mr-2">
                        <circle cx="512" cy="512" r="512" fill="#0052ff" />
                        <path
                          fill="#fff"
                          d="M516.9 261.5c138.5 0 250.9 112.4 250.9 250.9 0 138.5-112.4 251-250.9 251s-250.9-112.4-250.9-251c0-138.5 112.4-250.9 250.9-250.9zm0 95.3c-86.1 0-156.6 69.5-156.6 155.6 0 86.1 69.5 156.6 156.6 156.6 86.1 0 155.6-69.5 155.6-156.6 1-86.1-69.5-155.6-155.6-155.6z"
                        />
                      </svg>
                      {t('web3.coinbase')}
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}