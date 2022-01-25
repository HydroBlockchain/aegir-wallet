import React, { useContext, useState } from "react";

import { ethers } from "ethers";
import bip39 from 'react-native-bip39';
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

		setSpinner(true);
		try {
			const mnemonicTMP = await bip39.generateMnemonic(128);
			const wallet = ethers.Wallet.fromMnemonic(mnemonicTMP);

			const publicKey = wallet.address;
			const privateKey = wallet.privateKey;

			await SecureStore.setItemAsync(MNEMONIC_KEY, mnemonicTMP);

			setKeys({ publicKey, privateKey });

			setMnemonic(mnemonicTMP);
		} catch (error: any) {
			console.log(error.message);
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
