import React from "react";
import { View, Image, ScrollView } from "react-native";
import { StackScreenProps } from '@react-navigation/stack';

import styles from "./styles";
import Button from "../../../components/Button";
import Paragraph from "../../../components/Paragraph";
import BgView from "../../../components/Layouts/BgView";
import { RootStackParams } from "../../../interfaces/RootStackParams";
import ViewContainer from '../../../components/Layouts/ViewContainer';

interface Props extends StackScreenProps<RootStackParams, 'Register'>{};

const Register = ({ navigation }: Props) => {
	const onSubmit = async () => {
		navigation.navigate("Create");
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
					source={require("../../../assets/images/auth/finger-print.png")}
				/>

				<View style={{ flex: 1 }} />

				<Paragraph variant='body1' stylesCustom={{ textAlign: 'center' }} >
					Using our Snowflake protocol, we secure your unique identinty on the blockchain.
				</Paragraph>

				<View style={{ flex: 1 }} />

				<View style={styles.wrapperButton}>
					<Button
						variant='grey'
						text='Next'
						onPress={onSubmit}
					/>
				</View>
			</ViewContainer>
		</BgView>
	);
};

export default Register;
