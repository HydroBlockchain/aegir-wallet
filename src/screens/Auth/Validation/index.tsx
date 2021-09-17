import React, { useContext, useEffect } from "react";

import { View } from "react-native";
import * as SecureStore from 'expo-secure-store';
import SplashScreen from 'react-native-splash-screen';
import { StackScreenProps } from "@react-navigation/stack";
import { HYDRO_WALLET_ADDRESS } from '../../../../constants';
import { RootStackParams } from "../../../interfaces/RootStackParams";
import { AppStateManagerContext } from "../../../context/AppStateManager";


interface Props extends StackScreenProps<RootStackParams, 'Validation'>{};

const Validation = ({ navigation }: Props) => {
  const { setAddress } = useContext(AppStateManagerContext);

  useEffect(() => {
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

      if (address !== null) {
        setAddress(address);
        navigation.navigate("App", { screen: "Home" })
      } else {
        navigation.navigate("StartApp");
      }
    })();
  }, [])

  return <View/>;
};

export default Validation;
