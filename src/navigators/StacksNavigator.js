import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import DetailsScreen from "../screens/DetailsScreen";
import CartScreen from "../screens/CartScreen";
import ProfileNavigator from "./AuthNavigator";
import TabNavigator from "./TabNavigator";
import OnboardingScreen from "../screens/OnboardingScreen";
import CheckOutScreen from "../screens/CheckOutScreen";
import SuccessOrderScreen from "../screens/SuccessOrderScreen";
import ProductDetailScreen from "../screens/ProductDetailScreen";

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
      <Stack.Screen name="Onboarding Screen" component={OnboardingScreen} />
      <Stack.Screen name="Home Screen" component={TabNavigator} />
      <Stack.Screen name="Details Screen" component={DetailsScreen} />
      <Stack.Screen name="Check Out Screen" component={CheckOutScreen} />
      <Stack.Screen name="Success Order Screen" component={SuccessOrderScreen} />
      <Stack.Screen name="Cart Screen" component={CartScreen} />
      <Stack.Screen name="Profile Screen" component={ProfileNavigator} />
    </Stack.Navigator>
  );
}
export default StacksNavigator;
