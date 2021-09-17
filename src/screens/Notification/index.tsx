import React, { useContext } from 'react';

import styles from './styles';
import Button from '../../components/Button';
import { ScrollView, View } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import Paragraph from '../../components/Paragraph';
import HeaderCustom from '../../components/Header';
import BgView from '../../components/Layouts/BgView';
import NotificationCard from '../../components/NotificationCard';
import ViewContainer from '../../components/Layouts/ViewContainer';

/* utils */
import { AppStateManagerContext } from '../../context/AppStateManager/index';
import { LAST_BLOCK_NUMBER_BSC, LAST_BLOCK_NUMBER_ETHEREUM } from '../../../constants';
import { BlockNumberBSC, BlockNumberEthereum } from '../../interfaces/AppStateManagerInterfaces';

const Notification = () => {
  const {
    resetNotifications,
    setAllBlockNumbersBSC,
    setAllBlockNumbersEthereum,
    appState: { notifications },
  } = useContext(AppStateManagerContext);

  const handleClear = async () => {
    if(notifications.length) {
      const storeBlockNumberBSC = await SecureStore.getItemAsync(LAST_BLOCK_NUMBER_BSC);
      const storeBlockNumberEthereum = await SecureStore.getItemAsync(LAST_BLOCK_NUMBER_ETHEREUM);
      const lastBlockNumberEthereum: BlockNumberEthereum | null = JSON.parse(
        storeBlockNumberEthereum || 'null'
      );
      const lastBlockNumberBSC: BlockNumberBSC | null = JSON.parse(
        storeBlockNumberBSC || 'null'
      );

      if(lastBlockNumberEthereum) {
        notifications.forEach((el) => {
          const currentBlockNumber = parseFloat(`${el.blockNumber}`);
          if(el.network === 'ETH' && lastBlockNumberEthereum[el.coin] <= currentBlockNumber) {
            lastBlockNumberEthereum[el.coin] = currentBlockNumber + 1;
          }
        })

        await SecureStore.setItemAsync(
          LAST_BLOCK_NUMBER_ETHEREUM, JSON.stringify(lastBlockNumberEthereum)
        );
      }

      if(lastBlockNumberBSC) {
        notifications.forEach((el) => {
          const currentBlockNumber = parseFloat(`${el.blockNumber}`);
          if(el.network === 'BSC' && lastBlockNumberBSC[el.coin] <= currentBlockNumber) {
            lastBlockNumberBSC[el.coin] = currentBlockNumber + 1;
          }
        })

        await SecureStore.setItemAsync(
          LAST_BLOCK_NUMBER_BSC, JSON.stringify(lastBlockNumberBSC)
        );
      }
      resetNotifications();
      lastBlockNumberBSC && setAllBlockNumbersBSC(lastBlockNumberBSC);
      lastBlockNumberEthereum && setAllBlockNumbersEthereum(lastBlockNumberEthereum);
    }
  }

  return (
    <BgView>
      <HeaderCustom variant='back' title='Notifications' />

      <ViewContainer style={styles.viewContainer} >
        <View style={styles.notificationsContent} >
          {(notifications.length) ? (
            <ScrollView>
              {notifications.map((item, key) => {
                return(
                  <View style={styles.wrapperNotification} key={key} >
                    <NotificationCard {...item} />
                  </View>
                );
              })}
            </ScrollView>
          ) : (
            <Paragraph stylesCustom={styles.noNotifications} variant='subtitle1' >
              You have no notifications!
            </Paragraph>
          )}
        </View>

        <Button
          text='Clear'
          variant='grey'
          onPress={handleClear}
        />
      </ViewContainer>
    </BgView>
  )
}

export default Notification
