'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import axiosClient from '@/app/lib/api/axios';
import Image from "next/image";
import { Toaster, toast } from 'react-hot-toast';

// Dynamic imports for client-side only
const loadTelegramSDK = () => {
  if (typeof window !== 'undefined') {
    return import('@twa-dev/sdk').then(module => module.default);
  }
  return null;
};

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<Record<string, unknown> | null>(null);
  const [debugInfo, setDebugInfo] = useState<Record<string, unknown> | null>(null);
  
  console.log('User:', user);

  // Hàm debug để kiểm tra dữ liệu Telegram
  const debugTelegramData = async () => {
    try {
      setIsLoading(true);
      
      let initData = '';
      let source = 'unknown';
      
      // Kiểm tra xem có đang chạy trong Telegram WebApp không
      if (typeof window !== 'undefined') {
        // Kiểm tra SDK từ @twa-dev/sdk
        const WebApp = await loadTelegramSDK();
        if (WebApp && WebApp.initData) {
          initData = WebApp.initData;
          source = '@twa-dev/sdk';
          console.log('Got initData from @twa-dev/sdk');
        }
        // Kiểm tra window.Telegram
        else if (window.Telegram?.WebApp?.initData) {
          initData = window.Telegram.WebApp.initData;
          source = 'window.Telegram.WebApp';
          console.log('Got initData from window.Telegram.WebApp');
        } else {
          console.log('No Telegram WebApp detected, creating valid mock data');
          
          // Tạo dữ liệu mẫu hợp lệ với định dạng đúng thay vì chuỗi đơn giản
          try {
            const mockResponse = await axiosClient.post('/api/debug/mock-telegram-auth');
            if (mockResponse.data && mockResponse.data.initData) {
              initData = mockResponse.data.initData;
              source = 'generated-mock';
              console.log('Created valid mock initData with hash');
            } else {
              initData = 'query_id=AAHdF6IQAAAAAN0XohDhrOrc&user=%7B%22id%22%3A123456789%2C%22first_name%22%3A%22Test%22%2C%22last_name%22%3A%22User%22%2C%22username%22%3A%22testuser%22%7D&auth_date=1677649836&hash=c5a478e19a9089bcad20712826391c0000000000000000000000000000000000';
              source = 'static-mock';
              console.log('Using static mock initData');
            }
          } catch (mockError) {
            console.error('Failed to generate mock data:', mockError);
            initData = 'query_id=AAHdF6IQAAAAAN0XohDhrOrc&user=%7B%22id%22%3A123456789%2C%22first_name%22%3A%22Test%22%7D';
            source = 'fallback-mock';
          }
        }
      }
      
      // Gọi API debug để phân tích dữ liệu
      const response = await axiosClient.post('/api/debug/telegram', { initData });
      const enhancedData = { 
        ...response.data, 
        source,
        timestamp: new Date().toISOString()
      };
      setDebugInfo(enhancedData);
      console.log('Debug response:', enhancedData);
      
      // Hiển thị kết quả
      toast.success('Debug information collected');
      setIsLoading(false);
    } catch (error) {
      console.error('Debug error:', error);
      toast.error('Error collecting debug information');
      setIsLoading(false);
    }
  };

  // Development mode login handler
  const handleDevLogin = async () => {
    setIsLoading(true);
    try {
      console.log('Attempting development mode login');
      
      // Call auth endpoint with mock data
      const response = await axiosClient.post('/api/auth/telegram', { 
        initData: "dev_mode_access",
        devMode: true // Flag to indicate development mode
      }).catch(err => {
        console.error('Dev login API error:', {
          status: err.response?.status,
          statusText: err.response?.statusText,
          data: err.response?.data,
          message: err.message
        });
        throw err;
      });
      
      console.log('Dev login response:', response.status, response.data);
      
      if (response.data && response.data.sessionToken) {
        localStorage.setItem('sessionToken', response.data.sessionToken);
        axiosClient.defaults.headers.common['Authorization'] = `Bearer ${response.data.sessionToken}`;
        setUser(response.data.user);
        
        toast.success('Logged in as development user');
        router.push('/dashboard');
      } else {
        throw new Error('Development authentication failed - missing session token');
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
      console.log('Sending authentication request with initData length:', initData.length);
      
      const response = await axiosClient.post('/api/auth/telegram', { initData })
        .catch(err => {
          console.error('API call error details:', {
            status: err.response?.status,
            statusText: err.response?.statusText,
            data: err.response?.data,
            message: err.message
          });
          throw err;
        });
      
      console.log('Auth response status:', response.status);
      
      if (response.data && response.data.sessionToken) {
        console.log('Authentication successful!');
        // Store user data and token
        localStorage.setItem('sessionToken', response.data.sessionToken);
        
        // Token will be automatically included in future requests by axiosClient
        
        setUser(response.data.user);
        
        // Navigate to the dashboard
        router.push('/dashboard');
      } else {
        console.error('Missing sessionToken in response:', response.data);
        throw new Error('Authentication failed - missing session token');
      }
    } catch (error) {
      console.error('Authentication error:', error);
      toast.error('Failed to authenticate with Telegram');
      setIsLoading(false);
    }
  }, [router]);

  // Initialize app (with support for both Telegram WebApp and standalone mode)
  useEffect(() => {
    // Ensure this code only runs in the browser
    if (typeof window === 'undefined') {
      return;
    }
    
    // Check if running in development mode
    console.log('NODE_ENV:', process.env.NODE_ENV);
    console.log('NEXT_PUBLIC_APP_URL:', process.env.NEXT_PUBLIC_APP_URL);

    // Set a timeout to ensure we don't get stuck in loading state
    const loadingTimeout = setTimeout(() => {
      if (isLoading) {
        console.log('Loading timeout reached - switching to development mode');
        setIsLoading(false);
        toast('Failed to connect to Telegram, switched to development mode', { 
          icon: '⚠️',
          duration: 5000
        });
      }
    }, 5000); // 5 seconds timeout

    const initApp = async () => {
      try {
        // Try to load the SDK
        const WebApp = await loadTelegramSDK();
        
        // Debug info
        console.log('WebApp SDK loaded:', WebApp);
        
        // Check if SDK is available and initialized
        if (WebApp && typeof WebApp.initData === 'string' && WebApp.initData) {
          console.log('Using @twa-dev/sdk WebApp');
          console.log('WebApp initData (first 50 chars):', WebApp.initData.substring(0, 50) + '...');
          WebApp.expand();
          WebApp.ready();
          authenticateUser(WebApp.initData);
          return;
        }
        
        // Fallback to window.Telegram if SDK is not working
        console.log('Checking window.Telegram:', window.Telegram);
        if (window.Telegram && window.Telegram.WebApp) {
          console.log('window.Telegram.WebApp initData available:', !!window.Telegram.WebApp.initData);
          if (window.Telegram.WebApp.initData) {
            console.log('window.Telegram initData (first 50 chars):', 
              window.Telegram.WebApp.initData.substring(0, 50) + '...');
          }
        }
        if (window.Telegram && window.Telegram.WebApp) {
          console.log('Using window.Telegram.WebApp');
          const tg = window.Telegram.WebApp;
          tg.expand();
          tg.ready();
          authenticateUser(tg.initData);
          return;
        }
        
        // Development mode - no Telegram environment detected
        console.log('Running in standalone/development mode');
        setIsLoading(false);
        toast('Running in development mode', { 
          icon: '🛠️',
          duration: 5000
        });
        
      } catch (error) {
        console.error('Error initializing app:', error);
        setIsLoading(false);
        toast.error('Error initializing app');
      }
    };

    initApp();
    
    // Cleanup the timeout when the component unmounts
    return () => clearTimeout(loadingTimeout);
  }, [authenticateUser, isLoading]);
  
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
            <div className="flex flex-col gap-4">
              <button
                onClick={handleDevLogin}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200"
              >
                Login with Development Account
              </button>
              
              {/* Debug button */}
              <button 
                onClick={debugTelegramData}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg shadow-md hover:bg-gray-700 transition-colors duration-200"
              >
                Debug Telegram Data
              </button>
              
              {/* Test with mock initData */}
              <button 
                onClick={async () => {
                  try {
                    setIsLoading(true);
                    // Generate mock initData with valid hash
                    const mockResponse = await axiosClient.post('/api/debug/mock-telegram-auth');
                    
                    if (mockResponse.data && mockResponse.data.initData) {
                      console.log('Using mock initData:', mockResponse.data.initData);
                      console.log('Mock details:', mockResponse.data.details);
                      // Try to authenticate with the mock data
                      authenticateUser(mockResponse.data.initData);
                    } else {
                      console.error('Failed to create mock data:', mockResponse.data);
                      if (mockResponse.data.error && mockResponse.data.error.includes('TELEGRAM_BOT_TOKEN')) {
                        toast.error('Bot token không được cấu hình đúng', { duration: 5000 });
                      } else {
                        toast.error('Error creating mock data');
                      }
                      setIsLoading(false);
                    }
                  } catch (error) {
                    console.error('Mock auth error:', error);
                    const errorMsg = error instanceof Error 
                      ? error.message 
                      : 'Mock authentication error';
                    toast.error(errorMsg, { duration: 5000 });
                    setIsLoading(false);
                  }
                }}
                className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-colors duration-200"
              >
                Test với dữ liệu mẫu hợp lệ
              </button>
            </div>
          )}
          
          {/* Debug information display */}
          {debugInfo && (
            <div className="mt-6 p-4 bg-gray-100 rounded-lg text-left w-full overflow-auto">
              <h2 className="text-lg font-bold mb-2">Debug Information</h2>
              <pre className="text-xs overflow-x-auto whitespace-pre-wrap">
                {JSON.stringify(debugInfo, null, 2)}
              </pre>
            </div>
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
