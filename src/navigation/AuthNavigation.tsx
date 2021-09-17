//@@Dev this component handles navigation for authentication
import React from "react";

import Create from "../screens/Auth/Create";
import Recover from "../screens/Auth/Recover";
import Register from "../screens/Auth/Register";
import Mnemonic from "../screens/Auth/Mnemonic";
import Password from "../screens/Auth/Password";
import AuthLanding from "../screens/Auth/AuthLanding";
import PasswordSet from "../screens/Auth/Password/PasswordSet";
import { RootStackParams } from "../interfaces/RootStackParams";
import { createStackNavigator } from "@react-navigation/stack";


const Stack = createStackNavigator<RootStackParams>();

const AuthNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="AuthLanding" component={AuthLanding} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Create" component={Create} />
      <Stack.Screen name="Recover" component={Recover} />
      <Stack.Screen name="Mnemonic" component={Mnemonic} />
      <Stack.Screen name="Password" component={Password} />
      <Stack.Screen name="PasswordSet" component={PasswordSet} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
