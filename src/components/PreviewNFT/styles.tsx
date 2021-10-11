import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  body: {},
  cardBody: {
    flex: 1,
    padding: 5,
    flexDirection: 'column',
  },
  cardContainer: {
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  cardImage: {
    width: '100%',
    aspectRatio: 1,
    resizeMode: 'contain',
  },
  cardTitle: {
    paddingVertical: 5,
  },
  buttons: {
    flex: 1,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    flexGrow: 1,
    paddingHorizontal: 5,
  },
  button: {
    padding: 10,
    paddingVertical: 8
  },
  buttonText: {
    fontSize: 12
  }
});

export default styles;
