import React, { useState, useEffect, useRef } from 'react';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  lowQualitySrc?: string;
  aspectRatio?: string;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
}

/**
 * OptimizedImage Component
 * Progressive image loading with blur-up effect
 * Lazy loading with IntersectionObserver
 * Performance optimized for mobile and web
 */
export function OptimizedImage({
  src,
  alt,
  lowQualitySrc,
  aspectRatio = '16/9',
  objectFit = 'cover',
  className = '',
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // IntersectionObserver for lazy loading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px', // Start loading 50px before image enters viewport
        threshold: 0.01
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ aspectRatio }}
    >
      {/* Low quality placeholder (blur-up) */}
      {lowQualitySrc && !isLoaded && (
        <img
          src={lowQualitySrc}
          alt={alt}
          className="absolute inset-0 w-full h-full blur-md scale-110 transition-opacity duration-300"
          style={{ objectFit }}
          aria-hidden="true"
        />
      )}

      {/* Main image */}
      <img
        ref={imgRef}
        src={isInView ? src : lowQualitySrc || ''}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full transition-all duration-500 ${
          isLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'
        }`}
        style={{ objectFit }}
        loading="lazy"
        {...props}
      />

      {/* Loading skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-slate-200 dark:bg-slate-700 animate-pulse" />
      )}
    </div>
  );
}
