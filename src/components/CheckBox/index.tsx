import React, { useState } from 'react';
import { Text } from 'react-native';
import { StyleSheet, View } from 'react-native';
import Paragraph from '../Paragraph';
// import CBox from '@react-native-community/checkbox';

interface Props {
  value?: boolean,
  disabled?: boolean,
  label?:string | undefined | JSX.Element,
  onValueChange?: (value: boolean) => void | undefined
}

const CheckBox = (props: Props) => {
  const {
    label,
    value = false,
    disabled = false,
    onValueChange = (value) => {},
  } = props
  const [ toggleCheckBox,  setToggleCheckBox ] = useState(value);

  const onChange = (newValue: boolean) => {
    onValueChange(newValue);
    setToggleCheckBox(newValue);
  }
  
  return (
    <View style={ styles.wrapper } >
      <Text>
        the checkbox needs to be implemented
      </Text>
      {/* <CBox
        disabled={disabled}
        value={toggleCheckBox}
        onValueChange={onChange}
      />

      {(label && typeof label === 'string') ? (
        <Paragraph variant='inputLabel1' >
          {label}
        </Paragraph>
      ) : (label) ? (
        label
      ) : (
        null
      )} */}
      
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CheckBox;