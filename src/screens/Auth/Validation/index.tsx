import React, { useContext, useEffect, useRef, useState } from "react";

import * as SecureStore from 'expo-secure-store';
import SplashScreen from 'react-native-splash-screen';
import { StackScreenProps } from "@react-navigation/stack";

import LockManager from "../../../libs/LockManager";
import usePrevious from "../../../hooks/usePrevious";
import BgView from "../../../components/Layouts/BgView";
import { HYDRO_WALLET_ADDRESS } from '../../../../constants';
import { RootStackParams } from "../../../interfaces/RootStackParams";
import { AppStateManagerContext } from "../../../context/AppStateManager";

interface Props extends StackScreenProps<RootStackParams, 'Validation'>{};

const Validation = ({ navigation }: Props) => {
  const lockManager = useRef<LockManager>();
  const [ address, _setAddress ] = useState('');
  const { setAddress, appState } = useContext(AppStateManagerContext);
  const prevLockTime = usePrevious(appState.lockTime);

  useEffect(() => {
    if(lockManager.current) {
      if(prevLockTime !== appState.lockTime)  {
        lockManager.current.updateLockTime(appState.lockTime);
      }
    }
  }, [ appState ])

  useEffect(() => {
    const { lockTime } = appState;
    lockManager.current = new LockManager({ navigation, lockTime: appState.lockTime });

    (async () => {
      let address = await SecureStore.getItemAsync(HYDRO_WALLET_ADDRESS);

      // support for the old version of the wallet
      // developer @gagzu | date 05-07-2021
      if(!address) {
        address = await SecureStore.getItemAsync('walletAddress');
        address && await SecureStore.setItemAsync(HYDRO_WALLET_ADDRESS, address);
      }
      // End of support for old version of the wallet

      SplashScreen.hide();

      if(address) {
        if(lockTime !== -1) {
          setAddress(address); // AppStateManager
          navigation.navigate('App', {
            screen: 'LockApp',
            params: { forceAuthBiometrics: true }
          });
        }

        if(lockTime === -1) {
          _setAddress(address);
        }
      } else {
        navigation.navigate("StartApp");
      }
    })();

    return () => {
      lockManager.current?.stopListening();
    }
  }, [])

  useEffect(() => {
    if(address) {
      setAddress(address);
      navigation.navigate("App", { screen: "Home" });
    }
  }, [ address ])

  return <BgView/>;
};

export default Validation;
