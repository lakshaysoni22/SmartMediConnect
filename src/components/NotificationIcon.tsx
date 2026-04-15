import React, { memo } from 'react';

interface NotificationIconProps {
  onClick?: () => void;
  showDot?: boolean;
  className?: string;
}

// ✅ OPTIMIZED: Memoized component to prevent unnecessary re-renders
export const NotificationIcon = memo(function NotificationIcon({ 
  onClick, 
  showDot = true, 
  className = '' 
}: NotificationIconProps) {
  return (
    <button
      onClick={onClick}
      className={`relative flex items-center justify-center size-10 rounded-full bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 hover:bg-slate-50 dark:hover:bg-gray-700 hover:scale-105 transition-all shadow-sm hover:shadow-md ${className}`}
      aria-label="Notifications"
      type="button"
    >
      <span className="material-symbols-outlined text-[20px] text-slate-600 dark:text-slate-300">
        notifications
      </span>
      {showDot && (
        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-gray-800 animate-pulse"></span>
      )}
    </button>
  );
});