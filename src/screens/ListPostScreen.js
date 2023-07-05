import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, FlatList, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Button } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { useTheme } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SECONDHAND_LIST = [
    {
        name_acc: "Quang Mạnh",
        avatar: "https://static.nike.com/a/images/f_auto/dpr_1.3,cs_srgb/h_455,c_limit/12f2c38e-484a-44be-a868-2fae62fa7a49/nike-just-do-it.jpg",
        img_pro: "https://sneakerfits.com/wp-content/uploads/2018/07/nike-just-do-it-orange-jacket-sneaker-match-2.jpg",
        pro: "Custom Nike Hoodies",
        description: "Worn 2 times",
        price: "30.0",
    },
    {
        name_acc: "Quang Mạnh",
        avatar: "https://static.nike.com/a/images/f_auto/dpr_1.3,cs_srgb/h_455,c_limit/12f2c38e-484a-44be-a868-2fae62fa7a49/nike-just-do-it.jpg",
        img_pro: "https://sneakerdaily.vn/wp-content/uploads/2022/12/ao-hoodie-nike-sportswear-essentials-french-terry-hoodie-mens-running-top-gray-dd4667-063-4.jpg",
        pro: "Custom Nike Hoodies",
        description: "Worn 2 times",
        price: "30.0",
    },
    {
        name_acc: "Quang Mạnh",
        avatar: "https://static.nike.com/a/images/f_auto/dpr_1.3,cs_srgb/h_455,c_limit/12f2c38e-484a-44be-a868-2fae62fa7a49/nike-just-do-it.jpg",
        img_pro: "https://cdn.vortexs.io/api/images/11d01d99-0e06-4538-80e0-bb8e86395a88/1920/w/ao-sweater-nike-double-logo-black-cj4865-010-ap-dung-ck.jpeg",
        pro: "Custom Nike Hoodies",
        description: "Worn 2 times",
        price: "30.0",
    },
    
  ];

const ListPostScreen = ({navigation}) => {
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
            data={SECONDHAND_LIST}
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