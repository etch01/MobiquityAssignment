/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
 // App is too simple im not gonna use redux xD
import React from 'react';
import type {Node} from 'react';
import {
  useColorScheme,
  SafeAreaView,
  StatusBar
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import Home from './src/Screens/Home';

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : '#fff',
    flex:1,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Home/>
    </SafeAreaView>
  );
};

export default App;
