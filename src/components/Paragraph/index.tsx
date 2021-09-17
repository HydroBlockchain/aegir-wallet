import React, { useContext } from 'react';

import { Text } from 'react-native';
import { ParagraphProps } from './interfaces';
import { ThemeContext } from '../../hooks/useTheme';

/* styles */
import styles from './styles';

const Paragraph = ({
  variant,
  children,
  numberOfLines = 0,
  stylesCustom = {},
  ellipsizeMode = 'middle',
  adjustsFontSizeToFit = false,
}: ParagraphProps) => {
  const { theme } = useContext(ThemeContext);
  
  return (
    <Text
      style={[
        styles[variant],
        { color: theme.colors.text },
        stylesCustom,
      ]}
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
      adjustsFontSizeToFit={adjustsFontSizeToFit}
    >
      { children }
    </Text>
  )
}

export default Paragraph;
