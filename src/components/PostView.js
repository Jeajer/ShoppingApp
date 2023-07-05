import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import React, { ReactNode, useState } from "react";
import { useTheme } from "@react-navigation/native";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PriceRangeSelector from "./PriceRangeSelector";
import Input from '../uc/Input';
import * as ImagePicker from 'expo-image-picker';

const MIN_PRICE = 0;
const MAX_PRICE = 500;

const COLORS = [
  {
    color: "red",
    label: "Red",
    itemCount:4,
  },
  {
    color: "blue",
    label: "Blue",
    itemCount:2,
  },
  {
    color: "yellow",
    label: "Yellow",
    itemCount:6,
  },
  {
    color: "purple",
    label: "Purple",
    itemCount:10,
  },
]

const SLEEVES = [
  {
    id: "sortsleeve",
    label: "Sort Sleeve",
    itemCount: 20,
  },
  {
    id: "longsleeve",
    label: "Long Sleeve",
    itemCount: 100,
  },
  {
    id: "sleeveless",
    label: "Sleeve Less",
    itemCount: 60,
  },
]

const PostView = () => {
  const [startPrice, seStartPrice] = useState(50);
  const [endPrice, setEndPrice] = useState(250);
  const theme = useTheme();
  const insets = useSafeAreaInsets();

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
    <View style={{ flex: 1 }}>
      <BottomSheetScrollView style={{flex: 1}}>
        <View style={{paddingVertical: 24, gap: 20}}>          
        <View 
          style={{ 
            flexDirection: "row", 
            alignItems: "center", 
            paddingHorizontal: 24, 
          }}>
          <Text style={{flex: 1, fontSize: 20, fontWeight: "700"}}>
            Post
          </Text>
          <TouchableOpacity>
            <Text>Reset</Text>
          </TouchableOpacity>
        </View>

        <ScrollView>
        <View style={{paddingHorizontal: 24, gap: 4}}>
            <Input
                title='Product name'
                icon=''
                placeholder='Hoodie nike'
                keyboard='default'
            />

            <TouchableOpacity 
                onPress={() => {pickImageAsync()}}
                style={{
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                <Image 
                    style={{
                    height: 250,
                    width: 350,
                    borderRadius: 20
                    }}
                    source={{
                        uri: selectedImage
                    }}
                />
            </TouchableOpacity>

            <Input
                title='Description'
                icon=''
                placeholder=''
                keyboard='default'
            />
            <Input
                title='Price'
                icon='cash'
                placeholder=''
                keyboard='default'
            />
        </View>
        </ScrollView>
        
        </View>
      </BottomSheetScrollView>
      {/* Button */}
      <View
        style={{
          padding: 24,
          paddingBottom: 24 + insets.bottom,
        }}>
        <TouchableOpacity 
          style={{
            backgroundColor: theme.colors.primary,
            height: 64,
            borderRadius: 64,
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}>
          <Text 
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: theme.colors.background}}>Post Products</Text>
          
          <View
            style={{
              backgroundColor: theme.colors.card,
              width:40,
              aspectRatio: 1,
              borderRadius: 40,
              alignItems: "center",
              justifyContent: "center",
              position: "absolute",
              top: 12,
              right: 12,
              bottom: 12}}>
            <Icon name={"arrow-right"} size={24} color={theme.colors.text}/>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PostView;