import React, { useContext, useState } from 'react';

import { View } from 'react-native';
import CryptoJS from 'react-native-crypto-js';
import Button from '../../../components/Button';
import HeaderCustom from '../../../components/Header';
import { ThemeContext } from '../../../hooks/useTheme';
import BgView from '../../../components/Layouts/BgView';
import Spinner from 'react-native-loading-spinner-overlay';
import TextInputCustom from '../../../components/TextInput';
import ViewContainer from '../../../components/Layouts/ViewContainer';

/* utils */
import styles from './styles';
import * as SecureStore from 'expo-secure-store';
import { HYDRO_ENCRYPTED_PRIVKEY } from '../../../../constants';
import { AppStateManagerContext } from '../../../context/AppStateManager';

const passwordDefault = {
  oldPass: '',
  newPass: '',
  confirmPass: '',
}

const ChangePassword = () => {
  const { theme } = useContext(ThemeContext);
  const [ spinner, setSpinner ]  = useState(false);
  const { toast } = useContext(AppStateManagerContext);
  const [ password, _setPassword ] = useState({ ...passwordDefault });

  const setPassword = (key: 'oldPass' | 'newPass' | 'confirmPass', value: string) => {
    _setPassword((prevState) => ({
      ...prevState,
      [key]: value
    }));
  }

  const handleChangePassword = async () => {
    setSpinner(true);
    const { oldPass, newPass, confirmPass } = password;

    const encryptedPrivkey = await SecureStore.getItemAsync(HYDRO_ENCRYPTED_PRIVKEY);
    const privateKey = CryptoJS.AES.decrypt(
      encryptedPrivkey, oldPass
    ).toString(CryptoJS.enc.Utf8);

    if(!privateKey) {
      toast({
        type: 'error',
        text: 'Incorrect Password.',
      })
      setSpinner(false);
      return;
    }

    if(!newPass || newPass.length < 3) {
      toast({
        type: 'error',
        text: 'the new password is too short',
      })
      setSpinner(false);
      return;
    }

    if(newPass !== confirmPass) {
      toast({
        type: 'error',
        text: 'the password confirmation is incorrect',
      })
      setSpinner(false);
      return;
    }

    var encryptKey = CryptoJS.AES.encrypt(privateKey, newPass).toString();
    await SecureStore.setItemAsync(HYDRO_ENCRYPTED_PRIVKEY, encryptKey);

    toast({
      type: 'success',
      text: 'Password changed successfully',
    })
    setSpinner(false);
    _setPassword({ ...passwordDefault });

  }

  return (
    <BgView>
      <HeaderCustom title='Change Password' variant='back' />
      <Spinner visible={spinner} size={'large'} color={theme.colors.primary} />

      <ViewContainer style={styles.changePasswordContainer} >
        <TextInputCustom
          secureTextEntry
          value={password.oldPass}
          label='Old Password'
          onChangeText={(value) => {setPassword('oldPass', value)}}
        />

        <View style={{height: 10}} />

        <TextInputCustom
          secureTextEntry
          value={password.newPass}
          label='New Password'
          onChangeText={(value) => {setPassword('newPass', value)}}
        />

        <View style={{height: 10}} />

        <TextInputCustom
          secureTextEntry
          value={password.confirmPass}
          label='Confirm new Password'
          onChangeText={(value) => {setPassword('confirmPass', value)}}
        />

        <View style={{flex: 1}} />

        <Button
          variant='grey'
          text='Change Password'
          onPress={handleChangePassword}
          styleCustom={styles.btnChangePassword}
        />

        <View style={{height: theme.heightHeader}} />
      </ViewContainer>
    </BgView>
  )
}

export default ChangePassword
