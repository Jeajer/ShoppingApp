import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginRequestScreen from "../screens/LoginRequest";
import ProfileScreen from "../screens/ProfileScreen";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import FavoriteScreen from "../screens/FavoriteScreen";
import CartScreen from "../screens/CartScreen";


const Stack = createStackNavigator();

const screenOptionStyle = {
    headerStyle: {
        backgroundColor: "#9AC4F8",
    },
    headerTintColor: "white",
    headerBackTitle: "Back",
};

const CartNavigator = () => {

    const [initializing, setInitializing] = React.useState(true);
    const [user, setUser] = React.useState();

    useEffect(() => {
        const subscriber = FIREBASE_AUTH.onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, []);

    const onAuthStateChanged = (user) => {
        setUser(user);
        if (initializing) setInitializing(false);
    };

    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
            animation: 'simple_push',
        }}>
            {user ? (
                <Stack.Screen name="Cart Screen" component={CartScreen} />
            ) : (
                <>
                    <Stack.Screen name="Login Request Screen" component={LoginRequestScreen} />
                </>
            )}
        </Stack.Navigator>
    );
}

export default CartNavigator;
