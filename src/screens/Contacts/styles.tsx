import { StyleSheet } from "react-native";
import { themeGlobal } from "../../libs/Theme";

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    paddingTop: 20,
  },
  content: {
    flex: 1,
    width: '100%',
    marginBottom: 10,
    overflow: 'hidden',
    borderRadius: themeGlobal.roundness,
  },
  noContacts: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  wrapperContacts: {
    padding: 10,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: "space-between",
    borderRadius: themeGlobal.roundness,
  },
  addContactContainer: {
    flex: 1,
    paddingTop: 20,
  },
});

export default styles;