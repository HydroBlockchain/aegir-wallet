import React, { useContext } from "react";

import { Platform, View } from 'react-native';
import { ThemeContext } from "../../hooks/useTheme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Children } from "../../interfaces/ComponentInterface";
import { getStatusBarHeight } from 'react-native-status-bar-height';

interface Props {
  style?: any,
  children?: Children | Children[],
}

const BgView = ({ children, style }: Props) => {
  const insets = useSafeAreaInsets();
  const { theme } = useContext(ThemeContext);
  console.log('insets', insets)
  console.log('getStatusBarHeight', getStatusBarHeight())
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.backgroundApp,
      }}
    >
      <View
        style={{
          ...insets,
          flex: 1,
          top: Platform.OS === 'ios' ? insets.top - getStatusBarHeight() : insets.top - getStatusBarHeight(),
          paddingBottom: Platform.OS === 'ios' ? insets.bottom + 20 : insets.top - getStatusBarHeight(),
          ...style,
        }}
      >
        {children}
      </View>
    </View>
  );
};

export default BgView;