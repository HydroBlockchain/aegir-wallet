import { CoinType, Network } from "./CoinInterfaces";

export interface IcurrencyConverter {
  FIAT?: Tfiat;
  coin: CoinType;
  balance: number;
  network: Network;
}

export type Tfiat =
  | 'USD'
  | 'EUR'
  | 'JPY'
  | 'GBP'
  | 'CHF'

export interface IcoingeckoAPI {
  FIAT?: Tfiat;
}

export interface IcalculateBalance {
  FIAT: Tfiat;
  coin: CoinType;
  balance: number;
  currencyPrices: { [ coin: string ]: { [ fiat: string ]: number } } | {};
}