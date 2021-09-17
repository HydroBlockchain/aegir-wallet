import React, { useContext } from "react";

import Button from "../../../components/Button";
import Paragraph from "../../../components/Paragraph";
import { ThemeContext } from '../../../hooks/useTheme';
import BgView from "../../../components/Layouts/BgView";
import { StackScreenProps } from '@react-navigation/stack';
import ViewContainer from '../../../components/Layouts/ViewContainer';
import { RootStackParams } from "../../../interfaces/RootStackParams";
import { View, Image, StyleSheet, Dimensions, ScrollView } from "react-native";

const { height } = Dimensions.get('window');

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
      <ScrollView>
        <ViewContainer style={styles.ViewContainer} >
          <Image
            style={styles.logo}
            source={require("../../../assets/images/brand/logoFull.png")}
          />

          <View style={styles.middle}>
            <View style={styles.wrapperImage}>
              <Image
                style={styles.imageCard}
                source={require("../../../assets/images/auth/card.png")}
              />
            </View>

            <View style={styles.wrapperText}>
              <Paragraph variant='body1' stylesCustom={{ textAlign: 'center' }} >
                Register now to create your digital identity, transact and use the hydro
                protocols to secure who you are online.
              </Paragraph>
            </View>
          </View>
          
          <View style={styles.wrapperButton}>
            <Button
              variant='grey'
              text='Get Started'
              onPress={HandleGetStarted}
              styleCustom={styles.button}
            />

            <Button
              variant='grey'
              text='Recover'
              onPress={recover}
              styleCustom={styles.button}
            />
          </View>
        </ViewContainer>
      </ScrollView>
    </BgView>
  );  
};

const styles = StyleSheet.create({
  ViewContainer: {
    flex: 1,
    paddingTop: '20%',
    minHeight: height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    resizeMode: "contain",
  },
  middle: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  wrapperImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageCard: {
    resizeMode: "contain",
  },
  wrapperText: {
    flex: 1,
    justifyContent: 'center',
  },
  wrapperButton: {
    width: '100%',
    justifyContent: 'flex-end',
  },
  button: {
    marginBottom: 15
  }
});

export default AuthLanding;
