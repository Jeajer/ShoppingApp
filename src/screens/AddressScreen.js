import {
  React,
  useState,
  useRef,
  useCallback,
  useEffect,
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
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useTheme } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../firebaseConfig';
import { doc, setDoc, getDoc } from 'firebase/firestore'

const AddressScreen = ({ navigation }) => {
  const { colors } = useTheme();

  const user = FIREBASE_AUTH.currentUser;
  const [listData, setListData] = useState([]);

  useEffect(async () => {
    const docRef = doc(FIREBASE_DB, "Users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const newItem = {
        fullname: user.displayName,
        address: docSnap.data().detail,
        country: docSnap.data().country,
        city: docSnap.data().city,
        district: docSnap.data().district,
      };
      setListData([...listData, newItem]);
      console.log("Document data:", docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  }, []);

  const RenderItem = ({ item, index }) => {
    return (
      <View style={{
        gap: 15,
      }}>
        <View style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          <Text style={{ fontSize: 17, fontWeight: "500", color: colors.text }}>{item.fullname}</Text>
          <TouchableOpacity onPress={() => {navigation.navigate('Add Address Screen')}}>
            <Icon name={"pencil-outline"} size={24} color={colors.text} />
          </TouchableOpacity>
        </View>
        <Text style={{ fontSize: 16, fontWeight: "400", color: colors.text, opacity: 0.6 }}>{item.address}, {item.district}, {item.city}, {item.country}</Text>
      </View>
    )
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
        }}>Shipping address</Text>
        <View style={{ width: 30 }} />
      </View>

      <View style={{ height: '63%' }}>
        <FlatList
          contentContainerStyle={{
            paddingHorizontal: 24,
            gap: 24,
          }}
          data={listData}
          renderItem={({ item, index }) => {
            return (
              <View>
                <TouchableOpacity >
                  <RenderItem item={item} index={index} />
                </TouchableOpacity>
                <View style={{ height: 1, backgroundColor: colors.border, marginTop: 24 }} />
              </View>
            )
          }} />
      </View>

      <View
        style={{
          paddingHorizontal: 30,
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
  )
}

export default AddressScreen;