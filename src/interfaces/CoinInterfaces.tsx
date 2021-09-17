export type CoinType = 
  | 'ETH'
  | 'BNB'
  | 'BTC'
  | 'DAI'
  | 'TUSC'
  | 'USDT'
  | 'HYDRO';

export type Network =
  | 'BTC'
  | 'BSC'
  | 'TUSC'
  | 'ETH';

export interface CoinData {
  coin: CoinType;
  network: Network;
}

export interface ImageCardProps extends CoinData {
  styleCustom?: {};
}

export interface CoinCardProps extends CoinData {
  balance: number;
  styleCustom?: {
    card?: {},
    button?: {},
    buttonText?: {},
  };
  address?: string;
  deposit?: () => void;
  history?: () => void;
  receive?: () => void;
  showAddress?: boolean;
  balanceInUSD?: number;
  createAccount?: () => void | undefined;
}