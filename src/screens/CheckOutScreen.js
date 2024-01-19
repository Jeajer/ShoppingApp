import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Button } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { useTheme } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SwipeListView } from 'react-native-swipe-list-view';
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
  updateDoc,
  serverTimestamp,
  addDoc,
} from 'firebase/firestore';


const CheckOutScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const [resultArray, setResultArray] = useState([]);
  const [userData, setUserData] = useState({});

  const user = FIREBASE_AUTH.currentUser;

  const removeFromCart = async (id) => {
    try {
      await deleteDoc(doc(FIREBASE_DB, "Users", user.uid, "Carts", id));
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleCheckout = async () => {
    const i = 0;

    try {
      await addDoc(collection(FIREBASE_DB, "Users", user.uid, "On Delivery"), {
        idacc: user.uid,
        name: user.displayName,
        product: resultArray,
        status: 'Processing',
        time: serverTimestamp(),
        totalprice: calculateTotalPrice(),
        totalquantity: calculateTotalQuan(),
      });
      await addDoc(collection(FIREBASE_DB, "Orders"), {
        idacc: user.uid,
        name: user.displayName,
        product: resultArray,
        status: 'Processing',
        time: serverTimestamp(),
        totalprice: calculateTotalPrice(),
        totalquantity: calculateTotalQuan(),
      });
    } catch (error) {
      console.log(error.message)
    }



    // const collectionRef = await getDocs(collection(FIREBASE_DB, "Orders"));
    // const newestDoc = '';

    // try {
    //   collectionRef.orderBy('time', 'desc').limit(1).get()
    //     .then((querySnapshot) => {
    //       if (!querySnapshot.empty) {
    //         // Get the newest document from the query results
    //         newestDoc = querySnapshot.docs[0].id;
    //         console.log('Newest document:', newestDoc.data());
    //       } else {
    //         console.log('No documents found');
    //       }
    //     })
    //     .catch((error) => {
    //       console.error('Error getting documents:', error);
    //     });
    // } catch (error) {
    //   console.log(error)
    // }

    resultArray.forEach(async (item) => {
      try {
        // await addDoc(doc(FIREBASE_DB, "Orders", newestDoc, 'Products'), {
        //   id: item.id,
        //   name: item.title,
        //   price: item.price,
        //   img: item.imageUrl,
        //   color: item.color,
        //   quantity: item.quantity,
        // });
        removeFromCart(item.id)
      } catch (error) {
        console.log(error.message)
      }
    })
    setResultArray([])
    navigation.navigate("Success Order Screen")
  }

  const calculateTotalPrice = () => {
    return resultArray.reduce((total, product) => total + product.price, 0);
  };

  const calculateTotalQuan = () => {
    return resultArray.reduce((total, product) => total + product.quantity, 0);
  };

  const fetchValue = async () => {
    const querySnapshot = await getDocs(collection(FIREBASE_DB, "Users", user.uid, "Carts"));
    const docRef = doc(FIREBASE_DB, "Users", user.uid);
    const docSnap = await getDoc(docRef);
    let productQuery = Object.freeze({ name: "Score", points: 157 });
    const listData = [];
    const pCount = {};
    querySnapshot.forEach((doc) => {
      listData.push({
        imageUrl: doc.data().img,
        title: doc.data().name,
        price: doc.data().price,
        id: doc.id,
        description: doc.data().description,
        color: doc.data().color,
        quantity: doc.data().quantity,
      })
    })

    const userData = {};
    if (docSnap.exists) {
      userData.address = docSnap.data().address;
      userData.country = docSnap.data().country;
      userData.displayName = docSnap.data().displayName;
      userData.email = docSnap.data().email;
      userData.img = docSnap.data().img;
      userData.phone = docSnap.data().phone;
    }
    else {
      console.log("No such document!");
    }
    setUserData(userData);
    productQuery = listData;
    setResultArray(productQuery);
    console.log(resultArray)
  };

  useEffect(() => {
    fetchValue();
  }, []);

  return (
    <SafeAreaView style={{
      marginTop: 30,
      gap: 20,
      flex: 1,
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
          fontWeight: "700",
        }}>Check out</Text>
        <View style={{ width: 30 }} />
      </View>

      <ScrollView>
        <SafeAreaView
          style={{
            paddingVertical: 10,
            gap: 30,
            flex: 1,
          }}>

          <View style={{
            paddingHorizontal: 24,
            gap: 10,
          }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between"
              }}>
              <Text style={{
                fontSize: 18,
                fontWeight: "600",
                opacity: 0.5,
              }}>
                Shipping Address
              </Text>

              <TouchableOpacity>
                <Icon name={'pencil-circle-outline'} size={30} color={colors.text} />
              </TouchableOpacity>
            </View>

            <View
              style={{
                paddingHorizontal: 20,
                gap: 7
              }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "600"
                }}>
                {user.displayName}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "400",
                  opacity: 0.5
                }}>
                {userData.address}, {userData.country}
              </Text>
            </View>
          </View>

          <View style={{
            paddingHorizontal: 24,
            gap: 10,
          }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between"
              }}>
              <Text style={{
                fontSize: 18,
                fontWeight: "600",
                opacity: 0.5,
              }}>
                Payment
              </Text>

              <TouchableOpacity>
                <Icon name={'pencil-circle-outline'} size={30} color={colors.text} />
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 20,
                gap: 15,

              }}>
              <Image
                source={{ uri: "https://imageio.forbes.com/blogs-images/steveolenski/files/2016/07/Mastercard_new_logo-1200x865.jpg?format=jpg&width=1200" }}
                resizeMode="contain"
                height={80}
                width={80}
                style={{ borderRadius: 24, }} />
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "500",
                }}>
                **** **** **** 3947
              </Text>
            </View>
          </View>

          <View style={{
            paddingHorizontal: 24,
            gap: 10,
          }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between"
              }}>
              <Text style={{
                fontSize: 18,
                fontWeight: "600",
                opacity: 0.5,
              }}>
                Delivery Method
              </Text>

              <TouchableOpacity>
                <Icon name={'pencil-circle-outline'} size={30} color={colors.text} />
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 20,
                gap: 15
              }}>
              <Image
                source={{ uri: "https://i.ytimg.com/vi/Wu83TlJk2og/maxresdefault.jpg" }}
                resizeMode="contain"
                height={80}
                width={80}
                style={{ borderRadius: 24, }} />
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "500",
                }}>
                Fast (2-3 days)
              </Text>
            </View>
          </View>

          <View
            style={{
              paddingHorizontal: 40,
              gap: 10,
              marginTop: 10
            }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}>
              <Text style={{
                fontSize: 16,
                fontWeight: "400",
                color: colors.text,
                opacity: 0.8
              }}>
                Order:
              </Text>
              <Text style={{
                fontSize: 16,
                fontWeight: "600",
                color: colors.text,
              }}>
                ${calculateTotalPrice().toLocaleString()}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}>
              <Text style={{
                fontSize: 16,
                fontWeight: "400",
                color: colors.text,
                opacity: 0.8
              }}>
                Delivery:
              </Text>
              <Text style={{
                fontSize: 16,
                fontWeight: "600",
                color: colors.text,
              }}>
                ${(10).toLocaleString()}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 7,
                justifyContent: "space-between",
              }}>
              <Text style={{
                fontSize: 16,
                fontWeight: "600",
                color: colors.text,
              }}>
                Total Price:
              </Text>
              <Text style={{
                fontSize: 16,
                fontWeight: "600",
                color: "red",
              }}>
                ${(calculateTotalPrice() + 10).toLocaleString()}
              </Text>
            </View>


          </View>

          <View
            style={{
              paddingHorizontal: 30,
              marginTop: 5,
            }}>

            <TouchableOpacity
              onPress={() => { handleCheckout() }}
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
                SUBMIT ORDER
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
      </ScrollView>

    </SafeAreaView>
  );
};


export default CheckOutScreen;

