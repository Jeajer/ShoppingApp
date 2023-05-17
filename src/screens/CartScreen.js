import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CartScreen = () => {
    return (
        <View style={styles.center}>
          <Text>This is the cart screen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    },
});

export default CartScreen;
