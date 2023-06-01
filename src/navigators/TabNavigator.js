import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from "../screens/HomeScreen";
import DetailsScreen from "../screens/DetailsScreen";
import CartScreen from "../screens/CartScreen";
import CustomBottomTab from "../components/CustomBottomTab";
import Login from '../screens/Login';
import ProfileNavigator from './AuthNavigator';

const Tab = createBottomTabNavigator();

const TabsNavigator = () => {
    return (
      <Tab.Navigator 
        screenOptions={{
          tabBarShowLabel: false, 
          headerShown: false}}
        tabBar={(props) => <CustomBottomTab {...props}/>}>
        <Tab.Screen name="Home"
                    component={HomeScreen}
                    options={{
                      tabBarIcon(props) {
                        return <Icon size={24} color="black" name="home" />}
                    }}/>
        <Tab.Screen name="Shop" 
                    component={CartScreen} 
                    options={{
                      tabBarIcon(props) {
                        return <Icon size={24} color="black" name="shopping" />}
                    }}/>
        <Tab.Screen name="Cart" 
                    component={CartScreen} 
                    options={{
                      tabBarIcon(props) {
                        return <Icon size={24} color="black" name="cart" />}
                    }}/>
        <Tab.Screen name="Account" 
                    component={ProfileNavigator} 
                    options={{
                      tabBarIcon(props) {
                        return <Icon size={24} color="black" name="account" />}
                    }}/>
      </Tab.Navigator>
    );
  };

export default TabsNavigator;