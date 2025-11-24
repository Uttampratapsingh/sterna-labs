/**
 * Application Constants
 * Centralized configuration values for the application
 */

export const PROTOCOL_COLORS = {
  Pump: {
    text: "text-green-400",
    border: "border-green-400/50",
    bg: "bg-green-400/10",
  },
  Mayhem: {
    text: "text-red-400",
    border: "border-red-400/50",
    bg: "bg-red-400/10",
  },
  Moonshot: {
    text: "text-purple-400",
    border: "border-purple-400/50",
    bg: "bg-purple-400/10",
  },
  "Daos.fun": {
    text: "text-blue-400",
    border: "border-blue-400/50",
    bg: "bg-blue-400/10",
  },
  Jupiter: {
    text: "text-yellow-400",
    border: "border-yellow-400/50",
    bg: "bg-yellow-400/10",
  },
} as const;

export const PROTOCOLS = [
  "Pump",
  "Mayhem",
  "Moonshot",
  "Daos.fun",
  "Jupiter",
] as const;

export const WEBSOCKET_CONFIG = {
  UPDATE_INTERVAL: 800, // milliseconds
  TOKENS_PER_UPDATE: 15,
  VOLATILITY: 0.02, // 2% price volatility
  RECONNECT_DELAY: 1000,
} as const;

export const SORT_OPTIONS = {
  MC: "mc",
  AGE: "age",
  VOLUME: "volume",
  CHANGE: "change",
} as const;

export const SORT_DIRECTIONS = {
  ASC: "asc",
  DESC: "desc",
} as const;

export const TOKEN_CATEGORIES = {
  NEW: "new",
  FINAL: "final",
  MIGRATED: "migrated",
} as const;

export const TIME_PERIODS = {
  FIVE_MIN: "5m",
  ONE_HOUR: "1h",
  SIX_HOURS: "6h",
} as const;

export const IMAGE_CONFIG = {
  LOADING: "lazy",
  DECODING: "async",
  PLACEHOLDER: "https://via.placeholder.com/64",
} as const;

export const ARIA_LABELS = {
  SORT_BY_MC: "Sort by Market Cap",
  SORT_BY_AGE: "Sort by Age",
  SORT_BY_VOLUME: "Sort by Volume",
  SORT_BY_CHANGE: "Sort by Price Change",
  FILTER_TOKENS: "Filter tokens",
  COPY_ADDRESS: "Copy token address",
  OPEN_EXTERNAL: "Open in external site",
  SEARCH_TOKEN: "Search for token",
} as const;
