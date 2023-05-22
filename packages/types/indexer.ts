export interface BalancesIndexer {
  balances: BalanceIndexer[];
  totalBalance: TotalBalance;
}

export interface BalanceIndexer {
  base: string;
  coingecko_id: string;
  symbol: string;
  name: string;
  decimals: number;
  amount: string;
  prices: Prices;
  logo: string;
}

interface Prices {
  usd: number;
  eur: number;
  total: TotalPrice;
}

interface TotalPrice {
  eur: number;
  usd: number;
}

interface TotalBalance {
  usd: string;
  eur: string;
}
