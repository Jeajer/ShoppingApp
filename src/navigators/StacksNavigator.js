// ./navigation/StackNavigator.js

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import DetailsScreen from "../screens/DetailsScreen";
import CartScreen from "../screens/CartScreen";
import Login from "../screens/Login";
import Signup from "../screens/Signup";


const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#9AC4F8",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
};

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home Screen" component={HomeScreen} />
      <Stack.Screen name="Details Screen" component={DetailsScreen} />
    </Stack.Navigator>
  );
}

const CartStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Cart Screen" component={CartScreen} />
    </Stack.Navigator>
  );
}

const FirstStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login Screen" component={Login} />
      <Stack.Screen name="Signup Screen" component={Signup} />
    </Stack.Navigator>
  )
}

export { MainStackNavigator, CartStackNavigator, FirstStackNavigator };
