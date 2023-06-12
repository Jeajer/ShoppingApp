import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Button } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { useTheme } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SwipeListView } from 'react-native-swipe-list-view';

const CheckOutScreen = ({navigation}) => {
  const {colors} = useTheme();

  return (
    <SafeAreaView 
        style={{
            alignItems: "center",
            gap: 10,
            marginTop: 130
    }}>
        <View
            style={{
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                gap:10
            }}>
            <Text style={{fontSize: 40, fontWeight: "600"}}>
                Success!
            </Text>

            <Image 
            source={{uri: "https://cdn-icons-png.flaticon.com/512/7518/7518748.png"}}
            resizeMode="contain"
            height={40}
            width={40}/>
        </View>   
        <Image 
            source={{uri: "https://cdn.dribbble.com/users/2058848/screenshots/4369325/nikebox_jason.gif"}}
            resizeMode="contain"
            height={300}
            width={400}
            style={{borderRadius: 24,}}/>
        <Text style={{fontSize: 20, fontWeight: "500", opacity: 0.5}}>
            Your order will be delivered soon.{"\n"}
            Thank you for choosing our app!
        </Text>

        <View 
            style={{
              paddingHorizontal: 30,
              marginTop: 25,
              width: 400
            }}> 

            <TouchableOpacity
              onPress={() => {navigation.navigate("Home Screen")}}
              style={{
                backgroundColor: colors.primary,
                height: 64,
                borderRadius: 64,
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: "row",
                padding: 12,
              }}
            >
                <View/>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  color: colors.background,
                }}
              >
                Back To My Favorite
              </Text>

              <View
                style={{
                  backgroundColor: colors.card,
                  width: 40,
                  aspectRatio: 1,
                  borderRadius: 40,
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                <Icon name={"arrow-right"} size={24} color={colors.text} />
              </View>
            </TouchableOpacity>
          
        </View>    
    </SafeAreaView>
  );
};


export default CheckOutScreen;

