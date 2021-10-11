import React from 'react';
import WebView from 'react-native-webview';

const Browser = ({uri = ''}) => {
  return <WebView source={{uri: uri}} style={{marginTop: 10}} />;
};

export default Browser;
