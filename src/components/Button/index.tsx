import React, { useContext } from 'react'

import styles from './styles';
import Paragraph from '../Paragraph';
import { ButtonProps } from './interfaces';
import { TouchableOpacity } from 'react-native';
import { ThemeContext } from '../../hooks/useTheme';

const Button = ({
  text,
  styleText = {},
  styleCustom = {},
  onPress = () => {},
  variant = 'default',
}: ButtonProps) => {

  const { theme } = useContext(ThemeContext);

  const style: object[] = [
    styles.buttonGlobal,
    styles[`button${variant[0].toLocaleUpperCase() + variant.slice(1)}`]
  ];

  const styleTextDefault: object[] = [
    styles.buttonTextGlobal,
  ];

  if(variant === 'default') {
    style.push({ backgroundColor: theme.colors.primary });
    styleTextDefault.push({ color: theme.colors.text2 });
  } else if(variant === 'grey') {
    style.push({ backgroundColor: theme.colors.backgroundApp2 })
  } else if(variant === 'outlined') {
    style.push({ borderColor: theme.colors.backgroundApp2 })
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        style,
        { borderRadius: theme.roundness },
        styleCustom
      ]}
    >
      <Paragraph variant='button' stylesCustom={[
        styleTextDefault,
        styleText
      ]} >
        {text}
      </Paragraph>
    </TouchableOpacity>
  )
}

export default Button;