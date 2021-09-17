import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

/* screens */
import SendMoney from '../screens/remittances/SendMoney';
import UserRegiste from '../screens/remittances/UserRegister';
import LoginRemittances from '../screens/remittances/LoginRemittances';
import StartRemittances from '../screens/remittances/StartRemittances/index';

/* utils */
import { RootStackParams } from '../interfaces/RootStackParams';


const Stack = createStackNavigator<RootStackParams>();

const RemittancesNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name='StartRemittances' component={StartRemittances} />
      <Stack.Screen name='UserRegister' component={UserRegiste} />
      <Stack.Screen name='LoginRemittances' component={LoginRemittances} />
      <Stack.Screen name='SendMoney' component={SendMoney} />
    </Stack.Navigator>
  )
}

export default RemittancesNavigation;
