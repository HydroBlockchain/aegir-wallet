import React, { Fragment, useContext, useState } from 'react';

import { ethers } from 'ethers';
import CryptoJS from 'crypto-js';
import { ScrollView, View } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import Spinner from 'react-native-loading-spinner-overlay';

import styles from './styles';
import Button from '../../components/Button';
import { signECDSA } from '../../libs/general';
import HeaderCustom from '../../components/Header';
import { ThemeContext } from '../../hooks/useTheme';
import BgView from '../../components/Layouts/BgView';
import { IoutputECDSA } from '../../interfaces/Igeneral';
import { HYDRO_ENCRYPTED_PRIVKEY } from '../../../constants';
import TextInputCustom from '../../components/TextInput/index';
import ViewContainer from '../../components/Layouts/ViewContainer';
import FullWidthImage from '../../components/FullWidthImage/index';
import { AppStateManagerContext } from '../../context/AppStateManager/index';

const ClaimHydroID = () => {
  const { theme } = useContext(ThemeContext);
  const [ hydroID, setHydroID ] = useState('');
  const [ privateKey, setPrivateKey ] = useState('');
  const [ txInputs, setTxInputs ] = useState<any[]>([]);
  const [ password, setPassword ] = useState('');
  const [ loading, setLoading ] = useState(false);
  const [ hydroIDError, setHydroIDError ] = useState('');
  const [ passwordError, setPasswordError ] = useState('');
  const [ gasFee, setGasFee ] = useState<null | string>(null);
  const { web3Service, appState, toast, setEIN } = useContext(AppStateManagerContext);

  const handleClaim = async () => {
    setLoading(true);
    try {
      const isAvailable = await web3Service.isHydroIdAvailable(hydroID);

      if(!isAvailable) {
        setLoading(false);
        setHydroIDError('The hydro ID is not available');
        return;
      }

      const { address } = appState;
      const timestamp = Math.round(+(new Date()) / 1000) - 1;
      const messageHash = ethers.utils.solidityKeccak256(
        [
          'bytes',
          'bytes',
          'address',
          'string',
          'address',
          'address',
          'address[]',
          'address[]',
          'int',
        ],
        [
          '0x19',
          '0x00',
          web3Service.identityRegistryAddress,
          'I authorize the creation of an Identity on my behalf.',
          address,
          address,
          [ web3Service.snowflakeAddress ],
          [],
          timestamp
        ]
      );

      const encryptedPrivkey = await SecureStore.getItemAsync(HYDRO_ENCRYPTED_PRIVKEY);
      if(!encryptedPrivkey) return;

      const privateKey = CryptoJS.AES.decrypt(
        encryptedPrivkey, password
      ).toString(CryptoJS.enc.Utf8);

      if (!privateKey) {
        setLoading(false);
        setPasswordError('Incorrect password!');
        return;
      }

      const permission: IoutputECDSA = await signECDSA({ privateKey, messageHash });
      const txInputs = [
        address,
        address,
        [],
        hydroID,
        permission.v,
        permission.r,
        permission.s,
        timestamp
      ];

      const gasFee: null | string = await new Promise(async (resolve) => {
        try {
          const contract = web3Service.contracSnowflake;
          if(!contract) return;
          if(!web3Service.providerBSC) return;

          const wallet = new ethers.Wallet(privateKey, web3Service.providerBSC);
          const contractConnect = contract.connect(wallet);

          const gasFee = await contractConnect
            .estimateGas.createIdentityDelegated(...txInputs);
          resolve(ethers.utils.formatEther(gasFee));
        } catch(error) {
          console.log('error in getGasFee', error);
          resolve(null);
        }
      });

      if(!gasFee) {
        // If the gasFee is null, surely the user is already registered
        setLoading(false);
        toast({
          type: 'warning',
          text: 'The gas fee could not be calculated!',
        })
      }

      setGasFee(gasFee);
      setTxInputs(txInputs);
      setPrivateKey(privateKey);

    } catch(error) {
      console.log('error in handleClaim', error);
    }
    setLoading(false);
  }

  const confirmClaim = async () => {
    setLoading(true);
    try {
      const contract = web3Service.contracSnowflake;
      if(!contract) return;
      if(!web3Service.providerBSC) return;

      const wallet = new ethers.Wallet(privateKey, web3Service.providerBSC);
      const contractConnect = contract.connect(wallet);

      const txIdentity = await contractConnect.createIdentityDelegated(...txInputs);
      await txIdentity.wait();

      if(!web3Service.contracIdentityRegistry) return;
      const ein = await web3Service.contracIdentityRegistry.getEIN(appState.address);
      setEIN(ein.toString());
      return;
    } catch(error) {
      toast({
        type: 'error',
        text: 'An unexpected error occurred!',
      })
      console.log('error in confirmClaim', error);
    }
    setLoading(false);
  }

  return (
    <BgView>
      <HeaderCustom variant='back' title='Claim Hydro ID' />
      <Spinner visible={loading} size={'large'} color={theme.colors.primary} />

      <ViewContainer style={styles.viewContainer} >
        <ScrollView>
          <View style={styles.wrapperImage} >
            <FullWidthImage
              widthWrapper={100}
              source={require('../../assets/images/auth/wallet.png')}
            />
          </View>

          <TextInputCustom
            value={hydroID}
            label='Hydro ID'
            errorMsg={hydroIDError}
            onChangeText={setHydroID}
            editable={!Boolean(txInputs.length)}
          />

          <View style={{ height: 8 }} />

          {(Boolean(txInputs.length)) ? (
            <TextInputCustom
              label='Address'
              editable={false}
              value={appState.address}
            />
          ) : (
            <TextInputCustom
              secureTextEntry
              label='Password'
              value={password}
              errorMsg={passwordError}
              onChangeText={setPassword}
            />
          )}

          {(gasFee) && (
            <Fragment>
              <View style={{ height: 8 }} />

              <TextInputCustom
              value={gasFee}
              label='Gas fee'
              editable={false}
            />
            </Fragment>
          )}
        </ScrollView>

        <View style={{ flex: 1 }} />

        <Button
          variant='grey'
          disable={loading}
          text={txInputs.length ? 'Confirm' : 'Claim Hydro ID'}
          onPress={() => {
            if(txInputs.length) {
              confirmClaim()
            } else {
              handleClaim()
            }
          }}
        />
      </ViewContainer>
    </BgView>
  )
}

export default ClaimHydroID