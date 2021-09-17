import React, { useContext, useEffect, useState } from "react";

/* components */
import { View, Image } from 'react-native';
import Button from "../../../components/Button";
import * as SecureStore from 'expo-secure-store';
import Paragraph from "../../../components/Paragraph";
import Icon from "react-native-vector-icons/Ionicons";
import BgView from "../../../components/Layouts/BgView";
import { ScrollView } from "react-native-gesture-handler";
import AppIntroSlider from "react-native-app-intro-slider";
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from "../../../interfaces/RootStackParams";
import ViewContainer from '../../../components/Layouts/ViewContainer';

/* constants */
import { SCREEN_REMITTANCES_READY } from "../../../../constants";

/* context */
import { ThemeContext } from "../../../hooks/useTheme";

/* styles */
import styles from './style';

const slides = [
  {
    id: "1",
    title: 'Cards',
    body: 'Issue physical and virtual debit cards with our fully built and configurable',
    image: require("../../../assets/images/remittances/slider-cards.png"),
  },
  {
    id: "2",
    title: 'Payments',
    body: 'Add ACH, bank auth, P2P, wallets, roundups, and other payments',
    image: require("../../../assets/images/remittances/slider-payments.png"),
  },
  {
    id: "3",
    title: 'Banking',
    body: 'Add FDIC insured checking or savings accounts to your business, with our fully',
    image: require("../../../assets/images/remittances/slider-banks.png"),
  },
];

interface Props extends StackScreenProps<RootStackParams, 'StartRemittances'>{};

const StartRemittances = ({ navigation, route }: Props) => {
  const { buttonContainer } = styles;
  const [ showApp, setShowApp ] = useState(false);
  const [ renderSplashScreen, setRenderSplashScreen] = useState(true);
  const { theme, isLightTheme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    new Promise(async (resolve) => {
      const data = await SecureStore.getItemAsync(SCREEN_REMITTANCES_READY);
      resolve(Boolean(Number(data)));
    }).then((data) => {
      data && setShowApp(true);
    })    

    isLightTheme && toggleTheme();
    
    setTimeout(() => setRenderSplashScreen(false), 1500);
  }, [ isLightTheme ]);

  const renderDoneButton = () => {
    return (
      <View style={buttonContainer}>
        <Icon
          size={36}
          name="ios-checkmark"
          color={theme.colors.primary}
          style={{ backgroundColor: "transparent" }}
        />
      </View>
    );
  };
  
  const renderItem = ({ item: { image, body, title, id } }) => {
    return (
      <View style={styles.slideWrapper} key={id} >
        <View style={ styles.slide } >
          <View style={ styles.slideImageWrapper } >
            <Image
              source={image}
              style={styles.slideImage}
            />
          </View>

          <View style={ styles.slideTextWrapper } >
            <Paragraph variant='subtitle1' stylesCustom={ styles.slideTitle } >
              {title}
            </Paragraph>
            <Paragraph variant='body2' stylesCustom={ styles.slideText } >
              {body}
            </Paragraph>
          </View>
        </View>

        <Image
          style={styles.imageBackground}
          source={require("../../../assets/images/remittances/bg-waves-phone-v3.png")}
        />
      </View>
    );
  };

  const onDone = () => {
    setShowApp(true);
    SecureStore.setItemAsync(SCREEN_REMITTANCES_READY, '1')
  };

  return(
    <BgView>
      {(renderSplashScreen) 
        ? (
          <View style={styles.SplashScreenWrapper} >
            <View style={styles.introLogoWrapper} >
              <Image
                resizeMode='contain'
                style={styles.introLogo}
                source={require('../../../assets/images/remittances/hydro-logo-dark.png')}
              />
            </View>

            <Image
              resizeMode='contain'
              style={styles.figerPrint}
              source={ isLightTheme
                ? require('../../../assets/images/remittances/finger-print-dark.png')
                : require('../../../assets/images/remittances/finger-print.png')
              }
            />

            <Image
              resizeMode='contain'
              style={styles.hydroLogoTypography}
              source={ isLightTheme
                ? require('../../../assets/images/remittances/hydro-logo-typography-dark.png')
                : require('../../../assets/images/remittances/hydro-logo-typography.png')
              }
            />
          </View>
        // else if
        ) : (showApp) ? (
          <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexWrap: "wrap",
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "center",
          }}>
          <View style={styles.singUpWrapper} >
            <Image
              resizeMode='contain'
              style={styles.hydroLogoTypographySigup}
              source={require('../../../assets/images/remittances/hydro-logo-typography.png')}
            />

            <Image
              resizeMode='contain'
              style={styles.slideImage}
              source={require('../../../assets/images/remittances/singUp-intro.png')}
            />

            <ViewContainer>
              <Button
                text='Sign in'
                onPress={() => { navigation.navigate('UserRegister') }}
                styleCustom={{ marginBottom: 15 }}
              />

              <Button
                text='Login'
                variant='outlined'
                onPress={() =>  navigation.navigate('LoginRemittances') }
                styleCustom={{ marginBottom: 15 }}
              />
            </ViewContainer>
          </View>
          </ScrollView>
        ) : ( // else
          <AppIntroSlider
            data={slides}
            onDone={onDone}
            showNextButton={false}
            renderItem={renderItem}
            renderDoneButton={renderDoneButton}
            dotStyle={{ backgroundColor: theme.colors.primary }}
            activeDotStyle={{ backgroundColor: theme.colors.text2 }}
          />
        )
      }
    </BgView>
  );
};

export default StartRemittances;
