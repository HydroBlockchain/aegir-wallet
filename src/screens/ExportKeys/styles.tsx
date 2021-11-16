import { StyleSheet } from "react-native";
import { themeGlobal } from "../../libs/Theme";

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    paddingTop: 20,
  },
  privateKey: {
    padding: 10,
    borderRadius: themeGlobal.roundness
  }
});

export default styles;