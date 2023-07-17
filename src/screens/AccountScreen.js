import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Input from '../uc/Input';
import * as ImagePicker from 'expo-image-picker';
import { FIREBASE_AUTH, FIREBASE_STORAGE, FIREBASE_DB } from '../../firebaseConfig';
import { updateProfile } from 'firebase/auth';
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const AccountScreen = ({ navigation }) => {
  const { colors } = useTheme();

  const [selectedImage, setSelectedImage] = useState("https://lh3.googleusercontent.com/EbXw8rOdYxOGdXEFjgNP8lh-YAuUxwhOAe2jhrz3sgqvPeMac6a6tHvT35V6YMbyNvkZL4R_a2hcYBrtfUhLvhf-N2X3OB9cvH4uMw=w1064-v0");

  const user = FIREBASE_AUTH.currentUser;
  console.log(user.uid);

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
      const userRef = doc(FIREBASE_DB, 'Users', user.uid);
      await updateDoc(userRef, { img: imageUrl });
      updateImagesInFirestore("Orders", imageUrl);
      updateImagesInFirestore("Secondhand", imageUrl);
  
      console.log('Image uploaded to Firebase Storage and URL saved in Firestore.');
    } catch (error) {
      console.log('Error uploading image:', error);
    }
  };

  const updateImagesInFirestore = async (location, newValue) => {
    try {
      const snapShot = await getDocs(collection(FIREBASE_DB, location));
      let list = [];
      snapShot.docs.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      list = list.filter(item => item.idacc === user.uid);
      list.forEach((item) => {
        const docRef = doc(FIREBASE_DB, location, item.id);
        updateDoc(docRef, { img: newValue });
      });
      console.log("Updated images in Firestore.");
    } catch (error) {
      console.log("Error updating images in Firestore:", error);
    }
  };

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

  return (
    <SafeAreaView style={{
      flex: 1,
    }}>
      <View style={{
        paddingHorizontal: 24,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        marginTop: 10,
      }}>
        <TouchableOpacity
          onPress={() => { navigation.goBack() }}>
          <Icon name='chevron-left' size={30} color="#000" />
        </TouchableOpacity>
        <Text style={{
          fontSize: 24,
          fontWeight: "600",
        }}>Profile</Text>
        <View style={{ width: 30 }} />
      </View>

      <ScrollView
        style={{
          paddingVertical: 24,
          flex: 1,
        }}
        scrollIndicatorInsets={false}
      >
        <TouchableOpacity
          onPress={() => { pickImageAsync() }}
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20,
            marginBottom: 50,
          }}>
          <Image
            style={{
              width: 120,
              height: 120,
              borderRadius: 120

            }}
            source={{
              uri: customer.img ? customer.img : selectedImage,
            }}
          />
        </TouchableOpacity>

        <Text style={{
          fontSize: 20,
          fontWeight: "600",
          paddingHorizontal: 24,
          opacity: 0.6
        }}>Personal Information</Text>

        <View style={{
          paddingHorizontal: 0,
          marginTop: 10,
          gap: 10
        }}>
          <TouchableOpacity onPress={() => navigation.navigate("Change Email Screen")}>
            <View style={styles.viewContainer}>
              <View
                style={{ width: '90%' }}
              >
                <Text style={styles.textStylesCap}>
                  Email
                </Text>
                <Text style={styles.textStyles}>
                  {user.email}
                </Text>
              </View>
              <Icon
                name='arrow-right'
                size={25}
                color='gray'
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => { navigation.navigate("Add Address Screen") }}
          >
            <View style={styles.viewContainer}>
              <View
                style={{ width: '90%' }}
              >
                <Text style={styles.textStylesCap}>
                  Address
                </Text>
                <Text style={styles.textStyles}>

                </Text>
              </View>
              <Icon
                name='arrow-right'
                size={25}
                color='gray'
              />
            </View>
          </TouchableOpacity>
        </View>

        <Text style={{
          marginTop: 20,
          fontSize: 20,
          fontWeight: "600",
          paddingHorizontal: 24,
          opacity: 0.6

        }}>Security</Text>

        <TouchableOpacity onPress={() => { navigation.navigate("Change Password Screen") }}>
          <View style={styles.viewContainer}>
            <View
              style={{ width: '90%' }}
            >
              <Text style={styles.textStylesCap}>
                Password
              </Text>
              <Text style={styles.textStyles}>
                ******
              </Text>
            </View>
            <Icon
              name='arrow-right'
              size={25}
              color='gray'
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { navigation.navigate("Delete Account Screen") }}>
          <View style={styles.viewContainer}>
            <View
              style={{ width: '90%' }}
            >
              <Text style={[styles.textStylesCap, { textDecorationLine: 'underline' }]}>
                Delete your account
              </Text>
            </View>
          </View>
        </TouchableOpacity>

      </ScrollView>

      

    </SafeAreaView>
  );
};


export default AccountScreen;

const styles = StyleSheet.create({
  viewContainer: {
    paddingHorizontal: 40,
    marginTop: 20,
    gap: 10,
    flexDirection: 'row',
    alignContent: 'center',
  },
  textStyles: {
    fontSize: 15,
    color: 'black',
    fontWeight: '300',
  },
  textStylesCap: {
    fontSize: 17,
    color: 'gray',
    marginBottom: 10,
    fontWeight: '300',
  },
});
