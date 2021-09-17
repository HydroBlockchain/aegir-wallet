import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
  form: {
    flex: 1,
  },
  wrapperInput: {
    marginBottom: 32
  },
  wrapperTabs: {
    marginVertical: 34,
    paddingVertical: 10,
    alignContent: 'center'
  },
  scrollTabs: {},
  tabs: {},
  tabItem: {
    borderWidth: 3,
    paddingBottom: 4,
    borderColor: 'transparent',
    marginRight: 10,
    // flex: 1
  },
  tabItemActive: {
    borderBottomColor: 'white',
  },
  wrapperConverter: {
    padding: 8,
    borderRadius: 8,
    marginBottom: 34,
  },
  converterContent: {
    flexDirection: 'row',
  },
  converterContentCol: {},
  converterContentIcon: {
    padding: 10,
    justifyContent: 'flex-end',
  },
  converterWrapperInputs: {
    flex: 1
  },
  converterContentInput: {
    flex: 1,
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  convertInput: {
    flex: 0.475,
  },
  converterResult: {
    marginTop: 20,
    alignItems: 'center'
  },
  wrapperCardNumber: {
    paddingTop: 13,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  inputCardNumber: {
    flex: 0.50,
  },
  inputCardNumberExpire: {
    flex: 0.25
  },
  inputCardNumberCVV: {
    flex: 0.2
  },
  summary: {
    padding: 8,
    marginTop: 8,
    borderRadius: 8,
  },
  summaryText: {
    marginBottom: 8,
  },
  wrapperDocumentInput: {
    paddingTop: 13,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  inputDocument: {
    flex: 0.49
  },
  acceptTermsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  acceptTermsLabel: {
    flex: 1,
    flexWrap: 'wrap'
  },
});

export default styles;