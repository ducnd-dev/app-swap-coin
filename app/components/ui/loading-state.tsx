'use client';

import { Loader2, AlertCircle } from 'lucide-react';

export interface LoadingStateProps {
  status: 'loading' | 'error' | 'empty' | 'success';
  loadingText?: string;
  errorText?: string;
  emptyText?: string;
  retry?: () => void;
  size?: 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
}

export default function LoadingState({ 
  status, 
  loadingText = 'Loading...',
  errorText = 'Something went wrong. Please try again.',
  emptyText = 'No data found.',
  retry,
  size = 'md',
  children
}: LoadingStateProps) {
  const sizeClass = {
    sm: 'h-32',
    md: 'h-48', 
    lg: 'h-64'
  };
  
  // Only render children if status is success
  if (status === 'success') {
    return <>{children}</>;
  }
  
  return (
    <div className={`w-full ${sizeClass[size]} flex flex-col items-center justify-center`}>
      {status === 'loading' && (
        <>
          <Loader2 className="h-8 w-8 animate-spin text-blue-500 mb-3" />
          <p className="text-gray-600 dark:text-gray-400">{loadingText}</p>
        </>
      )}
      
      {status === 'error' && (
        <>
          <AlertCircle className="h-8 w-8 text-red-500 mb-3" />
          <p className="text-red-600 dark:text-red-400 mb-2">{errorText}</p>
          {retry && (
            <button
              onClick={retry}
              className="mt-2 px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm"
            >
              Try Again
            </button>
          )}
        </>
      )}
      
      {status === 'empty' && (
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400">{emptyText}</p>
        </div>
      )}
    </div>
  );
}
