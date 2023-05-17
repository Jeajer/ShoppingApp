import * as React from 'react';
import { View, Text, Button, StyleSheet, ScrollView, Image, Touchable, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const AVATAR_URL = "https://static.nike.com/a/images/f_auto/dpr_1.3,cs_srgb/h_455,c_limit/12f2c38e-484a-44be-a868-2fae62fa7a49/nike-just-do-it.jpg"

const HomeScreen = () => {
  const {colors} = useTheme()

  return (
    <ScrollView>
      <SafeAreaView style={{paddingVertical: 24, gap: 24}}>
        {/* Header Section */}
        <View style={{paddingHorizontal: 24, 
                      flexDirection: "row", 
                      alignItems: "center", 
                      gap: 8}}>
          <Image source={{uri: AVATAR_URL}}
            style={{width: 52, aspectRatio: 1, borderRadius: 52 }} 
            resizeMode="cover"/>
          <View style={{flex: 1}}>
            <Text style={{fontSize: 18, fontWeight: "600", marginBottom: 6, color: colors.text}}>
              Hi, James 👋
            </Text>
            <Text style={{color: colors.text, opacity: 0.75}}
                  numberOfLines={1}>
              Discover fashion that suit your style
            </Text>
          </View>
          <TouchableOpacity 
            style={{
              width: 52, 
              aspectRatio: 1, 
              alignItems: "center",
              justifyContent: "center", 
              borderRadius: 52, 
              borderWidth: 1, 
              borderColor: colors.border}}>
              <Icon name="bell" size={24} color={colors.text}/>
          </TouchableOpacity>
        </View>

        {/* Search Bar Section */}
        <View style={{flexDirection: "row", paddingHorizontal: 24, gap: 12}}>
            <TouchableOpacity 
              style={{
                flex: 1, 
                height: 52, 
                borderRadius: 52, 
                borderWidth: 1, 
                borderColor: colors.border, 
                alignItems: "center", 
                paddingHorizontal: 24, 
                flexDirection: "row",
                gap: 12}}>
                <Icon 
                  name="magnify" 
                  size={24} 
                  color={colors.text} 
                  style={{opacity: 0.5}}/>
                <Text 
                  style={{
                    flex: 1, 
                    fontSize: 16, 
                    color: colors.text, 
                    opacity: 0.5}}>
                      Search
                </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={{
                width: 52,  
                alignItems: "center", 
                justifyContent: "center",
                borderRadius: 52,
                backgroundColor: colors.primary}}>
                <Icon 
                  name="tune" 
                  size={24} 
                  color={colors.background} />
            </TouchableOpacity>
        </View>

        {/* Grid Collection View */}
        <View style={{paddingHorizontal: 24}}>
          {/* Title bar */}
          <View style={{flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 12,}}>
            <Text style={{fontSize: 20, fontWeight:"700"}}>New Collection</Text>
            <TouchableOpacity>
              <Text>See All</Text>
            </TouchableOpacity>           
          </View>
          <View style={{flexDirection: "row", height: 200, gap: 12}}>
            {/* Card */}
            <Card/>
            <View style={{flex: 1, gap: 12}}>
              <Card/>
              <Card/>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

export default HomeScreen;

const Card = () => {
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        position: "relative",
        overflow: "hidden",
        borderRadius: 24,
      }}
    >
      <Image
        source={{
          uri: "https://static.nike.com/a/images/f_auto/dpr_1.3,cs_srgb/h_455,c_limit/8b8054bd-e5e4-4c0d-9c6b-79c57367b041/nike-just-do-it.jpg",
        }}
        resizeMode="cover"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
        }}
      />
      <View
        style={{
          position: "absolute",
          left: 12,
          top: 12,
          paddingHorizontal: 12,
          paddingVertical: 8,
          backgroundColor: "rgba(0,0,0,0.25)",
          borderRadius: 100,
        }}
      >
        <Text style={{ fontSize: 14, fontWeight: "600", color: "#fff" }}>
          $
        </Text>
      </View>
    </TouchableOpacity>
  );
};