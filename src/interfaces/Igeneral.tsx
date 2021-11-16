import { AxiosRequestConfig } from "axios";

export interface ItimeoutAxios {
  timeout?: number;
  options: AxiosRequestConfig;
}

export interface ItimeoutPromise {
  timeout?: number;
  promises: Promise<any>[];
}

export interface Isign {
  privateKey: string;
  messageHash: string;
}

export interface IoutputECDSA {
  r: string;
  s: string;
  v: number;
}