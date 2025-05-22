'use client';

import { useState } from 'react';

interface ErrorDisplayProps {
  error?: string | null;
  retry?: () => void;
}

export function ErrorDisplay({ error, retry }: ErrorDisplayProps) {
  if (!error) return null;

  return (
    <div className="rounded-md bg-red-50 p-4 my-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">Error</h3>
          <div className="mt-2 text-sm text-red-700">{error}</div>
          {retry && (
            <button 
              className="mt-2 rounded-md bg-red-50 px-2 py-1 text-sm font-medium text-red-800 hover:bg-red-100"
              onClick={retry}
            >
              Try again
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  label?: string;
}

export function LoadingSpinner({ size = 'medium', label }: LoadingSpinnerProps) {
  const sizeClasses = {
    small: 'w-4 h-4 border-2',
    medium: 'w-8 h-8 border-4',
    large: 'w-12 h-12 border-4'
  };

  return (
    <div className="flex flex-col items-center justify-center py-4">
      <div className={`${sizeClasses[size]} border-blue-500 border-t-transparent rounded-full animate-spin`}></div>
      {label && <p className="mt-2 text-sm text-gray-500">{label}</p>}
    </div>
  );
}

interface EmptyStateProps {
  title: string;
  message?: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({ title, message, icon, action }: EmptyStateProps) {
  return (
    <div className="text-center py-8 border border-dashed rounded-lg">
      {icon && <div className="mx-auto mb-2 text-gray-400">{icon}</div>}
      <p className="font-medium text-gray-700">{title}</p>
      {message && <p className="text-gray-500 text-sm mt-1">{message}</p>}
      {action && (
        <button
          onClick={action.onClick}
          className="mt-3 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-md px-4 py-1.5"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
