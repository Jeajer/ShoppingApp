import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, FlatList, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Button } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { useTheme } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SwipeListView } from 'react-native-swipe-list-view';
import CreditCard from '../components/CreditCard';

const listCard = [
  {
    name:"Dinh Quang Manh",
    cvc: "123",
    number: "1234456778901111",
    expiryYear: "23",
    expiryMonth: "12",
  },
  {
    name:"Dinh Quang Manh",
    cvc: "123",
    number: "1111222233334444",
    expiryYear: "23",
    expiryMonth: "12",
  },
];

const PaymentScreen = ({navigation}) => {
  const {colors} = useTheme();

  return (
    <SafeAreaView style={{
      paddingVertical: 24,
      gap: 50,
      }}>
      <View style={{
          paddingHorizontal: 24,
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row"
        }}>
          <TouchableOpacity
           onPress={() => {navigation.goBack()}}>
            <Icon name='chevron-left' size={30} color="#000"/>
          </TouchableOpacity>
          <Text style={{
            fontSize: 24,
            fontWeight: "600",
          }}>Payment methods</Text>
          <View style={{width: 30}}/>
      </View>

      <View style={{height: '63%'}}>
      <FlatList 
            contentContainerStyle={{
                gap: 24,
              }}
            data={listCard}
            renderItem={({item, index}) => {
            return (
              <CreditCard
              name={item.name}
              number={item.number}
              expiryYear={item.expiryYear}
              expiryMonth={item.expiryMonth}/>
            )
        }}/>
      </View>

      <View 
            style={{
              paddingHorizontal: 30,
            }}> 

            <TouchableOpacity
              onPress={() => {navigation.navigate("Add Card Screen")}}
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
                Add new card
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


export default PaymentScreen;

