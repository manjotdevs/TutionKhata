import * as React from 'react';
import { AppRegistry, useColorScheme } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { name as appName } from './app.json';
import App from './App';
import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';
import { LightTheme } from './src/Themes/LightTheme';
import { DarkTheme } from './src/Themes/DarkTheme';

const LightScheme = {
  ...MD3LightTheme,
  colors: LightTheme
}

const DarkScheme = {
  ...MD3DarkTheme,
  colors: DarkTheme
}

export default function Main() {
  const colorshemes = useColorScheme()
  const theme = colorshemes === "dark" ? DarkScheme: LightScheme
  
  return (
    <PaperProvider theme={theme}>
      <App/>
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);