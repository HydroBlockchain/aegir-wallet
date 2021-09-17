import React, { useContext } from 'react'
import { TextInput, View } from 'react-native';
import { ThemeContext } from '../../hooks/useTheme';

import styles from './styles';
import Paragraph from '../Paragraph';
import { TextInputCustomProps } from './interfaces';
import IconFA from "react-native-vector-icons/FontAwesome";

const TextInputCustom = ({
  icon,
  label,
  value,
  iconStyle,
  placeholder,
  propsIcon = {},
  editable = true,
  multiline = false,
  stylesCustom = {
    input: {},
    wrapper: {},
    wrapperInput: {}
  },
  onBlur = () => {},
  autoCorrect = true,
  onChangeText= () => {},
  secureTextEntry = false,
  keyboardType = 'default',
}: TextInputCustomProps) => {

  const { theme } = useContext(ThemeContext);

  return (
    <View style={[styles.content, stylesCustom.wrapper]} >
      {(label) && (
        <Paragraph variant='inputLabel1' stylesCustom={ styles.label } >
          {label}
        </Paragraph>
      )}

      <View style={[
        styles.wrapperInput,
        {
          borderRadius: theme.roundness,
          backgroundColor: theme.colors.backgroundApp2
        },
        stylesCustom.wrapperInput
      ]} >
        <TextInput
          placeholderTextColor={theme.colors.text1Disable}
          style={[
            styles.input,
            { color: theme.colors.text },
            stylesCustom.input
          ]}
          value={value}
          onBlur={onBlur}
          editable={editable}
          multiline={multiline}
          autoCorrect={autoCorrect}
          placeholder={placeholder}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
        />
        { icon && <View style={styles.wrapperIcon} >
          <IconFA
            size={26}
            name={icon}
            style={[
              styles.icon,
              { color: theme.colors.text },
              iconStyle
            ]}
            {...propsIcon}
          />
        </View> }
      </View>
    </View>
  )
}

export default TextInputCustom;