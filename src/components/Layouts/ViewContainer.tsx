import React from 'react'
import { View, StyleSheet } from 'react-native';
import { Children } from '../../interfaces/ComponentInterface';

interface Props {
  style?: {},
  children: Children | Children[],
}

const ViewContainer = ({ children, style = {} }: Props) => {
  return (
    <View style={[styles.container, style]} >
      { children }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: '5%'
  }
});

export default ViewContainer;