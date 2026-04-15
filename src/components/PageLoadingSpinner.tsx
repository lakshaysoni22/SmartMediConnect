import React from 'react';

export function PageLoadingSpinner() {
  return (
    <div className="h-full w-full flex items-center justify-center bg-slate-50/50 dark:bg-black">
      <div className="flex flex-col items-center gap-4">
        {/* Animated Spinner */}
        <div className="relative">
          <div className="w-16 h-16 border-4 border-slate-200 dark:border-slate-700 border-t-[#137fec] rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-blue-400 rounded-full animate-spin" style={{ animationDuration: '0.8s' }}></div>
        </div>
        
        {/* Loading Text */}
        <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 animate-pulse">Loading...</p>
      </div>
    </div>
  );
}
