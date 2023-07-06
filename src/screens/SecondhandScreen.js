import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, FlatList, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Button } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { useTheme } from '@react-navigation/native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Input from '../uc/Input'
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import CustomBackdrop from "../components/CustomBackdrop";
import PostView from "../components/PostView";
import PostNavigator from "../navigators/PostNavigator";

const SECONDHAND_LIST = [
    {
        name_acc: "Quang Mạnh",
        avatar: "https://static.nike.com/a/images/f_auto/dpr_1.3,cs_srgb/h_455,c_limit/12f2c38e-484a-44be-a868-2fae62fa7a49/nike-just-do-it.jpg",
        img_pro: "https://sneakerfits.com/wp-content/uploads/2018/07/nike-just-do-it-orange-jacket-sneaker-match-2.jpg",
        pro: "Custom Nike Hoodies",
        description: "Worn 2 times",
        price: "$30.0",
    },
    {
        name_acc: "Quang Mạnh",
        avatar: "https://static.nike.com/a/images/f_auto/dpr_1.3,cs_srgb/h_455,c_limit/12f2c38e-484a-44be-a868-2fae62fa7a49/nike-just-do-it.jpg",
        img_pro: "https://sneakerdaily.vn/wp-content/uploads/2022/12/ao-hoodie-nike-sportswear-essentials-french-terry-hoodie-mens-running-top-gray-dd4667-063-4.jpg",
        pro: "Custom Nike Hoodies",
        description: "Worn 2 times",
        price: "$30.0",
    },
    
  ];

const SecondhandScreen = ({navigation}) => {
    const {colors} = useTheme();

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
             <Image source={{uri: item.avatar}}
              style={{width: 50, aspectRatio: 1, borderRadius: 100 }} 
              resizeMode="cover"/>
            <Text style={{fontSize: 17, fontWeight: "600", color: colors.text}}>{item.name_acc}</Text>
        </View>
        <View style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginVertical: 10,
        }}>
            <Image 
                source={{uri: item.img_pro}}
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
                {item.pro}
            </Text>
            <Text style={{fontSize: 17, fontWeight: "400", color: colors.text}}>
                {item.description}
            </Text>
            <Text style={{fontSize: 17, fontWeight: "500", color: colors.text}}>
                {item.price}
            </Text>
            </View>
            <TouchableOpacity
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

    const bottomSheetModalRef = useRef(null);
  
    const openFilterModal = useCallback(() => {
      bottomSheetModalRef.current?.present();
    }, []);

  return (
    <SafeAreaProvider style={{
      paddingVertical: 24,
      }}>
    <SafeAreaView >
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
                }}>Secondhand</Text>
                <TouchableOpacity
                    onPress={openFilterModal}>
                    <Icon name='plus' size={30} color="#000"/>
                </TouchableOpacity>
        </View>         
    </SafeAreaView>

      <PostNavigator/>

      <BottomSheetModal 
          snapPoints={['85%']} 
          index={0}
          ref={bottomSheetModalRef}
          backdropComponent={(props) => <CustomBackdrop {...props} />}
          backgroundStyle={{
            borderRadius: 24,
          }}>
            <PostView/>
        </BottomSheetModal>
    </SafeAreaProvider>    
  )};
  
  export default SecondhandScreen;