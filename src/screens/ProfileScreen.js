import {
  React,
  useState,
  useRef,
  useCallback,
  useMemo
} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  Image,
  Touchable,
  TouchableOpacity,
  FlatList,
  Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MasonryList from '@react-native-seoul/masonry-list';
import { BlurView } from 'expo-blur';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import CustomBackdrop from "../components/CustomBackdrop";
import FilterView from "../components/FilterView";
import { SignOutUser } from '../utilities/Utilities';

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
  ];

const SUPPORT_LIST = [
  {
    icon: "alert-circle-outline",
    title: "Report an issue",
  },
];

const ProfileScreen = ({ navigation }) => {
  const { colors } = useTheme();

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
          gap: 20,
        }}>
          <Icon name={item.icon} size={35} color={colors.text} />
          <Text style={{ fontSize: 17, fontWeight: "500", color: colors.text }}>{item.title}</Text>
        </View>
        <Icon name={"chevron-right"} size={30} color={colors.text} />
      </View>
    )
  }

  const handleSignOut = () => {
    try{
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
          onPress={() => {handleSignOut()}}
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
              Hi, James 👋
            </Text>
            <Text style={{ color: colors.text, opacity: 0.75 }}
              numberOfLines={1}>
              James@gmail.com
            </Text>
          </View>
          <Icon name="chevron-right" size={30} color={colors.text} />
        </TouchableOpacity>
      </View>

      <Text style={{
        marginTop: 20,
        fontSize: 16,
        fontWeight: "500",
        paddingHorizontal: 24,
        opacity: 0.6
      }}>General</Text>

      <View style={{
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        marginTop: -10,
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

      <Text style={{
        marginTop: 10,
        fontSize: 16,
        fontWeight: "500",
        paddingHorizontal: 24,
        opacity: 0.6
      }}>Support</Text>

      <View style={{
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        marginTop: -10,
      }}>
        <FlatList 
            contentContainerStyle={{
                paddingHorizontal: 24,
                gap: 18,
              }}
            data={SUPPORT_LIST}
            renderItem={({item, index}) => {
            return (
                <View>
                    <TouchableOpacity>
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

