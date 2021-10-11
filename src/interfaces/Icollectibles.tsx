export interface IupdateCollectibleResponse {
  data: {
    cid: string;
    filename: string;
  };
  status: boolean;
  message: string;
}

export interface IupdateCollectibleReturn {
  status: boolean;
  message: string;
}

export interface IupdateCollectiblePostData {
  CID?: string;
  address: string;
  collectibles: ICollectibles;
}

export interface ICollectibleData {
  tokenURI: string | null;
  contractAddress: string;
  tokenID: string | number;
  tokenName: string | null;
  tokenSymbol: string | null;
}

export type ICollectibles = ICollectibleData[];