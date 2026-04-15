// 🚀 PRODUCTION-READY Dark Mode Utility
// ✅ Zero console logs in production
// ✅ Event-based system for better control
// ✅ Optimized for performance

const DARK_MODE_KEY = 'mediconnectAppDarkMode';
const DARK_MODE_EVENT = 'darkModeChange';

// Internal state - single source of truth
let isDarkModeActive = false;
let isInitialized = false;

// Debounce helper
let debounceTimer: ReturnType<typeof setTimeout> | null = null;

export const DarkModeUtils = {
  // Initialize dark mode - Call this once on app load
  init: (): boolean => {
    if (isInitialized) {
      return isDarkModeActive;
    }
    
    try {
      const saved = localStorage.getItem(DARK_MODE_KEY);
      isDarkModeActive = saved === 'true';
      
      // Apply to DOM immediately
      if (isDarkModeActive) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      
      isInitialized = true;
      return isDarkModeActive;
    } catch {
      isDarkModeActive = false;
      isInitialized = true;
      return false;
    }
  },

  // Toggle dark mode
  toggle: (): boolean => {
    try {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }

      isDarkModeActive = !isDarkModeActive;
      
      // Apply to DOM immediately
      if (isDarkModeActive) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }

      localStorage.setItem(DARK_MODE_KEY, isDarkModeActive ? 'true' : 'false');
      
      // Dispatch event asynchronously
      debounceTimer = setTimeout(() => {
        const event = new CustomEvent(DARK_MODE_EVENT, { 
          detail: { isDark: isDarkModeActive },
          bubbles: false
        });
        window.dispatchEvent(event);
      }, 0);
      
      return isDarkModeActive;
    } catch {
      return isDarkModeActive;
    }
  },

  // Set dark mode explicitly
  set: (isDark: boolean): void => {
    try {
      if (isDarkModeActive === isDark) {
        return;
      }

      isDarkModeActive = isDark;
      
      if (isDarkModeActive) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }

      localStorage.setItem(DARK_MODE_KEY, isDarkModeActive ? 'true' : 'false');
      
      const event = new CustomEvent(DARK_MODE_EVENT, { 
        detail: { isDark: isDarkModeActive },
        bubbles: false
      });
      window.dispatchEvent(event);
    } catch {
      // Silent fail in production
    }
  },

  // Get current state
  get: (): boolean => {
    return isDarkModeActive;
  },

  // Subscribe to changes
  subscribe: (callback: (isDark: boolean) => void): (() => void) => {
    try {
      const handler = (event: Event) => {
        const customEvent = event as CustomEvent<{ isDark: boolean }>;
        callback(customEvent.detail.isDark);
      };

      window.addEventListener(DARK_MODE_EVENT, handler);

      return () => {
        window.removeEventListener(DARK_MODE_EVENT, handler);
      };
    } catch {
      return () => {};
    }
  }
};
