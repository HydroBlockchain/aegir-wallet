import React from "react";

const { height } = Dimensions.get('window');
import Button from "../../../components/Button";
import Paragraph from "../../../components/Paragraph";
import BgView from "../../../components/Layouts/BgView";
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from "../../../interfaces/RootStackParams";
import ViewContainer from '../../../components/Layouts/ViewContainer';
import { View, Image, StyleSheet, Dimensions, ScrollView } from "react-native";
import styles from "./styles";

interface Props extends StackScreenProps<RootStackParams, 'Create'> { };

const Create = ({ navigation }: Props) => {
  const onSubmit = async () => {
    navigation.navigate("Mnemonic");
  };

  return (
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
          source={require("../../../assets/images/auth/wallet.png")}
        />

        <View style={{ flex: 1 }} />

        <Paragraph variant='body1' stylesCustom={{ textAlign: 'center' }} >
          Create a default wallet to claim your Hydro ID.
        </Paragraph>

        <View style={{ flex: 1 }} />

        <View style={styles.wrapperButton}>
          <Button
            variant='grey'
            onPress={onSubmit}
            text='Create Wallet'
          />
        </View>
      </ViewContainer>
    </BgView>
  );
};

export default Create;
