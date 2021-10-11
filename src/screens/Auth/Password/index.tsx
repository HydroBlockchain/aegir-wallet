import React, { useContext } from "react";
import {
	View,
	Image,
	StyleSheet,
	Dimensions,
	ScrollView,
} from "react-native";
import CryptoJS from "react-native-crypto-js";
import Button from "../../../components/Button";
import * as SecureStore from 'expo-secure-store';
import Paragraph2 from "../../../components/Paragraph";
import { ThemeContext } from "../../../hooks/useTheme";
import BgView from "../../../components/Layouts/BgView";
import { StackScreenProps } from "@react-navigation/stack";
import TextInputCustom from "../../../components/TextInput";
import ViewContainer from '../../../components/Layouts/ViewContainer';
import { RootStackParams } from "../../../interfaces/RootStackParams";
import { AppStateManagerContext } from '../../../context/AppStateManager/index';

/* constants */
import {
  HYDRO_WALLET_ADDRESS,
  HYDRO_ENCRYPTED_PRIVKEY,
} from '../../../../constants';

const { height } = Dimensions.get('window');

interface PasswordParam extends StackScreenProps<RootStackParams, 'Password'>{};

const Password = ({ route, navigation }: PasswordParam) => {
	const { theme } = useContext(ThemeContext);
	const { publicKey, privateKey } = route.params;
	const [ password, setPassword ] = React.useState('');
	const [ repassword, setRepassword ] = React.useState('');
	const { setAddress, toast } = useContext(AppStateManagerContext);

	const onSubmit = async () => {
		if(!password) {
			toast({
				type: 'warning',
				text: 'Please input the password!',
			});
		} else if(!repassword) {
			toast({
				type: 'warning',
				text: 'Please confirm the password!',
			});
		} else if(password !== repassword) {
			toast({
				type: 'warning',
				text: 'Passwords do not match',
			});
		} else {
			const encryptKey = CryptoJS.AES.encrypt(privateKey, password).toString();
			await SecureStore.setItemAsync(HYDRO_WALLET_ADDRESS, publicKey);
			await SecureStore.setItemAsync(HYDRO_ENCRYPTED_PRIVKEY, encryptKey);

			setAddress(publicKey);

			navigation.navigate("PasswordSet");
		}
	};

	return(
		<BgView>
			<ScrollView>
				<ViewContainer style={styles.ViewContainer} >
					<Image
						style={styles.logo}
						source={require("../../../assets/images/brand/logoFull.png")}
					/>

					<View style={styles.wrapperKeys} >
						<Paragraph2 variant='inputLabel1' >
							Private key
						</Paragraph2>

						<Paragraph2 variant='inputLabel1' stylesCustom={[
							styles.valueKey,
							{
								borderRadius: theme.roundness,
								backgroundColor: theme.colors.backgroundApp2
							}
						]} >
							{privateKey}
						</Paragraph2>

						<Paragraph2 variant='inputLabel1' >
							Public key
						</Paragraph2>

						<Paragraph2 variant='inputLabel1' stylesCustom={[
							styles.valueKey,
							{
								borderRadius: theme.roundness,
								backgroundColor: theme.colors.backgroundApp2
							}
						]} >
							{publicKey}
						</Paragraph2>
					</View>

					<View style={[styles.wrapperInput, {marginBottom: 10}]}>
						<TextInputCustom
							value={password}
							label='Password'
							secureTextEntry={true}
							onChangeText={setPassword}
						/>
					</View>

					<View style={styles.wrapperInput}>
						<TextInputCustom
							value={repassword}
							secureTextEntry={true}
							label='Confirm password'
							onChangeText={setRepassword}
						/>
					</View>

					<View style={{ flex: 1, padding: 10 }} />

					<Button
						variant='grey'
						text='Set password'
						onPress={onSubmit}
					/>
				</ViewContainer>
			</ScrollView>
		</BgView>
	);
};

const styles = StyleSheet.create({
	ViewContainer: {
	  paddingTop: '20%',
	  minHeight: height,
	  alignItems: 'center',
	},
	logo: {
	  resizeMode: "contain",
	},
	wrapperInput: {
		width: '100%'
	},
	wrapperKeys: {
		width: '100%',
		marginTop: 30,
	},
	valueKey: {
		padding: 18,
		marginTop: 10,
		marginBottom: 20
	}
})

export default Password;
