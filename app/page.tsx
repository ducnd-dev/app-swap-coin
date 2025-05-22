'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Image from "next/image";
import { Toaster, toast } from 'react-hot-toast';

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  // Initialize Telegram WebApp
  useEffect(() => {
    // Check if running in Telegram WebApp environment
    if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp) {
      const tg = window.Telegram.WebApp;
      
      // Initialize Telegram WebApp
      tg.expand();
      tg.ready();
      
      // Authenticate the user
      authenticateUser(tg.initData);
    } else {
      // Not running in Telegram WebApp
      setIsLoading(false);
      toast.error('This app must be opened from Telegram');
    }
  }, []);
  
  // Authenticate user with the server
  const authenticateUser = async (initData: string) => {
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
  };

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
          onClick: (callback: Function) => void;
          offClick: (callback: Function) => void;
        };
      };
    };
  }
}
