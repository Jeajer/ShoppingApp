import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import DeliveredScreen from "../screens/DeliveredScreen";
import ProcessingScreen from "../screens/ProcessingScreen";
import CanceledScreen from "../screens/CanceledScreen";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Tab = createMaterialTopTabNavigator();

const OrderNavigator = () => {
  return (
    <Tab.Navigator
        initialRouteName="Feed"
        screenOptions={{
        tabBarActiveTintColor: '#e91e63',
        tabBarLabelStyle: { fontSize: 14, fontWeight: "600" },
        tabBarStyle: { marginTop: 20},}}>
      <Tab.Screen 
        name="Delivered Screen" component={DeliveredScreen} options={{tabBarLabel: "Delivered"}}/>
      <Tab.Screen 
        name="Processing Screen" component={ProcessingScreen} options={{tabBarLabel: "Processing"}}/>
      <Tab.Screen 
        name="Canceled Screen" component={CanceledScreen} options={{tabBarLabel: "Canceled"}}/>
    </Tab.Navigator>
  );
}
export default OrderNavigator;