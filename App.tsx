import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {GluestackUIProvider, useColorMode} from '@gluestack-ui/themed';
import {NavigatorScreen} from './src/navigation';
import {config} from './src/config/customTheme';
const App = () => {
  const colorMode = useColorMode();
  const isDarkMode = useColorScheme() === colorMode;

  const backgroundStyle = {
    backgroundColor: isDarkMode ? 'white' : 'black',
    // height: '100%',
  };

  return (
    <>
      <StatusBar
        barStyle={isDarkMode ? 'dark-content' : 'light-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <GluestackUIProvider config={config} colorMode={'light'}>
        <NavigatorScreen />
      </GluestackUIProvider>
    </>
  );
};

export default App;
