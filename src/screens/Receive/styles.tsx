import { StyleSheet } from "react-native";
import { themeGlobal } from "../../libs/Theme";

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    paddingTop: themeGlobal.defautlPaddingTop
  },
  address: {
    padding: 13,
    marginTop: 10,
  },
  wrapperQr: {
    marginTop: 50,
    borderRadius: 10,
    overflow: 'hidden'
  }
});

export default styles;