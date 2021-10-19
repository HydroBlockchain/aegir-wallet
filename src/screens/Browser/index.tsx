import React from 'react';
import WebView from 'react-native-webview';
import { IbrowserParams } from './interfaces';
import { View, StyleSheet} from 'react-native';
import HeaderCustom from '../../components/Header';

const Browser = ({ navigation, route }: IbrowserParams) => {
  const { uri } = route.params;

  return (
    <View style={styles.container}>
      <HeaderCustom variant="back" title={
        uri.replace('https://', '').replace('http://', '')
      } />
      <WebView source={{ uri: uri }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
});
export default Browser;
