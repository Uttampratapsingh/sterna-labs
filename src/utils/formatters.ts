/**
 * Utility functions for formatting and parsing values
 */

/**
 * Parses a currency string (e.g., "$1.2K", "$5M") into a number
 * @param value - The currency string to parse
 * @returns The numeric value in dollars
 */
export function parseCurrencyValue(value: string): number {
  if (!value || typeof value !== "string") return 0;

  const multiplier = value.includes("K")
    ? 1000
    : value.includes("M")
    ? 1000000
    : 1;
  const numericValue = parseFloat(value.replace(/[$KM,]/g, ""));

  return isNaN(numericValue) ? 0 : numericValue * multiplier;
}

/**
 * Formats a number to a currency string with K/M suffixes
 * @param value - The numeric value
 * @returns Formatted currency string
 */
export function formatCurrency(value: number): string {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(2)}M`;
  }
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(2)}K`;
  }
  return `$${value.toFixed(2)}`;
}

/**
 * Parses an age string (e.g., "30s", "5m", "2h") into seconds
 * @param age - The age string to parse
 * @returns The age in seconds
 */
export function parseAgeToSeconds(age: string): number {
  const num = parseInt(age);
  if (age.includes("s")) return num;
  if (age.includes("m")) return num * 60;
  if (age.includes("h")) return num * 3600;
  return num;
}

/**
 * Formats seconds into human-readable age string
 * @param seconds - Number of seconds
 * @returns Formatted age string
 */
export function formatAge(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
  return `${Math.floor(seconds / 3600)}h`;
}

/**
 * Formats a percentage change value
 * @param value - The percentage value
 * @returns Formatted percentage string with sign
 */
export function formatPercentage(value: number): string {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}%`;
}

/**
 * Gets color class based on value (positive/negative/neutral)
 * @param value - The numeric value to evaluate
 * @returns Tailwind CSS color class
 */
export function getValueColorClass(value: number): string {
  if (value > 0) return "text-success";
  if (value < 0) return "text-danger";
  return "text-muted-foreground";
}

/**
 * Truncates a string to specified length with ellipsis
 * @param str - The string to truncate
 * @param maxLength - Maximum length before truncation
 * @returns Truncated string
 */
export function truncateString(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return `${str.slice(0, maxLength)}...`;
}

/**
 * Debounces a function call
 * @param func - The function to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

/**
 * Generates a random number within a range
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns Random number between min and max
 */
export function randomInRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}
