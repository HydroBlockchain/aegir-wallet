import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
/* screens */
import StartApp from "../screens/StartApp";
import AuthNavigation from "./AuthNavigation";
import MainNavigation from "./MainNavigation";
import Validation from "../screens/Auth/Validation";

/* utils */
import { RootStackParams } from "../interfaces/RootStackParams";

const Stack = createStackNavigator<RootStackParams>();

const AppContainer = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Validation" component={Validation} />
        <Stack.Screen name="StartApp" component={StartApp} />
        <Stack.Screen name="Auth" component={AuthNavigation} />
        <Stack.Screen name="App" component={MainNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppContainer;
