import React, { useContext, useEffect, useState, Fragment } from 'react'

/* style */
import styles from './styles';

/* components */
import {
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { Badge } from 'react-native-paper';
import { Header } from "react-native-elements";
import * as SecureStore from 'expo-secure-store';
import { ThemeContext } from '../../hooks/useTheme';
import { useNavigation } from '@react-navigation/native';
import FaIcon from "react-native-vector-icons/FontAwesome5";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import IconMaterial from "react-native-vector-icons/MaterialCommunityIcons";

/* utils */
import { headerOptionsType, HeaderProps } from './interfeces';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParams } from '../../interfaces/RootStackParams';
import { AppStateManagerContext } from '../../context/AppStateManager/index';

/* constant */
import { HYDRO_WALLET_ADDRESS } from '../../../constants';

const HeaderCustom = ({ variant = 'defuault', title }: HeaderProps) => {
  const { width } = Dimensions.get('window');
  const { isLightTheme, theme, toggleTheme } = useContext(ThemeContext);
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const { appState: { notifications } } = useContext(AppStateManagerContext);

  useEffect(() => {
    new Promise( async () => {
      let addressTMP = await SecureStore.getItemAsync(HYDRO_WALLET_ADDRESS);

      // support for the old version of the wallet
      // developer @gagzu | date 05-07-2021
      if(!addressTMP) {
        addressTMP = await SecureStore.getItemAsync('walletAddress');
        addressTMP && await SecureStore.setItemAsync(HYDRO_WALLET_ADDRESS, addressTMP);
      }
      // End of support for old version of the wallet
    })
  }, []);

  const toHome = () => {
    navigation.navigate('Home');
  }

  const toTransfer = () => {
    // navigation.navigate('Remittances', { screen: 'StartRemittances'});
  }

  const onBackPress = () => {
    navigation.goBack();
  }

  const headerOptions: headerOptionsType = {
    leftComponent: {},
    rightComponent: {},
    centerComponent: {},
    containerStyle: {
      ...styles.containerStyleGlobal,
      height: theme.heightHeader,
      backgroundColor: theme.colors.backgroundApp2
    },
    statusBarProps: {
      barStyle: 'light-content',
      backgroundColor: theme.colors.backgroundApp
    },
  };

  if(variant === 'defuault') {
    headerOptions.leftComponent = (
      <TouchableOpacity onPress={toHome} >
        <View style={styles.nav}>
          <View style={styles.headerLeft}>
            <Image
              style={{ resizeMode: "contain", width: 70, height: 35 }}
              source={ isLightTheme
                ? require("../../assets/images/brand/lightLogo.png")
                : require("../../assets/images/brand/darkLogo.png")
              }
            />
          </View>
        </View>
      </TouchableOpacity>
    );

    headerOptions.rightComponent = (
      <View style={styles.nav}>
        <TouchableOpacity onPress={() => { navigation.navigate('ListNFT') }}>
          <FaIcon name="images"  color={theme.colors.text} size={20} />
        </TouchableOpacity>

        <TouchableOpacity onPress={toggleTheme} style={{ paddingHorizontal: width * 0.02 }}>
          {(isLightTheme)
            ? <FaIcon name="moon" color={theme.colors.text} solid={true} size={20} />
            : <MaterialIcons name="wb-sunny" color='#F0B90B' size={20} />
          }
        </TouchableOpacity>

        <TouchableOpacity onPress={toTransfer} >
          <IconMaterial name="bank-transfer" color={theme.colors.text} size={35} />
        </TouchableOpacity>

        <TouchableOpacity
          style={{ paddingHorizontal: width * 0.02 }}
          onPress={() => navigation.navigate("Notification")}
        >

          <Badge visible={notifications.length > 0} size={15} style={styles.badgeStyle} >
            {(notifications.length >= 10) ? '+9' : notifications.length.toString()}
          </Badge>
          <FaIcon name="bell" color={theme.colors.text} solid={true} size={20} />
        </TouchableOpacity>

        <TouchableOpacity
          style={{ paddingLeft: width * 0.02, paddingRight: '1%' }}
          onPress={() => navigation.navigate("Settings")}
        >
          <FaIcon name="cog" color={theme.colors.text} size={20} />
        </TouchableOpacity>
      </View>
    );

    headerOptions.containerStyle = {
      ...headerOptions.containerStyle,
      ...styles.containerStyleDefault,
    }
  } else {
    headerOptions.leftComponent = {
      icon: "arrow-back",
      onPress: onBackPress,
      color: theme.colors.text,
    };

    headerOptions.containerStyle = {
      ...headerOptions.containerStyle,
      ...styles.containerStyleGoBack,
      height: theme.heightHeaderGoBAck,
    }

    if(title) {
      headerOptions.centerComponent = {
        text: title,
        style: {
          color: theme.colors.text,
          ...styles.centerComponent,
        },
      }
    }
  }

  return (
    <Fragment>
      <Header placement='right' { ...headerOptions } />

    </Fragment>
  )
}

export default HeaderCustom