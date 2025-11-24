import { useEffect, useRef } from "react";

/**
 * Custom hook to track previous value of a variable
 * Useful for comparing current and previous values in effects
 * 
 * @template T - The type of value to track
 * @param value - The value to track
 * @returns The previous value
 * 
 * @example
 * ```tsx
 * const [count, setCount] = useState(0);
 * const prevCount = usePrevious(count);
 * 
 * useEffect(() => {
 *   if (prevCount !== undefined && count > prevCount) {
 *     console.log('Count increased');
 *   }
 * }, [count, prevCount]);
 * ```
 */
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
