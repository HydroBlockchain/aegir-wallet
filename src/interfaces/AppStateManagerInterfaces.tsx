import Web3Service from '../libs/Web3Service';
import { BlockNumber, Notification } from './Web3ServiceInterface';

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
  isInitialised: boolean;
  notifications: Notification[];
  blockNumberBSC: BlockNumberBSC;
  blockNumberEthereum: BlockNumberEthereum;
}

export interface AppStateContext {
  appState: AppState;
  web3Service: Web3Service;
  resetNotifications: () => void;
  setAddress: (address: string) => void;
  toast: ({ text, type }: ToastProps) => void;
  setAllBlockNumbersBSC: (data: BlockNumberBSC) => void;
  setAllBlockNumbersEthereum: (data: BlockNumberEthereum) => void;
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