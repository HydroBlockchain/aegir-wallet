import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParams } from "../interfaces/RootStackParams";

/* screens */
import Receive from "../screens/Receive";
import History from "../screens/History";
import Settings from '../screens/Settings';
import Deposits from "../screens/Deposits";
import Home from "../screens/Dashboard/Home";
import Notification from "../screens/Notification";
import AddAccountTusc from "../screens/AddAccountTusc";
import RemittancesNavigation from "./RemittancesNavigation";
import ChangePassword from "../screens/Auth/Password/ChangePassword";
import Contacts from "../screens/Contacts";
import AddContact from '../screens/Contacts/AddContact';
import ListNFT from "../screens/NFT";
import AddNFT from "../screens/NFT/AddNFT";
import ViewNFT from "../screens/NFT/ViewNFT";
import SendNFT from "../screens/NFT/SendNFT";
import Browser from '../screens/Browser/index';

const Stack = createStackNavigator<RootStackParams>();

const MainNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown:  false,
      }}
    >

      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Remittances" component={RemittancesNavigation} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="Contacts" component={Contacts} />
      <Stack.Screen name="ListNFT" component={ListNFT} />
      <Stack.Screen name="AddNFT" component={AddNFT} />
      <Stack.Screen name="ViewNFT" component={ViewNFT} />
      <Stack.Screen name="SendNFT" component={SendNFT} />
      <Stack.Screen name="AddContact" component={AddContact} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="Receive" component={Receive} />
      <Stack.Screen name="History" component={History} />
      <Stack.Screen name="Deposits" component={Deposits} />
      <Stack.Screen name="AddAccountTusc" component={AddAccountTusc} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="Browser" component={Browser} />
    </Stack.Navigator>

  );
};

export default MainNavigation;
