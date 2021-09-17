import React, { useContext, useEffect, useState } from 'react'

import styles from './styles';
import { View } from 'react-native';
import { RadioButtonProps } from './interfaces';
import { ThemeContext } from '../../hooks/useTheme';
import { RadioButton as RB } from 'react-native-paper';

const RadioButton = (props: RadioButtonProps) => {
  const {
    label = '',
    position = 'leading',
  } = props;
  
  const { theme } = useContext(ThemeContext);
  const [ checked, setChecked ] = React.useState(false);
  
  const handleChange = () => {
    setChecked((prevState) => !prevState);
  }
    
  return(
    <View style={styles.wrapperRadioButon} >
      <RB.Item
        value={label}
        label={label}
        position={position}
        onPress={handleChange}
        style={styles.radioButton}
        color={theme.colors.primary}
        uncheckedColor={theme.colors.primary}
        status={(checked) ? 'checked' : 'unchecked'}
      />
    </View>
  )
}

export default RadioButton;