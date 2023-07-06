import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import ProfileScreen from "../screens/ProfileScreen";
import { FIREBASE_AUTH } from "../../firebaseConfig";


const Stack = createStackNavigator();

const screenOptionStyle = {
    headerStyle: {
        backgroundColor: "#9AC4F8",
    },
    headerTintColor: "white",
    headerBackTitle: "Back",
};

const ProfileNavigator = () => {

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
                <Stack.Screen name="Profile Screen" component={ProfileScreen} />
            ) : (
                <>
                    <Stack.Screen name="Login Screen" component={Login} />
                    <Stack.Screen name="Signup Screen" component={Signup} />
                </>
            )}
        </Stack.Navigator>
    );
}

export default ProfileNavigator;
