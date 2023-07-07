import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, FlatList, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Button } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { useTheme } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { doc, setDoc, updateDoc } from 'firebase/firestore'
import { FIREBASE_AUTH, FIREBASE_PROVIDER, FIREBASE_DB } from '../../firebaseConfig';

const AddAddressScreen = ({ navigation }) => {
  const { colors } = useTheme();

  const [detail, setDetail] = useState('')
  const [district, setDistrict] = useState('')
  const [country, setCountry] = useState('')
  const [city, setCity] = useState('')

  const [isDetailFocused, setIsDetailFocused] = React.useState(false);
  const [isDistrictFocused, setIsDistrictFocused] = React.useState(false);
  const [isCityFocused, setIsCityFocused] = React.useState(false);
  const [isCountryFocused, setIsCountryFocused] = React.useState(false);

  const user = FIREBASE_AUTH.currentUser;
  const frankDocRef = doc(FIREBASE_DB, "Users", user.uid);

  const hanldeUpdateAddress = async (detail, district, city, country) => {
    try {
      await updateDoc(frankDocRef, {
        "detail": detail,
        "district": district,
        'city': city,
        "country": country,
      });
    } catch (error) {
      console.log(error.message)
    } finally {
      alert('Update successfully')
      navigation.navigate('Account Screen')
    }
  }

  return (
    <SafeAreaView style={{
      paddingVertical: 24,
      gap: 50,
    }}>
      <View style={{
        paddingHorizontal: 24,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row"
      }}>
        <TouchableOpacity
          onPress={() => { navigation.goBack() }}>
          <Icon name='chevron-left' size={30} color="#000" />
        </TouchableOpacity>
        <Text style={{
          fontSize: 24,
          fontWeight: "600",
        }}>Add address</Text>
        <View style={{ width: 30 }} />
      </View>
      <View style={{
        paddingHorizontal: 30,
        gap: 10
      }}>
        <View style={{ marginVertical: 10 }}>
          <Text style={styles.headerBox}>
            Detail
          </Text>

          <View style={[styles.passwordContainer, { borderColor: isDetailFocused ? "#1E1D2E" : "#EAEDFB" }]}>
            <TextInput
              style={styles.input}
              secureTextEntry={false}
              placeholder='Enter your address detail'
              autoCapitalize='none'
              onFocus={
                () => {
                  setIsDetailFocused(true);
                }}
              onBlur={() => { setIsDetailFocused(false) }}
              onChangeText={(text) => { setDetail(text) }}
              value={detail}
            >
            </TextInput>
          </View>

        </View>
        <View style={{ marginVertical: 10 }}>
          <Text style={styles.headerBox}>
            District
          </Text>

          <View style={[styles.passwordContainer, { borderColor: isDistrictFocused ? "#1E1D2E" : "#EAEDFB" }]}>
            <TextInput
              style={styles.input}
              secureTextEntry={false}
              placeholder='Enter your district'
              autoCapitalize='none'
              onFocus={
                () => {
                  setIsDistrictFocused(true);
                }}
              onBlur={() => { setIsDistrictFocused(false) }}
              onChangeText={(text) => { setDistrict(text) }}
              value={district}
            >
            </TextInput>
          </View>

        </View>
        <View style={{ marginVertical: 10 }}>
          <Text style={styles.headerBox}>
            City
          </Text>

          <View style={[styles.passwordContainer, { borderColor: isCityFocused ? "#1E1D2E" : "#EAEDFB" }]}>
            <TextInput
              style={styles.input}
              secureTextEntry={false}
              placeholder='Enter your email'
              autoCapitalize='none'
              onFocus={
                () => {
                  setIsCityFocused(true);
                }}
              onBlur={() => { setIsCityFocused(false) }}
              onChangeText={(text) => { setCity(text) }}
              value={city}
            >
            </TextInput>
          </View>

        </View>
        <View style={{ marginVertical: 10 }}>
          <Text style={styles.headerBox}>
            Country
          </Text>

          <View style={[styles.passwordContainer, { borderColor: isCountryFocused ? "#1E1D2E" : "#EAEDFB" }]}>
            <TextInput
              style={styles.input}
              secureTextEntry={false}
              placeholder='Enter your city'
              autoCapitalize='none'
              onFocus={
                () => {
                  setIsCountryFocused(true);
                }}
              onBlur={() => { setIsCountryFocused(false) }}
              onChangeText={(text) => { setCountry(text) }}
              value={country}
            >
            </TextInput>
          </View>

        </View>
      </View>

      <View
        style={{
          paddingHorizontal: 30,
        }}>

        <TouchableOpacity
          onPress={() => { hanldeUpdateAddress(detail, district, city, country) }}
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
            Add new address
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


export default AddAddressScreen;

const styles = StyleSheet.create({
  input: {
    backgroundColor: "transparent",
    paddingVertical: 10,
    paddingHorizontal: 0,
    fontSize: 16,
    width: '90%',
  },
  passwordContainer: {
    flexDirection: 'row',
    justifyContent: 'left',
    alignItems: 'center',
    backgroundColor: '#F9F9FD',
    height: 50,
    borderRadius: 10,
    marginTop: 5,
    paddingHorizontal: 20,
    borderWidth: 2,
  },
  searchIcon: {
    paddingStart: 0,
    marginEnd: 0,
  },
  inputStyle: {
    flex: 1,
  },
  headerBox: {
    color: "gray",
    fontWeight: 'normal',
    fontSize: 12
  },
  errorText: {
    fontSize: 12,
    color: 'red',
    fontStyle: 'italic'
  },
})