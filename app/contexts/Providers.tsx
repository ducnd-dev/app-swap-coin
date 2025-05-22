'use client';

import { ReactNode } from 'react';
import { AuthProvider } from './AuthContext';
import { WalletProvider } from './WalletContext';
import { TokenProvider } from './TokenContext';
import { Toaster } from 'react-hot-toast';

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <>
      <Toaster position="top-center" />
      <AuthProvider>
        <WalletProvider>
          <TokenProvider>
            {children}
          </TokenProvider>
        </WalletProvider>
      </AuthProvider>
    </>
  );
}
