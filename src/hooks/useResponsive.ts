/**
 * Responsive Hooks for Medicare Systems
 * Custom React hooks for responsive design and device detection
 */

import { useState, useEffect } from 'react';
import { throttle } from '../utils/performance';

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface BreakpointValues {
  xs: boolean; // 0-479px
  sm: boolean; // 480-767px
  md: boolean; // 768-1023px
  lg: boolean; // 1024-1279px
  xl: boolean; // 1280-1535px
  '2xl': boolean; // 1536px+
}

// Hook to detect current breakpoint
export function useBreakpoint(): Breakpoint {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('lg');

  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      
      if (width < 480) {
        setBreakpoint('xs');
      } else if (width < 768) {
        setBreakpoint('sm');
      } else if (width < 1024) {
        setBreakpoint('md');
      } else if (width < 1280) {
        setBreakpoint('lg');
      } else if (width < 1536) {
        setBreakpoint('xl');
      } else {
        setBreakpoint('2xl');
      }
    };

    updateBreakpoint();
    
    const handleResize = throttle(updateBreakpoint, 200);
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return breakpoint;
}

// Hook to check if screen is at or above a breakpoint
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [query]);

  return matches;
}

// Specific breakpoint hooks
export function useIsMobile(): boolean {
  return useMediaQuery('(max-width: 767px)');
}

export function useIsTablet(): boolean {
  return useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
}

export function useIsDesktop(): boolean {
  return useMediaQuery('(min-width: 1024px)');
}

export function useIsLargeScreen(): boolean {
  return useMediaQuery('(min-width: 1920px)');
}

// Hook to get all breakpoint states
export function useBreakpoints(): BreakpointValues {
  const [breakpoints, setBreakpoints] = useState<BreakpointValues>({
    xs: false,
    sm: false,
    md: false,
    lg: false,
    xl: false,
    '2xl': false
  });

  useEffect(() => {
    const updateBreakpoints = () => {
      const width = window.innerWidth;
      
      setBreakpoints({
        xs: width < 480,
        sm: width >= 480 && width < 768,
        md: width >= 768 && width < 1024,
        lg: width >= 1024 && width < 1280,
        xl: width >= 1280 && width < 1536,
        '2xl': width >= 1536
      });
    };

    updateBreakpoints();
    
    const handleResize = throttle(updateBreakpoints, 200);
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return breakpoints;
}

// Hook to get window dimensions
export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });

  useEffect(() => {
    const handleResize = throttle(() => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }, 200);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

// Hook to detect touch device
export function useIsTouchDevice(): boolean {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      (navigator as any).msMaxTouchPoints > 0
    );
  }, []);

  return isTouch;
}

// Hook to detect device orientation
export type Orientation = 'portrait' | 'landscape';

export function useOrientation(): Orientation {
  const [orientation, setOrientation] = useState<Orientation>('portrait');

  useEffect(() => {
    const updateOrientation = () => {
      setOrientation(
        window.innerHeight > window.innerWidth ? 'portrait' : 'landscape'
      );
    };

    updateOrientation();
    
    const handleOrientationChange = throttle(updateOrientation, 200);
    window.addEventListener('resize', handleOrientationChange);
    
    return () => window.removeEventListener('resize', handleOrientationChange);
  }, []);

  return orientation;
}

// Hook to detect if user prefers dark mode
export function usePrefersColorScheme(): 'light' | 'dark' | null {
  const [scheme, setScheme] = useState<'light' | 'dark' | null>(null);

  useEffect(() => {
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const updateScheme = () => {
      setScheme(darkModeQuery.matches ? 'dark' : 'light');
    };

    updateScheme();
    darkModeQuery.addEventListener('change', updateScheme);
    
    return () => darkModeQuery.removeEventListener('change', updateScheme);
  }, []);

  return scheme;
}

// Hook to detect reduced motion preference
export function usePrefersReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const updatePreference = () => {
      setPrefersReduced(motionQuery.matches);
    };

    updatePreference();
    motionQuery.addEventListener('change', updatePreference);
    
    return () => motionQuery.removeEventListener('change', updatePreference);
  }, []);

  return prefersReduced;
}
