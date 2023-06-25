import 'react-native-gesture-handler';
import React from 'react';
import ThemeContextProvider from './src/hooks/useTheme';
import AppContainer from './src/navigation/AppContainer';
import AppStateManager from './src/context/AppStateManager';
import {RootSiblingParent} from 'react-native-root-siblings';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  return (
    <RootSiblingParent>
      <SafeAreaProvider>
        <ThemeContextProvider>
          <AppStateManager>
            <AppContainer />
          </AppStateManager>
        </ThemeContextProvider>
      </SafeAreaProvider>
    </RootSiblingParent>
  );
};

export default App;
