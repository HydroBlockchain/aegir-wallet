import { StyleSheet } from "react-native";
import { themeGlobal } from "../../../libs/Theme";

const styles = StyleSheet.create({
  ViewContainer: {
    flex: 1,
    paddingTop: themeGlobal.defautlPaddingTop
  },
  logo: {
    alignSelf: 'center',
    resizeMode: "contain",
  },
  imageCard: {
    alignSelf: 'center',
    resizeMode: "contain",
  },
  wrapperButton: {
    width: '100%',
    justifyContent: 'flex-end',
  },
});

export default styles;