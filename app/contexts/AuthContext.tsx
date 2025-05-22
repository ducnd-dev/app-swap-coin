'use client';

import { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export interface User {
  id: string;
  telegramId: number;
  username?: string;
  firstName?: string;
  language?: string;
  activityPoints: number;
  createdAt?: string;
  updatedAt?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  authError: string | null;
  login: (token: string) => Promise<boolean>;
  logout: () => void;
  refreshUserData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [authError, setAuthError] = useState<string | null>(null);

  // Check for authentication token on initial load
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('sessionToken');
      if (token) {
        await login(token);
      } else {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Function to log in with token
  const login = async (token: string): Promise<boolean> => {
    setIsLoading(true);
    setAuthError(null);

    try {
      // Set default axios header
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // Fetch user data
      const response = await axios.get('/api/users/me');
      
      // Save user data
      setUser(response.data.user);
      setIsAuthenticated(true);
      
      // Store token for future sessions
      localStorage.setItem('sessionToken', token);
      
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Authentication error:', error);
      setAuthError('Authentication failed');
      
      // Clear any invalid token
      localStorage.removeItem('sessionToken');
      delete axios.defaults.headers.common['Authorization'];
      
      setIsAuthenticated(false);
      setUser(null);
      setIsLoading(false);
      return false;
    }
  };

  // Function to log out
  const logout = () => {
    // Clear user data and token
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('sessionToken');
    delete axios.defaults.headers.common['Authorization'];
    
    // Redirect to home page
    window.location.href = '/';
  };

  // Function to refresh user data
  const refreshUserData = async () => {
    if (!isAuthenticated) return;
    
    try {
      const response = await axios.get('/api/users/me');
      setUser(response.data.user);
    } catch (error) {
      console.error('Error refreshing user data:', error);
      // If user is no longer authenticated, log out
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        toast.error('Session expired. Please login again.');
        logout();
      }
    }
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    authError,
    login,
    logout,
    refreshUserData
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
