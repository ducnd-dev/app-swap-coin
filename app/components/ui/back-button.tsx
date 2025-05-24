'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  href?: string;
  label?: string;
  className?: string;
  variant?: 'default' | 'outline' | 'ghost' | 'primary';
}

/**
 * Back button component that navigates to previous page or specified route
 */
export default function BackButton({ 
  href, 
  label = 'Back', 
  className = '',
  variant = 'default'
}: BackButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if (href) {
      router.push(href);
    } else {
      router.back();
    }
  };

  // Styles based on variant
  const variantStyles = {
    default: `bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600
              text-gray-200 hover:text-white transition-all hover:shadow-md hover:translate-x-[-2px]`,
    outline: `border border-gray-600 hover:border-gray-500 bg-transparent
              text-gray-200 hover:text-white transition-all hover:shadow-md hover:translate-x-[-2px]`,
    ghost: `bg-transparent hover:bg-gray-800/30
            text-gray-300 hover:text-white transition-all hover:translate-x-[-2px]`,
    primary: `bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700
              text-white transition-all hover:shadow-md hover:translate-x-[-2px]`
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md 
        ${variantStyles[variant]} ${className}`}
      aria-label={label}
    >
      <ArrowLeft size={16} className="transition-transform group-hover:translate-x-[-2px]" />
      <span>{label}</span>
    </button>
  );
}
