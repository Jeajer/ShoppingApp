import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import DetailsScreen from "../screens/DetailsScreen";
import CartScreen from "../screens/CartScreen";
import TabNavigator from "./TabNavigator"

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#9AC4F8",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
};

const StacksNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home Screen" component={TabNavigator} />
      <Stack.Screen name="Details Screen" component={DetailsScreen} />
    </Stack.Navigator>
  );
}

export default StacksNavigator;
