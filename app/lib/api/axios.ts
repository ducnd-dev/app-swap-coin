'use client';

import axios from 'axios';

// Create a custom instance of axios
const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add auth token to every request
axiosClient.interceptors.request.use(
  (config) => {
    // Get token from localStorage (only in client-side)
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('sessionToken');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor for handling common error cases
axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized errors
    if (error.response && error.response.status === 401) {
      // If we're in the browser, redirect to home or login page
      if (typeof window !== 'undefined') {
        console.error('Authentication failed. Redirecting to home page.');
        // You can redirect or dispatch logout action here
        localStorage.removeItem('sessionToken');
        window.location.href = '/';
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;