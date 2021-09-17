import React, { Fragment, useContext, useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  Dimensions,
} from "react-native";

import { ethers, } from 'ethers';
const { height } = Dimensions.get('window');
import Button from '../../components/Button';
import CryptoJS from "react-native-crypto-js";
import * as SecureStore from 'expo-secure-store';
import Paragraph from '../../components/Paragraph';
import HeaderCustom from '../../components/Header';
import { ThemeContext } from "../../hooks/useTheme";
import BgView from "../../components/Layouts/BgView";
import { StackScreenProps } from '@react-navigation/stack';
import Spinner from 'react-native-loading-spinner-overlay';
import ImageCard from '../../components/CoinCard/ImageCard';
import TextInputCustom from '../../components/TextInput/index';
import { RootStackParams } from '../../interfaces/RootStackParams';
import ViewContainer from '../../components/Layouts/ViewContainer';

/* style */
import styles from './styles';

/* utils */
import currencyConverter from '../../libs/currencyConverter';
import { HYDRO_ENCRYPTED_PRIVKEY } from '../../../constants';
import { AppStateManagerContext } from '../../context/AppStateManager/index';

interface PropsParams extends StackScreenProps<RootStackParams, 'Deposits'>{};

const Deposits = ({ route }: PropsParams) => {
  const [ fee, setFee ] = useState('');
	const { coin, network } = route.params;
  const { theme } = useContext(ThemeContext);
	const [ amount, setAmount ] = useState('');
	const [ balance, setBalance ] = useState(0);
	const [ password, setPassword ] = useState('');
	const [ receiver, setReceiver ] = useState('');
	const [ spinner, setSpinner ]  = useState(false);
	const [ amountInUSD, setAmountInUSD ] = useState('');
	const [ priceInUSD, setPriceInUSD ] = useState<null | number>(null);
  const { appState: { address }, web3Service, toast } = useContext(AppStateManagerContext);
	const [ errors, setErrors ] = useState({
		invalidAddress: false,
		insufficientFunds: false,
		incorrectPassword: false,
	});

	useEffect(() => {
		const getBalance = async () => {
			try {
				const balance = await web3Service.getTokenBalance({ address, coin, network })
				if(balance) {
					setBalance(balance);
					const balanceInUSD = await currencyConverter({ coin, network, balance });

					if(balanceInUSD) {
						setPriceInUSD(balanceInUSD / balance);
					}
				}
			} catch(error) {}
		}

		getBalance();
	}, [])

	useEffect(() => {
		calculateFee();
	}, [ amount, receiver ])

	useEffect(() => {
		validateFunds();
	}, [ fee, amount ]);

	const handleAmount = (value: string) => {
		setAmount(value);
		const amountFloat = parseFloat(value);
		if(amountFloat > 0) {
			if(priceInUSD) {
				setAmountInUSD(`${amountFloat * priceInUSD}`);
			}
		} else {
			setAmountInUSD('');
		}
	}

	const handleAmountInUSD = (value: string) => {
		setAmountInUSD(value);
		const amountInUSDFloat = parseFloat(value);
		if(amountInUSDFloat > 0) {
			if(priceInUSD) {
				setAmount(`${amountInUSDFloat / priceInUSD}`)
			}
		} else {
			setAmount('');
		}
	}

  const calculateFee = async () => {
		try {
			if(!amount || !receiver) return;

			const provider = getProvider();

			if(!provider) return;

			const tx = {
				to: receiver,
				value: ethers.utils.parseEther(amount)
			}

			const gasPriceBN = await provider.getGasPrice();
			const estimateGasBN = await provider.estimateGas(tx);

			setFee(ethers.utils.formatEther(gasPriceBN.mul(estimateGasBN)));
		} catch(error) {}
  }

	const getProvider = () => {
		try {
			const methodsProvider = {
				BSC: 'providerBSC',
				ETH: 'providerETH',
			};

			const methodProvider = methodsProvider[network];

			if(!methodProvider) {
				toast({
					type: 'warning',
					text: 'Currently not available sent them on this network',
				})
				return null;
			}

			const provider = web3Service[methodProvider];
			return provider;
		} catch(error) {
			return null;
		}
	}

	const deposit = async () => {
		try {
			for(let key in errors) {
				if(errors[key] || !ethers.utils.isAddress(receiver)) {
					validateAddress();
					toast({
						type: 'error',
						text: 'Correct any errors before continuing',
					})
					setSpinner(false);
					return;
				}
			}

			const encryptedPrivkey = await SecureStore.getItemAsync(HYDRO_ENCRYPTED_PRIVKEY);
			const privateKey = CryptoJS.AES.decrypt(
				encryptedPrivkey, password
			).toString(CryptoJS.enc.Utf8);

			if(!privateKey) {
				setErrors((prevState) => ({
					...prevState,
					incorrectPassword: true
				}));
				setSpinner(false);
				return;
			}

			const provider = getProvider();

			if(!provider) return null;

			const wallet = new ethers.Wallet(privateKey, provider);


			if(!wallet) {
				setSpinner(false);
				return;
			};

			if(['ETH', 'BNB'].includes(coin)) {
				const tx = {
					to: receiver,
					value: ethers.utils.parseEther(amount)
				}

				await wallet.sendTransaction(tx);

			} else {
				const methodsGetTokenAddress = {
					DAI_ETH: 'getDAIERC20Address',
					USDT_ETH: 'getUSDTERC20Address',
					HYDRO_ETH: 'getHydroTokenERC20Address',
					HYDRO_BSC: 'getHydroTokenBEP20Address',
				}
				const ABI = web3Service.hydroTokenABI;
				const method = methodsGetTokenAddress[`${coin}_${network}`];

				if(!method) {
					setSpinner(false);
					return;
				};

				const tokenAddress = web3Service[method]();

				if(!tokenAddress) {
					setSpinner(false);
					return;
				};

				const contract = new ethers.Contract(tokenAddress, ABI, wallet);
				const decimals = await contract.decimals();
				const tokensToSend = ethers.utils.parseUnits(amount, decimals);

				await contract.transfer(receiver, tokensToSend);
			}

			setFee('');
			setAmount('');
			setReceiver('');
			setPassword('');
			toast({
				type: 'success',
				text: 'Transaction sent!',
			});
		} catch(error) {
			console.log('error', error);
			toast({
				type: 'error',
				text: 'An unexpected error occurred',
			});
		}
		setSpinner(false);
	}

	const validateAddress = () => {
		setErrors((prevState) => ({
			...prevState,
			invalidAddress: !ethers.utils.isAddress(receiver)
		}))
	}

	const validateFunds = () => {
		if(amount && receiver) {
			const quantityFee = parseFloat(fee);
			const quantityToSend = parseFloat(amount);
			setErrors((prevState) => ({
				...prevState,
				insufficientFunds: (quantityToSend + quantityFee) > balance
			}))
		}
	}

	const handleHalf = () => {
		setAmount((balance / 2).toString());
		handleAmount((balance / 2).toString());
	}

	const handleAll = () => {
		setAmount(balance.toString());
		handleAmount(balance.toString());
	}

  return (
    <BgView>
      <HeaderCustom variant='back' title='Send transaction' />
			<Spinner visible={spinner} size={'large'} color={theme.colors.primary} />

      <ScrollView >
        <ViewContainer style={[
					styles.viewContainer,
					{ minHeight: height - theme.heightHeader }
				]} >
            <View style={styles.wrapperImageCard} >
              <ImageCard network={network} coin={coin} styleCustom={styles.imageCard} />
            </View>

						<TextInputCustom
							icon='qrcode'
							value={receiver}
							onBlur={validateAddress}
							onChangeText={setReceiver}
							label={`Send ${coin} (${network}) to`}
						/>

						{(errors.invalidAddress) && (
							<Paragraph variant='caption' stylesCustom={{ color: theme.colors.error }} >
								Invalid address.
							</Paragraph>
						)}

						<View style={styles.wrapperBtnContact} >
							<Button
								variant='grey'
								text='Contacts'
								onPress={() => {}}
								styleCustom={styles.btnContact}
							/>
						</View>

						<TextInputCustom
							label='Amount'
							value={amount}
							keyboardType='numeric'
							onBlur={validateFunds}
							onChangeText={handleAmount}
						/>

						{(errors.insufficientFunds) && (
							<Paragraph variant='caption' stylesCustom={{ color: theme.colors.error }} >
								Insufficient funds.
							</Paragraph>
						)}

						{(Boolean(priceInUSD)) && (
							<Fragment>
									<View style={[
									styles.wrapperValueInUSD,
									{
										borderRadius: theme.roundness,
										backgroundColor: theme.colors.backgroundApp2,
									}
								]} >
									<TextInputCustom
										value={amountInUSD}
										keyboardType='numeric'
										onChangeText={handleAmountInUSD}
										stylesCustom={{ wrapper: styles.inputValueInUSD }}
										/>

									<Paragraph
										variant='inputLabel1'
										stylesCustom={styles.labelUSD}
										>
										USD
									</Paragraph>
								</View>
							</Fragment>
						)}

						<View style={styles.wrapperButtonAmount} >
							<Button
								text='Half'
								variant='grey'
								onPress={handleHalf}
								styleCustom={styles.buttonAmount}
							/>

							<View style={{ width: 10 }} />

							<Button
								text='All'
								variant='grey'
								onPress={handleAll}
								styleCustom={styles.buttonAmount}
							/>
						</View>

						<TextInputCustom
							label='Fee'
							value={fee}
							editable={false}
						/>

						{/* <View style={styles.wrapperAdvanced} >
							<Button
								variant='grey'
								text='advance'
								styleCustom={{width: 'auto'}}
							/>
						</View> */}


						<TextInputCustom
							secureTextEntry
							label='Password'
							value={password}
							onChangeText={(pass) => {
								setPassword(pass);
								setErrors((prevState) => ({...prevState, incorrectPassword: false}))
							}}
							stylesCustom={{ wrapper: styles.password }}
						/>

						{(errors.incorrectPassword) && (
							<Paragraph variant='caption' stylesCustom={{ color: theme.colors.error }} >
								Incorrect Password.
							</Paragraph>
						)}

						<View style={{flex: 1}} />

						<Button
							text='Send'
							variant='grey'
							onPress={() => {
								setSpinner(true);
								setTimeout(deposit, 200);
							}}
						/>
        </ViewContainer>
      </ScrollView>
    </BgView>
  );
}

export default Deposits;