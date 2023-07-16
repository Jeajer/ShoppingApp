import { React, useRef, useState, useEffect, useMemo } from 'react';
import { View, Text, TouchableOpacity, Image, StatusBar, Pressable } from 'react-native';
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomBottomTab = (props: BottomTabBarProps) => {
    const { colors } = useTheme();
    return (
        <SafeAreaView edges={["bottom"]}>
            <View style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: 'white',
                borderTopColor: '#DADADA',
                borderTopWidth: 1.5
            }}>
                {props.state.routes.map((route, i) => {
                    const isActive = i == props.state.index;
                    return (
                        <Pressable key={route.key}
                            style={{
                                flex: 1,
                                alignItems: "center",
                                justifyContent: "center",
                                flexDirection: "row",
                                paddingVertical: 10,
                                borderTopColor: '#DADADA',
                            }}
                            onPress={() => props.navigation.navigate(route.name)}>
                            <View
                                style={{
                                    width: 32,
                                    height: 32,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    backgroundColor: isActive ? colors.primary : "transparent",
                                    borderRadius: 32
                                }}>
                                <Icon name={route.name === "Home" ? "home" : route.name === "Shop" ? "shopping" : route.name === "Favorite" ? "heart" : "account"}
                                    size={24}
                                    color={isActive ? "#fff" : colors.text}
                                    style={{
                                        opacity: isActive ? 1 : 0.5,
                                    }} />
                            </View>
                            {isActive && (<Text style={{ marginLeft: 4, fontSize: 14, fontWeight: "600" }}>{route.name}</Text>)}
                        </Pressable>
                    )
                })}
            </View>
        </SafeAreaView>
    )
}
export default CustomBottomTab