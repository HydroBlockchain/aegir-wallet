import { StyleSheet } from "react-native";
import { themeGlobal } from "../../../libs/Theme";

const styles = StyleSheet.create({
	ViewContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
    paddingTop: themeGlobal.defautlPaddingTop,
	},
	logo: {
		resizeMode: "contain",
	},
	imageCard: {
		resizeMode: "contain",
	},
	wrapperButton: {
		width: '100%',
		justifyContent: 'flex-end',
	},
})

export default styles;