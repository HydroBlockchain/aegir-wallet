import React, { useContext } from "react";
import {
  View,
  Alert,
  Image,
  Linking,
  Platform,
  ScrollView,
} from "react-native";

import styles from "./styles";
import Button from "../../components/Button";
import HeaderCustom from "../../components/Header";
import { ThemeContext } from "../../hooks/useTheme";
import BgView from "../../components/Layouts/BgView";
import ViewContainer from "../../components/Layouts/ViewContainer";

/* utils/constants */
import { SettingsParam } from "./interfaces";
import { APPLE_STORE_ID, GOOGLE_PACKAGE_NAME } from "../../../constants";
import { getVersion } from "react-native-device-info";
import Paragraph from "../../components/Paragraph";

const Settings = ({ navigation }: SettingsParam) => {
  const { isLightTheme, toggleTheme } = useContext(ThemeContext);
  const versionRelease =  getVersion();

  const startRatingCounter = () => {
    Alert.alert(
      'Rate us',
      'Would you like to share your review with us? This will help and motivate us a lot.',
      [
        { text: 'No Thanks!', style: 'cancel'},
        { text: 'Sure', onPress: () => openStore() },
      ],
      { cancelable: false },
    );
  };

  const openStore = () => {
    //This is the main trick
    if (Platform.OS != 'ios') {
      Linking.openURL(
        `http://play.google.com/store/apps/details?id=${GOOGLE_PACKAGE_NAME}`
      ).catch((err) => Alert.alert('Please check for Google Play Store'));
    } else {
      Linking.openURL(
        `itms://itunes.apple.com/in/app/apple-store/${APPLE_STORE_ID}`,
      ).catch((err) => Alert.alert('Please check for the App Store'));
    }
  };

  return (
    <BgView>
      <HeaderCustom variant='back' title='Settings' />

      <ViewContainer style={styles.viewContainer} >
        <View style={styles.menu} >
          <ScrollView>
            <Button
              variant='grey'
              text='Contacts'
              styleCustom={styles.button}
              onPress={() => navigation.navigate('Contacts')}
            />

            <Button
              variant='grey'
              onPress={toggleTheme}
              styleCustom={styles.button}
              text={isLightTheme ? "Dark Mode" : "Light Mode"}
            />

            <Button
              variant='grey'
              text='Claim Hydro ID'
              styleCustom={styles.button}
              //onPress={() => navigation.navigate('ClaimHydroId')}
              onPress={() => {}}
            />

            <Button
              variant='grey'
              text='Export keys'
              styleCustom={styles.button}
              //onPress={() => navigation.navigate('exportKeys')}
              onPress={() => {}}
            />

            <Button
              variant='grey'
              text='Export Transactions'
              styleCustom={styles.button}
              //onPress={() => navigation.navigate('exportTransactions')}
              onPress={() => {}}
            />

            <Button
              variant='grey'
              text='Change Password'
              styleCustom={styles.button}
              onPress={() => navigation.navigate('ChangePassword')}
            />

            <Button
              variant='grey'
              text='Security'
              styleCustom={styles.button}
              //onPress={() => navigation.navigate('security')}
              onPress={() => {}}
            />

            {/*
            <Button
              variant='grey'
              text='Add Coin or Token'
              styleCustom={styles.button}
              //onPress={() => navigation.navigate('Asset')}
              onPress={() => {}}
            />
            */}

            <Button
              variant='grey'
              text='Default Fiat Currency'
              styleCustom={styles.button}
              //onPress={() => navigation.navigate('defaultFiat')}
              onPress={() => {}}
              />

            <Button
              variant='grey'
              text='Rate Us'
              styleCustom={styles.button}
              onPress={startRatingCounter}
            />
          </ScrollView>
        </View>

        <Image
          style={styles.logo}
          source={ isLightTheme
            ? require("../../assets/images/brand/aegir_full_logo_ligth.png")
            : require("../../assets/images/brand/aegir_full_logo.png")
          }
        />
        <Paragraph variant='caption' >
          {`Version ${versionRelease}`}
        </Paragraph>
      </ViewContainer>
    </BgView>
  );
};

export default Settings;
