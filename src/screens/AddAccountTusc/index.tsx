import React, { useState } from 'react';

import { Apis as ApisTUSC } from "tuscjs-ws";
import Button from '../../components/Button';
import * as SecureStore from 'expo-secure-store';
import HeaderCustom from '../../components/Header';
import BgView from '../../components/Layouts/BgView';
import { PrivateKey as PrivateKeyUtils } from 'tuscjs';
import Spinner from 'react-native-loading-spinner-overlay';
import TextInputCustom from '../../components/TextInput/index';
import ViewContainer from '../../components/Layouts/ViewContainer';

/* styles */
import styles from './styles';

/* utils */
import Web3Service from '../../libs/Web3Service';
import { AddAccountTuscParam } from './interfaces';

/* constants */
import {
  TUSC_WALLET_NAME,
  TUSC_WALLET_PRIVKEY,
  TUSC_WALLET_ADDRESS,
} from '../../../constants';
import { useContext } from 'react';
import { AppStateManagerContext } from '../../context/AppStateManager';

const AddAccountTusc = ({ navigation }: AddAccountTuscParam) => {
  const [isLoading, setIsLoading] = useState(false);
  const [ privateKey, setPrivateKey ] = useState('');
  const [ accountName, setAccountName ] = useState('');
  const { toast } = useContext(AppStateManagerContext);

  const handleSave = async () => {
    try {
      const privateKeyTMP = PrivateKeyUtils.fromWif(privateKey);
      await ApisTUSC.instance(Web3Service.getProviderTUSC(), true).init_promise;

      // Get account data by name
      const account = await ApisTUSC.instance()
				.db_api().exec('get_account_by_name', [accountName]);

      // Close websocket connection
      ApisTUSC.instance().close();

      if(account) {
        // Obtain the public key of the account data
        const { options: { memo_key } } = account;

        // Compare the public key obtained from the account data with that of the private key
        if(privateKeyTMP.toPublicKey().toString() === memo_key) {
          await SecureStore.setItemAsync(TUSC_WALLET_NAME, accountName);
          await SecureStore.setItemAsync(TUSC_WALLET_ADDRESS, memo_key);
          await SecureStore.setItemAsync(TUSC_WALLET_PRIVKEY, privateKey);
          navigation.push('Home');
        } else {
          toast({
            type: 'error',
            text: 'Account name does not match private key',
          });
        }
      } else {
        toast({
          type: 'error',
          text: 'Invalid account name',
        });
      }

    } catch(error) {
      toast({
        type: 'error',
        text: 'Invalid Private key',
      });
    }

    setIsLoading(false);
  }

  return (
    <BgView>
      <Spinner size='large' visible={isLoading} />

      <HeaderCustom variant='back' title='Add Account' />

      <ViewContainer style={[styles.viewContainer]} >
        <TextInputCustom
          value={accountName}
          label='Account name'
          autoCorrect={false}
          onChangeText={setAccountName}
          stylesCustom={{
            wrapper: styles.input
          }}
          />

        <TextInputCustom
          value={privateKey}
          autoCorrect={false}
          label='Private Key'
          onChangeText={setPrivateKey}
          stylesCustom={{
            wrapper: styles.input
          }}
        />

        <Button
          text='save'
          variant='default'
          onPress={() => {
            setIsLoading(true);
            setTimeout(handleSave, 300);
          }}
          styleCustom={{ marginVertical: 15 }}
        />
      </ViewContainer>
    </BgView>
  )
}

export default AddAccountTusc;
