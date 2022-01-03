import React, { Fragment, useContext, useEffect, useRef, useState } from 'react'
import CryptoJS from 'crypto-js';
import { Image } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';
import * as LocalAuth from 'expo-local-authentication';
import Spinner from 'react-native-loading-spinner-overlay';
import { AppState, AppStateStatus, BackHandler, TouchableOpacity, View } from 'react-native';

import styles from './styles';
import Button from '../../components/Button';
import { IauthType, IlockApp } from './interfaces';
import { ThemeContext } from '../../hooks/useTheme';
import BgView from '../../components/Layouts/BgView';
import TextInputCustom from '../../components/TextInput';
import Paragraph from '../../components/Paragraph/index';
import { HYDRO_ENCRYPTED_PRIVKEY } from '../../../constants';
import ViewContainer from '../../components/Layouts/ViewContainer';
import { AppStateManagerContext } from '../../context/AppStateManager';

const LockApp = ({ navigation }: IlockApp) => {
  const authLoading = useRef(false);
  const [ password, setPassword ] = useState('');
  const [ loading, setLoading ] = useState(false);
  const { toast } = useContext(AppStateManagerContext);
  const { theme, isLightTheme } = useContext(ThemeContext);
  const [ passwordError, setPasswordError ] = useState('');
  const [ authType, setAuthType ] = useState<IauthType>('password');

  useEffect(() => {
    const backevent = BackHandler.addEventListener('hardwareBackPress', handleBack);
    const AppStateEvent = AppState.addEventListener('change', handleAppstateChange);
    return () => {
      backevent.remove();
      AppStateEvent.remove();
      LocalAuth.cancelAuthenticate();
    }
  }, [])

  useEffect(() => {
    if(authType === 'fingerprint' && !authLoading.current) {
      // hadleAuthFingerprint();
    }
  }, [ authType ])

  const handleAppstateChange = (nextAppState: AppStateStatus) => {
    if(nextAppState === 'active') {
      // hadleAuthFingerprint();
    } else {
      LocalAuth.cancelAuthenticate();
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

  const hadleAuthFingerprint = async () => {
    authLoading.current = true;
    LocalAuth.cancelAuthenticate();
    const enrolledLevel = await LocalAuth.getEnrolledLevelAsync();
    const supportedAuthenticationTypes = await LocalAuth.supportedAuthenticationTypesAsync();

    if(
      enrolledLevel === LocalAuth.SecurityLevel.BIOMETRIC &&
      supportedAuthenticationTypes.includes(LocalAuth.AuthenticationType.FINGERPRINT)
    ) {
      LocalAuth.authenticateAsync({
        promptMessage: 'Login to use Aegir Wallet'
      })
      .then((result) => {
        authLoading.current = false;
        if(result.success) navigation.replace('Home');
      })
      .catch((error) => {
        authLoading.current = false;
        console.log('An error occurred. Please authenticate with password', error);

        toast({
          type: 'warning',
          text: 'An error occurred. Please authenticate with password'
        });

        setAuthType('password');
      })
    } else {
      setAuthType('password');
    }
  }

  const hadleAuthPassword = async () => {
    setLoading(true);
    const encryptedPrivkey = await SecureStore.getItemAsync(HYDRO_ENCRYPTED_PRIVKEY);
    if(!encryptedPrivkey) return setLoading(false);

    const privateKey = CryptoJS.AES.decrypt(
      encryptedPrivkey,
      password,
    ).toString(CryptoJS.enc.Utf8);

    if(!privateKey) {
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

        <TouchableOpacity onPress={() => {
          // hadleAuthFingerprint();
          // setAuthType('fingerprint');
        }} >
          <Image
            style={styles.imageFingerPrint}
            source={(isLightTheme)
              ? require('../../assets/images/remittances/finger-print-dark.png')
              : require('../../assets/images/remittances/finger-print.png')
            }
          />
        </TouchableOpacity>

        <View style={{ height: 24 }} />

        {(false) ? (
          <Fragment>
            <Paragraph variant='caption' >
              Touch the fingerprint sensor
            </Paragraph>

            <View style={{ height: 8 }} />

            <Button
              variant='grey'
              text='Login with password'
              onPress={() => setAuthType('password')}
            />
          </Fragment>
        ) : (
          <Fragment>
            <View style={styles.contentInputs} >
              <TextInputCustom
                label='Password'
                value={password}
                icon='fingerprint'
                autoCapitalize='none'
                errorMsg={passwordError}
                onChangeText={setPassword}
                iconType='MaterialCommunityIcons'
                // onIconClick={() => setAuthType('fingerprint')}
              />
            </View>

            <View style={{ height: 16 }} />

            <Button
              text='Login'
              variant='grey'
              onPress={hadleAuthPassword}
            />
          </Fragment>
        )}
      </ViewContainer>
    </BgView>
  )
}

export default LockApp
