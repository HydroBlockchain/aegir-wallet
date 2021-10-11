import React, { useContext, useEffect, useState } from 'react';

import styles from './styles';
import { ethers } from 'ethers';
import CryptoJS from 'crypto-js';
import { View } from 'react-native';
import { SendNFTParam } from './interfaces';
import Button from '../../components/Button';
import abiERC721 from '../../contracts/abiERC721';
import HeaderCustom from '../../components/Header';
import { ThemeContext } from '../../hooks/useTheme';
import BgView from '../../components/Layouts/BgView';
import TextInputCustom from '../../components/TextInput';
import Paragraph from '../../components/Paragraph/index';
import Spinner from 'react-native-loading-spinner-overlay';
import ViewContainer from '../../components/Layouts/ViewContainer';
import { AppStateManagerContext } from '../../context/AppStateManager';
import * as SecureStore from 'expo-secure-store';
import { HYDRO_ENCRYPTED_PRIVKEY } from '../../../constants';
import { timeoutPromises } from '../../libs/general';

const SendNFT = ({ navigation, route }: SendNFTParam) => {
  const NFT = route.params;
  const { theme } = useContext(ThemeContext);
  const [ password, setPassword ] = useState('');
  const [ spinner, setSpinner ]  = useState(false);
  const [ addressTo, setAddressTo ] = useState('');
  const [ successful, setSuccessful ] = useState(false);
  const [ addressError, setAddressError ] = useState('');
  const {
    toast,
    appState,
    web3Service,
    updateCollectibles,
  } = useContext(AppStateManagerContext);

  useEffect(() => {
    successful && navigation.goBack();
  }, [ successful ])


  const handleSend = async () => {
    setSpinner(true);

    try {
      const { collectibles } = appState;
      if(!web3Service.providerETH) {
        toast({
          type: 'warning',
          text: 'A network error has occurred, please try again later',
        })
        setSpinner(false);
        return;
      }

      if(!validaAddressTo()) {
        toast({
          type: 'warning',
          text: 'Invalid address',
        })
        setSpinner(false);
        return;
      }

      const encryptedPrivkey = await SecureStore.getItemAsync(HYDRO_ENCRYPTED_PRIVKEY);
      if(!encryptedPrivkey) return setSpinner(false);

      const privateKey = CryptoJS.AES.decrypt(
        encryptedPrivkey,
        password,
      ).toString(CryptoJS.enc.Utf8);

      if(!privateKey) {
        toast({
          type: 'error',
          text: 'Password incorrect',
        })
        setSpinner(false);
        return;
      }

      const wallet = new ethers.Wallet(privateKey, web3Service.providerETH);
      const contract = new ethers.Contract(NFT.contractAddress, abiERC721, wallet);

      const tx = await timeoutPromises({
        timeout: 20000,
        promises: [contract.transferFrom(appState.address, addressTo, NFT.tokenID)]
      })
      // const tx = await contract.transferFrom(appState.address, addressTo, NFT.tokenID)

      const updatedCollectibles = collectibles.filter(el => {
        if(el.contractAddress === NFT.contractAddress) {
          return el.tokenID !== NFT.tokenID
        } else {
          return true;
        }
      })

      const { message, status } = await updateCollectibles({
        address: appState.address,
        collectibles: updatedCollectibles,
      });

      toast({
        text: message,
        type: status ? 'success' : 'error',
      });

      setSuccessful(true);

    } catch(error: any) {
      console.log('error in handleSend', error);
      toast({
        type: 'error',
        text: `There was an error sending, please try again later: ${error?.message ?? ''}`,
      })
    }
    setSpinner(false);
  }

  const validaAddressTo = () => {
    if(!ethers.utils.isAddress(addressTo)) {
      setAddressError('Invalid address');
      return false;
    }
    setAddressError('');
    return true;
  }

  const TextError = ({ text }) => (
    <Paragraph variant='caption' stylesCustom={{ color: theme.colors.error }} >
      {text}
    </Paragraph>
  );

  return (
    <BgView>
      <HeaderCustom title={`Send NFT - ${NFT.tokenName} #${NFT.tokenID}`} variant='back' />
      <Spinner visible={spinner} size={'large'} color={theme.colors.primary} />

      <ViewContainer style={styles.addDataContainer} >
        <TextInputCustom
          label='From'
          editable={false}
          value={appState.address}
        />

        <View style={{height: 15}} />

        <TextInputCustom
          label='To'
          value={addressTo}
          onChangeText={setAddressTo}
          onBlur={() => { validaAddressTo() }}
        />

        <View style={{height: 15}} />

        {!!addressError && (
          <TextError text={addressError} />
        )}

        <TextInputCustom
          label='Password'
          value={password}
          onChangeText={setPassword}
        />
        <View style={{flex: 1}} />

        <Button
          text='SEND'
          variant='grey'
          onPress={handleSend}
        />
      </ViewContainer>
    </BgView>
  )
}

export default SendNFT;
