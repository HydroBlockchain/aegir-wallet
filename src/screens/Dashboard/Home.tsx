import React, { useContext, useEffect, useState, useRef } from "react";

import {
  View,
  AppState,
  ScrollView,
  StyleSheet,
  BackHandler,
  RefreshControl,
  Dimensions,
} from "react-native";

import Header from "../../components/Header";
import CoinCard from "../../components/CoinCard";

import * as SecureStore from 'expo-secure-store';
import Web3Service from '../../libs/Web3Service';
import Paragraph from "../../components/Paragraph";
import { ThemeContext } from "../../hooks/useTheme";
import BgView from "../../components/Layouts/BgView";
import Spinner from 'react-native-loading-spinner-overlay';
import { StackScreenProps } from "@react-navigation/stack";
import ViewContainer from "../../components/Layouts/ViewContainer";

/* interfaces/utils */
import { TUSC_WALLET_NAME } from '../../../constants'
import currencyConverter from "../../libs/currencyConverter";
import { RootStackParams } from "../../interfaces/RootStackParams";
import { AppStateManagerContext } from '../../context/AppStateManager/index';
import { CurrentStateApp, IcustomToken } from '../../interfaces/AppStateManagerInterfaces';
import { CoinData, CoinType, Network } from '../../interfaces/CoinInterfaces';

interface PropsParams extends StackScreenProps<RootStackParams, 'Home'>{};

const balancesDefault = {
  'ETH_ETH': 0,
  'DAI_ETH': 0,
  'BNB_BSC': 0,
  // 'BTC_BTC': 0,
  'USDT_ETH': 0,
  'HYDRO_BSC': 0,
  'HYDRO_ETH': 0,
  'TUSC_TUSC': 0,
};

