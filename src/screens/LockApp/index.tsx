import React, {
  useRef,
  useState,
  useEffect,
  useContext,
} from 'react';

import {
  View,
  AppState,
  BackHandler,
  AppStateStatus,
  TouchableOpacity,
} from 'react-native';

import CryptoJS from 'crypto-js';
import { Image } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';
import Spinner from 'react-native-loading-spinner-overlay';

import styles from './styles';
import { IlockApp } from './interfaces';
import Button from '../../components/Button';
import { ThemeContext } from '../../hooks/useTheme';
import BgView from '../../components/Layouts/BgView';
import TextInputCustom from '../../components/TextInput';
import Paragraph from '../../components/Paragraph/index';
import { HYDRO_ENCRYPTED_PRIVKEY } from '../../../constants';
import ViewContainer from '../../components/Layouts/ViewContainer';
import ReactNativeBiometrics from '../../nativeModules/ReactNativeBiometrics';

const LockApp = ({ navigation, route }: IlockApp) => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { forceAuthBiometrics } = route?.params || {};
  const [passwordError, setPasswordError] = useState('');
  const { theme, isLightTheme } = useContext(ThemeContext);

  useEffect(() => {
    if(forceAuthBiometrics) {
      hadleAuthFingerprint();
    }
  }, [forceAuthBiometrics])

  useEffect(() => {
    const backevent = BackHandler.addEventListener('hardwareBackPress', handleBack);
    const appStateEvent = AppState.addEventListener('change', handleAppstateChange);
    return () => {
      backevent.remove();
      appStateEvent.remove();
    }
  }, [])

  const hadleAuthFingerprint = async () => {
    const {
      available,
      biometryType,
    } = await ReactNativeBiometrics.isSensorAvailable();

    console.log('biometryType', biometryType)
    if (available && biometryType === ReactNativeBiometrics.getBiometrics()) {
      ReactNativeBiometrics.simplePrompt({
        promptMessage: 'Login to use Aegir Wallet'
      })
        .then((resultObject) => {
          const { success } = resultObject

          console.log('resultObject', resultObject);

          if (success) {
            navigation.replace('Home');
          }
        })
        .catch((error) => {
          console.log('biometrics failed', error)
        })
    }
  }

  const handleAppstateChange = (nextAppState: AppStateStatus) => {
    if(nextAppState === 'active') {
      hadleAuthFingerprint();
    }
  }

  const handleBack = () => {
    if (navigation.isFocused()) {
      BackHandler.exitApp();
      return true;
    } else {
      return false;
    }
  }

  const hadleAuthPassword = async () => {
    setLoading(true);
    const encryptedPrivkey = await SecureStore.getItemAsync(HYDRO_ENCRYPTED_PRIVKEY);
    if (!encryptedPrivkey) return setLoading(false);

    const privateKey = CryptoJS.AES.decrypt(
      encryptedPrivkey,
      password,
    ).toString(CryptoJS.enc.Utf8);

    if (!privateKey) {
      setPasswordError('Password incorrect');
      setLoading(false);
      return;
    }

    navigation.replace('Home');
  }

  return (
    <BgView>
      <Spinner visible={loading} size={'large'} color={theme.colors.primary} />
      <ViewContainer style={styles.viewContainer} >
        {/* Make up for missing header */}
        <View style={{ height: 15 }} />

        <Paragraph variant='h4' >
          Login to use Aegir Wallet
        </Paragraph>

        <View style={{ height: 24 }} />

        <TouchableOpacity onPress={hadleAuthFingerprint} >
          <Image
            style={styles.imageFingerPrint}
            source={(isLightTheme)
              ? require('../../assets/images/remittances/finger-print-dark.png')
              : require('../../assets/images/remittances/finger-print.png')
            }
          />
        </TouchableOpacity>

        <View style={{ height: 24 }} />

        <View style={styles.contentInputs} >
          <TextInputCustom
            secureTextEntry
            label='Password'
            value={password}
            icon='fingerprint'
            autoCapitalize='none'
            errorMsg={passwordError}
            onChangeText={setPassword}
            iconType='MaterialCommunityIcons'
            onIconClick={hadleAuthFingerprint}
          />
        </View>

        <View style={{ height: 16 }} />

        <Button
          text='Login'
          variant='grey'
          onPress={hadleAuthPassword}
        />
      </ViewContainer>
    </BgView>
  )
}

export default LockApp
