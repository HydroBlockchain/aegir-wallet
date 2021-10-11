import React, { useContext } from "react";

import { View } from 'react-native';
import { ThemeContext } from "../../hooks/useTheme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Children } from "../../interfaces/ComponentInterface";

interface Props {
  style?: any,
  children?: Children | Children[],
}

const BgView = ({ children, style }: Props) => {
  const insets = useSafeAreaInsets();
  const { theme } = useContext(ThemeContext);

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
          top: insets.top - 15,
          paddingBottom: insets.top,
          ...style,
        }}
      >
        {children}
      </View>
    </View>
  );
};

export default BgView;