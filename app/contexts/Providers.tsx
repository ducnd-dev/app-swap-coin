'use client';

import { ReactNode } from 'react';
import { AuthProvider } from './AuthContext';
import { WalletProvider } from './WalletContext';
import { TokenProvider } from './TokenContext';
import { LanguageProvider } from './LanguageContext';
import { Web3Provider } from './Web3Context';
import Web3ProviderUI from '../components/web3/Web3ProviderUI';
import { Toaster } from 'react-hot-toast';

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <>
      <Toaster position="top-center" />
      <LanguageProvider>
        <AuthProvider>
          <WalletProvider>
            <Web3Provider>
              <TokenProvider>
                <Web3ProviderUI>
                  {children}
                </Web3ProviderUI>
              </TokenProvider>
            </Web3Provider>
          </WalletProvider>
        </AuthProvider>
      </LanguageProvider>
    </>
  );
}
