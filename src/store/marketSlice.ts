import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Token } from "@/lib/types";

interface MarketState {
  prices: Record<string, { 
    price: string; 
    change1h: number;
    change5m: number;
    change6h: number;
  }>;
  connectionStatus: "connected" | "disconnected" | "connecting";
}

const initialState: MarketState = {
  prices: {},
  connectionStatus: "disconnected",
};

const marketSlice = createSlice({
  name: "market",
  initialState,
  reducers: {
    updatePrice: (
      state,
      action: PayloadAction<{ 
        id: string; 
        price: string; 
        change1h: number;
        change5m: number;
        change6h: number;
      }>
    ) => {
      const { id, price, change1h, change5m, change6h } = action.payload;
      state.prices[id] = { price, change1h, change5m, change6h };
    },
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
