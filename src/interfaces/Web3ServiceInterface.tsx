import { ethers } from 'ethers';
import { CoinType, Network } from './CoinInterfaces';
import { BlockNumberBSC, BlockNumberEthereum, IcustomToken } from './AppStateManagerInterfaces';

export interface GetTokenBalanceProps {
  coin: CoinType;
  address: string;
  network: Network;
  customToken?: IcustomToken | null
}

export type OperationTransaction = 'SENT' | 'RECEIVED';

export type HistoryData = History[];

export interface History {
  to: string;
  from: string;
  amount: string;
  blockNumber: number,
  operation: OperationTransaction;
}

/* BNB */
export interface BNBHistoryResponse {
  status:  string;
  message: string;
  result:  ResultHistoryBNB[];
}

export interface ResultHistoryBNB {
  blockNumber:       string;
  timeStamp:         string;
  hash:              string;
  nonce:             string;
  blockHash:         string;
  transactionIndex:  string;
  from:              string;
  to:                string;
  value:             string;
  gas:               string;
  gasPrice:          string;
  isError:           string;
  txreceipt_status:  string;
  input:             string;
  contractAddress:   string;
  cumulativeGasUsed: string;
  gasUsed:           string;
  confirmations:     string;
}

export interface GetEthereumHistoryProps {
  address: string;
  startblock?: BlockNumber;
}

export interface GetEthereumTokenHistoryProps {
  address: string;
  token: CoinType;
  startblock?: BlockNumber;
  customToken?: IcustomToken | null;
}

/* Ethers types */
export type Contract = ethers.Contract;
export type Provider = ethers.providers.Provider;
export type Web3Provider = ethers.providers.Web3Provider;
export type JsonRpcProvider = ethers.providers.JsonRpcProvider;
export type FallbackProvider = ethers.providers.FallbackProvider;
export type EtherscanProvider = ethers.providers.EtherscanProvider;
export type WebSocketProvider = ethers.providers.WebSocketProvider;
export type ProvidersEthereum =
  | JsonRpcProvider
  | FallbackProvider
  | EtherscanProvider
  | WebSocketProvider;


/* Notifications */
export type BlockNumber = number | string | null;

export interface GetNotificationsProps {
  address: string;
  lastBlockNumberBSC: BlockNumberBSC;
  lastBlockNumberEthereum: BlockNumberEthereum;
  setNotifications: (state: Notifications) => void;
}

export interface GetNotificationsBaseProps {
  coin: CoinType;
  address: string;

}
export interface GetNotificationsERC20Props extends GetNotificationsBaseProps {
  lastBlockNumberEthereum: BlockNumberEthereum;
}

export interface GetNotificationsBEP20Props extends GetNotificationsBaseProps {
  lastBlockNumberBSC: BlockNumberBSC;
}

export interface Notification {
  to: string;
  from: string;
  hash: string;
  coin: CoinType;
  network: Network;
  amount: number | string;
  blockNumber: BlockNumber;
  operation: OperationTransaction;
}

export type Notifications = Notification[];