import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import DetailsScreen from "../screens/DetailsScreen";
import CartScreen from "../screens/CartScreen";
import ProfileNavigator from "./AuthNavigator";
import TabNavigator from "./TabNavigator";

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
<<<<<<< HEAD
      <Stack.Screen name="Cart Screen" component={CartScreen} />
    </Stack.Navigator>
  );
}

=======
      <Stack.Screen name="Profile Screen" component={ProfileNavigator} />
    </Stack.Navigator>
  );
}

// const CartStackNavigator = () => {
//   return (
//     <Stack.Navigator screenOptions={{headerShown: false}}>
//       <Stack.Screen name="Cart Screen" component={CartScreen} />
//     </Stack.Navigator>
//   );
// }

// const FirstStackNavigator = () => {
//   return (
//     <Stack.Navigator screenOptions={{headerShown: false}}>
//       <Stack.Screen name="Login Screen" component={Login} />
//       <Stack.Screen name="Signup Screen" component={Signup} />
//     </Stack.Navigator>
//   )
// }

>>>>>>> 547e54289efabc6ec10ed4eada1245b1b6d53f41
export default StacksNavigator;
