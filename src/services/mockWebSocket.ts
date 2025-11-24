import { store } from "@/store";
import { updatePrice, setConnectionStatus } from "@/store/marketSlice";
import { mockTokens } from "@/lib/mockData";
import { WEBSOCKET_CONFIG } from "@/constants";

/**
 * Mock WebSocket service for simulating real-time market data updates
 * Implements connection management and periodic price updates
 */
class MockWebSocket {
  private intervalId: NodeJS.Timeout | null = null;
  private isConnected = false;

  /**
   * Establishes connection to mock WebSocket
   */
  connect(): void {
    if (this.isConnected) return;

    store.dispatch(setConnectionStatus("connecting"));
    
    setTimeout(() => {
      this.isConnected = true;
      store.dispatch(setConnectionStatus("connected"));
      this.startEmitting();
    }, WEBSOCKET_CONFIG.RECONNECT_DELAY);
  }

  /**
   * Disconnects from mock WebSocket
   */
  disconnect(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    this.isConnected = false;
    store.dispatch(setConnectionStatus("disconnected"));
  }

  /**
   * Starts emitting price updates at configured interval
   * @private
   */
  private startEmitting(): void {
    this.intervalId = setInterval(() => {
      const state = store.getState();
      const allTokens = [
        ...mockTokens.newPairs,
        ...mockTokens.finalStretch,
        ...mockTokens.migrated,
      ];

      // Update random tokens per tick for a "live" feel
      for (let i = 0; i < WEBSOCKET_CONFIG.TOKENS_PER_UPDATE; i++) {
        const randomToken = allTokens[Math.floor(Math.random() * allTokens.length)];
        
        // Get current price from store or fallback to initial mock data
        const storedData = state.market.prices[randomToken.id];
        const currentPriceStr = storedData ? storedData.price : randomToken.price;
        const currentPrice = parseFloat(currentPriceStr.replace(/[^0-9.]/g, ""));
        
        // Apply volatility to price
        const change = (Math.random() * WEBSOCKET_CONFIG.VOLATILITY * 2) - WEBSOCKET_CONFIG.VOLATILITY;
        const newPrice = Math.max(0.000001, currentPrice * (1 + change));
        
        // Calculate new changes
        const currentChange1h = storedData ? storedData.change1h : randomToken.change1h;
        const currentChange5m = storedData ? storedData.change5m : randomToken.change5m;
        const currentChange6h = storedData ? storedData.change6h : randomToken.change6h;

        const changePercent = change * 100;
        const newChange1h = currentChange1h + changePercent;
        const newChange5m = currentChange5m + changePercent;
        const newChange6h = currentChange6h + changePercent;

        store.dispatch(updatePrice({
          id: randomToken.id,
          price: `$${newPrice.toFixed(newPrice < 1 ? 6 : 3)}`,
          change1h: Number(newChange1h.toFixed(2)),
          change5m: Number(newChange5m.toFixed(2)),
          change6h: Number(newChange6h.toFixed(2))
        }));
      }
    }, WEBSOCKET_CONFIG.UPDATE_INTERVAL);
  }

  /**
   * Gets current connection status
   */
  getConnectionStatus(): boolean {
    return this.isConnected;
  }
}

export const mockWebSocket = new MockWebSocket();
