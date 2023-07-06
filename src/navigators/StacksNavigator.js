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
import ProfileScreen from "../screens/ProfileScreen";
import PaymentScreen from "../screens/PaymentScreen";
import AddCardScreen from "../screens/AddCardScreen";
import OrderScreen from "../screens/OrderScreen";
import AddressScreen from "../screens/AddressScreen";
import AddAddressScreen from "../screens/AddAddressScreen";
import AccountScreen from "../screens/AccountScreen";
import ChangePasswordScreen from "../screens/ChangPasswordScreen";
import ResetPasswordScreen from "../screens/ResetPassword";
import DeleteAccountScreen from "../screens/DeleteAccountScreen";
import ReAuthentication from "../screens/ReAuthentication";
import SecondhandScreen from "../screens/SecondhandScreen";
import DetailOrderScreen from "../screens/DetailOrderScreen";

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
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding Screen" component={OnboardingScreen} />
      <Stack.Screen name="Home Screen" component={TabNavigator} />
      <Stack.Screen name="Details Screen" component={DetailsScreen} />
      <Stack.Screen name="Check Out Screen" component={CheckOutScreen} />
      <Stack.Screen name="Success Order Screen" component={SuccessOrderScreen} />
      <Stack.Screen name="Cart Screen" component={CartScreen} />
      <Stack.Screen name="Profile Screen" component={ProfileNavigator} />
      <Stack.Screen name="Profile1 Screen" component={ProfileScreen} />
      <Stack.Screen name="Payment Screen" component={PaymentScreen} />
      <Stack.Screen name="Add Card Screen" component={AddCardScreen} />
      <Stack.Screen name="Order Screen" component={OrderScreen} />
      <Stack.Screen name="Address Screen" component={AddressScreen} />
      <Stack.Screen name="Add Address Screen" component={AddAddressScreen} />
      <Stack.Screen name="Account Screen" component={AccountScreen} />
      <Stack.Screen name="Change Password Screen" component={ChangePasswordScreen} />
      <Stack.Screen name="Reset Password Screen" component={ResetPasswordScreen} />
      <Stack.Screen name="Delete Account Screen" component={DeleteAccountScreen} />
      <Stack.Screen name="Re-Authentication Screen" component={ReAuthentication} />
      <Stack.Screen name="Secondhand Screen" component={SecondhandScreen} />
      <Stack.Screen name="Detail Order Screen" component={DetailOrderScreen} />
    </Stack.Navigator>
  );
}
export default StacksNavigator;
