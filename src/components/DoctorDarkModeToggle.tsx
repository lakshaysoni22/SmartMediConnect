import React from 'react';

interface DoctorDarkModeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

export function DoctorDarkModeToggle({ isDark, onToggle }: DoctorDarkModeToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors relative group"
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      {isDark ? (
        <span className="material-symbols-outlined text-yellow-400 text-[24px]">
          light_mode
        </span>
      ) : (
        <span className="material-symbols-outlined text-slate-600 text-[24px]">
          dark_mode
        </span>
      )}
      
      {/* Tooltip */}
      <span className="absolute top-full mt-2 bg-slate-900 dark:bg-slate-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
        {isDark ? 'Light Mode' : 'Dark Mode'}
      </span>
    </button>
  );
}