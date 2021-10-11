import { validate } from 'bitcoin-address-validation';
import React, { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Button from '../../components/Button';
import HeaderCustom from '../../components/Header';
import BgView from '../../components/Layouts/BgView';
import ViewContainer from '../../components/Layouts/ViewContainer';
import QrScanner from '../../components/QrScanner';
import TextInputCustom from '../../components/TextInput';
import { AppStateManagerContext } from '../../context/AppStateManager';
import { ThemeContext } from '../../hooks/useTheme';
import { IContactData } from '../../interfaces/IContacts';
import { pickAddressFromQr } from '../../libs/pickAddressFromQr';
import { validateQrAddress } from '../../libs/validators';
import styles from './styles';


const defaultState = {
  name: '',
  note: '',
  address: '',
};

const AddContact = ({ navigation }) => {
  const {theme} = useContext(ThemeContext);
  const [spinner, setSpinner] = useState(false);
  const [ successful, setSuccessful ] = useState(false);
  const [state, _setstate] = useState<IContactData>(defaultState);
  const {toast, appState, updateContacts} = useContext(AppStateManagerContext);
  const [ isOpenQrScanner, setIsOpenQrScanner ] = useState<'open' | 'close'>('close');

  useEffect(() => {
    successful && navigation.goBack();
  }, [ successful ])

  const setState = ( key: 'address' | 'name' | 'note', value: string, ) => {
    _setstate(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleSave = async () => {
    setSpinner(true);
    let successfulValidation = true;

    if (!validateQrAddress(state.address)) {
      if (!validate(state.address)) {
        toast({
          type: 'error',
          text: 'Invalid address',
        });
        successfulValidation = false;
      }
    } else if (!state.name) {
      toast({
        type: 'error',
        text: 'The name is required',
      });
      successfulValidation = false;
    }

    if (successfulValidation) {
      const { message, status } = await updateContacts({
        address: appState.address,
        contactBook: [ ...appState.contacts, state ],
      });

      setSuccessful(true);

      toast({
        text: message,
        type: status ? 'success' : 'error',
      });
    }

    setSpinner(false);
  };

  return (
    <BgView>
      <HeaderCustom title="Add new contact" variant="back" />
      <Spinner visible={spinner} size={'large'} color={theme.colors.primary} />

      <ViewContainer style={styles.addContactContainer}>
        <QrScanner
          isShow={Boolean(isOpenQrScanner === 'open')}
          onSuccess={value => {
            setState('address', pickAddressFromQr(value));
          }}
          onClose={() => setIsOpenQrScanner('close')}
        />

        <TextInputCustom
          label="Name"
          value={state.name}
          onChangeText={value => {
            setState('name', value);
          }}
        />

        <View style={{height: 10}} />

        <TextInputCustom
          icon="qrcode"
          value={state.address}
          label="Wallet address"
          errorMsg={
            state?.address
              ? validateQrAddress(state?.address)
                ? ''
                : 'Invalid Address'
              : ''
          }
          onChangeText={value => {
            setState('address', value);
          }}
          onIconClick={() => {
            setIsOpenQrScanner('open');
          }}
        />

        <View style={{height: 10}} />

        <TextInputCustom
          label="Note"
          value={state.note}
          onChangeText={value => {
            setState('note', value);
          }}
        />

        <View style={{flex: 1}} />

        <Button text="Save" variant="grey" onPress={handleSave} />
      </ViewContainer>
    </BgView>
  );
};

export default AddContact;
