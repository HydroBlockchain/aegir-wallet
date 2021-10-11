import { StyleSheet, Dimensions } from 'react-native';
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  content: {},
  wrapperInput: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    fontSize: 16,
    lineHeight: 18,
    paddingVertical: 13,
    fontFamily: "Roboto",
    paddingHorizontal: 13,
  },
  icon: {},
  wrapperIcon: {
    paddingRight: 13,
  },
  label: {
    marginBottom: 13.5
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
    marginTop:30
  },
  buttonTouchable: {
    marginTop:30
  },
});

export default styles;