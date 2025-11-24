import { useEffect, useCallback } from "react";

/**
 * Keyboard shortcut configuration
 */
export interface KeyboardShortcut {
  /** Key combination (e.g., 'ctrl+k', 'cmd+/', 'alt+n') */
  key: string;
  /** Callback function to execute */
  callback: (event: KeyboardEvent) => void;
  /** Description for accessibility/help menu */
  description?: string;
  /** Prevent default browser behavior */
  preventDefault?: boolean;
}

/**
 * Parse key combination string into modifier keys and main key
 */
function parseKeyCombo(combo: string): {
  ctrl: boolean;
  alt: boolean;
  shift: boolean;
  meta: boolean;
  key: string;
} {
  const parts = combo.toLowerCase().split('+');
  const key = parts[parts.length - 1];
  
  return {
    ctrl: parts.includes('ctrl'),
    alt: parts.includes('alt'),
    shift: parts.includes('shift'),
    meta: parts.includes('cmd') || parts.includes('meta'),
    key
  };
}

/**
 * Custom hook for keyboard shortcuts
 * Handles multiple keyboard combinations with modifier keys
 * Automatically cleans up event listeners
 * 
 * @param shortcuts - Array of keyboard shortcut configurations
 * @param enabled - Whether shortcuts are active (default: true)
 * 
 * @example
 * ```tsx
 * useKeyboardShortcuts([
 *   {
 *     key: 'ctrl+k',
 *     callback: () => openSearch(),
 *     description: 'Open search',
 *     preventDefault: true
 *   },
 *   {
 *     key: 'esc',
 *     callback: () => closeModal(),
 *     description: 'Close modal'
 *   }
 * ]);
 * ```
 */
export function useKeyboardShortcuts(
  shortcuts: KeyboardShortcut[],
  enabled: boolean = true
): void {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!enabled) return;

      shortcuts.forEach((shortcut) => {
        const combo = parseKeyCombo(shortcut.key);
        
        const keyMatches = event.key.toLowerCase() === combo.key;
        const ctrlMatches = combo.ctrl ? event.ctrlKey : !event.ctrlKey;
        const altMatches = combo.alt ? event.altKey : !event.altKey;
        const shiftMatches = combo.shift ? event.shiftKey : !event.shiftKey;
        const metaMatches = combo.meta ? event.metaKey : !event.metaKey;

        if (keyMatches && ctrlMatches && altMatches && shiftMatches && metaMatches) {
          if (shortcut.preventDefault) {
            event.preventDefault();
          }
          shortcut.callback(event);
        }
      });
    },
    [shortcuts, enabled]
  );

  useEffect(() => {
    if (!enabled) return;

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown, enabled]);
}
