import {
  React,
  useState,
  useEffect,
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
  Dimensions,
  RefreshControl,
} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useTheme } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../firebaseConfig';
import {
  doc,
  setDoc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  updateDoc
} from 'firebase/firestore';

const GENERAL_LIST = [
  {
    order: "No1",
    date: "20/05/2023",
    quantity: "03",
    amount: "$150"
  },
  {
    order: "No1",
    date: "20/05/2023",
    quantity: "03",
    amount: "$150"
  },
];

const ProcessingScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  const user = FIREBASE_AUTH.currentUser;
  const [resultArray, setResultArray] = useState([]);

  useEffect(() => {
    const fetchValue = async () => {
      const q = query(collection(FIREBASE_DB, "Users", user.uid, "On Delivery"));
      const querySnapshot = await getDocs(collection(FIREBASE_DB, "Users", user.uid, "On Delivery"));
      let productQuery = Object.freeze({ name: "Score", points: 157 });
      const listData = [];
      querySnapshot.forEach((doc) => {
        listData.push({
          order: doc.id,
          data: doc.data(),
          quantity: doc.data().totalquantity,
          amount: doc.data().totalprice,
        })
      })
      productQuery = listData;
      console.log(productQuery);
      setResultArray(productQuery);

    };

    fetchValue();
  }, [])

  const handleRefresh = () => {
  };

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
          <Text style={{ fontSize: 16, fontWeight: "500", color: colors.text }}>Order: {item.order}</Text>
          <Text style={{ fontSize: 16, fontWeight: "400", color: colors.text, opacity: 0.6 }}>{item.date}</Text>
        </View>
        <View style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          <View style={{ flexDirection: "row", }}>
            <Text style={{ fontSize: 16, fontWeight: "400", color: colors.text, opacity: 0.6 }}>Quantity: </Text>
            <Text style={{ fontSize: 16, fontWeight: "500", color: colors.text }}>{item.quantity}</Text>
          </View>
          <View style={{ flexDirection: "row", }}>
            <Text style={{ fontSize: 16, fontWeight: "400", color: colors.text, opacity: 0.6 }}>Total Amount: </Text>
            <Text style={{ fontSize: 16, fontWeight: "500", color: colors.text }}>{item.amount}</Text>
          </View>
        </View>
        <View style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Detail Order Screen", { id: item.order ,status: "Processing" })}
            style={{
              alignItems: "center",
              backgroundColor: colors.text,
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderRadius: 10
            }}>
            <Text style={{ fontSize: 16, fontWeight: "500", color: "white" }}>Detail</Text>
          </TouchableOpacity>
          <View
            style={{
              alignItems: "center",
              backgroundColor: "transparent",
            }}>
            <Text style={{ fontSize: 16, fontWeight: "500", color: "orange" }}>Processing</Text>
          </View>
        </View>
      </View>
    )
  }

  return (
    <View style={{ paddingVertical: 50, flex: 1, }}>
      <View>
        <FlatList
          contentContainerStyle={{
            paddingHorizontal: 24,
            gap: 40,
          }}
          data={resultArray}
          renderItem={({ item, index }) => {
            return (
              <View>
                <RenderItem item={item} index={index} />
              </View>
            )
          }} 
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          />
      </View>
    </View>
  )
}

export default ProcessingScreen;