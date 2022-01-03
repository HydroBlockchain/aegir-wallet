import React, { useContext } from 'react';
import { TextInput, View } from 'react-native';


import styles from './styles';
import Paragraph from '../Paragraph';
import TextInputIcon from './TextInputIcon';
import { ThemeContext } from '../../hooks/useTheme';
import { TextInputCustomProps } from '../../interfaces/Iinput';

const TextInputCustom = ({
  icon,
  label,
  value,
  placeholder,
  errorMsg = '',
  iconStyle = {},
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
  iconType = 'default',
  onIconClick = () => {},
  onChangeText = () => {},
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
}: TextInputCustomProps) => {
  const { theme } = useContext(ThemeContext);

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
          keyboardType={keyboardType}
          onChangeText={handleChangeText}
          autoCapitalize={autoCapitalize}
          secureTextEntry={secureTextEntry}
        />

        {icon && (
          <TextInputIcon
            icon={icon}
            iconType={iconType}
            propsIcon={propsIcon}
            iconStyle={iconStyle}
            onIconClick={onIconClick}
          />
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
