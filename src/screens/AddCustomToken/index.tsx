import React, { useContext, useEffect, useState } from 'react'

import styles from './styles';
import { ethers } from 'ethers';
import { View } from 'react-native';
import Button from '../../components/Button';
import { IaddCustomToken } from './interfaces';
import abiERC20 from '../../contracts/abiERC20';
import HeaderCustom from '../../components/Header';
import { ThemeContext } from '../../hooks/useTheme';
import BgView from '../../components/Layouts/BgView';
import SelectInput from '../../components/SelectInput';
import TextInputCustom from '../../components/TextInput';
import { Network } from '../../interfaces/CoinInterfaces';
import Spinner from 'react-native-loading-spinner-overlay';
import ViewContainer from '../../components/Layouts/ViewContainer';
import { AppStateManagerContext } from '../../context/AppStateManager';
import { validateAddress, validateContractAddress } from '../../libs/validators';
import { IOption } from '../../interfaces/Iinput';

const AddCustomToken = ({ navigation }: IaddCustomToken) => {
  const networks = [
    { id: 'ETH', title: 'ETH' },
    { id: 'BSC', title: 'BSC' },
  ];

  const {theme} = useContext(ThemeContext);
  const [ spinner, setSpinner ] = useState(false);
  const [ contractAddress, setContractAddress ] = useState('');
  const [ disableTokenData, setDisableTokenData ] = useState(true);
  const [ selectedNetwork, setSelectedNetwork ] = useState<IOption>(networks[0]);
  const [ activateValidation, setActivateValidation ] = useState(false);
  const [ contractAddressError, setContractAddressError ] = useState('');
  const [ dataToken, setDataToken ] = useState({ symbol: '', decimals: '' })
  const { web3Service, appState, updateCustomTokens, toast } = useContext(AppStateManagerContext);

  useEffect(() => {
    if(activateValidation) {
      validateContractERC20()
      .then((result) => {
        result && searchTokenData(contractAddress);
      })
    }
  }, [ contractAddress, selectedNetwork, activateValidation ])


  const handleSave = () => {
    setSpinner(true);
    if(!contractAddress || !dataToken.decimals || !dataToken.symbol) {
      setSpinner(false);
      return false;
    }
    validateContractERC20()
    .then(async (result) => {
      const network = selectedNetwork.id as Network;
      
      const customTokens = [
        ...appState.customTokens,
        {
          network,
          symbol: dataToken.symbol,
          address: contractAddress,
          decimals: dataToken.decimals,
        }
      ];

      toast({
        type: 'success',
        text: 'Success!',
      });
      
      updateCustomTokens(customTokens);
      navigation.replace('Home');
    })
    .catch(error => {
      setSpinner(false);
    })
  }
  
  const handleChangeDataToken = ( key: 'symbol' | 'decilmals', value: string ) => {
    setDataToken(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  const searchTokenData = async (address: string) => {
    try {
      let symbol = null;
      let decimals = null;

      if(selectedNetwork.id === 'ETH') {
        if(!web3Service.defaultProviderETH) {
          setDisableTokenData(false);
          return;
        }

        const provider = web3Service.defaultProviderETH;
        const ERC20 = new ethers.Contract(contractAddress, abiERC20, provider);
        symbol = await ERC20.symbol();
        decimals = await ERC20.decimals();
      }

      if(selectedNetwork.id === 'BSC') {
        if(!web3Service.providerBSC) {
          setDisableTokenData(false);
          return;
        }

        const provider = web3Service.providerBSC;
        const ERC20 = new ethers.Contract(contractAddress, abiERC20, provider);
        symbol = await ERC20.symbol();
        decimals = await ERC20.decimals();
      }

      if(!symbol || !decimals) {
        setDisableTokenData(false);
        return;
      }

      setDataToken((prevState) => {
        const newDataToken = { ...prevState };
        if(symbol) { newDataToken.symbol = symbol }
        if(decimals) { newDataToken.decimals = `${decimals}` }
        return newDataToken;
      });

    } catch(error) {
      setDisableTokenData(false);
      console.log('error in searchTokenData:', error);
    }
  }

  const validateContractERC20 = async () => {
    try {
      if(validateAddress(contractAddress)) {
        const network = `${selectedNetwork.id}`;
        const isValidContract = await validateContractAddress({
          network,
          address: contractAddress,
        });
        
        if(isValidContract) {
          setContractAddressError('');
          return true;
        }
        
        setContractAddressError(
          'A personal address was detected. ' +
          'Enter the contract address of the token.'
        );
        return false;
      }
      
      setContractAddressError('Invalid address');
      return false;
    } catch(error) {
      console.log('error un validateContractERC20: ', error);
      return false;
    }
  }

  const handleSelectedNetwork = (item: IOption) => {
    setSelectedNetwork(item);
  }

  return (
    <BgView>
      <HeaderCustom variant='back' title='Add custom token'/>
      <Spinner visible={spinner} size={'large'} color={theme.colors.primary} />

      <ViewContainer style={styles.viewContainer} >
        <TextInputCustom
          placeholder='0x...'
          label="Token Contract"
          value={contractAddress}
          errorMsg={contractAddressError}
          onChangeText={(value) => {
            setContractAddress(value);
            setActivateValidation(true);
          }}
        />

        <View style={{height: 10}} />

        <SelectInput
          label='Network'
          placeholder='ETH'
          options={networks}
          onChange={handleSelectedNetwork}
          selectedDefault={selectedNetwork}
        />

        <View style={{height: 10}} />

        <TextInputCustom
          label="Symbol"
          placeholder='HYDRO'
          value={dataToken.symbol}
          editable={!disableTokenData}
          onChangeText={(value) => { handleChangeDataToken('symbol', value) }}
        />

        <View style={{height: 10}} />

        <TextInputCustom
          label="Decimal"
          placeholder='18'
          value={dataToken.decimals}
          editable={!disableTokenData}
          onChangeText={(value) => { handleChangeDataToken('decilmals', value) }}
        />

        <View style={{height: 10}} />

        <View style={{ flex: 1 }}/>

        <Button text="Add" variant="grey" onPress={handleSave} />
      </ViewContainer>
    </BgView>
  )
}

export default AddCustomToken;