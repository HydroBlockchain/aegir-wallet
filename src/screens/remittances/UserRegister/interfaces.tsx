import { RouteProp } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParams } from '../../../navigation/RootStackParams';

export type UserRegisterType = {
  city: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  country: string;
  lastName: string;
  userName: string;
  birthday: string;
  password: string;
  acceptTerms: string;
  notification: string;
}

export type UserRegisterKeys =
  | 'city'
  | 'name'
  | 'phone'
  | 'email'
  | 'address'
  | 'country'
  | 'lastName'
  | 'userName'
  | 'birthday'
  | 'password'
  | 'acceptTerms'
  | 'notification'

export interface PropsUserRegisterScreens {
  form: UserRegisterType,
  route: RouteProp<RootStackParams, 'UserRegister'>,
  setFormFiled: (value: string, field: UserRegisterKeys) => void,
  navigation: StackNavigationProp<RootStackParams, 'UserRegister'>
}