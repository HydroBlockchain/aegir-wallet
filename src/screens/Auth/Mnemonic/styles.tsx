import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  ViewContainer: {
    flex: 1,
    paddingTop: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    resizeMode: "contain",
  },
  wrapperText: {},
  ctaMnemonic: {
      width: '100%'
  },
  wrapperButton: {
    width: '100%',
    justifyContent: 'flex-end',
  },
  text: {
      marginVertical: 30,
      textAlign: 'center',
  },
  textAreaWords: {
      padding: 10,
      width: '100%',
      minHeight: 150,
      marginVertical: 15,
  },
  ctaCopy: {
      width: '50%',
      alignSelf: 'flex-end'
  }
});

export default styles;