import { StyleSheet } from "react-native";
import { themeGlobal } from "../../../libs/Theme";

const styles = StyleSheet.create({
  changePasswordContainer: {
    flex: 1,
    paddingTop: themeGlobal.defautlPaddingTop
  },
	ViewContainer: {
		flex: 1,
		alignItems: 'center',
	  paddingTop: themeGlobal.defautlPaddingTop,
	},
	logo: {
		alignSelf: 'center',
	  resizeMode: "contain",
	},
	wrapperInput: {
		width: '100%'
	},
	wrapperKeys: {
		width: '100%',
		marginTop: 30,
	},
	valueKey: {
		padding: 18,
		marginTop: 10,
		marginBottom: 20
	}
});

export default styles;