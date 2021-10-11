import { StyleSheet } from "react-native";
import { themeGlobal } from "../../libs/Theme";

const styles = StyleSheet.create({
  iconStyle: {},
  separator: {
    height: 1,
    opacity: 0.5,
    width: '100%',
    backgroundColor: '#848c96'
  },
  bottomModal: {
    flex: 1,
    margin: 0,
    justifyContent: 'flex-end',
  },
  safeAreaView: {
    minHeight: '60%',
    borderTopLeftRadius: themeGlobal.roundness,
    borderTopRightRadius: themeGlobal.roundness,
  },
  titleWrapper: {
		width: '100%',
		height: 33,
		alignItems: 'center',
		borderColor: '#848c96',
		justifyContent: 'center',
		borderBottomWidth: StyleSheet.hairlineWidth,
	},
  dragger: {
		width: 48,
		height: 5,
		opacity: 0.6,
		borderRadius: 4,
		backgroundColor: '#848c96',
	},
  flatlist: {
    flex: 1
  },
  listItem: {
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  emptyDataWrapper: {
    flex: 1,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default styles;