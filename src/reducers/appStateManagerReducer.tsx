import { CoinType } from '../interfaces/CoinInterfaces';
import { Notifications, BlockNumber } from '../interfaces/Web3ServiceInterface';
import {
  AppState,
  BlockNumberBSC,
  BlockNumberEthereum,
} from '../interfaces/AppStateManagerInterfaces';
import { IContacts } from '../interfaces/IContacts';
import { ICollectibles } from '../interfaces/Icollectibles';
import { IcustomTokens } from '../interfaces/AppStateManagerInterfaces';

export const appStateInitial: AppState = {
  EIN: '',
  address: '',
  notifications: [],
  isInitialised: false,
  blockNumberBSC: {
    BNB: null,
    HYDRO: null,
  },
  blockNumberEthereum: {
    ETH: null,
    DAI: null,
    USDT: null,
    HYDRO: null,
  },
  contacts: [],
  collectibles: [],
  customTokens: []
}

export type AppStateAction =
  | {
    type: 'setAddress',
    payload: { address: string }
  }
  | {
    type: 'setEIN',
    payload: { EIN: string }
  }
  | {
    type: 'updateContacts',
    payload: IContacts,
  }
  | {
    type: 'updateCustomTokens',
    payload: IcustomTokens,
  }
  | {
    type: 'updateCollectibles',
    payload: ICollectibles,
  }
  | {
    type: 'setNotifications',
    payload: { notifications: Notifications }
  }
  | { type: 'resetNotifications' }
  | {
    payload: {
      coin: CoinType,
      value: BlockNumber
    },
    type: 'setBlockNumberEthereum' | 'setBlockNumberBSC',
  }
  | {
    payload: BlockNumberEthereum,
    type: 'setAllBlockNumbersEthereum',
  }
  | {
    payload: BlockNumberBSC,
    type: 'setAllBlockNumbersBSC',
  }
  | {
    type: 'initialised',
  }

export const appStateManagerReducer = (state = appStateInitial, action: AppStateAction): AppState => {
  switch (action.type) {
    case 'setAddress':
      return {
        ...state,
        address: action.payload.address,
      };

    case 'setEIN':
      return {
        ...state,
        EIN: action.payload.EIN,
      };

    case 'resetNotifications':
      return {
        ...state,
        notifications: []
      }

    case 'setNotifications':
      const notificationsAll = [
        ...state.notifications,
        ...action.payload.notifications
      ];

      const lookupObject = {};
      const newNotifications: Notifications = [];

      for(let i in notificationsAll) {
        lookupObject[notificationsAll[i]['hash']] = notificationsAll[i];
      }

      for(let key in lookupObject) {
        newNotifications.push(lookupObject[key]);
      }

      return {
        ...state,
        notifications: newNotifications
      }

      case 'setAllBlockNumbersEthereum':
        return {
          ...state,
          blockNumberEthereum: action.payload
        };

      case 'setAllBlockNumbersBSC':
        return {
          ...state,
          blockNumberBSC: action.payload
        };

      case 'setBlockNumberEthereum':
        return {
          ...state,
          blockNumberEthereum: {
            ...state.blockNumberEthereum,
            [action.payload.coin]: action.payload.value,
          }
        }

      case 'setBlockNumberBSC':
        return {
          ...state,
          blockNumberBSC: {
            ...state.blockNumberBSC,
            [action.payload.coin]: action.payload.value,
          }
        }

    case 'updateContacts':
      return { ...state, contacts: action.payload }

    case 'updateCustomTokens':
      return { ...state, customTokens: action.payload }

    case 'updateCollectibles':
      return { ...state, collectibles: action.payload }

    case 'initialised':
      return { ...state, isInitialised: true }

    default: return state;
  }
}