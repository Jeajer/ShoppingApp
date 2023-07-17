import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Button } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { useTheme } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SwipeListView } from 'react-native-swipe-list-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../firebaseConfig';
import { 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  query,
  where, 
  getDocs, 
  deleteDoc, 
  updateDoc 
} from 'firebase/firestore';

const FavoriteScreen = ({ navigation }) => {
  const { colors } = useTheme();

  const [resultArray, setResultArray] = useState([]);

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
      await deleteDoc(doc(FIREBASE_DB, "Users", user.uid, "Favourite", id));
    } catch (error) {
      console.log(error.message)
    }
  }

  const deleteRow = async (rowMap, rowKey, id) => {
    closeRow(rowMap, rowKey);
    const newData = [...resultArray];
    const prevIndex = resultArray.findIndex(item => item.key === rowKey);
    removeFromFavourite(id);
    newData.splice(prevIndex, 1);
    setResultArray(newData);
  };

  const handleAddToCart = async () => {
    if(resultArray.length === 0){      
      alert('Please select your favourite first!')
    }
    else {
      resultArray.forEach(async (item) => {
        try {
          await setDoc(doc(FIREBASE_DB, "Users", FIREBASE_AUTH.currentUser.uid, "Carts", item.id), {
            id: item.id,
            description: item.description,
            name: item.title,
            price: item.price,
            img: item.imageUrl,
            color: item.color,
            quantity: item.quantity,
          });
        } catch (error) {
          console.log(error.message)
        } finally {
          console.log('Successfully added')
          removeFromFavourite(item.id)
        }
      })
      setResultArray([])
      navigation.navigate("Cart Screen")
    }
  }

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
    if(item.quantity > 1){
      const newQuantity = item.quantity - 1;
      const newItem = { ...item, quantity: newQuantity };
      const newList = [...resultArray];
      newList[index] = newItem;
      setResultArray(newList);
    }    
  }

  const onSwipeEnd = (rowKey, rowMap) => {
    const index = myList.findIndex(item => item.id === rowKey);
    console.log(`Swiped item with id ${rowKey} at index ${index}`);
  };

  const [myList, setMyList] = useState([]);

  const user = FIREBASE_AUTH.currentUser  

  useEffect(() => {
    const fetchValue = async () => {
      const querySnapshot = await getDocs(collection(FIREBASE_DB, "Users", user.uid, "Favourite"));
      let productQuery = Object.freeze({ name: "Score", points: 157 });
      const listData = [];

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

    fetchValue();
  }, []);

  return (
    <SafeAreaView style={{
      paddingVertical: 24,
      gap: 15,
      backgroundColor: 'white',
      flex: 1,
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
        height: "82%",        
      }}>
        <SwipeListView
          data={resultArray}
          contentContainerStyle={{ paddingHorizontal: 16, backgroundColor: 'white', }}
          onSwipeEnd = {onSwipeEnd}
          renderItem={(data, rowMap) => {
            return (
              <View
                style={{
                  flex: 1,
                  backgroundColor: 'white',
                  height: 150,
                  padding: 6,
                  borderColor: '#DADADA',
                  borderBottomWidth: 1,
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
                        fontWeight: '500',
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
                          onPress={() => {handleMinusQuan(data.item.id, rowMap)}}
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
                          }}>{data.item.quantity}</Text>
                        <TouchableOpacity
                          onPress={() => {handlePlusQuan(data.item.id, rowMap)}}
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
                  onPress={() => deleteRow(rowMap, data.item.id, data.item.id)}
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
          onPress={() => { handleAddToCart() }}
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

