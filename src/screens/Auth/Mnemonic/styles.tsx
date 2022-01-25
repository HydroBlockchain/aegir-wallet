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
  ctaMnemonic: {
    width: '100%'
  },
  wrapperButton: {
    width: '100%',
    justifyContent: 'flex-end',
  },
  text: {
    marginVertical: 30,
    textAlign: 'center',
  },
  textAreaWords: {
    flex: 1,
    padding: 10,
    width: '100%',
    minHeight: 70,
    marginVertical: 15,
  },
  ctaCopy: {
    width: '50%',
    alignSelf: 'flex-end'
  }
});

export default styles;