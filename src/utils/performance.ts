/**
 * Performance Optimization Utilities for Medicare Systems
 * Handles lazy loading, debouncing, throttling, and memory optimization
 */

// Debounce function for input handlers
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

// Throttle function for scroll/resize handlers
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false;
  
  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

// Lazy load images with IntersectionObserver
export function lazyLoadImage(img: HTMLImageElement): void {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLImageElement;
          const src = target.dataset.src;
          if (src) {
            target.src = src;
            target.classList.add('loaded');
            observer.unobserve(target);
          }
        }
      });
    },
    {
      rootMargin: '50px',
      threshold: 0.01
    }
  );
  
  observer.observe(img);
}

// Check if device is mobile
export function isMobileDevice(): boolean {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

// Get device type
export type DeviceType = 'mobile' | 'tablet' | 'desktop';

export function getDeviceType(): DeviceType {
  const width = window.innerWidth;
  
  if (width < 768) {
    return 'mobile';
  } else if (width < 1024) {
    return 'tablet';
  } else {
    return 'desktop';
  }
}

// Optimize rendering with RAF
export function optimizedScroll(callback: () => void): void {
  let ticking = false;
  
  if (!ticking) {
    window.requestAnimationFrame(() => {
      callback();
      ticking = false;
    });
    ticking = true;
  }
}

// Preload critical images
export function preloadImages(urls: string[]): Promise<void[]> {
  return Promise.all(
    urls.map((url) => {
      return new Promise<void>((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => reject();
        img.src = url;
      });
    })
  );
}

// Memory cleanup utility
export function cleanupMemory(refs: React.RefObject<any>[]): void {
  refs.forEach((ref) => {
    if (ref.current) {
      ref.current = null;
    }
  });
}

// Check if reduced motion is preferred
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Get optimal animation duration based on user preference
export function getAnimationDuration(duration: number): number {
  return prefersReducedMotion() ? 0.01 : duration;
}

// Optimize component rendering
export function shouldComponentUpdate<T extends Record<string, any>>(
  prevProps: T,
  nextProps: T,
  keys?: (keyof T)[]
): boolean {
  if (!keys) {
    keys = Object.keys(prevProps) as (keyof T)[];
  }
  
  return keys.some((key) => prevProps[key] !== nextProps[key]);
}

// Local storage with error handling
export const storage = {
  get: <T>(key: string, defaultValue: T): T => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  },
  
  set: <T>(key: string, value: T): boolean => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  },
  
  remove: (key: string): boolean => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch {
      return false;
    }
  },
  
  clear: (): boolean => {
    try {
      localStorage.clear();
      return true;
    } catch {
      return false;
    }
  }
};

// Detect network speed
export type NetworkSpeed = 'slow' | 'medium' | 'fast';

export function getNetworkSpeed(): NetworkSpeed {
  const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
  
  if (!connection) {
    return 'medium';
  }
  
  const effectiveType = connection.effectiveType;
  
  if (effectiveType === 'slow-2g' || effectiveType === '2g') {
    return 'slow';
  } else if (effectiveType === '3g') {
    return 'medium';
  } else {
    return 'fast';
  }
}

// Adaptive loading based on network speed
export function shouldLoadHeavyAssets(): boolean {
  const networkSpeed = getNetworkSpeed();
  const deviceType = getDeviceType();
  
  // Don't load heavy assets on slow network or mobile
  if (networkSpeed === 'slow' || deviceType === 'mobile') {
    return false;
  }
  
  return true;
}

// Safe area inset detection (for mobile notches)
export function getSafeAreaInsets(): {
  top: number;
  right: number;
  bottom: number;
  left: number;
} {
  const style = getComputedStyle(document.documentElement);
  
  return {
    top: parseInt(style.getPropertyValue('env(safe-area-inset-top)') || '0'),
    right: parseInt(style.getPropertyValue('env(safe-area-inset-right)') || '0'),
    bottom: parseInt(style.getPropertyValue('env(safe-area-inset-bottom)') || '0'),
    left: parseInt(style.getPropertyValue('env(safe-area-inset-left)') || '0')
  };
}

// Viewport height fix for mobile browsers
export function getViewportHeight(): number {
  return window.innerHeight;
}

// Set CSS custom property for accurate viewport height
export function setViewportHeightProperty(): void {
  const vh = getViewportHeight() * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Initialize viewport height on resize
if (typeof window !== 'undefined') {
  setViewportHeightProperty();
  window.addEventListener('resize', throttle(setViewportHeightProperty, 100));
}
