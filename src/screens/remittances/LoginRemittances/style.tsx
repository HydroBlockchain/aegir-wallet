import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
  title: {
    marginTop: 55,
    marginBottom: 36,
  },
  wrapperInput: {
    marginBottom: 32
  },
  btnLogin: {
    width: 150,
    alignSelf: 'center',
  },
  figerPrint: {
    width: 94,
    height: 94,
    marginVertical: 36,
    alignSelf: 'center'
  },
  contentContainerModal: {},
  wrapperModal: {},
  wrapperModalInternal: {
    height: 350,
    padding: 10,
    borderRadius: 8,
  },
  modalRow1: {
    flex: 1,
    flexDirection: 'row',
  },
  modalCol1: {
    marginRight: 10,
    alignItems: 'center',
  },
  modalCol2: {
    flex: 1,
    paddingTop: 8,
    justifyContent: 'space-evenly',
  },
  wrapperIconModal: {
    borderRadius: 100,
    backgroundColor: 'white',
  },
  modalBody: {
    marginTop: 30,
    flex: 1
  },
  wrapperInput2FA: {
    marginTop: 36,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  input2FA: {
    flex: 1,
    height: 45,
    padding: 5,
    flexBasis: 1,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  inputSpace2FA: {
    marginHorizontal: 5,
  },
  inputStartSpace2FA: {
    marginRight: 5
  },
  inputEndSpace2FA: {
    marginLeft: 5
  },
  inputText2FA: {
    width: 0,
    height: 0,
    padding: 0,
    borderWidth: 0,
    position: 'absolute',
    borderColor: 'transparent',
    backgroundColor: 'transparent',
  },
  buttonModal: {
    width: 90,
    padding: 13,
    display: "flex",
    marginBottom: 16,
    borderRadius: 10,
    alignSelf: 'center',
    alignItems: "center",
  }
});

export default styles;