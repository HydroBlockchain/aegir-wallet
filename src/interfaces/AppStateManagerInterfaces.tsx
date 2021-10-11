import Web3Service from '../libs/Web3Service';
import { BlockNumber, Notification } from './Web3ServiceInterface';
import { IContacts, IupdateContactsPostData, IupdateContactsReturn } from './IContacts';
import { ICollectibles, IupdateCollectiblePostData, IupdateCollectibleReturn } from './Icollectibles';

export type CurrentStateApp =
 | "active"
 | "unknown"
 | "inactive"
 | "extension"
 | "background";

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

export interface AppState {
  address: string;
  contacts: IContacts;
  isInitialised: boolean;
  collectibles: ICollectibles;
  notifications: Notification[];
  blockNumberBSC: BlockNumberBSC;
  blockNumberEthereum: BlockNumberEthereum;
}

export interface AppStateContext {
  appState: AppState;
  web3Service: Web3Service;
  resetNotifications: () => void;
  refresCollectiblesUri: () => void;
  setAddress: (address: string) => void;
  toast: ({ text, type }: ToastProps) => void;
  setAllBlockNumbersBSC: (data: BlockNumberBSC) => void;
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