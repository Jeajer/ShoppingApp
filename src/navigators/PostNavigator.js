import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ListPostScreen from '../screens/ListPostScreen';
import MyPostScreen from '../screens/MyPostScreen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Tab = createMaterialTopTabNavigator();

const PostNavigator = () => {
  return (
    <Tab.Navigator
        initialRouteName="Feed"
        screenOptions={{
        tabBarActiveTintColor: 'black',
        tabBarLabelStyle: { fontSize: 14, fontWeight: "600" },
        tabBarStyle: { marginTop: 20},}}>
      <Tab.Screen 
        name="List Post Screen" component={ListPostScreen} options={{tabBarLabel: "Community"}}/>
      <Tab.Screen 
        name="My Post Screen" component={MyPostScreen} options={{tabBarLabel: "My Post"}}/>
    </Tab.Navigator>
  );
}
export default PostNavigator;