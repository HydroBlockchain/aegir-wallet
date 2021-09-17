import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    paddingVertical: 20
  },
  historyWrapper: {
    flex: 1,
    marginVertical: 20
  },
  historyData: {
    padding: 13,
    marginBottom: 10,
    // flexDirection: 'row',
  },
  operationContent: {
    marginRight: 10,
    justifyContent: 'center',
  },
  operationInfoRow: {
    flex: 1,
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  operationInfoContent: {
    flex: 1
  },
  addressContent: {
    flex: 1,
    alignItems: 'flex-end'
  },
  toLabel: {
    marginRight: 5
  },
});

export default styles;