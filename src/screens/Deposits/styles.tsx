import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    paddingBottom: 20
  },
  wrapperImageCard: {
    marginTop: 20,
    marginBottom: 30,
    alignItems: 'center',
  },
  imageCard: {
    width: 50,
    height: 50,
  },
  wrapperBtnContact: {
    marginTop: 10,
    marginBottom: 15,
    alignItems: 'flex-end'
  },
  btnContact: {
    width: 110,
    padding: 10,
  },
  wrapperValueInUSD: {
    marginTop: 10,
    paddingRight: 13,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputValueInUSD: {
    flex: 1
  },
  labelUSD: {
    paddingLeft: 10,
  },
  wrapperButtonAmount: {
    marginTop: 10,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  buttonAmount: {
    width: 'auto'
  },
  wrapperAdvanced: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  password: {
    marginTop: 10,
  },
  wrapperSubmit: {
    borderWidth: 1,
    borderColor: 'red',
    flex: 1,
    justifyContent: 'flex-end'
  }
});

export default styles;