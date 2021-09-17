import React, { useRef, useState } from 'react';

import styles from './styles';
import Summary from './Summary';
import MoneyToSend from './MoneyToSend';
import { StepOptions } from './interfaces';
import { Dimensions, View } from 'react-native';
import { themeGlobal } from '../../../libs/Theme';
import Paragraph from '../../../components/Paragraph';
import HeaderCustom from '../../../components/Header';
import BgView from '../../../components/Layouts/BgView';
import { ScrollView } from 'react-native-gesture-handler';
import RecipientInformation from './RecipientInformation';
import { StackScreenProps } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ViewContainer from '../../../components/Layouts/ViewContainer';
import { RootStackParams } from '../../../interfaces/RootStackParams';

interface Props extends StackScreenProps<RootStackParams, 'SendMoney'>{};

const SendMoney = ({ route, navigation }: Props) => {
  const insets = useSafeAreaInsets();
  const scrollHorRef = useRef<any>(null);
  const { height } = Dimensions.get('window');
  const [ step, setStep ] = useState<StepOptions>('moneyToSend')
  
  return (
    <BgView>
      <HeaderCustom />

      <View style={[
        { height: height - themeGlobal.heightHeader - insets.top - insets.bottom }
      ]} >
        <ViewContainer style={styles.wrapperTabs} >
          <ScrollView
            horizontal
            ref={scrollHorRef}
            style={styles.scrollTabs}
            contentContainerStyle={styles.tabs}
            showsHorizontalScrollIndicator={false}
          >
            <Paragraph
              variant='body1'
              stylesCustom={[
                styles.tabItem,
                (step === 'moneyToSend') ? styles.tabItemActive : {}
              ]}
            >
              Money to send
            </Paragraph>

            <Paragraph
              variant='body1'
              stylesCustom={[
                styles.tabItem,
                (step === 'recipientInformation') ? styles.tabItemActive : {}
              ]}
            >
              Recipient information
            </Paragraph>

            <Paragraph
              variant='body1'
              stylesCustom={[
                styles.tabItem,
                (step === 'summary') ? styles.tabItemActive : {}
              ]}
            >
              Summary to the transfer
            </Paragraph>
          </ScrollView>
        </ViewContainer>

        {(step === 'moneyToSend') ? (
          <MoneyToSend
            next={() => setStep('recipientInformation')}
          />
        ) : (step === 'recipientInformation') ? (
          <RecipientInformation
            next={() => {
              setStep('summary');
              scrollHorRef?.current?.scrollToEnd();
            }}
          />
        ) : (
          <Summary
            next={() => navigation.navigate('StartRemittances')}
          />
        )}
      </View>
    </BgView>
  )
}

export default SendMoney;
