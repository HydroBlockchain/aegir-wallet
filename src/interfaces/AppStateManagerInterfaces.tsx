import Web3Service from '../libs/Web3Service';
import { BlockNumber, Notification } from './Web3ServiceInterface';
import { IContacts, IupdateContactsPostData, IupdateContactsReturn } from './IContacts';
import { ICollectibles, IupdateCollectiblePostData, IupdateCollectibleReturn } from './Icollectibles';
import { Network } from './CoinInterfaces';
import { Tfiat } from './currencyConverter';

export interface BlockNumberEthereum {
  ETH: BlockNumber,
  DAI: BlockNumber,
  USDT: BlockNumber,
  HYDRO: BlockNumber,
}

export interface BlockNumberBSC {
  BNB: BlockNumber,
  HYDRO: BlockNumber,
}

export interface IcustomToken {
  symbol: string;
  address: string;
  network: Network;
  decimals: string | number;
}

export type IcustomTokens = IcustomToken[];

export interface AppState {
  EIN: string;
  address: string;
  lockTime: number;
  lockApp: boolean;
  contacts: IContacts;
  isInitialised: boolean;
  defaultFiatCurrency: Tfiat;
  customTokens: IcustomTokens;
  collectibles: ICollectibles;
  notifications: Notification[];
  blockNumberBSC: BlockNumberBSC;
  blockNumberEthereum: BlockNumberEthereum;
}

export interface AppStateContext {
  appState: AppState;
  web3Service: Web3Service;
  setEIN: (EIN: string) => void;
  resetNotifications: () => void;
  refresCollectiblesUri: () => void;
  setAddress: (address: string) => void;
  setLockApp: (lockApp: boolean) => void;
  setLockTime: (lockTime: number) => void;
  toast: ({ text, type }: ToastProps) => void;
  updateCustomTokens: (data: IcustomTokens) => void;
  setAllBlockNumbersBSC: (data: BlockNumberBSC) => void;
  setDefaultFiatCurrency: (defaultFiatCurrency: Tfiat) => void;
  setAllBlockNumbersEthereum: (data: BlockNumberEthereum) => void;
  updateContacts: (data: IupdateContactsPostData) => Promise<IupdateContactsReturn>;
  updateCollectibles: (data: IupdateCollectiblePostData) => Promise<IupdateCollectibleReturn>;
}

export interface AppStateManagerProps {
  children: JSX.Element | JSX.Element[]
}

export type TypeToast =
  | 'error'
  | 'success'
  | 'warning';

export interface ToastProps {
  text: string;
  type: TypeToast;
}