'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Image from "next/image";
import { Toaster, toast } from 'react-hot-toast';
import WebApp from '@twa-dev/sdk';

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<Record<string, unknown> | null>(null);
  const [devMode, setDevMode] = useState(false);
  
  console.log('User:', user);

  // Development mode login handler
  const handleDevLogin = async () => {
    setIsLoading(true);
    try {
      // Call auth endpoint with mock data
      const response = await axios.post('/api/auth/telegram', { 
        initData: "dev_mode_access",
        devMode: true // Flag to indicate development mode
      });
      
      if (response.data && response.data.sessionToken) {
        localStorage.setItem('sessionToken', response.data.sessionToken);
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.sessionToken}`;
        setUser(response.data.user);
        router.push('/dashboard');
      } else {
        throw new Error('Development authentication failed');
      }
    } catch (error) {
      console.error('Dev auth error:', error);
      toast.error('Failed to authenticate in development mode');
      setIsLoading(false);
    }
  };

  // Authenticate user with the server (wrapped in useCallback)
  const authenticateUser = useCallback(async (initData: string) => {
    try {
      setIsLoading(true);
      const response = await axios.post('/api/auth/telegram', { initData });
      
      if (response.data && response.data.sessionToken) {
        // Store user data and token
        localStorage.setItem('sessionToken', response.data.sessionToken);
        
        // Configure axios default headers for future requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.sessionToken}`;
        
        setUser(response.data.user);
        
        // Navigate to the dashboard
        router.push('/dashboard');
      } else {
        throw new Error('Authentication failed');
      }
    } catch (error) {
      console.error('Authentication error:', error);
      toast.error('Failed to authenticate with Telegram');
      setIsLoading(false);
    }
  }, [router]);

  // Initialize app (with support for both Telegram WebApp and standalone mode)
  useEffect(() => {
    // Debug info
    console.log('WebApp from @twa-dev/sdk:', WebApp);
    
    // First try to use the @twa-dev/sdk package
    try {
      if (WebApp && typeof WebApp.initData === 'string') {
        console.log('Using @twa-dev/sdk WebApp');
        
        // Expand the WebApp UI
        WebApp.expand();
        WebApp.ready();
        
        // Authenticate using the WebApp initData
        authenticateUser(WebApp.initData);
        return;
      }
    } catch (sdkError) {
      console.error('Error with @twa-dev/sdk:', sdkError);
    }
    
    // Fallback to window.Telegram if SDK is not working
    console.log('Telegram object from window:', window.Telegram);
    if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp) {
      // Telegram WebApp mode
      try {
        const tg = window.Telegram.WebApp;
        tg.expand();
        tg.ready();
        
        // Authenticate the user with Telegram
        authenticateUser(tg.initData);
      } catch (error) {
        console.error('Error initializing Telegram WebApp:', error);
        setIsLoading(false);
        toast.error('Error connecting to Telegram');
      }
    } else {
      // Development/Standalone mode
      console.log('Running in standalone mode (not in Telegram WebApp)');
      
      // Show login screen with development login option
      setIsLoading(false);
      toast('Running in development mode', { 
        icon: '🛠️',
        duration: 5000
      });
    }
  }, [authenticateUser]);
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <Toaster position="top-center" />
      
      {isLoading ? (
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-lg font-medium">Connecting to Telegram...</p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center space-y-6 text-center max-w-md">
          <Image
            src="/next.svg"
            alt="Swap Coin App"
            width={180}
            height={38}
            priority
            className="dark:invert mb-8"
          />
          
          <h1 className="text-3xl font-bold">Telegram Swap Coin App</h1>
          <p className="text-lg mb-8">
            Exchange cryptocurrencies quickly and securely with our Telegram Mini App.
          </p>
          
          <div className="p-4 bg-yellow-100 text-yellow-800 rounded-lg">
            <p>
              Please open this application directly from Telegram Bot or
              Telegram WebApp link.
            </p>
          </div>
          
          {/* Development mode login button */}
          {!user && !isLoading && (
            <button
              onClick={handleDevLogin}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200"
            >
              Login with Development Account
            </button>
          )}
          
          <p className="text-sm text-gray-500 mt-8">
            © 2025 Swap Coin App. All rights reserved.
          </p>
        </div>
      )}
    </main>
  );
}

// Add TypeScript interface for Telegram WebApp
declare global {
  interface Window {
    Telegram: {
      WebApp: {
        ready: () => void;
        expand: () => void;
        initData: string;
        close: () => void;
        MainButton: {
          text: string;
          color: string;
          textColor: string;
          isVisible: boolean;
          isActive: boolean;
          show: () => void;
          hide: () => void;
          onClick: (callback: () => void) => void;
          offClick: (callback: () => void) => void;
        };
      };
    };
  }
}
