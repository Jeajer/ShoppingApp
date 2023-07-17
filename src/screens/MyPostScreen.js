import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Button } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { useTheme } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MenuPost from '../components/Menu';
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

const MyPostScreen = ({navigation}) => {
    const {colors} = useTheme();
    const user = FIREBASE_AUTH.currentUser;

    const [secondhand, setSecondHand] = useState([]);

    useEffect(() => {
        const unsub = onSnapshot(
          collection(FIREBASE_DB, "Secondhand"),
          (snapShot) => {
            let list = [];
            snapShot.docs.forEach((doc) => {
              list.push({ id: doc.id, ...doc.data() });
            });
            list = list.filter(item => item.idacc === user.uid);
            setSecondHand(list);
            console.log(list);
          },
          (error) => {
            console.log(error);
          }
        );
    
        return () => {
          unsub();
        };
      }, [FIREBASE_DB]);

      const handleDelete = async (id) => {
        try {
          await deleteDoc(doc(FIREBASE_DB, "Secondhand", id));
          setData(data.filter((item) => item.id !== id));
        } catch (err) {
          console.log(err);
        }
      };

    const RenderItem = ({item, index}) => {
        return (
          <View style={{
            gap: 8,
            flex: 1,
          }}>
            <View style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
            }}>
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 15,
                    }}>
                    <Image source={{uri: item.img}}
                        style={{width: 50, aspectRatio: 1, borderRadius: 100 }} 
                        resizeMode="cover"/>
                    <Text style={{fontSize: 17, fontWeight: "600", color: colors.text}}>{item.name}</Text>
                </View>
                <View>
                    <TouchableOpacity
                    onPress={() => {handleDelete(item.id)}}
                    style={{
                        paddingHorizontal: 15,
                        paddingVertical: 7,
                        backgroundColor: "red",
                        borderRadius: 10,
                    }}>
                    <Text style={{fontSize: 14, fontWeight: "500", color: "white"}}>
                        Delete
                    </Text>
                </TouchableOpacity>
                </View>
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
                    ${(item.price).toLocaleString()}
                </Text>
                </View>
                <View
                    style={{
                        padding: 10,
                        borderRadius: 10,
                    }}>
                <Text style={{fontSize: 17, fontWeight: "500", color: "green"}}>
                    {item.status}
                </Text>
                </View>
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
    
export default MyPostScreen;