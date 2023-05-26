import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import HomeScreen from '../screens/HomeScreen';
import { View } from 'react-native';
import { CartStackNavigator, MainStackNavigator, FirstStackNavigator } from './StacksNavigator';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

const TabsNavigator = () => {
    return (
      <Tab.Navigator screenOptions={{tabBarShowLabel: false, headerShown: false}}>
        <Tab.Screen name="Home"
                    component={MainStackNavigator}
                    options={{
                      tabBarIcon(props) {
                        return <Icon size={24} color="black" name="home" />}
                    }}/>
        <Tab.Screen name="Shop" 
                    component={CartStackNavigator} 
                    options={{
                      tabBarIcon(props) {
                        return <Icon size={24} color="black" name="shopping" />}
                    }}/>
        <Tab.Screen name="Cart" 
                    component={CartStackNavigator} 
                    options={{
                      tabBarIcon(props) {
                        return <Icon size={24} color="black" name="cart" />}
                    }}/>
        <Tab.Screen name="Account" 
                    component={FirstStackNavigator} 
                    options={{
                      tabBarIcon(props) {
                        return <Icon size={24} color="black" name="account" />}
                    }}/>
      </Tab.Navigator>
    );
  };

export default TabsNavigator;