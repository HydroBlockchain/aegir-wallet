import React, { useContext } from "react";
import { View, Image, ScrollView } from "react-native";
import { StackScreenProps } from '@react-navigation/stack';

import styles from "./styles";
import Button from "../../../components/Button";
import Paragraph from "../../../components/Paragraph";
import { ThemeContext } from '../../../hooks/useTheme';
import BgView from "../../../components/Layouts/BgView";
import ViewContainer from '../../../components/Layouts/ViewContainer';
import { RootStackParams } from "../../../interfaces/RootStackParams";

interface Props extends StackScreenProps<RootStackParams, 'AuthLanding'> {};

const AuthLanding = ({ navigation }: Props) => {
  const { theme } = useContext(ThemeContext);

  const HandleGetStarted = async () => {
    navigation.navigate("Register");
  };

  const recover = () => {
    navigation.navigate("Recover");
  };


  return(
    <BgView>
      <ViewContainer style={styles.ViewContainer} >
        <View style={{ flex: 1 }} />

        <Image
          style={styles.logo}
          source={require("../../../assets/images/brand/logoFull.png")}
        />

        <View style={{ flex: 1 }} />

        <Image
          style={styles.imageCard}
          source={require("../../../assets/images/auth/card.png")}
        />

        <View style={{ flex: 1 }} />

        <Paragraph variant='body1' stylesCustom={{ textAlign: 'center' }} >
          Register now to create your digital identity, transact and use the hydro
          protocols to secure who you are online.
        </Paragraph>

        <View style={{ flex: 1 }} />

        <View style={styles.wrapperButton}>
          <Button
            variant='grey'
            text='Get Started'
            onPress={HandleGetStarted}
          />

          <View style={{ height: 15 }} />

          <Button
            variant='grey'
            text='Recover'
            onPress={recover}
          />
        </View>
      </ViewContainer>
    </BgView>
  );
};

export default AuthLanding;
