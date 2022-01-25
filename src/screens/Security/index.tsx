import React, { useContext, useEffect, useState } from 'react';

import CryptoJS from 'crypto-js';
import { ScrollView, View } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import Spinner from 'react-native-loading-spinner-overlay';

import styles from './styles';
import Button from '../../components/Button';
import { IOption } from '../../interfaces/Iinput';
import { ThemeContext } from '../../hooks/useTheme';
import BgView from '../../components/Layouts/BgView';
import SelectInput from '../../components/SelectInput';
import TextInputCustom from '../../components/TextInput';
import Paragraph from '../../components/Paragraph/index';
import HeaderCustom from '../../components/Header/index';
import { HYDRO_ENCRYPTED_PRIVKEY } from '../../../constants';
import ViewContainer from '../../components/Layouts/ViewContainer';
import { AppStateManagerContext } from '../../context/AppStateManager/index';

const Security = () => {
  const { theme } = useContext(ThemeContext);
  const [ password, setPassword ] = useState('');
  const [ loading, setLoading ] = useState(false);
  const [ passwordError, setPasswordError ] = useState('');
  const { appState, setLockTime, toast } = useContext(AppStateManagerContext);
  const [ lockTimeDefault, setLockTimeDefault ] = useState<null | IOption>(null);
  const [ currentlockTime, setCurrentLockTime ] = useState<null | IOption>(null);
  const optionsLockTime = [
    {
      id: 0,
      title: 'Immediately',
    },
    {
      id: 1000 * 15, // 15seg
      title: 'After 15 seconds',
    },
    {
      id: 1000 * 30, // 30seg
      title: 'After 30 seconds',
    },
    {
      id: 1000 * 60, // 60seg
      title: 'After 60 seconds',
    },
    {
      id: 1000 * 60 * 5, // 5min
      title: 'After 5 minutes',
    },
    {
      id: 1000 * 60 * 10, // 10min
      title: 'After 10 minutes',
    },
    {
      id: -1,
      title: 'Never',
    },
  ];

  useEffect(() => {
    const lockTimeDefault = optionsLockTime.find(el => el.id === appState.lockTime);
    if(lockTimeDefault) {
      setCurrentLockTime(lockTimeDefault);
      setLockTimeDefault(lockTimeDefault);
    }
  }, [])

  const handleConfirm = async () => {
    setLoading(true);
    try {
      const privkey = await SecureStore.getItemAsync(HYDRO_ENCRYPTED_PRIVKEY);

      let privateKey = '';

      try {
        privateKey = CryptoJS.AES.decrypt( privkey || '', password)
        .toString(CryptoJS.enc.Utf8);
      } catch(error) {
        console.log('error in handleConfirm - CryptoJS', error);
      }

      if(!privateKey) {
        setPasswordError('Password incorrect');
        setLoading(false);
        return;
      }

      if(currentlockTime) {
        setPassword('');
        setPasswordError('');
        setLockTime(parseInt(`${currentlockTime.id}`));

        toast({
          type: 'success',
          text: 'Successful change!',
        });
      }

    } catch(error) {
      console.log('error in handleConfirm', error);
    }
    setLoading(false);
  }

  const onChangeSelectTime = (item: IOption) => {
    setCurrentLockTime(item);
  }

  return (
    <BgView>
      <HeaderCustom variant='back' title='Security' />
      <Spinner visible={loading} size={'large'} color={theme.colors.primary} />

      <ViewContainer style={styles.viewContainer} >
        <ScrollView>
          <Paragraph variant='subtitle2' >
            Automatic lock
          </Paragraph>

          <Paragraph variant='body2' >
            Choose the amount of time before the app closes automatically
          </Paragraph>

          <View style={{ height: 8 }} />

          <SelectInput
            options={optionsLockTime}
            onChange={onChangeSelectTime}
            selectedDefault={lockTimeDefault || null}
          />

          <View style={{ height: 8 }} />

          <TextInputCustom
            secureTextEntry
            value={password}
            autoCapitalize='none'
            errorMsg={passwordError}
            onChangeText={setPassword}
            placeholder='Enter your password'
          />
        </ScrollView>

        <View style={{ flex: 1 }} />

        <Button
          variant='grey'
          text='Confirm'
          onPress={handleConfirm}
        />
      </ViewContainer>
    </BgView>
  )
}

export default Security
