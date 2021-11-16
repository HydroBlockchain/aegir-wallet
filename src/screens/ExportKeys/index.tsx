import React, { useContext, useState } from 'react'

import styles from './styles';
import CryptoJS from 'crypto-js';
import Button from '../../components/Button';
import * as SecureStore from 'expo-secure-store';
import HeaderCustom from '../../components/Header';
import { ThemeContext } from '../../hooks/useTheme';
import BgView from '../../components/Layouts/BgView';
import { TouchableOpacity, View } from 'react-native';
import TextInputCustom from '../../components/TextInput';
import Paragraph from '../../components/Paragraph/index';
import Clipboard from '@react-native-clipboard/clipboard';
import { HYDRO_ENCRYPTED_PRIVKEY } from '../../../constants';
import ViewContainer from '../../components/Layouts/ViewContainer';
import { AppStateManagerContext } from '../../context/AppStateManager';

const ExportKeys = () => {
  const { theme } = useContext(ThemeContext);
  const [ password, setPassword ] = useState('');
  const [ privateKey, setPrivateKey ] = useState('');
  const { toast } = useContext(AppStateManagerContext);
  const [ passwordError, setPasswordError ] = useState('');

  const handleExportKeys = async () => {
    if(!password) {
      setPasswordError('Password incorrect');
      return;
    }

    const encryptedPrivkey = await SecureStore.getItemAsync(
      HYDRO_ENCRYPTED_PRIVKEY,
    );

    if(!encryptedPrivkey) return;

    const _privateKey = CryptoJS.AES.decrypt(
      encryptedPrivkey,
      password,
    ).toString(CryptoJS.enc.Utf8);

    setPrivateKey(_privateKey);
  }

  const copyPrivateKey = () => {
    Clipboard.setString(privateKey);
    toast({
      type: 'success',
      text: 'Copied key!',
    });
    setPassword('');
    setPrivateKey('');
  };

  return (
    <BgView>
      <HeaderCustom variant='back' title='Export keys' />

      <ViewContainer style={styles.viewContainer} >
        {(privateKey) ? (
          <TouchableOpacity onPress={copyPrivateKey} >
            <Paragraph variant='body1'>
              This is your private key (click to copy it)
            </Paragraph>
            <View style={{ height: 5 }} />
            <Paragraph variant='body2'
              stylesCustom={[
                styles.privateKey,
                { backgroundColor: theme.colors.backgroundApp2 }
              ]}
            >
              {privateKey}
            </Paragraph>
          </TouchableOpacity>
        ) : (
          <TextInputCustom
            value={password}
            label='Enter Password'
            secureTextEntry={true}
            errorMsg={passwordError}
            onChangeText={setPassword}
          />
        )}

        <View style={{ height: 10 }} />

        <Paragraph variant='body2'
          stylesCustom={{
            color: theme.colors.error
          }}
        >
          Warning: Do not reveal this key. Anyone who has your private keys could steal your account assets.
        </Paragraph>

        <View style={{flex: 1}} />

        <Button
          variant='grey'
          text='Export keys'
          onPress={handleExportKeys}
        />
      </ViewContainer>
    </BgView>
  )
}

export default ExportKeys;