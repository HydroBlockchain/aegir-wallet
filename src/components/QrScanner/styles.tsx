import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  modal: {
    width: width,
    height: height,
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
    marginTop: 30,
  },
  buttonTouchable: {
    top: 200,
    width: 150,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 50,
    borderColor: '#777',
    borderWidth: 2,
    borderStyle: 'solid',
    alignItems: 'center',
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    backgroundColor: 'white',
  },
});

export default styles;
