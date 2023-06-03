import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, useColorScheme } from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  Theme,
} from "@react-navigation/native";
import StacksNavigator from "./src/navigators/StacksNavigator";
import { useMemo } from "react";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  const colorScheme = useColorScheme();

  const theme: Theme = useMemo(
    () =>
      colorScheme === "dark"
        ? {
            ...DarkTheme,
            colors: {
              ...DarkTheme.colors,
              primary: "#fff",
              text: "#fff",
            },
          }
        : {
            ...DefaultTheme,
            colors: {
              ...DefaultTheme.colors,
              background: "#f5f5f5",
              text: "#191919",
              border: "#D9D9D9",
              primary: "#191919",
            },
          },
    [colorScheme]
  );

  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <GestureHandlerRootView style={styles.container}>
        <NavigationContainer theme={theme}>
          <BottomSheetModalProvider>
            <StacksNavigator />
          </BottomSheetModalProvider>
          <StatusBar  />
        </NavigationContainer>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}


export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
<<<<<<< HEAD
  },
});
=======
  }
  }
)
>>>>>>> 547e54289efabc6ec10ed4eada1245b1b6d53f41
