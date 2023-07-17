import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import React, { ReactNode, useState, useEffect } from "react";
import { useTheme } from "@react-navigation/native";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PriceRangeSelector from "./PriceRangeSelector";
import Input from '../uc/Input';
import * as ImagePicker from 'expo-image-picker';
import { FIREBASE_AUTH, FIREBASE_STORAGE, FIREBASE_DB } from '../../firebaseConfig';
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';


const PostView = (onClose) => {
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [img, setImg] = useState();
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const user = FIREBASE_AUTH.currentUser;

  const [customer, setCustomer] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(doc(FIREBASE_DB, "Users", user.uid), (doc) => {
      const orderData = doc.data();
      setCustomer(orderData);
      console.log(customer);
    });  
  
    return () => {
      unsub();
    };
  }, [FIREBASE_DB]);

  const [selectedImage, setSelectedImage] = useState("https://lh3.googleusercontent.com/EbXw8rOdYxOGdXEFjgNP8lh-YAuUxwhOAe2jhrz3sgqvPeMac6a6tHvT35V6YMbyNvkZL4R_a2hcYBrtfUhLvhf-N2X3OB9cvH4uMw=w1064-v0");

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
  
    if (!result.canceled) {
      const selectedAsset = result.assets[0];
      const selectedImageUri = selectedAsset.uri;
  
      setSelectedImage(selectedImageUri);
      uploadImageToFirestore(selectedImageUri);
    } else {
      alert('You did not select any image.');
    }
  };

  const uploadImageToFirestore = async (imageUri) => {
    try {
      // Convert the image URI to a Blob
      const response = await fetch(imageUri);
      const blob = await response.blob();
  
      // Generate a unique filename for the image
      const imageName = new Date().getTime() + '.jpg';
  
      // Get a reference to the Firebase Storage bucket
      const storage = getStorage();
      const storageRef = ref(storage, imageName);
  
      // Upload the image to Firebase Storage
      await uploadBytes(storageRef, blob);
  
      // Get the download URL for the uploaded image
      const imageUrl = await getDownloadURL(storageRef);
  
      // Update the image URL in Firestore
      // const userRef = doc(FIREBASE_DB, 'Users', user.uid);
      // await updateDoc(userRef, { img: imageUrl });
      setImg(imageUrl);
  
      console.log('Image uploaded to Firebase Storage and URL saved in Firestore.');
    } catch (error) {
      console.log('Error uploading image:', error);
    }
  };

  const handleNameInput = (text) => {
    setName(text);
  };

  const handleDescriptionInput = (text) => {
    setDescription(text);
  };

  const handlePriceInput = (text) => {
    setPrice(text);
  };

  const handlePost = async () => {
    try {
      await addDoc(collection(FIREBASE_DB, "Secondhand"),{
        idacc: user.uid,
        description: description,
        img: customer.img,
        imgpro: img,
        name: customer.displayName,
        namepro: name,
        price: price,
        status: "Stocking"
      });
      onClose();
    } catch (error) {
      // Xử lý lỗi ở đây
      console.log(error);
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
                value={name}
                onChangeText={handleNameInput}
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
                value={description}
                onChangeText={handleDescriptionInput}
            />
            <Input
                title='Price'
                icon=''
                placeholder=''
                keyboard='default'
                value={price}
                onChangeText={handlePriceInput}
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
          onPress={handlePost}
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