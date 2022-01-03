import React, { useContext } from 'react'
import { TouchableOpacity, View } from 'react-native'
import IconFA from 'react-native-vector-icons/FontAwesome';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './styles'
import { ThemeContext } from '../../hooks/useTheme';
import { ItextInputIcon } from '../../interfaces/Iinput';

const TextInputIcon = ({
  icon,
  iconType,
  iconStyle,
  propsIcon,
  onIconClick,
}: ItextInputIcon) => {
  const { theme } = useContext(ThemeContext);

  const icons = {
    default: IconFA,
    MaterialCommunityIcons: IconMCI
  }

  const Icon = icons[iconType];
  
  return (
    <View style={styles.wrapperIcon}>
      <TouchableOpacity onPress={onIconClick}>
        <Icon
          size={26}
          name={icon}
          style={[styles.icon, {color: theme.colors.text}, iconStyle]}
          {...propsIcon}
        />
      </TouchableOpacity>
    </View>
  )
}

export default TextInputIcon
