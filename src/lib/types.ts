export interface Token {
  id: string;
  name: string;
  symbol: string;
  image: string;
  age: string;
  marketCap: string;
  volume: string;
  price: string;
  holders: number;
  likes: number;
  comments: number;
  change5m: number;
  change1h: number;
  change6h: number;
  priceChange: number;
  dexScore: string;
  fdv: string;
  transactions: number;
  protocol: "Pump" | "Mayhem" | "Moonshot" | "Daos.fun" | "Jupiter";
}
