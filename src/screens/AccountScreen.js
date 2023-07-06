import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, FlatList, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Button } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { useTheme } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SwipeListView } from 'react-native-swipe-list-view';
import CreditCard from '../components/CreditCard';
import Input from '../uc/Input';
import * as ImagePicker from 'expo-image-picker';
import PasswordBox from '../uc/PasswordBox'

const AccountScreen = ({navigation}) => {
  const {colors} = useTheme();

  const [selectedImage, setSelectedImage] = useState("https://lh3.googleusercontent.com/EbXw8rOdYxOGdXEFjgNP8lh-YAuUxwhOAe2jhrz3sgqvPeMac6a6tHvT35V6YMbyNvkZL4R_a2hcYBrtfUhLvhf-N2X3OB9cvH4uMw=w1064-v0");

  
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
  
    if (!result.canceled) {
      console.log(result);
      setSelectedImage(result.uri);
    } else {
      alert('You did not select any image.');
    }
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
                  fontSize: 24,
                  fontWeight: "600",
                }}>Profile</Text>
                <View style={{width: 30}}/>
        </View>

        <TouchableOpacity 
            onPress={() => {pickImageAsync()}}
            style={{
                alignItems: "center",
                justifyContent: "center",
            }}>
            <Image 
                style={{
                    width: 120,
                    height: 120,
                    borderRadius: 120

                }}
                source={{
                    uri: selectedImage
                }}
                />
        </TouchableOpacity>

        <Text style={{
          fontSize: 16, 
          fontWeight: "500",
          paddingHorizontal: 24,
          opacity: 0.6
        }}>Personal Information</Text>

        <View style={{
            paddingHorizontal: 40,
            marginTop: -40,
            gap: 10
        }}>
            <Input
            title='Full name'
            icon=''
            placeholder='Nguyen Van A'
            keyboard='default'
            />
            <Input
            title='Email'
            icon=''
            placeholder='abc@gmail.com'
            keyboard='default'
            />
        </View>

        <Text style={{
          marginTop: -20,
          fontSize: 16, 
          fontWeight: "500",
          paddingHorizontal: 24,
          opacity: 0.6
        }}>Security</Text>

        <View style={{
            paddingHorizontal: 40,
            marginTop: -40,
            gap: 10
        }}>
          <PasswordBox
            title='Password'
            placeholder='Enter new password'
            keyboard='default'
          />
        </View>

      <View 
                  style={{
                    paddingHorizontal: 30,
                  }}> 
      
                  <TouchableOpacity
                    onPress={() => {navigation.navigate("Add Address Screen")}}
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
                      Save Information
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


export default AccountScreen;

