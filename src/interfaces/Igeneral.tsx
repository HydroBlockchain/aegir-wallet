import { AxiosRequestConfig } from "axios";

export interface ItimeoutAxios {
  timeout?: number;
  options: AxiosRequestConfig;
}

export interface ItimeoutPromise {
  timeout?: number;
  promises: Promise<any>[];
}