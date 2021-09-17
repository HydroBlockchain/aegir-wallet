import { StyleSheet } from "react-native";
import { themeGlobal } from "../../libs/Theme";

const styles = StyleSheet.create({
  card: {
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: themeGlobal.roundness
  },
  imageCard: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardBalance: {
    flex: 1,
    marginLeft: 5,
  },
  notificationText: {
    textAlign: 'left'
  },
});

export default styles;