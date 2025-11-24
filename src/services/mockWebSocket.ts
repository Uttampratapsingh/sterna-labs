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
      // Pick a random token from each category to update
      const allTokens = [
        ...mockTokens.newPairs,
        ...mockTokens.finalStretch,
        ...mockTokens.migrated,
      ];

      // Update 3 random tokens per tick
      for (let i = 0; i < 3; i++) {
        const randomToken = allTokens[Math.floor(Math.random() * allTokens.length)];
        const currentPrice = parseFloat(randomToken.price.replace("$", ""));
        const volatility = 0.05; // 5% volatility
        const change = (Math.random() * volatility * 2) - volatility;
        const newPrice = Math.max(0.01, currentPrice * (1 + change));
        
        store.dispatch(updatePrice({
          id: randomToken.id,
          price: `$${newPrice.toFixed(3)}`,
          change1h: Number((randomToken.change1h + (change * 100)).toFixed(2))
        }));
      }
    }, 2000); // Update every 2 seconds
  }
}

export const mockWebSocket = new MockWebSocket();
