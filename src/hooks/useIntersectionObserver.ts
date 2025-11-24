import { useEffect, useRef, useState } from "react";

/**
 * Options for the Intersection Observer hook
 */
interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  /** Whether to freeze the observer after first intersection */
  freezeOnceVisible?: boolean;
}

/**
 * Custom hook for observing element intersection with viewport
 * Useful for lazy loading, infinite scroll, and viewport-based animations
 * 
 * @param options - IntersectionObserver options
 * @returns Tuple of [ref, entry, isIntersecting]
 * 
 * @example
 * ```tsx
 * const [ref, entry, isVisible] = useIntersectionObserver({
 *   threshold: 0.5,
 *   freezeOnceVisible: true
 * });
 * 
 * return (
 *   <div ref={ref}>
 *     {isVisible && <ExpensiveComponent />}
 *   </div>
 * );
 * ```
 */
export function useIntersectionObserver(
  options: UseIntersectionObserverOptions = {}
): [
  (node: Element | null) => void,
  IntersectionObserverEntry | undefined,
  boolean
] {
  const { threshold = 0, root = null, rootMargin = "0%", freezeOnceVisible = false } = options;
  const [entry, setEntry] = useState<IntersectionObserverEntry>();
  const [isIntersecting, setIsIntersecting] = useState(false);
  const frozen = useRef(false);

  const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
    setEntry(entry);
    setIsIntersecting(entry.isIntersecting);

    if (entry.isIntersecting && freezeOnceVisible) {
      frozen.current = true;
    }
  };

  const nodeRef = useRef<Element | null>(null);

  const setRef = (node: Element | null): void => {
    nodeRef.current = node;
  };

  useEffect(() => {
    const node = nodeRef.current;
    const hasIOSupport = !!window.IntersectionObserver;

    if (!hasIOSupport || frozen.current || !node) return;

    const observerParams = { threshold, root, rootMargin };
    const observer = new IntersectionObserver(updateEntry, observerParams);

    observer.observe(node);

    return () => observer.disconnect();
  }, [threshold, root, rootMargin]);

  return [setRef, entry, isIntersecting];
}
