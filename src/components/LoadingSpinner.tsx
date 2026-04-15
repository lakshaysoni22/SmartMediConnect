import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'blue' | 'white' | 'green' | 'red';
  message?: string;
  fullScreen?: boolean;
}

export function LoadingSpinner({ 
  size = 'md', 
  color = 'blue', 
  message,
  fullScreen = false 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  const colorClasses = {
    blue: 'text-blue-600 dark:text-blue-400',
    white: 'text-white',
    green: 'text-green-600 dark:text-green-400',
    red: 'text-red-600 dark:text-red-400'
  };

  const spinner = (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className={`${sizeClasses[size]} ${colorClasses[color]} animate-spin`}>
        <span className="material-symbols-outlined" style={{ fontSize: 'inherit' }}>
          progress_activity
        </span>
      </div>
      {message && (
        <p className="text-sm font-medium text-slate-600 dark:text-slate-400 animate-pulse">
          {message}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
        {spinner}
      </div>
    );
  }

  return spinner;
}
