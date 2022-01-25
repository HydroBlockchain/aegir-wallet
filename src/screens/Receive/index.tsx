import React, { useContext, useEffect, useState } from 'react';

/* components */
import QRCode from 'react-native-qrcode-svg';
import Button from '../../components/Button';
import * as SecureStore from 'expo-secure-store';
import Paragraph from '../../components/Paragraph';
import HeaderCustom from '../../components/Header';
import BgView from '../../components/Layouts/BgView';
import { ScrollView } from 'react-native-gesture-handler';
import Clipboard from "@react-native-clipboard/clipboard";
import ViewContainer from '../../components/Layouts/ViewContainer';

/* utils */
import styles from './styles';
import { ReceiveParam } from './interfaces';
import { View, Dimensions } from 'react-native';
import { ThemeContext } from '../../hooks/useTheme';
import { TUSC_WALLET_ADDRESS } from '../../../constants';
import { AppStateManagerContext } from '../../context/AppStateManager';

const Receive = ({ route }: ReceiveParam) => {
  const { coin } = route.params;
  const { theme } = useContext(ThemeContext);
  const { appState, toast } = useContext(AppStateManagerContext);
  const [address, setAddress] = useState(appState.address);
  const { height, width } = Dimensions.get('window');

  useEffect(() => {
    if(coin === 'TUSC') {
      SecureStore.getItemAsync(TUSC_WALLET_ADDRESS).then((data) => {
        setAddress(data || '');
      })
    }
  }, [])

  const copyAddress = () => {
		if (!address) return;
		Clipboard.setString(address);
    toast({
      type: 'success',
      text: 'copied!',
    })
	}

  return (
    <BgView>
      <HeaderCustom variant='back' title='Receive' />

      <ViewContainer style={styles.viewContainer} >
        <ScrollView>
          <Paragraph variant='inputLabel1'>
            Wallet address
          </Paragraph>

          <Paragraph
            numberOfLines={1}
            adjustsFontSizeToFit={true}
            variant='inputLabel1'
            stylesCustom={[
              styles.address,
              {
                borderRadius: theme.roundness,
                backgroundColor: theme.colors.backgroundApp2,
              }
            ]}
          >
            {address}
          </Paragraph>

            {(!address) ? <View/> : (
              <View style={styles.wrapperQr} >
                  <QRCode
                    value={address}
                    size={width * 0.9}
                    backgroundColor='transparent'
                    color={theme.colors.backgroundApp2}
                  />
              </View>
            )}


        </ScrollView>

        <View style={{flex: 1}} />

        <Button
          variant='grey'
          onPress={copyAddress}
          text='Copy to clipboard'
        />
      </ViewContainer>
    </BgView>
  )
}

export default Receive;