import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { View, Alert, Modal, Pressable, FlatList, Text, StyleSheet, ScrollView, TouchableOpacity, Image, } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { useTheme } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AirbnbRating, Rating } from 'react-native-ratings';
import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
  updateDoc,
  query,
  collection,
  where,
  deleteDoc,
} from 'firebase/firestore';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../firebaseConfig';

const ORDER_LIST = [
  {
    name_pro: "Nike Air Pegasus",
    img: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/f9e7b076-da72-419c-aaf5-86c8a2785cbb/pico-5-shoes-QQ5g1N.png",
    color: "pink",
    price: 30,
    quantity: "1",
  },
  {
    name_pro: "The Nike Pico 5",
    img: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/5e169c19-b550-4fb8-bf7e-d49847554fd3/dri-fit-aerobill-legacy91-camo-training-cap-rc1zZQ.png",
    color: "black",
    price: 50,
    quantity: "1",
  },

];

let listRating = []

const DetailOrderScreen = ({ navigation, route: { params: { id, status } } }) => {
  const { colors } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [resultArray, setResultArray] = useState([]);
  const [cancel, setCancel] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [ratingValue, setRatingValue] = useState(0)
  const [productID, setProductID] = useState('')
  const [totalPrice, setTotalPrice] = useState(0)
  const [totalQuantity, setTotalQuantity] = useState(0)
  
  const user = FIREBASE_AUTH.currentUser;

  useEffect(() => {
    const fetchDoc = async () => {
      let st = ""
      listRating = []
      if (status === "Delivered") {
        st = "Delivered"
      }
      else if (status === "Processing") {
        st = "On Delivery"
        setCancel(true)
      }
      else if (status === "Canceled") {
        st = "Canceled"
      }
      const docRef = doc(FIREBASE_DB, "Users", user.uid, st, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setResultArray(docSnap.data().product)
        if (docSnap.data().status === 'Processing') {
          setCancel(true);
        }
        setTotalPrice(docSnap.data().totalprice)
        setTotalQuantity(docSnap.data().totalquantity)
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }

      if (status === "Delivered") {
        setIsVisible(true)
      }
    }

    fetchDoc();
  }, [])

  const handleRating = (value) => {
    setRatingValue(value)
    console.log(value)
  }

  const handleRatingClick = async (id) => {
    setProductID(id)
    let temp = 0
    let snapShot = []
    try {
      const docSnaps = await getDoc(doc(FIREBASE_DB, "Products", id));
      if (docSnaps.data().ratings) {
        for (let rate in docSnaps.data().ratings) {
          if (docSnaps.data().ratings[rate].userID === user.uid) {
            Alert.alert("You have already reviewed this product")
            temp = 1
          }
        }
        snapShot = docSnaps.data().ratings
      }
    } catch (e) {
      console.log(e)
    } finally {
      if (temp === 0) {
        setModalVisible(!modalVisible)
        console.log(id)
        console.log(snapShot)
        listRating = snapShot
        console.log(listRating)
      }
    }
  }

  const handleReceived = async () => {
    try {
      await setDoc(doc(FIREBASE_DB, "Users", user.uid, "Delivered", id), {
        idacc: user.uid,
        name: user.displayName,
        product: resultArray,
        status: 'Delivered',
        time: serverTimestamp(),
        totalprice: totalPrice,
        totalquantity: totalQuantity,
      });
      await updateDoc(doc(FIREBASE_DB, "Orders", id), {
        idacc: user.uid,
        name: user.displayName,
        product: resultArray,
        status: 'Delivered',
        time: serverTimestamp(),
        totalprice: totalPrice,
        totalquantity: totalQuantity,
      });
    } catch (error) {
      console.log(error.message)
    }
    await deleteDoc(doc(FIREBASE_DB, "Users", user.uid, "On Delivery", id))
    navigation.goBack();
  }

  const handleFinishRating = async () => {
    setModalVisible(!modalVisible)
    const docSnap = await getDoc(doc(FIREBASE_DB, "Products", productID));
    console.log(productID)
    console.log(listRating)
    const newData = {
      rating: ratingValue,
      userID: user.uid,
    };

    listRating.push(newData);
    console.log(listRating)

    try {
      await updateDoc(doc(FIREBASE_DB, "Products", productID),
        {
          ratings: listRating
        })
    } catch (e) {
      console.log(e)
    }

  }

  const RenderItem = ({ item, index }) => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background,
          padding: 6,

        }}>
        <View
          style={{
            flexDirection: "row",
            gap: 8,
            alignItems: "flex-end",
            justifyContent: "space-between"
          }}>
          <Image
            source={{ uri: item.imageUrl }}
            resizeMode="contain"
            height={100}
            width={100}
            style={{ borderRadius: 24, }} />

          <View style={{ padding: 12, gap: 6 }}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "500",
                color: colors.text,
                textShadowColor: "rgba(0,0,0,0.2)",
                textShadowOffset: {
                  height: 1,
                  width: 0,
                },
                width: 150,
                textShadowRadius: 4,
              }}>
              {item.title}
            </Text>

            <View style={{ flexDirection: "row", gap: 7, alignItems: "center" }}>
              <View
                style={{
                  backgroundColor: item.color,
                  width: 16,
                  height: 16,
                  borderRadius: 8,
                }} />
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "400",
                }}>{item.color}</Text>
            </View>

            <Text
              style={{
                fontSize: 16,
                fontWeight: "400",
                color: colors.text,
              }}>
              Quantity: {item.quantity}
            </Text>

            {isVisible &&
              <TouchableOpacity
                onPress={() => handleRatingClick(item.id)}
                style={{
                  alignItems: "center",
                  backgroundColor: colors.text,
                  paddingHorizontal: 5,
                  paddingVertical: 5,
                  borderRadius: 5,
                  width: 50,
                }}>
                <Text style={{ fontSize: 10, fontWeight: "500", color: "white" }}>Rating</Text>
              </TouchableOpacity>
            }
          </View>

          <View style={{ justifyContent: "flex-end", alignItems: "flex-end" }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: colors.text,
                paddingHorizontal: 16,
                paddingVertical: 16,
              }}
              numberOfLines={1}>
              ${(item.price).toLocaleString()}
            </Text>
          </View>
        </View>
      </View>
    )
  }


  return (
    <SafeAreaView style={{
      paddingVertical: 24,
      gap: 20,
      flex: 1,
    }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 22,
          }}>
          <View
            style={{
              margin: 20,
              backgroundColor: 'white',
              borderRadius: 20,
              padding: 35,
              alignItems: 'flex-end',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}>
            <TouchableOpacity
              onPress={() => handleFinishRating()}
              style={{
                margin: -10,
                width: 20,
              }}>
              <Icon name='close' size={20} color="#000" />
            </TouchableOpacity>
            <AirbnbRating
              size={24}
              defaultRating={1}
              onFinishRating={handleRating}
            />
          </View>
        </View>
      </Modal>
      <View style={{
        paddingHorizontal: 24,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
      }}>
        <TouchableOpacity
          onPress={() => { navigation.goBack() }}
          style={{
            alignContent: 'flex-start',
            width: 20,
          }}
        >
          <Icon name='chevron-left' size={30} color="#000" />
        </TouchableOpacity>
        <Text style={{
          fontSize: 24,
          fontWeight: "700",
          textAlign: 'center',
          alignItems: 'center',
          alignContent: 'center',
          flex: 1,
        }}>Detail Order</Text>
        {/* <View style={{ width: 30 }} /> */}
        {cancel && 
          <TouchableOpacity onPress={() => navigation.navigate("Confirm Cancel Screen", { id: id })}>
            <Text
              style={{
                fontSize: 15,
                color: 'red'
              }}
            >
              Cancel
            </Text>
          </TouchableOpacity>
        }
      </View>

      <View style={{
        paddingHorizontal: 24,
        justifyContent: "space-between",
        alignItems: "space-between",
        flexDirection: "row"
      }}>
        <Text style={{
          fontSize: 20,
          fontWeight: "700",
        }}>
          Order: {id}
        </Text>
        {cancel &&
          <TouchableOpacity onPress={() => handleReceived()}>
            <Text
              style={{
                fontSize: 15,
                color: 'green'
              }}
            >
              Received
            </Text>
          </TouchableOpacity>
        }
      </View>

      <View style={{
        justifyContent: "flex-start",
        alignItems: "flex-start",
        flexDirection: "row",
        height: "40%"
      }}>
        <FlatList
          data={resultArray}
          contentContainerStyle={{
            paddingHorizontal: 24,
            gap: 18,
          }}
          renderItem={({ item, index }) => {
            return (
              <View>
                <RenderItem item={item} index={index} />
                <View style={{ height: 1, backgroundColor: colors.border, marginTop: 18 }} />
              </View>
            )
          }} />
      </View>

      <View
        style={{
          paddingHorizontal: 40,
          gap: 10,
          marginTop: -15
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
            ${(totalPrice).toLocaleString()}
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
            justifyContent: "space-between",
          }}>
          <Text style={{
            fontSize: 16,
            fontWeight: "400",
            color: colors.text,
            opacity: 0.8
          }}>
            Promotion:
          </Text>
          <Text style={{
            fontSize: 16,
            fontWeight: "600",
            color: colors.text,
          }}>
            - ${(0).toLocaleString()}
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
            ${(totalPrice + 10).toLocaleString()}
          </Text>
        </View>


      </View>

      <View style={{
        paddingHorizontal: 40,
        alignItems: "flex-start",
      }}>
        <View style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
        }}>
          <View style={{
            padding: 15,
            borderRadius: 100,
            backgroundColor: "green",
          }}>
            <Icon name="truck" size={25} color="white" />
          </View>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "700",
              color: colors.text,
            }}>
            Send to your home
          </Text>
        </View>
        <View style={{ height: 15, width: 2, backgroundColor: "black", alignItems: "flex-start", marginLeft: 25 }} />
        <View style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
        }}>
          <View style={{
            padding: 15,
            borderRadius: 100,
            backgroundColor: "gray",
          }}>
            <Icon name="archive-clock" size={25} color="white" />
          </View>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "700",
              color: colors.text,
            }}>
            Processed at  sort facility
          </Text>
        </View>
        <View style={{ height: 15, width: 2, backgroundColor: "black", alignItems: "flex-start", marginLeft: 25 }} />
        <View style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
        }}>
          <View style={{
            padding: 15,
            borderRadius: 100,
            backgroundColor: "gray",
          }}>
            <Icon name="archive" size={25} color="white" />
          </View>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "700",
              color: colors.text,
            }}>
            Departed Facility
          </Text>
        </View>
      </View>

    </SafeAreaView>
  );
};

export default DetailOrderScreen;