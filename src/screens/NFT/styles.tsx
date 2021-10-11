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
  noData: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  wrapperData: {
    padding: 10,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: "space-between",
    borderRadius: themeGlobal.roundness,
  },
  addDataContainer: {
    flex: 1,
    paddingTop: 20,
  },
  collectibleTabGroup: {
    flexWrap: 'wrap',
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  collectibleTabGroupItem: {
    flexGrow: 1,
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  collectibleGroup: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  collectibleGroupItem: {
    width: '49%',
    marginBottom: 5
  }
});

export default styles;