import React, { useContext, useState } from "react";

import { Wallet, ethers } from "ethers";
import * as bip39 from 'bip39';
import * as bip39scure from '@scure/bip39';
// import bip39 from 'react-native-bip39';
import Button from "../../../components/Button";
import * as SecureStore from 'expo-secure-store';
import Paragraph from "../../../components/Paragraph";
import { ThemeContext } from "../../../hooks/useTheme";
import { View, Image, Dimensions } from "react-native";
import BgView from "../../../components/Layouts/BgView";
import Clipboard from "@react-native-clipboard/clipboard";
import { ScrollView } from "react-native-gesture-handler";
import { StackScreenProps } from '@react-navigation/stack';
import Spinner from 'react-native-loading-spinner-overlay';
import { RootStackParams } from "../../../interfaces/RootStackParams";
import ViewContainer from '../../../components/Layouts/ViewContainer';

import {wordlist as english} from '@scure/bip39/wordlists/english';
import {hdkey} from 'ethereumjs-wallet';

/* constants */
import { MNEMONIC_KEY } from '../../../../constants';

/* style */
import styles from "./styles";

const { height } = Dimensions.get('window');

interface Props extends StackScreenProps<RootStackParams, 'Mnemonic'> { };

const Mnemonic = ({ navigation }: Props) => {
	const { theme } = useContext(ThemeContext);
	const [ mnemonic, setMnemonic ]  = useState('');
	const [ spinner, setSpinner ]  = useState(false);
	const [ keys, setKeys ] = useState({
		publicKey: '',
		privateKey: '',
	})

	const onSubmit = async () => {
		if (!mnemonic) return;
		navigation.navigate("Password", keys);
	};

	const copyMnemonic = () => {
		if (!mnemonic) return;
		Clipboard.setString(mnemonic);
	}

	const createWallet = async () => {
    if (mnemonic) return;

    // const mnemonicTMP = await bip39.generateMnemonic(128);
    const mnemonicTMP = bip39scure.generateMnemonic(english);
    console.log('mnemonicTMP :>> ', mnemonicTMP);
    // const wallet = ethers.Wallet.fromMnemonic(mnemonicTMP);
    try {
      setSpinner(true);
      const seed = await bip39.mnemonicToSeed(mnemonicTMP);
      const hdNode = hdkey.fromMasterSeed(seed);
      const node = hdNode.derivePath("m/44'/60'/0'/0/0");
      const wallet = new Wallet(
        node.getWallet().getPrivateKey().toString('hex'),
      );

      const publicKey = wallet.address;
      const privateKey = wallet.privateKey;

      await SecureStore.setItemAsync(MNEMONIC_KEY, mnemonicTMP);

      setKeys({publicKey, privateKey});

      setMnemonic(mnemonicTMP);
    } catch (error: any) {
      console.log('Error in create wallet: ==>', error.message);
    }
    setSpinner(false);
  };

	return (
		<BgView>
			<Spinner visible={spinner} size={'large'} color={theme.colors.primary} />

			<ViewContainer style={[styles.ViewContainer]} >
				<View style={{ flex: 1 }} />

				<Image
					style={styles.logo}
					source={require("../../../assets/images/brand/logoFull.png")}
				/>

				<View style={{ flex: 1 }} />

				<Paragraph variant='body1' stylesCustom={styles.text} >
					Now we will generate 12 words for you, this is your mnemonic seed which can be used to restore your wallet. Make sure to backup your seed and keep it safe.
				</Paragraph>

				<Button
					variant='default'
					onPress={createWallet}
					text='Generate Mnemonic Seed'
				/>

				<View style={[
					styles.textAreaWords,
					{
						borderRadius: theme.roundness,
						backgroundColor: theme.colors.backgroundApp2,
					}
				]}>
					<Paragraph variant='subtitle1' >
						{mnemonic}
					</Paragraph>
				</View>

				<Button
					variant='default'
					text='Copy Mnemonic'
					onPress={copyMnemonic}
					styleCustom={styles.ctaCopy}
				/>

				<View style={{ flex: 1 }} />

				<View style={styles.wrapperButton}>
					<Button
						text='Next'
						variant='grey'
						onPress={onSubmit}
					/>
				</View>
			</ViewContainer>
		</BgView>
	);
};

export default Mnemonic;
