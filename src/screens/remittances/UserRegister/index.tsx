import React, { useState } from 'react'

import Address from './Address';
import Security from './Security';
import Password from './Password';
import BgView from '../../../components/Layouts/BgView';
import PersonalInformation from './PersonalInformation';
import NotificationSettings from './NotificationSettings/index';
import { UserRegisterKeys, UserRegisterType } from './interfaces';

/* interfaces */
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../../interfaces/RootStackParams';

interface Props extends StackScreenProps<RootStackParams, 'UserRegister'>{};

const UserRegiste = ({ route, navigation }: Props) => {
  const [ form, setForm ] = useState<UserRegisterType>({
    city: '',
    name: '',
    phone: '',
    email: '',
    address: '',
    country: '',
    lastName: '',
    userName: '',
    birthday: '',
    password: '',
    acceptTerms: '',
    notification: '',
  });

  const setFormFiled = (value: string, field: UserRegisterKeys) => {
    setForm((prevState) => ({
      ...prevState,
      [field]: value
    }))
  }

  const ComponentStep = (route.params?.step === 'address') ? (
    Address
  ) : (route.params?.step === 'notification_settings') ? (
    NotificationSettings
  ) : (route.params?.step === 'password') ? (
    Password
  ) :(route.params?.step === 'security') ? (
    Security
  ) : (
    PersonalInformation
  );

  return (
    <BgView>
      <ComponentStep
        form={form}
        route={route}
        navigation={navigation}
        setFormFiled={setFormFiled}
      />      
    </BgView>
  )
}

export default UserRegiste;