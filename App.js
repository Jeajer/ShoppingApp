// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { StyleSheet } from 'react-native';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import TabsNavigator from './src/navigators/TabNavigator';
import { useMemo } from 'react';

const App = () => {
  const theme = useMemo(
    () => ({
      ...DefaultTheme, 
      colors: {
        ...DefaultTheme.colors, 
        background: "#f5f5f5",
        text: "#191919",
        border: "#D9D9D9",
        primary: "#191919"
        }
      }), []);
  return (
    <View style = {style.container}>
      <NavigationContainer theme={theme}>
        <TabsNavigator />
      </NavigationContainer>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  }
  }
)

export default App