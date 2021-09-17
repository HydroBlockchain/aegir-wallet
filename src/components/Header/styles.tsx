import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

export default StyleSheet.create({
  containerStyleGlobal: {
    paddingTop: 0,
    borderBottomColor: 'transparent',
  },
  containerStyleGoBack: {},
  nav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: width * 0.03
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: width * 0.03,
    justifyContent: 'flex-start',
  },
  containerStyleDefault: {
    borderBottomWidth: 0,
    paddingHorizontal: 10,
  },
  centerComponent: {
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "Rubik-Regular",
  },
  badgeStyle: {
    top: -5,
    zIndex: 20,
    position: 'absolute',
    backgroundColor: 'red',
    // padding: 0,
    // width: 1,
    // height: 18,
    // borderWidth: 0,
    // borderColor: 'blue'
  },
  badgeText: {
    // fontSize: 5
  },
  badgeContainer: {
    borderWidth: 1,
    borderColor: 'pink',
  }
});