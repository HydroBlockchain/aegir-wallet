import React, { useCallback, useContext, useEffect, useState } from 'react';

import styles from './styles';
import { ethers } from 'ethers';
import { View } from 'react-native';
import { AddNFTParam } from './interfaces';
import Button from '../../components/Button';
import abiERC721 from '../../contracts/abiERC721';
import HeaderCustom from '../../components/Header';
import { ThemeContext } from '../../hooks/useTheme';
import { timeoutPromises } from '../../libs/general';
import BgView from '../../components/Layouts/BgView';
import TextInputCustom from '../../components/TextInput';
import Paragraph from '../../components/Paragraph/index';
import Spinner from 'react-native-loading-spinner-overlay';
import ViewContainer from '../../components/Layouts/ViewContainer';
import { AppStateManagerContext } from '../../context/AppStateManager';
import {
  validateOwnership,
  validateContractNFTAddress,
} from '../../libs/validators/validateContractNFT';
import SelectInput from '../../components/SelectInput';
import { IOption } from '../../interfaces/Iinput';

const defaultState = {
  id: '',
  address: '',
}

const networks = [
  { id: 'ETH', title: 'ETH' },
  { id: 'BSC', title: 'BSC' },
];

const AddNFT = ({ navigation }: AddNFTParam) => {
  const { theme } = useContext(ThemeContext);
  const [ spinner, setSpinner ]  = useState(false);
  const [ state, _setstate ] = useState(defaultState);
  const [ addressError, setAddressError ] = useState('');
  const [ successfull, setSuccessfull ] = useState(false);
  const [ ownershipError, setOwnershipError ] = useState('');
  const [ selectedNetwork, setSelectedNetwork ] = useState<IOption>(networks[0]);
  const {
    toast,
    appState,
    web3Service,
    updateCollectibles,
  } = useContext(AppStateManagerContext);

  useEffect(() => {
    successfull && navigation.goBack();
  }, [ successfull ])

  const setState = ( key: 'address' | 'id', value: string ) => {
    _setstate((prevState) => ({
      ...prevState,
      [key]: value
    }))
  }

  const validateCollectibleAddress = useCallback(async () => {
    let result = false;
    try {
      const { address } = state;

      const network = selectedNetwork.id as ('ETH' | 'BSC');

      if(network === 'BSC') {
        // TODO: Implement a validator for BSC in validateContractNFTAddress
        setAddressError('');
        return true;
      }

      const isValidContract = await validateContractNFTAddress({
        address,
        network,
      });

      if(!address) {
        setAddressError('Collectible address cannot be empty');
      } else if(!ethers.utils.isAddress(address)) {
        setAddressError('Invalid address');
      } else if(!isValidContract) {
        setAddressError('A personal address was detected. Enter the collectible\'s contract address');
      } else {
        result = true;
        setAddressError('');
      }
    } catch(error) {
      console.log('error in validateCollectibleAddress', error)
    }
    return result;
  } , [ state, selectedNetwork ]);

  const _validateOwnership = useCallback(async () => {
    let result = false;
    const msgError = 'Unable to verify that you are the owner of the token';

    try {
      const tokenId = state.id;
      const { address } = appState;
      const contractAddres = state.address;
      const network = selectedNetwork.id as ('ETH' | 'BSC');
      const isOwner = await validateOwnership({ address, contractAddres, tokenId, network });

      result = isOwner;
      setOwnershipError((isOwner) ? '' : msgError);
    } catch(error) {
      console.log('error in _validateOwnership', error)
      setOwnershipError(msgError);
    }
    return result;
  }, [ state, appState, selectedNetwork ]);

  const handleSave = useCallback(async () => {
    setSpinner(true);

    try {
      const isValidContract = await validateCollectibleAddress();

      if(!isValidContract) return setSpinner(false);

      const isOwner = await _validateOwnership();

      if(isOwner) {
        if(
          !web3Service.providerETH || !web3Service.providerBSC
        ) return setSpinner(false);

        const provider = selectedNetwork.id === 'ETH'
          ? web3Service.providerETH : web3Service.providerBSC;

        const contract = new ethers.Contract(state.address, abiERC721, provider);

        const promisesResolved = ['name', 'symbol', 'tokenURI'].map(async func => {
          try {
            let promises: any[];
            if(func === 'tokenURI') {
              promises = [contract?.[func](state.id)];
            } else {
              promises = [contract?.[func]()];
            }

            const result = await timeoutPromises({
              promises,
              timeout: 5000,
            });

            return result;
          } catch(e) {
            return null;
          }
        })

        const [ tokenName, tokenSymbol, tokenURI ] = await Promise.all(promisesResolved);

        const { message, status } = await updateCollectibles({
          address: appState.address,
          collectibles: [
            ...appState.collectibles,
            {
              tokenURI,
              tokenName,
              tokenSymbol,
              tokenID: state.id,
              contractAddress: state.address
            }
          ],
        });

        toast({
          text: message,
          type: status ? 'success' : 'error',
        });

        setSuccessfull(true);
      }
    } catch(error) {
      console.log('error in handleSave', error);
    }
    setSpinner(false);
  }, [
    state,
    selectedNetwork,
    _validateOwnership,
    validateCollectibleAddress
  ]);

  const handleSelectedNetwork = (item: IOption) => {
    setSelectedNetwork(item);
  }

  const TextError = ({ text }) => (
    <Paragraph variant='caption' stylesCustom={{ color: theme.colors.error }} >
      {text}
    </Paragraph>
  );

  return (
    <BgView>
      <HeaderCustom title='Add NFT' variant='back' />
      <Spinner visible={spinner} size={'large'} color={theme.colors.primary} />

      <ViewContainer style={styles.addDataContainer} >
        <TextInputCustom
          label='Address'
          value={state.address}
          onBlur={() => { validateCollectibleAddress() }}
          onChangeText={(value) => { setState('address', value) }}
        />

        {!!addressError && (
          <TextError text={addressError} />
        )}

        <View style={{height: 10}} />

        <TextInputCustom
          label='Id'
          value={state.id}
          onBlur={() => { _validateOwnership() }}
          onChangeText={(value) => { setState('id', value) }}
        />

        {!!ownershipError && (
          <TextError text={ownershipError} />
        )}

        <View style={{height: 10}} />

        <SelectInput
          label='Network'
          placeholder='ETH'
          options={networks}
          onChange={handleSelectedNetwork}
          selectedDefault={selectedNetwork}
        />

        <View style={{flex: 1}} />

        <Button
          text='Save'
          variant='grey'
          onPress={handleSave}
        />
      </ViewContainer>
    </BgView>
  )
}

export default AddNFT;
