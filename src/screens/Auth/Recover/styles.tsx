import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  viewContainer: {
    paddingTop: 15,
  },
  input: {
    flex: 1,
    lineHeight: 20,
    minHeight: 150,
    textAlignVertical: 'top'
  },
  wrapperInput: {
    minHeight: 180,
  },
  wrapperButtons: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  button: {
    width: 'auto'
  }
});

export default styles;