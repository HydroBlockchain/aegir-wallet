import React, {
  useRef,
  useEffect,
  useReducer,
  useContext,
  useCallback,
  createContext,
} from 'react';
import debounce from 'just-debounce-it';
import Toast from 'react-native-root-toast';
import { AppState, LogBox } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import BackgroundTimer from 'react-native-background-timer';

import Web3Service from '../../libs/Web3Service';
import useContacts from '../../hooks/useContacts';
import { ThemeContext } from '../../hooks/useTheme';
import BgView from '../../components/Layouts/BgView';
import useCollectible from '../../hooks/useCollectible';

/* constants */
import {
  LOCK_TIME,
  CUSTOM_TOKENS,
  DEFAULT_FIAT_CURRENCY,
  LAST_BLOCK_NUMBER_BSC,
  LAST_BLOCK_NUMBER_ETHEREUM,
  NOTIFICATION_CHECK_FREQUENCY_BACKGROUND,
  NOTIFICATION_CHECK_FREQUENCY_FOREGROUND,
} from '../../../constants';

/* interfaces */
import {
  ToastProps,
  IcustomTokens,
  BlockNumberBSC,
  AppStateContext,
  BlockNumberEthereum,
  AppStateManagerProps,
} from '../../interfaces/AppStateManagerInterfaces';
import { Tfiat } from '../../interfaces/currencyConverter';
import { Notifications } from '../../interfaces/Web3ServiceInterface';

/* reducers */
import {
  appStateInitial,
  appStateManagerReducer,
} from '../../reducers/appStateManagerReducer';


export const AppStateManagerContext = createContext({} as AppStateContext);

