import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Token } from "@/lib/types";

/**
 * Market price data for a specific token
 */
interface TokenPriceData {
  price: string;
  change1h: number;
  change5m: number;
  change6h: number;
}

/**
 * Market state interface
 * Manages real-time price updates and WebSocket connection status
 */
interface MarketState {
  prices: Record<string, TokenPriceData>;
  connectionStatus: "connected" | "disconnected" | "connecting";
}

const initialState: MarketState = {
  prices: {},
  connectionStatus: "disconnected",
};

/**
 * Market slice for managing real-time token price updates
 * Handles WebSocket connection status and price data synchronization
 */
const marketSlice = createSlice({
  name: "market",
  initialState,
  reducers: {
    /**
     * Updates the price data for a specific token
     * @param state - Current market state
     * @param action - Payload containing token ID and updated price data
     */
    updatePrice: (
      state,
      action: PayloadAction<TokenPriceData & { id: string }>
    ) => {
      const { id, price, change1h, change5m, change6h } = action.payload;
      state.prices[id] = { price, change1h, change5m, change6h };
    },
    /**
     * Updates the WebSocket connection status
     * @param state - Current market state
     * @param action - New connection status
     */
    setConnectionStatus: (
      state,
      action: PayloadAction<"connected" | "disconnected" | "connecting">
    ) => {
      state.connectionStatus = action.payload;
    },
  },
});

export const { updatePrice, setConnectionStatus } = marketSlice.actions;
export default marketSlice.reducer;
