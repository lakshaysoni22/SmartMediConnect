import React, { useState, useEffect } from 'react';
import { DarkModeUtils } from '../utils/darkMode';

export function Navbar({ onGetStarted }: { onGetStarted: () => void }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Initialize dark mode state
    setIsDarkMode(DarkModeUtils.get());

    // Subscribe to dark mode changes
    const unsubscribe = DarkModeUtils.subscribe((isDark) => {
      setIsDarkMode(isDark);
    });

    return unsubscribe;
  }, []);

  const handleLogoClick = () => {
    const newDarkMode = DarkModeUtils.toggle();
    setIsDarkMode(newDarkMode);
  };

  return (
    <nav className="fixed top-4 left-4 right-4 z-50 rounded-2xl border border-white/40 dark:border-slate-700/40 glass transition-all duration-300 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div onClick={handleLogoClick} className="flex items-center gap-3 cursor-pointer group">
            <div className="size-10 rounded-xl bg-gradient-to-br from-[#137fec] to-[#0b5cb5] flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
              <span className="material-symbols-outlined text-[24px]">local_hospital</span>
            </div>
            <span className="font-black tracking-tight text-slate-900 dark:text-white group-hover:text-[#137fec] transition-colors text-xl" style={{ whiteSpace: 'nowrap' }}>
              Mediconnect
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            <a className="px-4 py-2 rounded-lg font-medium text-slate-600 dark:text-slate-300 hover:text-[#137fec] dark:hover:text-[#137fec] hover:bg-slate-100/50 dark:hover:bg-slate-800/50 transition-all text-sm" href="#">
              Services
            </a>
            <a className="px-4 py-2 rounded-lg font-medium text-slate-600 dark:text-slate-300 hover:text-[#137fec] dark:hover:text-[#137fec] hover:bg-slate-100/50 dark:hover:bg-slate-800/50 transition-all text-sm" href="#portals">
              Portals
            </a>
            <a className="px-4 py-2 rounded-lg font-medium text-slate-600 dark:text-slate-300 hover:text-[#137fec] dark:hover:text-[#137fec] hover:bg-slate-100/50 dark:hover:bg-slate-800/50 transition-all text-sm" href="#">
              About Us
            </a>
            <a className="px-4 py-2 rounded-lg font-medium text-slate-600 dark:text-slate-300 hover:text-[#137fec] dark:hover:text-[#137fec] hover:bg-slate-100/50 dark:hover:bg-slate-800/50 transition-all text-sm" href="#">
              Contact
            </a>
          </div>

          {/* Right Side Buttons */}
          <div className="flex items-center gap-3">
            {/* Dark Mode Toggle Button */}
            <button
              onClick={handleLogoClick}
              className="flex items-center justify-center size-10 rounded-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 shadow-md hover:shadow-lg transition-all hover:scale-110"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <span className="material-symbols-outlined text-yellow-500 text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  light_mode
                </span>
              ) : (
                <span className="material-symbols-outlined text-slate-700 text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  dark_mode
                </span>
              )}
            </button>
            
            <button 
              onClick={onGetStarted}
              className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-[#137fec] to-blue-600 hover:from-[#0b5cb5] hover:to-[#137fec] text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-[#137fec]/30 hover:shadow-[#137fec]/50 hover:-translate-y-0.5 text-sm"
            >
              <span>Get Started</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
            <button className="md:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
              <span className="material-symbols-outlined">menu</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}