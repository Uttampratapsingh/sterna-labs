import { useCallback, useMemo } from "react";

interface UseCopyToClipboardReturn {
  copyToClipboard: (text: string) => Promise<boolean>;
  isCopySupported: boolean;
}

/**
 * Custom hook for copying text to clipboard
 * @returns Object with copyToClipboard function and support status
 */
export function useCopyToClipboard(): UseCopyToClipboardReturn {
  const isCopySupported = useMemo(
    () => typeof navigator !== "undefined" && !!navigator.clipboard,
    []
  );

  const copyToClipboard = useCallback(async (text: string): Promise<boolean> => {
    if (!isCopySupported) {
      console.warn("Clipboard API not supported");
      return false;
    }

    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (error) {
      console.error("Failed to copy to clipboard:", error);
      return false;
    }
  }, [isCopySupported]);

  return { copyToClipboard, isCopySupported };
}
