import { IcustomToken } from "./AppStateManagerInterfaces";
import { Tfiat } from "./currencyConverter";

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
  customToken?: IcustomToken | null;
}

export interface ImageCardProps extends CoinData {
  styleCustom?: {};
  isCustomToken?: boolean;
}

export interface CoinCardProps extends CoinData {
  balance: number;
  styleCustom?: {
    card?: {};
    button?: {};
    buttonText?: {};
  };
  address?: string;
  symbolFiat?: Tfiat;
  deposit?: () => void;
  history?: () => void;
  receive?: () => void;
  showAddress?: boolean;
  balanceInUSD?: number;
  changeWidth?: (width: number) => void;
  createAccount?: () => void | undefined;
}