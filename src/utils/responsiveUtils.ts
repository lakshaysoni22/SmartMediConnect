/**
 * 📱 RESPONSIVE UTILITIES FOR SMARTMEDICONNECT
 * 
 * Device breakpoints matching the Figma design specs:
 * - iPhone SE: 320×568
 * - iPhone 16: 393×852
 * - iPhone 16 Pro: 402×874
 * - iPhone 16 Plus: 430×932
 * - iPhone 16 Pro Max: 440×956
 * - Android Compact: 412×917
 * - Android Medium: 700×840
 */

export const BREAKPOINTS = {
  // Small phones (iPhone SE)
  XS: 320,
  
  // Standard phones (iPhone 16, Android Compact)
  SM: 393,
  
  // Large phones (iPhone 16 Plus, Pro Max)
  MD: 440,
  
  // Small tablets (Android Medium)
  LG: 700,
  
  // Tablets
  XL: 768,
  
  // Desktop
  '2XL': 1024,
} as const;

export type DeviceSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

/**
 * Get current device size based on window width
 */
export const getDeviceSize = (): DeviceSize => {
  if (typeof window === 'undefined') return 'lg';
  
  const width = window.innerWidth;
  
  if (width < BREAKPOINTS.SM) return 'xs';
  if (width < BREAKPOINTS.MD) return 'sm';
  if (width < BREAKPOINTS.LG) return 'md';
  if (width < BREAKPOINTS.XL) return 'lg';
  if (width < BREAKPOINTS['2XL']) return 'xl';
  return '2xl';
};

/**
 * Check if device is mobile (xs, sm, md)
 */
export const isMobile = (): boolean => {
  const size = getDeviceSize();
  return ['xs', 'sm', 'md'].includes(size);
};

/**
 * Check if device is tablet (lg, xl)
 */
export const isTablet = (): boolean => {
  const size = getDeviceSize();
  return ['lg', 'xl'].includes(size);
};

/**
 * Check if device is desktop (2xl)
 */
export const isDesktop = (): boolean => {
  return getDeviceSize() === '2xl';
};

/**
 * Responsive class utilities
 */
export const ResponsiveClasses = {
  // Container padding
  container: 'px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16',
  
  // Section spacing
  section: 'py-8 sm:py-10 md:py-12 lg:py-16 xl:py-20',
  
  // Grid layouts
  grid: {
    two: 'grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6',
    three: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6',
    four: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6',
  },
  
  // Typography
  heading: {
    h1: 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl',
    h2: 'text-xl sm:text-2xl md:text-3xl lg:text-4xl',
    h3: 'text-lg sm:text-xl md:text-2xl lg:text-3xl',
    h4: 'text-base sm:text-lg md:text-xl',
  },
  
  // Buttons
  button: {
    base: 'px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base',
    large: 'px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg',
    small: 'px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm',
  },
  
  // Cards
  card: 'p-4 sm:p-6 md:p-8',
  
  // Sidebar
  sidebar: {
    width: 'w-64 md:w-64 lg:w-64',
    collapsed: 'w-16 md:w-16 lg:w-16',
  },
  
  // Modal
  modal: 'w-full max-w-[90vw] sm:max-w-md md:max-w-lg lg:max-w-xl',
  
  // Form inputs
  input: 'h-11 sm:h-12 text-sm sm:text-base',
  
  // Flex layouts
  flex: {
    stack: 'flex flex-col gap-4 sm:gap-6',
    row: 'flex flex-col sm:flex-row gap-4 sm:gap-6',
  },
} as const;

/**
 * Get responsive value based on device size
 */
export const getResponsiveValue = <T>(values: {
  xs?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  '2xl'?: T;
  default: T;
}): T => {
  const size = getDeviceSize();
  return values[size] ?? values.default;
};

/**
 * Hook to detect device size changes
 */
export const useResponsive = () => {
  if (typeof window === 'undefined') {
    return {
      size: 'lg' as DeviceSize,
      isMobile: false,
      isTablet: false,
      isDesktop: true,
      width: 1024,
    };
  }

  return {
    size: getDeviceSize(),
    isMobile: isMobile(),
    isTablet: isTablet(),
    isDesktop: isDesktop(),
    width: window.innerWidth,
  };
};

/**
 * Viewport-based font sizes
 */
export const getFontSize = (size: DeviceSize): string => {
  const sizes = {
    xs: '14px',
    sm: '14px',
    md: '15px',
    lg: '15px',
    xl: '16px',
    '2xl': '16px',
  };
  return sizes[size];
};

/**
 * Touch-friendly minimum sizes for mobile
 */
export const TOUCH_TARGET = {
  min: 44, // Apple's recommended minimum
  comfortable: 48,
  large: 56,
} as const;

/**
 * Responsive image sizes
 */
export const getImageSize = (size: DeviceSize): { width: number; height: number } => {
  const sizes = {
    xs: { width: 320, height: 240 },
    sm: { width: 400, height: 300 },
    md: { width: 600, height: 450 },
    lg: { width: 800, height: 600 },
    xl: { width: 1024, height: 768 },
    '2xl': { width: 1280, height: 960 },
  };
  return sizes[size];
};

/**
 * Get sidebar state based on device
 */
export const getDefaultSidebarState = (): boolean => {
  // Sidebar collapsed on mobile/tablet, expanded on desktop
  return !isMobile() && !isTablet();
};

/**
 * Chart responsive dimensions
 */
export const getChartDimensions = (size: DeviceSize) => {
  const dimensions = {
    xs: { width: 280, height: 200 },
    sm: { width: 350, height: 250 },
    md: { width: 400, height: 280 },
    lg: { width: 600, height: 350 },
    xl: { width: 700, height: 400 },
    '2xl': { width: 800, height: 450 },
  };
  return dimensions[size];
};

/**
 * Modal positioning based on device
 */
export const getModalClasses = (size: DeviceSize): string => {
  if (['xs', 'sm'].includes(size)) {
    return 'fixed inset-0 w-full h-full rounded-none';
  }
  return 'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl max-h-[90vh] rounded-2xl';
};

/**
 * Table responsive behavior
 */
export const getTableClasses = (size: DeviceSize): string => {
  if (['xs', 'sm'].includes(size)) {
    return 'block overflow-x-auto'; // Horizontal scroll on mobile
  }
  return 'table w-full';
};

/**
 * Navigation menu behavior
 */
export const getNavClasses = (size: DeviceSize): string => {
  if (['xs', 'sm', 'md'].includes(size)) {
    return 'fixed bottom-0 left-0 right-0 z-50'; // Bottom nav on mobile
  }
  return 'fixed top-0 left-0 right-0 z-50'; // Top nav on desktop
};
