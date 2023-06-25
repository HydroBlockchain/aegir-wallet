import React, { useContext, useState } from 'react';

/* components */
import { ethers, Wallet } from 'ethers';
import { View } from 'react-native';
// import bip39 from 'react-native-bip39';
// import bip39 from 'bip39';
import * as bip39 from 'bip39';
import {hdkey} from 'ethereumjs-wallet';
import Button from '../../../components/Button';
import * as SecureStore from 'expo-secure-store';
import BgView from '../../../components/Layouts/BgView';
import Clipboard from '@react-native-clipboard/clipboard';
import { StackScreenProps } from '@react-navigation/stack';
import Spinner from 'react-native-loading-spinner-overlay';
import HeaderCustom from '../../../components/Header/index';
import TextInputCustom from '../../../components/TextInput';
import ViewContainer from '../../../components/Layouts/ViewContainer';
import { RootStackParams } from '../../../interfaces/RootStackParams';

/* styles */
import styles from './styles';

/* constants */
import { MNEMONIC_KEY } from '../../../../constants';
import { AppStateManagerContext } from '../../../context/AppStateManager';

interface PropsRoute extends StackScreenProps<RootStackParams, 'Recover'> {};

const Recover = ({ navigation }: PropsRoute) => {
  const [mnemonic, setMnemonic] = useState('');
  const [ isLoading, setIsLoading ] = useState(false);
  const { toast } = useContext(AppStateManagerContext);

  const handlePaste = async () => {
    const mnemonicTMP = await Clipboard.getString();
    setMnemonic(mnemonicTMP);
  }

  const checkMnemonic = async () => {
    if (mnemonic === '') {
      toast({
        type: 'error',
        text: 'Enter BIP39 Mnemonic',
      });
      setIsLoading(false);
      return;
    }

    const validate = await bip39.validateMnemonic(mnemonic);
    if (validate) {
      const seed = await bip39.mnemonicToSeed(mnemonic);
      const hdNode = hdkey.fromMasterSeed(seed);
      const node = hdNode.derivePath("m/44'/60'/0'/0/0");
      const wallet = new Wallet(
        node.getWallet().getPrivateKey().toString('hex'),
      );
      const privateKey = wallet._signingKey().privateKey;
      const publicKey = wallet.address;

      await SecureStore.setItemAsync(MNEMONIC_KEY, mnemonic);

      setIsLoading(false);
      navigation.navigate('Password', {privateKey, publicKey});
    } else {
      toast({
        type: 'error',
        text: 'Invalid Mnemonic',
      });
      setIsLoading(false);
    }
  }
  
  return (
    <BgView>
      <Spinner size='large' visible={isLoading} />
      
      <HeaderCustom variant='back' title='Mnemonic Code' />

      <ViewContainer style={styles.viewContainer} >
        <TextInputCustom
          multiline={true}
          value={mnemonic}
          label='BIP39 Mnemonic'
          onChangeText={setMnemonic}
          placeholder='Please enter BIP39 Mnemonic...'
          stylesCustom={{
            input: styles.input,
            wrapper: styles.wrapperInput
          }}
        />

        <View style={styles.wrapperButtons} >
          <Button
            text='paste'
            variant='grey'
            onPress={handlePaste}
            styleCustom={styles.button}
          />

          <View style={{ width: 15 }} />

          <Button
            text='Submit'
            variant='grey'
            onPress={() => {
              setIsLoading(true);
              setTimeout(checkMnemonic, 500);
            }}
            styleCustom={styles.button}
          />
        </View>
      </ViewContainer>
    </BgView>
  )
}

export default Recover;
