import React, { useContext, useEffect, useRef, useState } from "react";

import { styles } from "./style";
import Paragraph from "../../components/Paragraph";
import { ThemeContext } from "../../hooks/useTheme";
import BgView from "../../components/Layouts/BgView";
import Icon from "react-native-vector-icons/Ionicons";
import { View, Image, BackHandler } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from "../../interfaces/RootStackParams";


const slides = [
  {
    id: "1",

    body:
      "Using our snowflake protocol, we secure your unique identity on the blockchain",
    image: require("../../assets/images/identity.png"),
  },
  {
    id: "2",
    body: "All around security with 2FA using our Raindrop Protocol",
    image: require("../../assets/images/password.png"),
  },
  {
    id: "3",
    body:
      "Store tokens and transfer Hydro Tokens to friends and family in Bitcoin or Ether",
    image: require("../../assets/images/transfer.png"),
  },
];

interface Props extends StackScreenProps<RootStackParams, 'StartApp'> {};

const StartApp = ({ navigation }: Props) => {
  const sliderRef = useRef<any>(null);
  const { theme } = useContext(ThemeContext);
  const [showApp, setShowApp] = useState(false);

  useEffect(() => {
    const event = BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);

    return () => {
      event.remove();
    }
  }, [])

  function handleBackButtonClick() {
    if(!navigation.isFocused()) return false;

    const activeIndex = sliderRef?.current?.state?.activeIndex;
    (!activeIndex) ? BackHandler.exitApp()
      : sliderRef.current.goToSlide(activeIndex - 1);
    return true;
  }

  const renderDoneButton = () => {
    return (
      <View style={styles.buttonContainer}>
        <Icon
          size={36}
          color={'#373737'}
          name="ios-checkmark"
          style={{ backgroundColor: "transparent" }}
        />
      </View>
    );
  };

  const renderNextButton = () => {
    return (
      <View style={styles.buttonContainer}>
        <Icon
          size={30}
          color={'#373737'}
          name="ios-arrow-forward"
          style={{ backgroundColor: "transparent" }}
        />
      </View>
    );
  };

  const renderItem = ({ item: { image, body, id } }) => {
    return (
      <View key={id} style={styles.slideWrapper} >
        <Image
          source={ image }
          style={ styles.slideImage }
        />

        <View style={styles.slideTextWrapper}>
          <Paragraph variant='body1' stylesCustom={[
            styles.slideText,
            { color: theme.colors.text2 }
          ]} >
            {body}
          </Paragraph>
        </View>
      </View>
    );
  };

  const onDone = () => {
    setShowApp(!showApp);
    navigation.navigate("Auth");
  };

  return (
    <BgView>
      <AppIntroSlider
        data={slides}
        onDone={onDone}
        renderItem={renderItem}
        renderNextButton={renderNextButton}
        renderDoneButton={renderDoneButton}
        ref={(ref) => (sliderRef.current = ref)}
        dotStyle={{ backgroundColor: theme.colors.text2 }}
        activeDotStyle={{ backgroundColor: theme.colors.primary }}
      />
    </BgView>
  );
};

export default StartApp;
