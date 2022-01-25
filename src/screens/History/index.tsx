import React, {useEffect, useState, useContext} from 'react';

import {ethers} from 'ethers';
import Button from '../../components/Button';
import * as SecureStore from 'expo-secure-store';
import CoinCard from '../../components/CoinCard';
import Paragraph from '../../components/Paragraph';
import HeaderCustom from '../../components/Header';
import BgView from '../../components/Layouts/BgView';
import Clipboard from '@react-native-clipboard/clipboard';
import {ScrollView} from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';
import {Dimensions, TouchableOpacity, View} from 'react-native';
import ViewContainer from '../../components/Layouts/ViewContainer';

/* utils */
import {HistoryParam} from './interfaces';
import {HistoryData} from '../../interfaces/Web3ServiceInterface';

/* contex */
import {ThemeContext} from '../../hooks/useTheme';

/* style */
import styles from './styles';

/* constants */
import {TUSC_WALLET_ADDRESS} from '../../../constants';
import {AppStateManagerContext} from '../../context/AppStateManager';

const History = ({navigation, route}: HistoryParam) => {
  const { theme } = useContext(ThemeContext);
  const { height } = Dimensions.get('window');
  const [ balance, setBalance ] = useState(0);
  const [ scanURI, setScanURI ] = useState('');
  const [ spinner, setSpinner ] = useState(true);
  const { coin, network, customToken } = route.params;
  const [ addressTUSC, setAddressTUSC ] = useState('');
  const [ history, setHistory ] = useState<HistoryData>([]);
  const {
    web3Service,
    appState: {address},
    toast,
  } = useContext(AppStateManagerContext);

  useEffect(() => {
    getBalance();
  }, []);

  const getBalance = async () => {
    try {
      if(['ETH', 'BSC'].includes(network)) {
        if(address) {
          setAddressTUSC(address);
          let history: HistoryData = [];
          let balance: number | null = null;

          if(network === 'BSC') {
            setScanURI(
              `https://${!web3Service.isMainnet ? 'testnet.' : ''}bscscan.com/address/${address}`
            );
          }

          if(network === 'ETH') {
            setScanURI(
              `https://${!web3Service.isMainnet ? 'ropsten.' : ''}etherscan.io/address/${address}`
            );
          }

          if(coin === 'BNB' && !customToken) {
            let data = await Promise.all([
              web3Service.getBNBHistory(address),
              web3Service.getBNBBalanceOf(address),
            ]);

            if(data) [ history, balance ] = data;

          } else if(coin === 'ETH' && !customToken) {
            let data = await Promise.all([
              web3Service.getEtherBalanceOf(address),
              web3Service.getEthereumHistory({ address }),
            ]);

            if(data) [ balance, history ] = data;

          } else {
            let symbol = coin;
            if(customToken) {
              symbol = (network === 'BSC') ? 'BNB' : 'ETH';
            }

            try {
              const data = await Promise.all([
                web3Service.getTokenBalance({ address, coin: symbol, network, customToken }),
                web3Service[
                  network === 'BSC' ? 'getBSCTokenHistory' : 'getEthereumTokenHistory'
                ]({ address, token: symbol, customToken }),
              ]);

              if(data) [ balance, history ] = data;

            } catch(error) {
              console.log(`error in history - token => ${symbol}`, error);
            }
          }

          if(balance) setBalance(balance);
          if(history) setHistory(history);
        }
      } else if(coin === 'TUSC') {
        SecureStore.getItemAsync(TUSC_WALLET_ADDRESS).then(data => {
          setAddressTUSC(data || '');
        });
      }
    } catch (error) {
      console.log('error in history screen', error);
      navigation.goBack();
    }

    setSpinner(false);
  };

  const handleBrowser = () => {
    if(!scanURI) return;
    navigation.navigate('Browser', { uri: scanURI })
  }

  const copyAddress = (address: string) => {
    Clipboard.setString(address);
    toast({
      type: 'success',
      text: 'Copied address!',
    });
  };

  return (
    <BgView>
      <Spinner visible={spinner} size={'large'} color={theme.colors.primary} />

      <HeaderCustom variant="back" title="History" />

      <ViewContainer
        style={[styles.viewContainer, {height: height - theme.heightHeader}]}>
        <CoinCard
          coin={coin}
          showAddress
          balance={balance}
          network={network}
          address={addressTUSC}
          customToken={customToken}
        />

        <View style={styles.historyWrapper}>
          <View
            style={{
              flex: 1,
              borderRadius: theme.roundness,
              overflow: 'hidden',
            }}>
            <ScrollView>
              {history.map((tx, index) => {
                const {to, amount, from, operation} = tx;

                return (
                  <View
                    key={index}
                    style={[
                      styles.historyData,
                      {
                        borderRadius: theme.roundness,
                        backgroundColor: theme.colors.backgroundApp2,
                      },
                    ]}>
                    <TouchableOpacity
                      onPress={() => {
                        copyAddress(operation === 'RECEIVED' ? from : to);
                      }}>
                      <View style={styles.operationContent}>
                        <Paragraph
                          variant="body2"
                          stylesCustom={{
                            color:
                              operation === 'RECEIVED'
                                ? theme.colors.success
                                : theme.colors.error,
                          }}>
                          {operation}
                        </Paragraph>
                      </View>

                      <View style={styles.operationInfoContent}>
                        <View style={[styles.operationInfoRow]}>
                          <Paragraph variant="body2">Amount:</Paragraph>

                          <Paragraph variant="body2">{amount}</Paragraph>
                        </View>

                        {operation !== 'SENT' && (
                          <View style={[styles.operationInfoRow]}>
                            <View style={styles.toLabel}>
                              <Paragraph variant="body2">From:</Paragraph>
                            </View>

                            <View style={styles.addressContent}>
                              <Paragraph
                                variant="caption"
                                numberOfLines={1}
                                adjustsFontSizeToFit={true}>
                                {from}
                              </Paragraph>
                            </View>
                          </View>
                        )}

                        {operation !== 'RECEIVED' && (
                          <View style={[styles.operationInfoRow]}>
                            <View style={styles.toLabel}>
                              <Paragraph variant="body2">To:</Paragraph>
                            </View>

                            <View style={styles.addressContent}>
                              <Paragraph
                                variant="caption"
                                numberOfLines={1}
                                adjustsFontSizeToFit={true}>
                                {to}
                              </Paragraph>
                            </View>
                          </View>
                        )}
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </ScrollView>
          </View>

          <View style={{height: 15}} />

          <Button
            variant="grey"
            onPress={handleBrowser}
            text="Open in blockexplorer"

          />
        </View>
      </ViewContainer>
    </BgView>
  );
};

export default History;
