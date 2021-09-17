import { StyleSheet } from "react-native";
import { themeGlobal } from "../../libs/Theme";

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 40,
  },
  notificationsContent: {
    flex: 1,
    width: '100%',
    marginBottom: 10,
    overflow: 'hidden',
    borderRadius: themeGlobal.roundness,
  },
  noNotifications: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  wrapperNotification: {
    marginBottom: 10,
  }
});

export default styles;