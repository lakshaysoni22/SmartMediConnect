import { useEffect, useRef } from 'react';

/**
 * Custom hook for safe setTimeout with automatic cleanup
 * Prevents memory leaks by clearing timeout on unmount
 */
export function useTimeout(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback);

  // Remember the latest callback
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the timeout
  useEffect(() => {
    // Don't schedule if no delay is specified
    if (delay === null) {
      return;
    }

    const id = setTimeout(() => savedCallback.current(), delay);

    // Cleanup function
    return () => clearTimeout(id);
  }, [delay]);
}

/**
 * Safe setTimeout that returns cleanup function
 */
export function safeTimeout(callback: () => void, delay: number): () => void {
  const id = setTimeout(callback, delay);
  return () => clearTimeout(id);
}
