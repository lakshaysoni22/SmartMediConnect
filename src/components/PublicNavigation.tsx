import React, { useState, useEffect, useCallback, memo, startTransition } from 'react';
import { DarkModeUtils } from '../utils/darkMode';

interface PublicNavigationProps {
  currentPage?: 'home' | 'symptom-checker' | 'health-info' | 'premium' | 'security' | 'about-us' | 'upcoming';
  onHome?: () => void;
  onSymptomChecker?: () => void;
  onHealthInfo?: () => void;
  onViewPlans?: () => void;
  onGetStarted?: () => void;
  onSecurity?: () => void;
  onAboutUs?: () => void;
  onUpcoming?: () => void;
  homeLabel?: string; // Custom label for home button
}

// ✅ OPTIMIZED: Memoized component to prevent unnecessary re-renders
const PublicNavigationComponent = ({
  currentPage = 'home',
  onHome,
  onSymptomChecker,
  onHealthInfo,
  onViewPlans,
  onGetStarted,
  onSecurity,
  onAboutUs,
  onUpcoming,
  homeLabel
}: PublicNavigationProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Initialize dark mode state in a transition
    startTransition(() => {
      setIsDarkMode(DarkModeUtils.get());
    });

    // Subscribe to dark mode changes
    const unsubscribe = DarkModeUtils.subscribe((isDark) => {
      startTransition(() => {
        setIsDarkMode(isDark);
      });
    });

    return unsubscribe;
  }, []);

  // ✅ OPTIMIZED: Throttled scroll handler for better performance
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ✅ OPTIMIZED: Memoized callback
  const handleLogoClick = useCallback(() => {
    const newDarkMode = DarkModeUtils.toggle();
    startTransition(() => {
      setIsDarkMode(newDarkMode);
    });
  }, []);

  return (
    <nav className={`fixed top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'left-0 right-0 bg-white dark:bg-black backdrop-blur-lg shadow-lg' 
        : 'left-2 right-2 mt-2 rounded-2xl border border-white/40 dark:border-gray-800/40 glass shadow-glass'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center" style={{ height: '64px' }}>
          {/* Logo - Fixed size with inline styles only */}
          <button 
            onClick={handleLogoClick}
            className="flex items-center cursor-pointer group bg-transparent border-0 p-0"
            style={{ height: '40px', gap: '12px' }}
            aria-label="Toggle dark mode"
          >
            <div 
              className="rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300" 
              style={{ 
                width: '40px', 
                height: '40px',
                minWidth: '40px',
                minHeight: '40px'
              }}
            >
              <span 
                className="material-symbols-outlined" 
                style={{ 
                  fontSize: '24px !important',
                  lineHeight: '24px !important',
                  width: '24px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                local_hospital
              </span>
            </div>
            <span 
              className="dark:text-white text-slate-900"
              style={{ 
                fontSize: '23px',
                fontWeight: '900',
                lineHeight: '1',
                letterSpacing: '-0.02em',
                fontFamily: 'Inter, sans-serif',
                whiteSpace: 'nowrap'
              }}
            >
              SmartMediConnect
            </span>
          </button>

          {/* Navigation Links - Fixed size with inline styles only */}
          <div className="hidden md:flex items-center" style={{ gap: '4px' }}>
            <button 
              onClick={onSymptomChecker}
              className={`rounded-lg transition-all duration-300 ${
                currentPage === 'symptom-checker'
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-primary dark:text-blue-400 cursor-default'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100/50 dark:hover:bg-slate-800/50 cursor-pointer'
              }`}
              style={{ 
                fontSize: '15px !important',
                fontWeight: '500 !important',
                lineHeight: '24px !important',
                padding: '8px 16px',
                fontFamily: 'Inter, sans-serif',
                border: 'none',
                background: currentPage === 'symptom-checker' ? undefined : 'transparent',
                whiteSpace: 'nowrap'
              }}
            >
              Symptom Checker
            </button>
            <button 
              onClick={onHome}
              className={`rounded-lg transition-all ${
                currentPage === 'home'
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-primary dark:text-blue-400 cursor-default'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100/50 dark:hover:bg-slate-800/50 cursor-pointer'
              }`}
              style={{ 
                fontSize: '15px !important',
                fontWeight: '500 !important',
                lineHeight: '24px !important',
                padding: '8px 16px',
                fontFamily: 'Inter, sans-serif',
                border: 'none',
                background: currentPage === 'home' ? undefined : 'transparent',
                whiteSpace: 'nowrap'
              }}
            >
              {homeLabel || 'Home'}
            </button>
            <button 
              onClick={onAboutUs}
              className={`rounded-lg transition-all ${
                currentPage === 'about-us'
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-primary dark:text-blue-400 cursor-default'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100/50 dark:hover:bg-slate-800/50 cursor-pointer'
              }`}
              style={{ 
                fontSize: '15px !important',
                fontWeight: '500 !important',
                lineHeight: '24px !important',
                padding: '8px 16px',
                fontFamily: 'Inter, sans-serif',
                border: 'none',
                background: currentPage === 'about-us' ? undefined : 'transparent',
                whiteSpace: 'nowrap'
              }}
            >
              About Us
            </button>
            <button 
              onClick={onHealthInfo}
              className={`rounded-lg transition-all ${
                currentPage === 'health-info'
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-primary dark:text-blue-400 cursor-default'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100/50 dark:hover:bg-slate-800/50 cursor-pointer'
              }`}
              style={{ 
                fontSize: '15px !important',
                fontWeight: '500 !important',
                lineHeight: '24px !important',
                padding: '8px 16px',
                fontFamily: 'Inter, sans-serif',
                border: 'none',
                background: currentPage === 'health-info' ? undefined : 'transparent',
                whiteSpace: 'nowrap'
              }}
            >
              Health Info
            </button>
            <button 
              onClick={onViewPlans}
              className={`rounded-lg transition-all flex items-center group relative ${
                currentPage === 'premium'
                  ? 'bg-purple-50 dark:bg-purple-900/30 cursor-default'
                  : 'hover:bg-purple-50/50 dark:hover:bg-purple-900/20 cursor-pointer'
              }`}
              style={{ 
                fontSize: '15px !important',
                fontWeight: '600 !important',
                lineHeight: '24px !important',
                padding: '8px 16px',
                gap: '8px',
                fontFamily: 'Inter, sans-serif',
                border: 'none',
                background: currentPage === 'premium' ? undefined : 'transparent'
              }}
            >
              <span 
                className="material-symbols-outlined rainbow-icon"
                style={{ 
                  fontSize: '20px !important',
                  lineHeight: '20px !important',
                  width: '20px',
                  height: '20px',
                  fontVariationSettings: '"FILL" 1, "wght" 600'
                }}
              >
                workspace_premium
              </span>
              <span 
                className="rainbow-text"
                style={{ 
                  fontSize: '15px !important', 
                  fontWeight: '600 !important', 
                  lineHeight: '24px !important'
                }}
              >
                Premium
              </span>
            </button>
          </div>

          {/* Get Started Button - Fixed size with inline styles only */}
          <div className="flex items-center" style={{ gap: '16px' }}>
            <button 
              onClick={onGetStarted}
              className="hidden sm:flex items-center bg-gradient-to-r from-primary to-primary-dark hover:from-blue-600 hover:to-blue-700 text-white rounded-xl transition-all shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-0.5"
              style={{ 
                fontSize: '14px !important',
                fontWeight: '700 !important',
                lineHeight: '20px !important',
                padding: '10px 20px',
                gap: '8px',
                fontFamily: 'Inter, sans-serif',
                border: 'none'
              }}
            >
              <span style={{ fontSize: '14px !important', fontWeight: '700 !important', lineHeight: '20px !important' }}>Get Started</span>
              <span 
                className="material-symbols-outlined" 
                style={{ 
                  fontSize: '20px !important',
                  lineHeight: '20px !important',
                  width: '20px',
                  height: '20px'
                }}
              >
                arrow_forward
              </span>
            </button>
            <button className="md:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
              <span className="material-symbols-outlined">menu</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export const PublicNavigation = memo(PublicNavigationComponent);