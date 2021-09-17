import React, { createContext, useEffect, useState } from "react";

import { StatusBar } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { lightTheme, darkTheme, ThemeProps } from "../libs/Theme";

interface ThemeContexProps {
  theme: ThemeProps;
  isLightTheme: boolean;
  toggleTheme: () => void;
}

//create global context object
export const ThemeContext = createContext({} as ThemeContexProps);

//Create provider
const ThemeContextProvider = (props) => {
  const [ theme, setTheme ] = useState(darkTheme);
  const [ isLightTheme, setIsLightTheme ] = useState(false);

  useEffect(() => {
    setTheme((isLightTheme) ? lightTheme : darkTheme);
  }, [ isLightTheme ]);

  const toggleTheme = () => {
    setIsLightTheme((prevState) => !prevState);
  };

  const preferences = {
    theme,
    toggleTheme,
    isLightTheme,
  };

  return (
    <ThemeContext.Provider value={preferences} >
      <PaperProvider theme={theme} >
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.backgroundApp} />
        {props.children}
      </PaperProvider>
    </ThemeContext.Provider>
  );
};
export default ThemeContextProvider;