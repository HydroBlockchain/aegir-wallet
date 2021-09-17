import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  content: {},
  wrapperInput: {
    flexDirection: 'row',
    alignItems: 'flex-start'
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
    padding: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    marginBottom: 13.5
  }
});

export default styles;