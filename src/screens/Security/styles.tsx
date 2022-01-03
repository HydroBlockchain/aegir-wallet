import { StyleSheet } from "react-native";
import { themeGlobal } from "../../libs/Theme";

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    paddingTop: themeGlobal.defautlPaddingTop
  },
  labeSwitch: {
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});

export default styles;