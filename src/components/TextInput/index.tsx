import React, { useContext } from 'react';

import styles from './styles';
import Paragraph from '../Paragraph';
import { ThemeContext } from '../../hooks/useTheme';
import IconFA from 'react-native-vector-icons/FontAwesome';
import { TextInputCustomProps } from '../../interfaces/Iinput';
import { TextInput, TouchableOpacity, View } from 'react-native';

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
    wrapperInput: {},
  },
  onBlur = () => {},
  autoCorrect = true,
  onChangeText = () => {},
  secureTextEntry = false,
  keyboardType = 'default',
  onIconClick = () => {},
  errorMsg = '',
}: TextInputCustomProps) => {
  const {theme} = useContext(ThemeContext);

  const handleChangeText = (e: any) => {
    onChangeText(e);
  };

  return (
    <View style={[styles.content, stylesCustom.wrapper]}>
      {label ? (
        <Paragraph variant="inputLabel1" stylesCustom={styles.label}>
          {label}
        </Paragraph>
      ): null }

      <View
        style={[
          styles.wrapperInput,
          {
            borderRadius: theme.roundness,
            backgroundColor: theme.colors.backgroundApp2,
          },
          stylesCustom.wrapperInput,
        ]}>
        <TextInput
          placeholderTextColor={theme.colors.text1Disable}
          style={[styles.input, {color: theme.colors.text}, stylesCustom.input]}
          value={value}
          onBlur={onBlur}
          editable={editable}
          multiline={multiline}
          autoCorrect={autoCorrect}
          placeholder={placeholder}
          onChangeText={handleChangeText}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
        />
        {icon && (
          <View style={styles.wrapperIcon}>
            <TouchableOpacity onPress={onIconClick}>
              <IconFA
                size={26}
                name={icon}
                style={[styles.icon, {color: theme.colors.text}, iconStyle]}
                {...propsIcon}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>

      {Boolean(errorMsg) && (
        <Paragraph variant="caption" stylesCustom={{color: theme.colors.error}}>
          {errorMsg}
        </Paragraph>
      )}
    </View>
  );
};

export default TextInputCustom;
