import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Button } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { useTheme } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SwipeListView } from 'react-native-swipe-list-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../firebaseConfig';
import { doc, setDoc, getDoc, collection, query, where, getDocs, deleteDoc } from 'firebase/firestore';

const listData = [];

const FavoriteScreen = ({ navigation }) => {
  const { colors } = useTheme();

  const [product, setProduct] = useState();
  const [total, setTotal] = useState(null);
  const [count, setCount] = useState(1);
  const [text, onChangeText] = useState('');

  const [resultArray, setResultArray] = useState([]);

  const onRowDidOpen = (rowKey) => {
    console.log('This row opened', rowKey);
  };

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
    const newData = [...resultArray];
    const prevIndex = resultArray.findIndex(item => item.key === rowKey);
    deleteItemFromArrayAsyncStorage(resultArray[prevIndex].id);
    newData.splice(prevIndex, 1);
    setResultArray(newData);
  };

  const deleteItemFromArrayAsyncStorage = async (elementName) => {
    try {
      // Retrieve the array from AsyncStorage
      const jsonValue = await AsyncStorage.getItem("favorites");
      let updatedArray = [];

      if (jsonValue !== null) {
        // Parse the array from JSON
        updatedArray = JSON.parse(jsonValue);

        // Remove items with the specified name value
        updatedArray = updatedArray.filter(item => item !== elementName);
      }

      // Save the updated array back to AsyncStorage
      await AsyncStorage.setItem("favorites", JSON.stringify(updatedArray));

      console.log('Items deleted from the array in AsyncStorage');
    } catch (error) {
      console.log('Error deleting items from the array in AsyncStorage:', error);
    }
  }

  const getValueFromAsyncStorage = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('favorites');
      if (jsonValue !== null) {
        const value = JSON.parse(jsonValue);
        console.log('Value retrieved from Favorite:', value);
        return value;
      } else {
        console.log('Value not found in AsyncStorage');
        return null;
      }
    } catch (error) {
      console.log('Error retrieving value from AsyncStorage:', error);
      return null;
    }
  };

  const user = FIREBASE_AUTH.currentUser  

  useEffect(() => {
    const fetchValue = async () => {
      const querySnapshot = await getDocs(collection(FIREBASE_DB, "Users", user.uid, "Favourite"));
      let productQuery = Object.freeze({ name: "Score", points: 157 });
      querySnapshot.forEach((doc) => {
        listData.push({
          imageUrl: doc.data().img,
          title: doc.data().name,
          price: doc.data().price,
          id: doc.id,
          description: doc.data().description,
          color: doc.data().color,
        })        
      })
      productQuery = listData;
      setResultArray(productQuery);
    };

    fetchValue();
  }, []);

  return (
    <SafeAreaView style={{
      paddingVertical: 24,
      gap: 15,
    }}>
      <View style={{
        paddingHorizontal: 24,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row"
      }}>

        <Text style={{
          fontSize: 30,
          fontWeight: "700",
        }}>Favorite</Text>
        <TouchableOpacity
          onPress={() => { navigation.navigate("Cart Screen") }}>
          <Icon name='basket-outline' size={30} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={{
        height: "81%"
      }}>
        <SwipeListView
          data={resultArray}
          contentContainerStyle={{ paddingHorizontal: 16 }}
          renderItem={(data, rowMap) => {
            return (
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
                    source={{ uri: data.item.imageUrl }}
                    resizeMode="contain"
                    height={120}
                    width={120}
                    style={{ borderRadius: 24, }} />

                  <View style={{ padding: 12, flex: 1, gap: 6 }}>
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

                    <View style={{ flexDirection: "row", gap: 7, alignItems: "center" }}>
                      <View
                        style={{
                          backgroundColor: data.item.color,
                          width: 16,
                          height: 16,
                          borderRadius: 8,
                        }} />
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: "400",
                        }}>{data.item.color}</Text>
                    </View>

                    {/* Quantity Button */}
                    <View style={{ alignItems: "flex-start" }}>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 10,
                          backgroundColor: colors.primary,
                          padding: 6,
                          borderRadius: 100,
                        }}>
                        <TouchableOpacity
                          onPress={() => setCount((count) => Math.max(1, count - 1))}
                          style={{
                            backgroundColor: colors.card,
                            width: 24,
                            aspectRatio: 1,
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 24,
                          }}>
                          <Icon name={"minus"} size={15} color={colors.text} />
                        </TouchableOpacity>
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: "600",
                            color: colors.background
                          }}>{count}</Text>
                        <TouchableOpacity
                          onPress={() => setCount((count) => Math.min(10, count + 1))}
                          style={{
                            backgroundColor: colors.card,
                            width: 24,
                            aspectRatio: 1,
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 24,
                          }}>
                          <Icon name={"plus"} size={15} color={colors.text} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>

                  <View style={{ justifyContent: "flex-end", alignItems: "flex-end" }}>
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
            )
          }}
          renderHiddenItem={(data, rowMap) => {
            return (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: 'center',
                  height: 150,
                  backgroundColor: "red",
                  borderRadius: 24,
                }}>
                <TouchableOpacity
                  onPress={() => deleteRow(rowMap, data.item.key)}
                  style={{
                    alignSelf: "flex-end",
                    alignItems: "center",
                    justifyContent: 'center',
                    width: 100,
                    gap: 7,
                  }}>
                  <Icon name="delete-outline" size={22} color={colors.background} />
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "600",
                      color: colors.background,
                    }}>Delete</Text>
                </TouchableOpacity>
              </View>
            )
          }}
          rightOpenValue={-100}
          leftOpenValue={0}
          previewRowKey={'0'}
          previewOpenValue={-40}
          previewOpenDelay={3000}
          onRowDidOpen={onRowDidOpen} />
      </View>

      <View
        style={{
          paddingHorizontal: 30,
        }}>

        <TouchableOpacity
          onPress={() => { navigation.navigate("Cart Screen") }}
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
          <View />
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: colors.background,
            }}
          >
            Add all to my cart
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


export default FavoriteScreen;

