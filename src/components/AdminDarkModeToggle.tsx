import React, { useState, useEffect, useCallback, memo } from 'react';
import { DarkModeUtils } from '../utils/darkMode';

// 🚀 ULTRA OPTIMIZED - Memoized component to prevent unnecessary re-renders
const AdminDarkModeToggleComponent = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => DarkModeUtils.get());

  useEffect(() => {
    // Subscribe to dark mode changes
    const unsubscribe = DarkModeUtils.subscribe((isDark) => {
      // Only update if actually changed
      setIsDarkMode(prev => {
        if (prev === isDark) return prev;
        return isDark;
      });
    });

    return unsubscribe;
  }, []); // Empty deps - subscribe only once

  // Memoized toggle handler
  const handleToggle = useCallback(() => {
    DarkModeUtils.toggle();
  }, []);

  return (
    <button
      onClick={handleToggle}
      className="flex items-center justify-center w-10 h-10 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all hover:scale-110 cursor-pointer"
      aria-label="Toggle dark mode"
      type="button"
    >
      {isDarkMode ? (
        <span className="material-symbols-outlined text-yellow-500 text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>
          light_mode
        </span>
      ) : (
        <span className="material-symbols-outlined text-slate-700 text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>
          dark_mode
        </span>
      )}
    </button>
  );
};

// Export memoized component
export const AdminDarkModeToggle = memo(AdminDarkModeToggleComponent);
