import {
  DarkTheme as navigationDarkTheme,
  DefaultTheme as navigationDefaultTheme
} from '@react-navigation/native';
import {
  DarkTheme as paperDarkTheme,
  DefaultTheme as paperDefaultTheme,

} from 'react-native-paper';

interface Font {
  fontFamily: string;
  fontWeight?: 
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900'
    | 'normal'
};

interface Fonts {
  regular: Font;
  medium: Font;
  light: Font;
  thin: Font;
};

interface Colors {
  card: string;
  text: string;
  text2: string;
  error: string;
  accent: string;
  border: string;
  warning: string;
  primary: string;
  surface: string;
  success: string;
  disabled: string;
  backdrop: string;
  onSurface: string;
  background: string;
  placeholder: string;
  notification: string;
  text1Disable: string;
  backgroundApp: string;
  backgroundApp2: string;
}

export interface ThemeProps {
  dark: boolean;
  roundness: number;
  heightHeader: number;
  heightHeaderGoBAck: number;
  mode?: 'adaptive' | 'exact';
  fonts: Fonts;
  animation: {
      scale: number;
  };
  colors: Colors;
  // Eliminar
  background: string;
  primary: string;
  headerbackground: string;
  secondary: string;
  basic: string;
  buttonColor: string;
  success: string;
  white: string;
  danger: string;
  secondaryCard: string;
  colorText2: string;
  secondaryBackground: string;
  backgroundApp2: string;
  colorText1Disable: string;
  textColor: string;
}

export const themeGlobal = {
  roundness: 8,
  heightHeader: 65,
  heightHeaderGoBAck: 65,
  colors: {
    success: 'green',
    primary: '#3D4B66',
  }
}

const CombinedDefaultTheme = {
  ...paperDefaultTheme,
  ...navigationDefaultTheme,
  ...themeGlobal,
  colors: {
    ...paperDefaultTheme.colors,
    ...navigationDefaultTheme.colors,
    ...themeGlobal.colors,
    text: '#7F7F7F',
    text2: '#FFFFFF',
    warning: '#de8909',
    backgroundApp: "#EFEFEF",
    backgroundApp2: "#CFCFCF",
    text1Disable: 'rgba(156, 156, 156, 0.4)'
  },
};

const CombinedDarkTheme = {
  ...paperDarkTheme,
  ...navigationDarkTheme,
  ...themeGlobal,
  colors: {
    ...paperDarkTheme.colors,
    ...navigationDarkTheme.colors,
    ...themeGlobal.colors,
    text: '#9C9C9C',
    text2: '#FFFFFF',
    warning: '#190f00',
    backgroundApp: "#272727",
    backgroundApp2: "#3A3A3A",
    text1Disable: 'rgba(156, 156, 156, 0.4)'
  },
};

export const lightTheme: ThemeProps = {
  ...CombinedDefaultTheme,
  basic: "rgba(0, 0, 0, 0.5)",
  secondary: "#f5f5f5",
  background: "#ffffff",
  headerbackground: "#CFCFCF",
  primary: "#2960CA",
  buttonColor: "#ffffff",
  white: "#ffffff",
  danger: "#EF1907",
  success: '#3FAC9F',
  secondaryCard: "#ffffff",
  secondaryBackground: "#CFD6E2",
  textColor: 'rgba(0, 0, 0, 0.5)',
  // New styles
  colorText2: '#FFFFFF',
  backgroundApp2: "#3A3A3A",
  colorText1Disable: 'rgba(156, 156, 156, 0.4)',
};

export const darkTheme: ThemeProps = {
  ...CombinedDarkTheme,
  background: "#373737",
  headerbackground: "#5C5C5C",
  secondary: "rgba(0, 45, 133, 0.5)",
  basic: "rgba(255, 255, 255, 0.5)",
  primary: "#000935",
  buttonColor: "#81D9FF",
  success: '#3FAC9F',
  white: "#ffffff",
  danger: "#E96A5F",
  secondaryCard: "rgba(0, 45, 133, 0.5)",
  secondaryBackground: "#001240",
  textColor: 'rgba(255, 255, 255, 0.5)',
  // New styles
  colorText2: '#FFFFFF',
  backgroundApp2: "#3A3A3A",
  colorText1Disable: 'rgba(156, 156, 156, 0.4)',
};
