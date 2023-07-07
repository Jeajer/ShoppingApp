import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Button } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { useTheme } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SwipeListView } from 'react-native-swipe-list-view';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CheckOutScreen = ({navigation, route: {params: {randomNumber}}}) => {
  const {colors} = useTheme();
  const [resultArray, setResultArray] = useState([]);

  const getListDataFromAsyncStorage = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(randomNumber.toString());
      if (jsonValue !== null) {
        const listData = JSON.parse(jsonValue);
        console.log('List data retrieved from AsyncStorage:', listData);
        return listData;
      }
    } catch (error) {
      console.log('Error retrieving list data from AsyncStorage:', error);
    }
    return [];
  };

  const fetchValue = async () => {
    const data = await getListDataFromAsyncStorage();
    setResultArray(data);
  };

  useEffect(() => {
    fetchValue();
  }, []);

  const calculateTotalPrice = () => {
    return resultArray.reduce((total, product) => total + product.price, 0);
  };

  return (
    <SafeAreaView style={{
      paddingVertical: 24,
      gap: 40,
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
            fontWeight: "700",
          }}>Check out</Text>
          <View style={{width: 30}}/>
      </View>

      <View style={{
        paddingHorizontal: 24,
        gap: 10,        
      }}>
        <View 
            style={{
                flexDirection: "row",
                justifyContent: "space-between"}}>
            <Text style={{
                fontSize: 18,
                fontWeight: "600",
                opacity: 0.5,
                }}>
                Shipping Address
            </Text>

            <TouchableOpacity>
                <Icon name={'pencil-circle-outline'} size={30} color={colors.text}/>
            </TouchableOpacity>
        </View>

        <View 
          style={{
            paddingHorizontal: 20,
            gap: 7
          }}>
          <Text
            style={{
                fontSize: 18,
                fontWeight: "600"}}>
            Bruno Fernandes
          </Text>
          <Text
            style={{
                fontSize: 16,
                fontWeight: "400",
                opacity: 0.5}}>
            25 rue Robert Latouche, Nice, 06200, Côte D’azur, France
          </Text>
        </View>
      </View>
      
      <View style={{
        paddingHorizontal: 24,
        gap: 10,        
      }}>
        <View 
            style={{
                flexDirection: "row",
                justifyContent: "space-between"}}>
            <Text style={{
                fontSize: 18,
                fontWeight: "600",
                opacity: 0.5,
                }}>
                Payment
            </Text>

            <TouchableOpacity>
                <Icon name={'pencil-circle-outline'} size={30} color={colors.text}/>
            </TouchableOpacity>
        </View>

        <View 
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 20,
            gap: 15,

          }}>
          <Image 
            source={{uri: "https://imageio.forbes.com/blogs-images/steveolenski/files/2016/07/Mastercard_new_logo-1200x865.jpg?format=jpg&width=1200"}}
            resizeMode="contain"
            height={80}
            width={80}
            style={{borderRadius: 24,}}/>
          <Text
            style={{
                fontSize: 16,
                fontWeight: "500",}}>
            **** **** **** 3947
          </Text>
        </View>
      </View>

      <View style={{
        paddingHorizontal: 24,
        gap: 10,        
      }}>
        <View 
            style={{
                flexDirection: "row",
                justifyContent: "space-between"}}>
            <Text style={{
                fontSize: 18,
                fontWeight: "600",
                opacity: 0.5,
                }}>
                Delivery Method
            </Text>

            <TouchableOpacity>
                <Icon name={'pencil-circle-outline'} size={30} color={colors.text}/>
            </TouchableOpacity>
        </View>

        <View 
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 20,
            gap: 15
          }}>
          <Image 
            source={{uri: "https://i.ytimg.com/vi/Wu83TlJk2og/maxresdefault.jpg"}}
            resizeMode="contain"
            height={80}
            width={80}
            style={{borderRadius: 24,}}/>
          <Text
            style={{
                fontSize: 16,
                fontWeight: "500",}}>
            Fast (2-3 days)
          </Text>
        </View>
      </View>

      <View
        style={{
          paddingHorizontal: 40,
          gap: 10,
          marginTop: 10
        }}>
        <View 
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
          <Text style={{
            fontSize: 16,
            fontWeight: "400",
            color: colors.text,
            opacity: 0.8
          }}>
            Order:
          </Text>
          <Text style={{
            fontSize: 16,
            fontWeight: "600",
            color: colors.text,
          }}>
            ${calculateTotalPrice().toLocaleString()}
          </Text>
        </View>

        <View 
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
          <Text style={{
            fontSize: 16,
            fontWeight: "400",
            color: colors.text,
            opacity: 0.8
          }}>
            Delivery:
          </Text>
          <Text style={{
            fontSize: 16,
            fontWeight: "600",
            color: colors.text,
          }}>
            ${(10).toLocaleString()}
          </Text>
        </View>

        <View 
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 7,
            justifyContent: "space-between",
          }}>
          <Text style={{
            fontSize: 16,
            fontWeight: "600",
            color: colors.text,
          }}>
            Total Price:
          </Text>
          <Text style={{
            fontSize: 16,
            fontWeight: "600",
            color: "red",
          }}>
            ${(calculateTotalPrice() + 10).toLocaleString()}
          </Text>
        </View>

        
      </View>

      <View 
            style={{
              paddingHorizontal: 30,
              marginTop: 5,
            }}> 

            <TouchableOpacity
              onPress={() => {navigation.navigate("Success Order Screen")}}
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
                SUBMIT ORDER
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

