import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Button } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { useTheme } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FIREBASE_AUTH, FIREBASE_STORAGE, FIREBASE_DB } from '../../firebaseConfig';
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';


const ListPostScreen = ({navigation}) => {
    const {colors} = useTheme();

    const [secondhand, setSecondHand] = useState([]);

    useEffect(() => {
        const unsub = onSnapshot(
          collection(FIREBASE_DB, "Secondhand"),
          (snapShot) => {
            let list = [];
            snapShot.docs.forEach((doc) => {
              list.push({ id: doc.id, ...doc.data() });
            });
            setSecondHand(list);
          },
          (error) => {
            console.log(error);
          }
        );
    
        return () => {
          unsub();
        };
      }, [FIREBASE_DB]);

    const RenderItem = ({item, index}) => {
        return (
          <View style={{
            gap: 8,
          }}>
            <View style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 15,
            }}>
                 <Image source={{uri: item.img}}
                  style={{width: 50, aspectRatio: 1, borderRadius: 100 }} 
                  resizeMode="cover"/>
                <Text style={{fontSize: 17, fontWeight: "600", color: colors.text}}>{item.name}</Text>
            </View>
            <View style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginVertical: 10,
            }}>
                <Image 
                    source={{uri: item.imgpro}}
                    style={{aspectRatio: 1, height: 300}}
                    resizeMode="cover" />
            </View>
            <View style={{
                gap: 3,
                flexDirection: "row",
                alignItems: "flex-end",
                justifyContent: "space-between",
            }}>
                <View >
                <Text style={{fontSize: 19, fontWeight: "600", color: colors.text}}>
                    {item.namepro}
                </Text>
                <Text style={{fontSize: 17, fontWeight: "400", color: colors.text}}>
                    {item.description}
                </Text>
                <Text style={{fontSize: 17, fontWeight: "500", color: colors.text}}>
                    ${item.price}
                </Text>
                </View>
                <TouchableOpacity
                    onPress={() => {navigation.navigate("Check Out Screen")}}
                    style={{
                        paddingHorizontal: 20,
                        paddingVertical: 10,
                        backgroundColor: "green",
                        borderRadius: 10,
                    }}>
                <Text style={{fontSize: 15, fontWeight: "500", color: "white"}}>
                    Order
                </Text>
                </TouchableOpacity>
            </View>
          </View>
        )
    }
    
    return (
        <View style={{
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
        }}>
        <FlatList 
            contentContainerStyle={{
                padding: 24,
                gap: 18,
              }}
            data={secondhand}
            renderItem={({item, index}) => {
            return (
                <View>
                    <RenderItem item={item} index={index}/>
                    <View style={{height: 1, backgroundColor: colors.border, marginTop: 18}}/>
                </View>
            )
        }}/>
      </View>
    )};
    
export default ListPostScreen;