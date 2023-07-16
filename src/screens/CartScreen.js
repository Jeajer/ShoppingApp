import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Button } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { useTheme } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SwipeListView } from 'react-native-swipe-list-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../firebaseConfig';
import { doc, setDoc, getDoc, collection, query, where, getDocs, deleteDoc, updateDoc } from 'firebase/firestore';



const CartScreen = ({navigation}) => {
  const {colors} = useTheme();
  
  const [product, setProduct] = useState();
  const [total, setTotal] = useState(null); 
  const [count, setCount] = useState(1);
  const [text, onChangeText] = useState('');
  const [randomNumber, setRandomNumber] = useState(0);

  const user = FIREBASE_AUTH.currentUser;
  const listData = [];

  const [resultArray, setResultArray] = useState([]);

  const QuantityPlus = (value) => {
    
    const prevIndex = resultArray.findIndex(item => item.id === value);
    setCount((count) => Math.max(1, resultArray[prevIndex].quantity + 1));
    updateItemQuantity(value, count);
  }

  const updateItemQuantity = (itemId, newQuantity) => {
    // Tìm phần tử cần cập nhật dựa trên itemId
    const itemIndex = data.findIndex(item => item.id === itemId);
  
    if (itemIndex !== -1) {
      // Tạo một bản sao của nguồn dữ liệu (data)
      const updatedData = [...resultArray];
      
      // Cập nhật số lượng của phần tử
      updatedData[itemIndex].quantity = newQuantity;
  
      // Cập nhật nguồn dữ liệu (data) của FlatList
      setResultArray(updatedData);
    }
  };

  const onRowDidOpen = (rowKey) => {
    console.log('This row opened', rowKey);
  };

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
        rowMap[rowKey].closeRow();
    }
  };

  const removeFromFavourite = async (id) => {
    try {
      await deleteDoc(doc(FIREBASE_DB, "Users", user.uid, "Carts", id));
    } catch (error) {
      console.log(error.message)
    }
  }

  const deleteRow = (rowMap, rowKey, id) => {
    closeRow(rowMap, rowKey);
    const newData = [...resultArray];
    const prevIndex = resultArray.findIndex(item => item.key === rowKey);
    removeFromFavourite(id);
    newData.splice(prevIndex, 1);
    setResultArray(newData);
  };

  const handlePlusQuan = async (rowKey, rowMap) => {
    const index = resultArray.findIndex(item => item.id === rowKey);
    const item = resultArray[index];
    const newQuantity = item.quantity + 1;
    const newItem = { ...item, quantity: newQuantity };
    const newList = [...resultArray];
    newList[index] = newItem;
    setResultArray(newList);
  }

  const handleMinusQuan = async (rowKey, rowMap) => {
    const index = resultArray.findIndex(item => item.id === rowKey);
    const item = resultArray[index];
    if (item.quantity > 1) {
      const newQuantity = item.quantity - 1;
      const newItem = { ...item, quantity: newQuantity };
      const newList = [...resultArray];
      newList[index] = newItem;
      setResultArray(newList);

    }
  }

  const checkOut = () => {
    navigation.navigate("Check Out Screen");
  };

  

  const fetchValue = async () => {
    const querySnapshot = await getDocs(collection(FIREBASE_DB, "Users", user.uid, "Carts"));
    let productQuery = Object.freeze({ name: "Score", points: 157 });
    const listData = [];
    const pCount = {};
    querySnapshot.forEach((doc) => {
      listData.push({
        imageUrl: doc.data().img,
        title: doc.data().name,
        price: doc.data().price,
        id: doc.id,
        description: doc.data().description,
        color: doc.data().color,
        quantity: doc.data().quantity,
      })
    })
    productQuery = listData;
    setResultArray(productQuery);
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
      gap: 10,
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
          }}>My cart</Text>
          <View style={{width: 30}}/>
      </View>
      
      <View 
        style={{
          height: "58%",
          paddingVertical: 5,
          }}>
        <SwipeListView
          data={resultArray}
          contentContainerStyle={{paddingHorizontal: 16}}
          renderItem={ (data, rowMap) => {
            return(
            <View 
              style={{
                flex: 1,
                backgroundColor: colors.background, 
                height: 150, 
                padding: 6,
                
              }}>
              <View 
                style={{
                flexDirection: "row",  
                gap: 8,
                alignItems: "flex-end",
                justifyContent: "space-between"
              }}>
                <Image
                    source={{uri: data.item.imageUrl}}
                    resizeMode="contain"
                    height={120}
                    width={120}
                    style={{borderRadius: 24,}}/>

                <View style={{padding: 12, flex: 1, gap: 6}}>
                  <Text 
                      style={{
                        fontSize: 15, 
                        fontWeight: "500",
                        color: colors.text,
                        textShadowColor: "rgba(0,0,0,0.2)",
                        textShadowOffset: {
                          height: 1,
                          width: 0,
                        },
                        textShadowRadius: 4,
                      }}>
                          {data.item.name}
                  </Text>

                  <View style={{flexDirection: "row", gap: 7, alignItems: "center"}}>                    
                    <View 
                        style={{
                          backgroundColor: data.item.color, 
                          width: 16, 
                          height: 16,
                          borderRadius: 8,
                      }}/>
                    <Text 
                      style={{
                        fontSize: 14,
                        fontWeight: "400",
                    }}>{data.item.color}</Text>
                  </View>

                  {/* Quantity Button */}
                  <View style={{alignItems: "flex-start"}}>
                  <View 
                    style={{
                      flexDirection: "row", 
                      alignItems: "center",
                      gap: 10, 
                      backgroundColor: colors.primary,
                      padding: 6,
                      borderRadius: 100,}}>
                    <TouchableOpacity
                      onPress={() => {handleMinusQuan(data.item.id, rowMap)}}
                      style={{
                        backgroundColor: colors.card,
                        width: 24,
                        aspectRatio: 1,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 24,
                      }}>
                        <Icon name={"minus"} size={15} color={colors.text}/>
                    </TouchableOpacity>
                    <Text 
                      style={{
                        fontSize: 12,
                        fontWeight: "600",
                        color: colors.background
                      }}>{data.item.quantity}</Text>
                    <TouchableOpacity
                      onPress={() => handlePlusQuan(data.item.id, rowMap)}
                      style={{
                        backgroundColor: colors.card,
                        width: 24,
                        aspectRatio: 1,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 24,
                      }}>
                        <Icon name={"plus"} size={15} color={colors.text}/>
                    </TouchableOpacity>
                  </View>
                  </View>
                </View>

                <View style={{justifyContent: "flex-end", alignItems: "flex-end"}}>
                <Text 
                  style={{
                    fontSize: 16, 
                    fontWeight: "600", 
                    color: colors.text,
                    paddingHorizontal: 16,
                    paddingVertical: 16,
                  }}
                  numberOfLines={1}>
                  ${data.item.price}
                </Text>
                </View>
                    
              </View>
            </View>
          )}}
          renderHiddenItem={ (data, rowMap) => {
            return(
            <View 
              style={{
                alignItems: "center",
                justifyContent: 'center',
                height: 150,
                backgroundColor: "red",
                borderRadius: 24,}}>
                <TouchableOpacity 
                  onPress={() => deleteRow(rowMap, data.item.key, data.item.id)}
                  style={{
                  alignSelf: "flex-end",
                  alignItems: "center",
                  justifyContent: 'center',
                  width: 100,
                  gap: 7,
                  }}>
                  <Icon name="delete-outline" size={22} color={colors.background}/>
                  <Text 
                    style={{
                      fontSize: 14,
                      fontWeight: "600",
                      color: colors.background,
                  }}>Delete</Text>
                </TouchableOpacity>
            </View>
          )}}
          rightOpenValue={-100}
          leftOpenValue={0}
          previewRowKey={'0'}
          previewOpenValue={-40}
          previewOpenDelay={3000}
          onRowDidOpen={onRowDidOpen}/>
      </View>

      <View style={{
        paddingHorizontal: 24,
        paddingVertical: 10,
        marginTop: 15,
        gap: 10,        
      }}>
        <Text style={{
          fontSize: 18,
          fontWeight: "600",
        }}>
          Promo Code
        </Text>

        <View
          elevation={3}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 10,
            borderRadius: 10,
            backgroundColor:colors.background,
            shadowColor: colors.text,
            shadowOpacity: 0.5,
            shadowRadius: 2,
            shadowOffset: {
              height: 0.5,
              width: 1
            }
          }}>
          
          <TextInput
            style={{
              fontSize: 14,
              fontWeight: "400",
              paddingHorizontal: 10,
            }}
            onChangeText={onChangeText}
            value={text}
            placeholder="Insert your coupon code"
          />

          <TouchableOpacity
            style={{
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: colors.text,
              borderRadius: 8,
            }}>
            <Text 
              style={{
                fontSize: 13,
                fontWeight: "600",
                color: colors.background,
                paddingHorizontal: 12,
                paddingVertical: 7,
              }}>
              Apply
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          paddingHorizontal: 30,
          gap: 8,
        }}>
        <View 
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 10
          }}>
          <Text style={{
            fontSize: 16,
            fontWeight: "400",
            color: colors.text,
            opacity: 0.8
          }}>
            Promotion:
          </Text>
          <Text style={{
            fontSize: 16,
            fontWeight: "600",
            color: colors.text,
          }}>
            ${calculateTotalPrice().toLocaleString()}
          </Text>
        </View>
        
      </View>

      <View 
            style={{
              paddingHorizontal: 24,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 10,
            }}>

            <View >
              <Text
                style={{ color: colors.text, fontSize: 16, opacity: 0.75, marginBottom: 4 }}
              >
                Total Price
              </Text>
              <Text
                style={{ color: "red", fontSize: 18, fontWeight: "600" }}
              >
                ${calculateTotalPrice().toLocaleString()}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => checkOut()
                }
              style={{
                backgroundColor: colors.primary,
                height: 64,
                borderRadius: 64,
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                flexDirection: "row",
                padding: 12,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  color: colors.background,
                  paddingHorizontal: 16,
                }}
              >
                Proceed to checkout
              </Text>

              <View
                style={{
                  backgroundColor: colors.card,
                  width: 40,
                  aspectRatio: 1,
                  borderRadius: 40,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon name={"arrow-right"} size={24} color={colors.text} />
              </View>
            </TouchableOpacity>
          
          </View>
          
      
    </SafeAreaView>
  );
};


export default CartScreen;

