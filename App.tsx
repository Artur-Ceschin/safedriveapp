import React from 'react';
import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import AppLoading from 'expo-app-loading';
import { NativeBaseProvider, Box, extendTheme } from 'native-base';
import { Routes } from './src/routes';
import {
  Poppins_400Regular,
  Poppins_700Bold,
  useFonts,
} from '@expo-google-fonts/poppins';

export default function App() {
  const theme = extendTheme({
    colors: {
      primary: {
        50: '#e0f3ff',
        100: '#b8d7f9',
        200: '#8ebcf0',
        300: '#63a1e7',
        400: '#3987df',
        500: '#206dc6',
        600: '#15559b',
        700: '#0b3d70',
        800: '#022446',
        900: '#000d1d',
      },
    }
  });
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <NativeBaseProvider theme={theme}>
        <Routes />
      </NativeBaseProvider>
    );
  }
}
