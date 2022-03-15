import { StyleSheet, Dimensions, Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { themeGlobal } from '../../libs/Theme';
const { width } = Dimensions.get('window');

console.log('themeGlobal', themeGlobal.heightHeader, getStatusBarHeight() )

export default StyleSheet.create({
  containerStyleGlobal: {
    paddingTop: 0,
    borderBottomColor: 'transparent',
    height: themeGlobal.heightHeader,
  },
  containerStyleGoBack: {
    height: themeGlobal.heightHeaderGoBAck,
    top: Platform.OS === 'android' ? 12 : 0
  },
  rightContainerStyle: {
    justifyContent: 'center'
  },
  nav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    top: Platform.OS === 'android' ? 4 : 0
  },
  headerLeft: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: width * 0.03
  },
  headerRight: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingLeft: width * 0.03,
    alignItems: 'center',
  },
  containerStyleDefault: {
    borderBottomWidth: 0,
    paddingHorizontal: 10
  },
  centerComponent: {
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "Rubik-Regular",
    height: Platform.OS === 'ios' ? 20 : 30
  },
  badgeStyle: {
    top: -5,
    zIndex: 20,
    position: 'absolute'
  },
  badgeText: {},
  badgeContainer: {
    borderWidth: 1,
    borderColor: 'pink',
  }
});