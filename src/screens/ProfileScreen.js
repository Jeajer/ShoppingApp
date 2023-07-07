import {
  React, useState,
} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SignOutUser } from '../utilities/Utilities';
import { FIREBASE_AUTH, FIREBASE_DB } from "../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

const AVATAR_URL = "https://static.nike.com/a/images/f_auto/dpr_1.3,cs_srgb/h_455,c_limit/12f2c38e-484a-44be-a868-2fae62fa7a49/nike-just-do-it.jpg";

const GENERAL_LIST = [
    {
        icon: "script-text",
        title: "My orders",
        screen: "Order Screen",
    },
    {
      icon: "post",
      title: "My posts",
      screen: "Secondhand Screen",
    },
    {
        icon: "cart",
        title: "Cart",
        screen: "Cart Screen",
    },
    {
        icon: "map-marker",
        title: "Shipping Address",
        screen: "Address Screen",
    },
    {
        icon: "credit-card",
        title: "Payment methods",
        screen: "Payment Screen",
    },
  {
    icon: "alert-circle-outline",
    title: "Report an issue",
  },
  ];

const SUPPORT_LIST = [
  
];

const ProfileScreen = ({ navigation }) => {
  const { colors } = useTheme();

  const user = FIREBASE_AUTH.currentUser;
  const displayName = user.displayName;

  const RenderItem = ({ item, index }) => {
    return (
      <View style={{
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        marginLeft: 6,
      }}>
        <View style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 15,
        }}>
          <Icon name={item.icon} size={30} color={colors.text} />
          <Text style={{ fontSize: 16, fontWeight: "500", color: colors.text }}>{item.title}</Text>
        </View>
        <Icon name={"chevron-right"} size={30} color={colors.text} />
      </View>
    )
  }

  const handleSignOut = () => {
    try {
      SignOutUser();
      console.log('signed out!')
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <SafeAreaView style={{
      paddingVertical: 24,
      gap: 30,
      backgroundColor: 'white',
      flex: 1,
    }}>
      <View style={{
        paddingHorizontal: 24,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row"
      }}>
        <Text style={{
          marginLeft: 6,
          fontSize: 30,
          fontWeight: "700",
        }}>Profile</Text>
        <TouchableOpacity
          onPress={() => { handleSignOut() }}
        >
          <Icon name='logout' size={30} color="#000" />
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Account Screen")}
          style={{
            paddingHorizontal: 24,
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            gap: 15,
          }}>
          <Image source={{ uri: AVATAR_URL }}
            style={{ width: 70, aspectRatio: 1, borderRadius: 100 }}
            resizeMode="cover" />
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 20, fontWeight: "600", marginBottom: 6, color: colors.text }}>
              Hi, {user.displayName ? user.displayName : "Anonymous User"} 👋
            </Text>
            <Text style={{ color: colors.text, opacity: 0.75 }}
              numberOfLines={1}>
              {user.email}
            </Text>
          </View>
          <Icon name="chevron-right" size={30} color={colors.text} />
        </TouchableOpacity>
      </View>

      <Text style={{
        marginTop: 10,
        fontSize: 16,
        fontWeight: "500",
        paddingHorizontal: 24,
        opacity: 0.6
      }}>General</Text>

      <View style={{
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        marginTop: 0,
      }}>
        <FlatList 
            contentContainerStyle={{
                paddingHorizontal: 24,
                gap: 18,                
              }}
            data={GENERAL_LIST}            
            renderItem={({item, index}) => {
            return (
                <View>
                    <TouchableOpacity 
                        onPress={() => {
                            navigation.navigate(item.screen);
                          }}>
                        <RenderItem item={item} index={index}/>
                    </TouchableOpacity>
                    <View style={{height: 1, backgroundColor: colors.border, marginTop: 18}}/>
                </View>
            )
          }} />
      </View>

    </SafeAreaView>
  );
};

export default ProfileScreen;

