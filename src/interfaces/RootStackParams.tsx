import { CoinData } from "./CoinInterfaces";
import { ICollectibleData } from "./Icollectibles";

export interface DepositScreenParams extends CoinData {};

export interface EtherHistoryScreenParams extends CoinData {
  walletToken: string;
};

export type RootStackParams = {
  /****************
  * APP CONTAINER *
  *****************/
  Auth: any;
  App: any;
  StartApp: any;
  Validation: any;
  /******************
   * AUTH NAVIGATION *
   *******************/
  Create: any;
  Register: any;
  Recover: any;
  Mnemonic: any;
  AuthLanding: any;
  PasswordSet: any;
  ChangePassword: any;
  Password: {
    publicKey: string;
    privateKey: string;
  };
  /******************
  * MAIN NAVIGATION *
  *******************/
  Home: any;
  LockApp: {
    forceAuthBiometrics?: boolean;
  };
  Settings: any;
  ExportTx: any;
  Contacts: any;
  AddContact: any;
  AddCustomToken: any;
  Browser: any;
  ListNFT: any;
  AddNFT: any;
  DefaultFiatCurrency: any;
  SendNFT: ICollectibleData;
  ViewNFT: ICollectibleData;
  Receive: CoinData;
  History: CoinData;
  Security: any;
  ExportKeys: any;
  Notification: any;
  ClaimHydroID: any;
  AddAccountTusc: any;
  Deposits: DepositScreenParams;
  Etherhistory: EtherHistoryScreenParams;
  /**************
  * REMITTANCES *
  ***************/
  Remittances: any;
  UserRegister?: {
    step:
      | 'address'
      | 'password'
      | 'security'
      | 'personal_information'
      | 'notification_settings'
  };
  SendMoney: any;
  StartRemittances: any;
  LoginRemittances: any;
  UserRegisterPersonalInfomation: any;
}