import React from "react";
import {
    View,
    Image,
    StyleSheet,
    Dimensions,
    ScrollView,
    Platform
} from "react-native";

import Button from "../../../components/Button";
import Paragraph from "../../../components/Paragraph";
import BgView from "../../../components/Layouts/BgView";
import { StackScreenProps } from "@react-navigation/stack";
import ViewContainer from '../../../components/Layouts/ViewContainer';
import { RootStackParams } from "../../../interfaces/RootStackParams";

const { height } = Dimensions.get('window');

interface Props extends StackScreenProps<RootStackParams, 'PasswordSet'> {};

const PasswordSet = ({ navigation }) => {
    const onSubmit = async () => {
        navigation.navigate("App", { screen: "Home" });
    };

    return(
        <BgView>
          <ScrollView>
            <ViewContainer style={styles.ViewContainer} >
              <Image
                style={styles.logo}
                source={require("../../../assets/images/brand/logoFull.png")}
              />

              <Paragraph variant='h1' stylesCustom={styles.title} >
                Password set!
              </Paragraph>

              <Paragraph variant='body1' stylesCustom={styles.body} >
                Now your wallet has been generated, encrypted and you have made a backup of your mnemonic seed. Great!
              </Paragraph>

              <Paragraph variant='body1' stylesCustom={styles.body} >
                To claim your Hydro ID you must first make a deposit to the wallet in order to cover the gas fees required by the public blockchains.
              </Paragraph>

              <Paragraph variant='body1' stylesCustom={styles.body} >
                Once you have made your first deposit, head on over to the settings to claim your Hydro ID.
              </Paragraph>

              <View style={{ flex: 1 }} />

              <Button
                variant='grey'
                onPress={onSubmit}
                text='Okey, i understand'
              />

              { Platform.OS === 'ios' ? <View style={{ flex: 0.3 }} /> : null }
              
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
    title: {
      marginVertical: 55
    },
    body: {
      width: '100%',
      marginBottom: 20,
      textAlign: 'justify'
    }
})

export default PasswordSet;
