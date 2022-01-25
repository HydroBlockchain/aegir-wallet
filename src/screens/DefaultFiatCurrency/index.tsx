import React, { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';

import styles from './styles';
import Button from '../../components/Button';
import { IOption } from '../../interfaces/Iinput';
import HeaderCustom from '../../components/Header';
import BgView from '../../components/Layouts/BgView';
import { Tfiat } from '../../interfaces/currencyConverter';
import SelectInput from '../../components/SelectInput/index';
import ViewContainer from '../../components/Layouts/ViewContainer';
import { AppStateManagerContext } from '../../context/AppStateManager';

const DefaultFiatCurrency = () => {
  const { appState, setDefaultFiatCurrency, toast } = useContext(AppStateManagerContext)
  const [ defaultFiatCurrency, setFiatCurrency ] = useState<null | IOption>(null);
  const [ currentFiatCurrency, setCurrentCurrency ] = useState<null | IOption>(null);
  const currencyOptios = [
    {
      id: 'USD',
      title: '$ - US dollar',
    },
    {
      id: 'EUR',
      title: '€ - Euro',
    },
    {
      id: 'JPY',
      title: '¥ - Yen',
    },
    {
      id: 'GBP',
      title: '£ - Libra esterlina',
    },
    {
      id: 'CHF',
      title: 'Fr - Franco suizo',
    },
  ];

  useEffect(() => {
    const defaultFiatCurrency = currencyOptios.find(el => el.id === appState.defaultFiatCurrency);
    if(defaultFiatCurrency) {
      setFiatCurrency(defaultFiatCurrency);
    }
  }, [])

  const onChange = () => {
    toast({
      type: 'success',
      text: 'Success!',
    })
    if(currentFiatCurrency) {
      const newFiatCurrency = currentFiatCurrency.id as Tfiat;
      setDefaultFiatCurrency(newFiatCurrency);
    }
  }

  const onChangeDefaultFiatCurrency = (item: IOption) => {
    setCurrentCurrency(item);
  }

  return (
    <BgView>
      <HeaderCustom variant='back' title='Default fiat currency'/>
      <ViewContainer style={styles.viewContainer} >
        <SelectInput
          label='Choose currency'
          options={currencyOptios}
          onChange={onChangeDefaultFiatCurrency}
          selectedDefault={defaultFiatCurrency || null}
        />

        <View style={{ flex: 1 }} />

        <Button
          text='Change'
          variant='grey'
          onPress={onChange}
        />

      </ViewContainer>
    </BgView>
  )
}

export default DefaultFiatCurrency
