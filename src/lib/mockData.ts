import { Token } from "./types";

const protocols: Array<"Pump" | "Mayhem" | "Moonshot" | "Daos.fun" | "Jupiter"> = [
  "Pump",
  "Mayhem",
  "Moonshot",
  "Daos.fun",
  "Jupiter",
];

const generateMockToken = (
  id: string,
  name: string,
  symbol: string,
  age: string,
  marketCap: string,
  volume: string
): Token => ({
  id,
  name,
  symbol,
  image: `https://api.dicebear.com/7.x/shapes/svg?seed=${id}`,
  age,
  marketCap,
  volume,
  price: `$${Math.random().toFixed(3)}`,
  holders: Math.floor(Math.random() * 1000),
  likes: Math.floor(Math.random() * 100),
  comments: Math.floor(Math.random() * 50),
  change5m: Number((Math.random() * 200 - 100).toFixed(1)),
  change1h: Number((Math.random() * 200 - 100).toFixed(1)),
  change6h: Number((Math.random() * 200 - 100).toFixed(1)),
  priceChange: Number((Math.random() * 100 - 50).toFixed(1)),
  dexScore: `${Math.floor(Math.random() * 5)}mo`,
  fdv: `0.${Math.floor(Math.random() * 9)}`,
  transactions: Math.floor(Math.random() * 1000),
  protocol: protocols[Math.floor(Math.random() * protocols.length)],
});

export const mockTokens = {
  newPairs: [
    generateMockToken("1", "BUILD", "BUILD", "6s", "$3.92K", "$535"),
    generateMockToken("2", "UTC", "UTC", "11s", "$3.61K", "$3"),
    generateMockToken("3", "TODAY", "today", "27s", "$3.61K", "$3"),
    generateMockToken("4", "25", "The Christmas Coin", "30s", "$3.83K", "$116"),
    generateMockToken("5", "Xmas", "XmasCoin", "32s", "$6.52K", "$5K"),
    generateMockToken("16", "ALPHA", "Alpha", "45s", "$12.5K", "$2.1K"),
    generateMockToken("17", "BETA", "Beta", "1m", "$8.3K", "$950"),
    generateMockToken("18", "GAMMA", "Gamma", "2m", "$15.7K", "$3.4K"),
    generateMockToken("19", "DELTA", "Delta", "3m", "$22.1K", "$5.6K"),
    generateMockToken("20", "EPSILON", "Epsilon", "5m", "$45.8K", "$12.3K"),
  ],
  finalStretch: [
    generateMockToken("6", "RIZZ", "Rizzbot", "11m", "$22K", "$11K"),
    generateMockToken("7", "SOLMON", "Solmon", "20s", "$47K", "$12K"),
    generateMockToken("8", "67xmas", "67xmas", "1m", "$1.26M", "$26K"),
    generateMockToken("9", "GIGA", "GigaSolana1", "2m", "$977K", "$4K"),
    generateMockToken("10", "Google", "Google", "8h", "$4.88K", "$11K"),
    generateMockToken("21", "ZETA", "Zeta", "15m", "$156K", "$45K"),
    generateMockToken("22", "ETA", "Eta", "22m", "$234K", "$67K"),
    generateMockToken("23", "THETA", "Theta", "30m", "$389K", "$89K"),
    generateMockToken("24", "IOTA", "Iota", "45m", "$567K", "$123K"),
    generateMockToken("25", "KAPPA", "Kappa", "1h", "$789K", "$234K"),
  ],
  migrated: [
    generateMockToken("11", "Monad", "Monad", "0s", "$77.5K", "$19K"),
    generateMockToken("12", "NVIDIA", "NVIDIA", "10s", "$477K", "$12K"),
    generateMockToken("13", "Tesla", "Tesla", "20s", "$771K", "$20K"),
    generateMockToken("14", "NOSTALGIA", "Nostalgia", "44s", "$1.44M", "$28K"),
    generateMockToken("15", "FIXI", "FIXI", "59s", "$2.35M", "$36K"),
    generateMockToken("26", "LAMBDA", "Lambda", "2h", "$3.45M", "$890K"),
    generateMockToken("27", "MU", "Mu", "3h", "$5.67M", "$1.2M"),
    generateMockToken("28", "NU", "Nu", "5h", "$8.9M", "$2.3M"),
    generateMockToken("29", "XI", "Xi", "8h", "$12.4M", "$3.8M"),
    generateMockToken("30", "OMICRON", "Omicron", "12h", "$18.9M", "$5.6M"),
  ],
};
