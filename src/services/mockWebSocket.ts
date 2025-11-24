import { store } from "@/store";
import { updatePrice, setConnectionStatus } from "@/store/marketSlice";
import { mockTokens } from "@/lib/mockData";

class MockWebSocket {
  private intervalId: NodeJS.Timeout | null = null;
  private isConnected = false;

  connect() {
    if (this.isConnected) return;

    store.dispatch(setConnectionStatus("connecting"));
    
    setTimeout(() => {
      this.isConnected = true;
      store.dispatch(setConnectionStatus("connected"));
      this.startEmitting();
    }, 1000);
  }

  disconnect() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    this.isConnected = false;
    store.dispatch(setConnectionStatus("disconnected"));
  }

  private startEmitting() {
    this.intervalId = setInterval(() => {
      const state = store.getState();
      const allTokens = [
        ...mockTokens.newPairs,
        ...mockTokens.finalStretch,
        ...mockTokens.migrated,
      ];

      // Update 15 random tokens per tick for a "live" feel
      for (let i = 0; i < 15; i++) {
        const randomToken = allTokens[Math.floor(Math.random() * allTokens.length)];
        
        // Get current price from store or fallback to initial mock data
        const storedData = state.market.prices[randomToken.id];
        const currentPriceStr = storedData ? storedData.price : randomToken.price;
        const currentPrice = parseFloat(currentPriceStr.replace(/[^0-9.]/g, ""));
        
        // 2% volatility per tick
        const volatility = 0.02; 
        const change = (Math.random() * volatility * 2) - volatility;
        const newPrice = Math.max(0.000001, currentPrice * (1 + change));
        
        // Calculate new 1h change
        const currentChange1h = storedData ? storedData.change1h : randomToken.change1h;
        const newChange1h = currentChange1h + (change * 100);

        store.dispatch(updatePrice({
          id: randomToken.id,
          price: `$${newPrice.toFixed(newPrice < 1 ? 6 : 3)}`,
          change1h: Number(newChange1h.toFixed(2))
        }));
      }
    }, 800); // Update every 800ms
  }
}

export const mockWebSocket = new MockWebSocket();
