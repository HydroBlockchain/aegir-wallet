import React, {
  useRef,
  useState,
  useEffect,
  useReducer,
  useContext,
  createContext,
} from 'react';

import Toast from 'react-native-root-toast';
import * as SecureStore from 'expo-secure-store';
import Web3Service from '../../libs/Web3Service';
import useContacts from '../../hooks/useContacts';
import { ThemeContext } from '../../hooks/useTheme';
import BgView from '../../components/Layouts/BgView';
import BackgroundTimer from 'react-native-background-timer';

/* constants */
import {
  LAST_BLOCK_NUMBER_BSC,
  LAST_BLOCK_NUMBER_ETHEREUM,
} from '../../../constants';

/* interfaces */
import {
  ToastProps,
  BlockNumberBSC,
  CurrentStateApp,
  AppStateContext,
  BlockNumberEthereum,
  AppStateManagerProps,
} from '../../interfaces/AppStateManagerInterfaces';
import { Notifications } from '../../interfaces/Web3ServiceInterface';

/* reducers */
import {
  appStateInitial,
  appStateManagerReducer,
} from '../../reducers/appStateManagerReducer';


import { AppState, LogBox } from 'react-native';
import useCollectible from '../../hooks/useCollectible';
LogBox.ignoreLogs(['Setting a timer']);

export const AppStateManagerContext = createContext({} as AppStateContext);

const AppStateManager = ({ children }: AppStateManagerProps) => {
  const { theme } = useContext(ThemeContext);
  const { contacts, updateContacts } = useContacts();
  const Web3ServiceRef = useRef<null | Web3Service>(null);
  const [ appState, dispatch ] = useReducer(appStateManagerReducer, appStateInitial);
  const { collectibles, updateCollectibles, refresCollectiblesUri } = useCollectible();
  const [
    currentStateApp, setCurrentStateApp
  ] = useState<CurrentStateApp>(AppState.currentState);

  useEffect(() => {
    if(!Web3ServiceRef.current) {
      Web3ServiceRef.current = new Web3Service();
    }

    const init = async () => {
      const blockNumberBSC = await SecureStore.getItemAsync(LAST_BLOCK_NUMBER_BSC);
      const blockNumberEthereum = await SecureStore.getItemAsync(LAST_BLOCK_NUMBER_ETHEREUM);

      let blockNumberBSCInitial =  { ...appStateInitial.blockNumberBSC };
      if(blockNumberBSC) {
        blockNumberBSCInitial = JSON.parse(blockNumberBSC);
      } else {
        const provider = Web3ServiceRef.current?.providerBSC;
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
        const provider = Web3ServiceRef.current?.providerETH;
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

      dispatch({type: 'initialised'});
      // setTimeout(() => dispatch({type: 'initialised'}), 500);
    }

    init();

    AppState.addEventListener('change', handleAppstateChange);

    return () => {
      Web3ServiceRef.current = null;
      AppState.removeEventListener('change', handleAppstateChange);
    }
  }, [])

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
    const {
      address,
      isInitialised,
      blockNumberBSC,
      blockNumberEthereum,
    } = appState;

    if(address && isInitialised) {
      BackgroundTimer.stopBackgroundTimer();
      if(currentStateApp === 'background') {
        BackgroundTimer.runBackgroundTimer(() => {
          handleNotifications({ address, blockNumberBSC, blockNumberEthereum });
        }, 60 * 1000 * 15);
      } else if(currentStateApp === 'active') {
        BackgroundTimer.runBackgroundTimer(() => {
          handleNotifications({ address, blockNumberBSC, blockNumberEthereum });
        }, 60 * 1000);
      }
    }
  }, [
    currentStateApp,
    appState.address,
    appState.isInitialised,
    appState.blockNumberBSC,
    appState.blockNumberEthereum,
  ])

  const handleAppstateChange = (state: CurrentStateApp) => {
    setCurrentStateApp(state);
  }

  const handleNotifications = async ({ address, blockNumberBSC, blockNumberEthereum }) => {
    try {
      const web3Service = Web3ServiceRef.current;
      if(web3Service) {
        web3Service.getNotifications({
          address,
          setNotifications,
          lastBlockNumberBSC: blockNumberBSC,
          lastBlockNumberEthereum: blockNumberEthereum,
        });
      }

    } catch(error) {
      console.log('handleNotifications error', error);
    }
  }

  const setAddress = (address: string) => {
    dispatch({
      type: 'setAddress',
      payload: { address }
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

    Toast.show(text, {
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

  if(!Web3ServiceRef.current) return(
    <BgView/>
  )

  return (
    <AppStateManagerContext.Provider value={{
      toast,
      appState,
      setAddress,
      updateContacts,
      updateCollectibles,
      resetNotifications,
      refresCollectiblesUri,
      setAllBlockNumbersBSC,
      setAllBlockNumbersEthereum,
      web3Service: Web3ServiceRef.current
    }} >
      {children}
    </AppStateManagerContext.Provider>
  )
}

export default AppStateManager;