const AppStateManager = ({ children }: AppStateManagerProps) => {
  const backgroundMode = useRef(false);
  const { theme } = useContext(ThemeContext);
  const { contacts, updateContacts } = useContacts();
  const Web3ServiceRef = useRef<null | Web3Service>(null);
  const [ appState, dispatch ] = useReducer(appStateManagerReducer, appStateInitial);
  const { collectibles, updateCollectibles, refresCollectiblesUri } = useCollectible();

  useEffect(() => {
    if(!Web3ServiceRef.current) {
      Web3ServiceRef.current = new Web3Service();
    }

    const init = async () => {
      const w3 = Web3ServiceRef.current;

      const customTokenRaw = await SecureStore.getItemAsync(CUSTOM_TOKENS);
      if(customTokenRaw) {
        dispatch({ payload: JSON.parse(customTokenRaw), type: 'updateCustomTokens' })
      }

      const lockTime = await SecureStore.getItemAsync(LOCK_TIME);
      if(lockTime) setLockTime(parseInt(lockTime));

      const defaultFiatCurrency = (await SecureStore.getItemAsync(DEFAULT_FIAT_CURRENCY)) as Tfiat;
      if(defaultFiatCurrency) setDefaultFiatCurrency(defaultFiatCurrency);

      const blockNumberBSC = await SecureStore.getItemAsync(LAST_BLOCK_NUMBER_BSC);
      const blockNumberEthereum = await SecureStore.getItemAsync(LAST_BLOCK_NUMBER_ETHEREUM);

      let blockNumberBSCInitial =  { ...appStateInitial.blockNumberBSC };
      if(blockNumberBSC) {
        blockNumberBSCInitial = JSON.parse(blockNumberBSC);
      } else {
        const provider = w3?.providerBSC;
        if(provider) {
          const blockNumber = await provider.getBlockNumber();
          for(let key in blockNumberBSCInitial) {
            blockNumberBSCInitial[key] = blockNumber;
          }
          SecureStore.setItemAsync(
            LAST_BLOCK_NUMBER_BSC,
            JSON.stringify(blockNumberBSCInitial)
          )
        }
      }
      setAllBlockNumbersBSC(blockNumberBSCInitial);

      let blockNumberEthereumInitial =  { ...appStateInitial.blockNumberEthereum };
      if(blockNumberEthereum) {

        blockNumberEthereumInitial = JSON.parse(blockNumberEthereum);

      } else {
        const provider = w3?.providerETH;
        if(provider) {
          const blockNumber = await provider.getBlockNumber();
          for(let key in blockNumberEthereumInitial) {
            blockNumberEthereumInitial[key] = blockNumber;
          }
          SecureStore.setItemAsync(
            LAST_BLOCK_NUMBER_ETHEREUM,
            JSON.stringify(blockNumberEthereumInitial)
          )
        }
      }
      setAllBlockNumbersEthereum(blockNumberEthereumInitial);

      await getEIN();

      dispatch({type: 'initialised'});
    }

    init();

    return () => {
      Web3ServiceRef.current = null;
    }
  }, []);

  const handleNotifications = useCallback(async () => {
    try {
      if(!appState.address || !appState.isInitialised) return;
      const web3Service = Web3ServiceRef.current;
      if(web3Service) {
        web3Service.getNotifications({
          setNotifications,
          address: appState.address,
          lastBlockNumberBSC: appState.blockNumberBSC,
          lastBlockNumberEthereum: appState.blockNumberEthereum,
        });
      }
    } catch(error) {
      console.log('handleNotifications error', error);
    }
  }, [ Web3ServiceRef, appState ]);

  const handleNotificationsForeground = useCallback(
    debounce(async () => {
      handleNotifications();

      if(!backgroundMode.current)  {
        handleNotificationsForeground();
      }
    }, NOTIFICATION_CHECK_FREQUENCY_FOREGROUND),
    [ backgroundMode, handleNotifications ]
  );

  const handleAppstateChange = useCallback( async (state) => {
    const newModeIsBackground = state === 'background';

    if(backgroundMode.current && !newModeIsBackground) {
      BackgroundTimer.stopBackgroundTimer();
    }

    backgroundMode.current = newModeIsBackground;

    if(backgroundMode.current) {
      BackgroundTimer.runBackgroundTimer(async () => {
        handleNotifications();
      }, NOTIFICATION_CHECK_FREQUENCY_BACKGROUND)
    }
  }, [ backgroundMode, handleNotificationsForeground ]);

  useEffect(() => {
    const event = AppState.addEventListener('change', handleAppstateChange);
    return () => { event.remove() }
  }, [ handleAppstateChange ])

  useEffect(() => {
    handleNotificationsForeground()
    return () => { handleNotificationsForeground.cancel() }
  }, [ handleNotificationsForeground ])

  useEffect(() => {
    dispatch({
      payload: contacts,
      type: 'updateContacts',
    })
  }, [ contacts ])

  useEffect(() => {
    dispatch({
      payload: collectibles,
      type: 'updateCollectibles',
    })
  }, [ collectibles ])

  useEffect(() => {
    if(appState.address) {
      getEIN();
    }
  }, [ appState.address ])

  const updateCustomTokens = async (custonTokens: IcustomTokens) => {
    await SecureStore.setItemAsync(CUSTOM_TOKENS, JSON.stringify(custonTokens));
    dispatch({
      type: 'updateCustomTokens',
      payload: custonTokens
    });
  }

  const getEIN = async () => {
    try {
      const { address } = appState;
      const w3 = Web3ServiceRef.current;
      if(!w3 || !w3.contracIdentityRegistry || !address) return;
      const ein = await w3.contracIdentityRegistry.getEIN(appState.address);
      setEIN(ein.toString());
    } catch(error) {
      console.log('error in getEIN', error);
    }
  }

  const setAddress = (address: string) => {
    dispatch({
      type: 'setAddress',
      payload: { address }
    })
  }

  const setEIN = (EIN: string) => {
    dispatch({
      type: 'setEIN',
      payload: { EIN }
    })
  }

  const setLockTime = (lockTime: number) => {
    SecureStore.setItemAsync(LOCK_TIME, lockTime.toString());
    dispatch({
      type: 'setLockTime',
      payload: { lockTime }
    })
  }

  const setLockApp = (lockApp: boolean) => {
    dispatch({
      type: 'setLockApp',
      payload: { lockApp }
    })
  }

  const setDefaultFiatCurrency = (defaultFiatCurrency: Tfiat) => {
    SecureStore.setItemAsync(DEFAULT_FIAT_CURRENCY, defaultFiatCurrency);
    dispatch({
      type: 'setDefaultFiatCurrency',
      payload: { defaultFiatCurrency },
    })
  }

  const setNotifications = (notifications: Notifications) => {
    dispatch({
      type: 'setNotifications',
      payload: { notifications }
    })
  }

  const setAllBlockNumbersEthereum = (blockNumberEthereum: BlockNumberEthereum) => {
    dispatch({
      payload: blockNumberEthereum,
      type: 'setAllBlockNumbersEthereum',
    })
  }

  const setAllBlockNumbersBSC = (blockNumberBSC: BlockNumberBSC) => {
    dispatch({
      payload: blockNumberBSC,
      type: 'setAllBlockNumbersBSC',
    })
  }

  const resetNotifications = () => {
    dispatch({ type: 'resetNotifications' });
  }

  const toast = ({ text, type }: ToastProps) => {
    const colorType = {
      error: theme.colors.error,
      success: theme.colors.success,
      warning: theme.colors.warning,
    }

    const backgroundColor = colorType[type];

    return Toast.show(text, {
      delay: 0,
      shadow: true,
      animation: true,
      hideOnPress: true,
      shadowColor: 'black',
      duration: Toast.durations.LONG,
      position: Toast.positions.CENTER,
      backgroundColor: backgroundColor,
    })
  }

  return ((!appState.isInitialised || !Web3ServiceRef.current) ? <BgView/> :
    <AppStateManagerContext.Provider value={{
      toast,
      setEIN,
      appState,
      setLockApp,
      setAddress,
      setLockTime,
      updateContacts,
      updateCollectibles,
      resetNotifications,
      updateCustomTokens,
      refresCollectiblesUri,
      setAllBlockNumbersBSC,
      setDefaultFiatCurrency,
      setAllBlockNumbersEthereum,
      web3Service: Web3ServiceRef.current
    }} >
      {children}
    </AppStateManagerContext.Provider>
  )
}

export default AppStateManager;
