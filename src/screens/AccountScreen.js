import React, { useCallback, useMemo, useRef, useState } from 'react';
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
import { FIREBASE_AUTH } from '../../firebaseConfig';

const AccountScreen = ({ navigation }) => {
  const { colors } = useTheme();

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

  const user = FIREBASE_AUTH.currentUser;

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
              uri: user.photoURL ? user.photoURL : selectedImage,
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

      <View
        style={{
          paddingHorizontal: 30,
          marginBottom: 40,
        }}>

        <TouchableOpacity
          onPress={() => { navigation.navigate("Add Address Screen") }}
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
            Save Information
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
})