import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  form: {
    flex: 1,
    marginTop: 35,
  },
  wrapperInput: {
    marginBottom: 32
  },
  wrapperButton: {
    borderColor: 'blue',
    borderWidth: 1,
    flexBasis: 50
  },
  wrapperForm: {},
  subheader: {
    marginBottom: 33,
  },
  acceptTermsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  acceptTermsLabel: {
    flex: 1,
    flexWrap: 'wrap'
  },
  wrapperModal:{},
  wrapperModalInternal: {
    height: 250,
    padding: 10,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  label2fa: {
    flexDirection: 'row',
    alignItems: 'center',
  }
});

export default styles;