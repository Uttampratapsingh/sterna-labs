import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Parses a currency string (e.g., "$1.2K", "$5M") into a number.
 */
export function parseCurrencyValue(value: string): number {
  const multiplier = value.includes("K") ? 1000 : value.includes("M") ? 1000000 : 1;
  return parseFloat(value.replace(/[$KM,]/g, "")) * multiplier;
}

/**
 * Parses an age string (e.g., "30s", "5m", "2h") into seconds.
 */
export function parseAgeToSeconds(age: string): number {
  const num = parseInt(age);
  if (age.includes("s")) return num;
  if (age.includes("m")) return num * 60;
  if (age.includes("h")) return num * 3600;
  return num;
}
