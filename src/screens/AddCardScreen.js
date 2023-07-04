import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, FlatList, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Button } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { useTheme } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SwipeListView } from 'react-native-swipe-list-view';
import CreditCard from '../components/CreditCard';
import Input from '../uc/Input'

const AddCardScreen = ({navigation}) => {
  const {colors} = useTheme();

  const [name, setName] = useState();
  const [number, setNumber] = useState();
  const [month, setMonth] = useState();
  const [year, setYear] = useState();

  const formatCreditCardNumber = (value) => {
    if (!value) {
        return '';
      }
  
      // Remove all non-digit characters from the input string
      const formattedNumber = value.replace(/\D/g, '');
  
      // Apply the desired formatting
      let formattedString = ''
  
      // Add space after every 4 digits
      for (let i = 0; i < formattedNumber.length; i++) {
        if (i > 0 && i % 4 === 0) {
          formattedString += '     ';
        }
        formattedString += formattedNumber[i];
      }
  
      return formattedString;
  };

  const handleNameChange = (text) => {
    setName(text);
  };

  const handleNumberChange = (text) => {
    const formattedNumber = formatCreditCardNumber(text);
    setNumber(formattedNumber);
  };

  const handleMonthYearChange = (text) => {
    setMonth(text.substring(0, 2));
    setYear(text.substring(3, 5));
  };

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
            fontSize: 20,
            fontWeight: "600",
          }}>Add new card</Text>
          <View style={{width: 30}}/>
      </View>

      <CreditCard
        name = {name}
        number = {number}
        expiryMonth = {month}
        expiryYear = {year}/>

      <View style={{
        paddingHorizontal: 30,
        marginTop: -10,
        }}>
        <Input
            onChangeText={handleNameChange}
            title='Name on card'
            icon=''
            placeholder='Nguyen Van A'
            keyboard='default'
        />
        <View style={{width: "60%"}}>
          <Input
            onChangeText={handleNumberChange}
            title='Card Number'
            icon='credit-card'
            placeholder='000 0000 0000 0000'
            keyboard='default'
            maxLength={16}
            />
        </View>
        <View style={{width: "40%"}}>
          <Input
            style={{marginRight: 100}}
            onChangeText={handleMonthYearChange}
            title='Value on card'
            icon='calendar-range'
            placeholder='MM/YY'
            keyboard='default'
            maxLength={5}
        />
        </View>
      </View>

      <View 
            style={{
              paddingHorizontal: 30,
            }}> 

            <TouchableOpacity
              onPress={() => {navigation.navigate("Cart Screen")}}
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


export default AddCardScreen;

