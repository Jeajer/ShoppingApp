import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from "../screens/HomeScreen";
import ShoppingScreen from "../screens/ShoppingScreen";
import DetailsScreen from "../screens/DetailsScreen";
import FavoriteScreen from "../screens/FavoriteScreen";
import CustomBottomTab from "../components/CustomBottomTab";
<<<<<<< HEAD
import Login from "../screens/Login";
=======
import Login from '../screens/Login';
import ProfileNavigator from './AuthNavigator';
>>>>>>> 547e54289efabc6ec10ed4eada1245b1b6d53f41

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
                    component={ShoppingScreen} 
                    options={{
                      tabBarIcon(props) {
                        return <Icon size={24} color="black" name="shopping" />}
                    }}/>
        <Tab.Screen name="Favorite" 
                    component={FavoriteScreen} 
                    options={{
                      tabBarIcon(props) {
                        return <Icon size={24} color="black" name="heart" />}
                    }}/>
        <Tab.Screen name="Account" 
<<<<<<< HEAD
                    component={Login} 
=======
                    component={ProfileNavigator} 
>>>>>>> 547e54289efabc6ec10ed4eada1245b1b6d53f41
                    options={{
                      tabBarIcon(props) {
                        return <Icon size={24} color="black" name="account" />}
                    }}/>
      </Tab.Navigator>
    );
  };

export default TabsNavigator;