const Home = ({ navigation }: PropsParams) => {
  const { theme } = useContext(ThemeContext);
  const [ spinner, setSpinner ]  = useState(true);
  const [ totalBalances, setTotalBalances ] = useState(0);
  const [ tuscWalletName, setTuscWalletName ] = useState('');
  const [ balances, setBalances ] = useState(balancesDefault);
  const [ widthCraouselItem, setWidthCraouselItem ] = useState(0);
  const [ balanceInUSD, setBalanceInUSD ] = useState(balancesDefault);
  const { appState, web3Service, toast } = useContext(AppStateManagerContext);
  const [
    currentStateApp, setCurrentStateApp
  ] = useState<CurrentStateApp>(AppState.currentState);
  const [ gettingBalance, _setGettingBalance ] = useState(false);
  const gettingBalanceRef = useRef(gettingBalance);

  const setGettingBalance = (status: boolean) => {
    gettingBalanceRef.current = status;
    _setGettingBalance(status);
  }

  /* Custom Token's */
  const { customTokens } = appState;
  const [ customTokensBalance, setCustomTokensBalance ] = useState({});

  const cards: CoinData[] = [
    { coin: 'HYDRO', network: 'BSC' },
    { coin: 'HYDRO', network: 'ETH' },
    { coin: 'BNB', network: 'BSC' },
    { coin: 'ETH', network: 'ETH' },
    { coin: 'TUSC', network: 'TUSC' },
    // { coin: 'BTC', network: 'BTC' },
    { coin: 'USDT', network: 'ETH' },
    { coin: 'DAI', network: 'ETH' },
  ];

  useEffect(() => {
    handleGetAllBalances();
    getBalanceCustomTokens();

    const BackHandlerEvent = BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    const AppStateEvent = AppState.addEventListener('change', handleAppstateChange);
    return () => {
      AppStateEvent.remove();
      BackHandlerEvent.remove();
    };
  }, []);

  useEffect(() => {
    getBalanceInUSD();
  }, [ balances ])

  useEffect(() => {
    if(!gettingBalanceRef.current && currentStateApp !== 'background') {
      handleGetAllBalances();
      getBalanceCustomTokens();
    }
  }, [ appState.notifications.length, currentStateApp ])

  useEffect(() => {
    let totalBalances = 0
    for(let coin in balanceInUSD) {
      totalBalances += balanceInUSD[coin];
    }

    setTotalBalances(totalBalances);
  }, [ balanceInUSD ])

  const handleAppstateChange = (state: CurrentStateApp) => {
    setCurrentStateApp(state);
  }

  const getBalanceInUSD = async () => {
    const balancePromises: Promise<any>[] = [];

    for(let key in balances) {
      const data = key.split('_');
      const coin = data[0] as CoinType;
      const network: any = data[1] as Network;

      balancePromises.push(
        new Promise(async (resolve) => {
          const value = await currencyConverter({
            coin, network, balance: balances[key]
          })

          resolve({ key, value });
        })
      );
    }

    Promise.all(balancePromises).then((values) => {
      const balanceInUSD = { ...balancesDefault };

      values.forEach((el) => {
        balanceInUSD[el.key] = parseFloat(parseFloat(el.value).toFixed(2));
      });

      setBalanceInUSD(balanceInUSD);
    })
  }

  function handleBackButtonClick() {
    if (navigation.isFocused()) {
      BackHandler.exitApp();
      return true;
    } else {
      return false;
    }

  }

  const handleGetAllBalances = async () => {
    setGettingBalance(true);
    const hydroAddress = appState.address;
    const tuscWalletName = await SecureStore.getItemAsync(TUSC_WALLET_NAME);

    if(hydroAddress && web3Service) {
      Promise.all([
        new Promise((resolve) => {
          web3Service.getTokenBalance({ address: hydroAddress, coin: 'BNB', network: 'BSC'})
          .then((balance) => {
            resolve([ 'BNB_BSC', balance ])
          })
          .catch((error) => {
            resolve([ 'BNB_BSC', 0 ]);
          })
        }),
        new Promise((resolve) => {
          web3Service.getTokenBalance({ address: hydroAddress, coin: 'ETH', network: 'ETH'})
          .then((balance) => {
            resolve([ 'ETH_ETH', balance ])
          })
          .catch((error) => {
            resolve([ 'ETH_ETH', 0 ]);
          })
        }),
        new Promise((resolve) => {
          web3Service.getTokenBalance({ address: hydroAddress, coin: 'DAI', network: 'ETH'})
          .then((balance) => {
            resolve([ 'DAI_ETH', balance ])
          })
          .catch((error) => {
            resolve([ 'DAI_ETH', 0 ]);
          })
        }),
        new Promise((resolve) => {
          web3Service.getTokenBalance({ address: hydroAddress, coin: 'USDT', network: 'ETH'})
          .then((balance) => {
            resolve([ 'USDT_ETH', balance ])
          })
          .catch((error) => {
            resolve([ 'USDT_ETH', 0 ]);
          })
        }),
        new Promise((resolve) => {
          web3Service.getTokenBalance({ address: hydroAddress, coin: 'HYDRO', network: 'BSC'})
          .then((balance) => {
            resolve([ 'HYDRO_BSC', balance ])
          })
          .catch((error) => {
            resolve([ 'HYDRO_BSC', 0 ]);
          })
        }),
        new Promise((resolve) => {
          web3Service.getTokenBalance({ address: hydroAddress, coin: 'HYDRO', network: 'ETH'})
          .then((balance) => {
            resolve([ 'HYDRO_ETH', balance ])
          })
          .catch((error) => {
            resolve([ 'HYDRO_ETH', 0 ]);
          })
        }),
        new Promise((resolve) => {
          if(tuscWalletName) {
            Web3Service.getTUSCTokenBalanceOf(tuscWalletName).then((balance) => {
              resolve([ 'TUSC_TUSC', balance ])
            })
          } else {
            resolve([ 'TUSC_TUSC', 0 ])
          }
        }),
       ]).then((values: any) => {
        const balances = values.reduce((acc: object, current: string[], index: number) => {
          const [ key, balance ] = current;
          const value = parseFloat(balance);

          if(isNaN(value) || !value) return acc;

          return {
            ...acc,
            [`${key}`]: value
          }
        }, {});

        setSpinner(false);
        setGettingBalance(false);
        setTuscWalletName(tuscWalletName || '');
        setBalances((prevState) => ({ ...prevState, ...balances }));
      }).catch((error) => {
        setSpinner(false);
        setGettingBalance(false);
        toast({
          type: 'error',
          text: 'An unexpected error occurred'
        })
      })
    }
  }

  const getBalanceCustomTokens = async () => {
    const customTokensPromises = customTokens.map(async (el) => {
      const { address } = appState;
      const coin = (el.network === 'BSC') ? 'BNB' : 'ETH';
      const balance = await web3Service.getTokenBalance({
        coin,
        address,
        customToken: el,
        network: el.network,
      });

      return {
        tokenData: el,
        balance: Boolean(balance) ? balance : 0,
      }
    });

    Promise.all(customTokensPromises)
    .then(result => {
      const balances = {};
      result.forEach(el => {
        balances[el.tokenData.address] = el.balance ?? 0;
      })
      setCustomTokensBalance(balances);
    })
    .catch(error => {})
  }

  const handleReceive = (params: CoinData) => {
    // navigation.navigate("transfertusc");
    navigation.navigate("Receive", params);
  }

  const handleDeposit = (params: CoinData) => {
    if(params.coin === 'TUSC') return;
    navigation.navigate("Deposits", params);
  }

  const handleHistory = (params: CoinData) => {
    if(params.coin === 'TUSC') return;
    navigation.navigate('History', params);
  }

  return(
    <BgView>
      <Spinner visible={spinner} size={'large'} color={theme.colors.primary} />

      <Header />

      <ViewContainer style={styles.viewContainer} >
        <View style={[
          styles.wrapperCards,
          { borderRadius: theme.roundness }
        ]} >
          <ScrollView refreshControl={
            <RefreshControl refreshing={false} onRefresh={() => {
              handleGetAllBalances();
              getBalanceCustomTokens();
            }}/>
          }>
              {cards.map((data, key) => {
                const { coin, network } = data;
                let createAccount: any = undefined;

                if(coin === 'TUSC' && !tuscWalletName) {
                  createAccount = () => {
                    navigation.navigate('AddAccountTusc');
                  }
                }

                return(
                  <CoinCard
                    key={key}
                    coin={coin}
                    network={network}
                    createAccount={createAccount}
                    receive={() => handleReceive(data)}
                    history={() => handleHistory(data)}
                    deposit={() => handleDeposit(data)}
                    styleCustom={{ card: styles.card }}
                    balance={balances[`${coin}_${network}`]}
                    balanceInUSD={balanceInUSD[`${coin}_${network}`]}
                  />
                );
              })}

              {customTokens.map((item, key) => {
                const { network } = item;
                const balance = customTokensBalance?.[item.address] ?? 0;
                const coin: CoinType = (network === 'BSC') ? 'BNB' : 'ETH';

                const data = { coin, network, customToken: item }

                return(
                  <CoinCard
                    key={key}
                    coin={coin}
                    balance={balance}
                    network={network}
                    customToken={item}
                    history={() => handleHistory(data)}
                    deposit={() => handleDeposit(data)}
                    receive={() => handleReceive(data)}
                    styleCustom={{ card: styles.card }}
                  />
                );
              })}
          </ScrollView>
        </View>

        <View style={styles.total} >
          <Paragraph variant='body1' adjustsFontSizeToFit numberOfLines={1} >
            {`Total Assets: ${totalBalances.toFixed(2)} ≈ USD`}
          </Paragraph>
          <Paragraph variant='caption' stylesCustom={{
            color: theme.colors[web3Service.isMainnet ? 'success' : 'error']
          }} >
            {web3Service.isMainnet ? 'Mainnet' : 'Testnet'}
          </Paragraph>
        </View>
      </ViewContainer>
    </BgView>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
  },
  card: {
    marginBottom: 20,
  },
  wrapperCards: {
    flex: 1,
    width: '100%',
    overflow: 'hidden',
  },
  total: {
    height: 50,
    width: '100%',
    paddingTop: 10,
    alignItems: 'center',
    justifyContent:'center',
  },
});

export default Home;