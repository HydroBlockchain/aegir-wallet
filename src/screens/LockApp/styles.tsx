import { StyleSheet } from "react-native";
import { themeGlobal } from "../../libs/Theme";

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: themeGlobal.defautlPaddingTop,
  },
  imageFingerPrint: {
    width: 100,
    height: 100,
  },
  contentInputs: {
    width: '100%'
  },
});

export default styles;