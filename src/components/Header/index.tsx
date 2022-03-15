import React, { useContext, useEffect, useState, Fragment } from 'react'

/* style */
import styles from './styles';

/* components */
import {
  View,
  Image,
  Dimensions,
  TouchableOpacity
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
import { StackNavigationProp } from '@react-navigation/stack';
import { HeaderProps, HeaderSubComponent } from './interfaces';
import { RootStackParams } from '../../interfaces/RootStackParams';
import { AppStateManagerContext } from '../../context/AppStateManager/index';

/* constant */
import { HYDRO_WALLET_ADDRESS } from '../../../constants';
import { StyleProp, ViewStyle } from 'react-native';


const HeaderCustom = ({ variant = 'default', title }: HeaderProps) => {
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

  let
    leftComponent: HeaderSubComponent,
    rightComponent: HeaderSubComponent,
    centerComponent: HeaderSubComponent,
    rightContainerStyle: StyleProp<ViewStyle>,
    containerStyleVariant: StyleProp<ViewStyle>;

  if(variant === 'default') {
    leftComponent = (
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

    rightComponent = (
      <View style={styles.nav}>
        <TouchableOpacity 
          onPress={() => { navigation.navigate('ListNFT') }}
          style={{ paddingRight: width * 0.02 }}
        >
          <FaIcon name="images"  color={theme.colors.text} size={20} />
        </TouchableOpacity>

        {/* <TouchableOpacity onPress={toggleTheme} style={{ paddingHorizontal: width * 0.02 }}>
          {(isLightTheme)
            ? <FaIcon name="moon" color={theme.colors.text} solid={true} size={20} />
            : <MaterialIcons name="wb-sunny" color='#F0B90B' size={20} />
          }
        </TouchableOpacity> */}

        {/* <TouchableOpacity onPress={toTransfer} >
          <IconMaterial name="bank-transfer" color={theme.colors.text} size={35} />
        </TouchableOpacity> */}

        <TouchableOpacity
          style={{ paddingHorizontal: width * 0.05 }}
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
          <FaIcon name="sliders-h" color={theme.colors.text} size={20} />
        </TouchableOpacity>
      </View>
    );

    rightContainerStyle = styles.rightContainerStyle;
    containerStyleVariant = styles.containerStyleDefault;
  } else {
    leftComponent = {
      icon: "arrow-back",
      onPress: onBackPress,
      color: theme.colors.text,
    };

    containerStyleVariant = styles.containerStyleGoBack;

    if(title) {
      centerComponent = {
        text: title,
        style: {
          color: theme.colors.text,
          ...styles.centerComponent
        },
      }
    }
  }

  return (
    <Fragment>
      <Header
        // placement='right'
        leftComponent={leftComponent}
        rightComponent={rightComponent}
        centerComponent={centerComponent}
        rightContainerStyle={rightContainerStyle}
        statusBarProps={{
          barStyle: 'light-content',
          backgroundColor: theme.colors.backgroundApp
        }}
        containerStyle={[
          styles.containerStyleGlobal,
          { backgroundColor: theme.colors.backgroundApp2 },
          containerStyleVariant
        ]}
      />
    </Fragment>
  )
}

export default HeaderCustom
