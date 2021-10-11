import React from "react";

import Button from "../../../components/Button";
import Paragraph from "../../../components/Paragraph";
import BgView from "../../../components/Layouts/BgView";
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from "../../../interfaces/RootStackParams";
import ViewContainer from '../../../components/Layouts/ViewContainer';
import { View, Image, StyleSheet, Dimensions, ScrollView } from "react-native";

const { height } = Dimensions.get('window');

interface Props extends StackScreenProps<RootStackParams, 'Register'>{};

const Register = ({ navigation }: Props) => {
	const onSubmit = async () => {
		navigation.navigate("Create");
	};

	return (
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
								source={require("../../../assets/images/auth/finger-print.png")}
							/>
						</View>

						<View style={styles.wrapperText}>
							<Paragraph variant='body1' stylesCustom={{ textAlign: 'center' }} >
								Using our Snowflake protocol, we secure your unique identinty on the blockchain.
							</Paragraph>
						</View>
					</View>

					<View style={styles.wrapperButton}>
						<Button
							variant='grey'
							text='Next'
							onPress={onSubmit}
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
})

export default Register;
