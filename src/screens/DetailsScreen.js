import { React, useRef, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StatusBar, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomSheet from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../firebaseConfig';
import { BlurView } from 'expo-blur';
import { doc, setDoc, getDoc, collection, query, where, getDocs, deleteDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import MasonryList from '@react-native-seoul/masonry-list';
import axios from 'axios'
import publicIP from 'react-native-public-ip';


const SIZES = ["XS", "S", "M", "L", "XL", "XXL", "3XL"];

const DetailsScreen = ({ navigation, route: { params: { id, name, price, description, imageUrl, color } } }) => {
  const bottomSheetRef = useRef(null);
  const insets = useSafeAreaInsets();

  const [isButtonOn, setIsButtonOn] = useState(false);

  const user = FIREBASE_AUTH.currentUser;

  const favoriteBtnClick = async () => {
    if (user) {
      setIsButtonOn(!isButtonOn);
      if (isButtonOn === false) {
        try {
          await setDoc(doc(FIREBASE_DB, "Users", FIREBASE_AUTH.currentUser.uid, "Favourite", id), {
            id: id,
            description: description,
            name: name,
            price: price,
            img: imageUrl,
            color: color,
            quantity: 1,
          });
        } catch (error) {
          console.log(error.message)
        } finally {
          console.log('Successfully added')
        }
      }
      else {
        try {
          await deleteDoc(doc(FIREBASE_DB, "Users", user.uid, "Favourite", id));
        } catch (error) {
          console.log(error.message)
        }
      }
    } else {
      alert('You have to login first')

    }
  };

  const { colors } = useTheme();
  const [count, setCount] = useState(1);
  const [size, setSize] = useState(SIZES[0]);
  const [imag, setImag] = useState('')
  const [forYou, setForYou] = useState([])
  const [favouriteString, setFavouriteString] = useState('');
  const [rcmProducts, setRCMProducts] = useState([]);

  const RCM_LIST = []

  const handleAddToCart = async (id) => {
    try {
      await setDoc(doc(FIREBASE_DB, "Users", FIREBASE_AUTH.currentUser.uid, "Carts", id), {
        id: id,
        description: description,
        name: name,
        price: price,
        img: imageUrl,
        color: color,
        quantity: count,
      });
    } catch (error) {
      console.log(error.message)
    } finally {
      console.log('Successfully added')
    }
    alert('Successfully added')
  }
  
  //reload the screen
  const [reload, setReload] = useState(false);

  const reloadScreen = () => {
    setReload(true);
  };

  //useEffect
  useEffect(() => {
    if (reload) {
      // Thực hiện các hành động cần thiết khi reload
      setReload(false);
    }

    const fetchDoc = async () => {
      if (user) {
        const querySnapshot = await getDocs(collection(FIREBASE_DB, "Users", user.uid, "Favourite"));
        if (querySnapshot) {
          querySnapshot.forEach((doc) => {
            favouriteStr = favouriteStr + doc.data().id + ' ';
            if (doc.id === id) {
              setIsButtonOn(true);
            }
          });
        }
        setFavouriteString(favouriteStr)
      }
    }

    const fetchData = async () => {
      try {
        axios.get("http://10.0.23.91:8000/api/content")
          .then(res => {
            //console.log(res)
            setRCMProducts(res.data)
            let foundObject = [];
            console.log(id)
            let check = false;
            for (let i = 0; i < res.data.length; i++) {
              if (res.data[i].name === id) {
                check = true;
              }
            }
            if (!check) {
              axios.post('http://10.0.23.91:8000/api/content/', {
                "name": id,
                "recommendation": ""
              })
                .then(function (response) {
                  console.log("day la: ", response.data.name);
                  let listt = response.data.recommendation
                  for (let i = 0; i < listt.length; i++) {
                    RCM_LIST.push({
                      imageUrl: listt[i].imageUrl,
                      title: listt[i].title,
                      price: listt[i].price,
                      id: listt[i].id,
                      description: listt[i].description,
                      color: listt[i].color,
                    });
                  }
                  console.log(RCM_LIST)
                  setForYou(RCM_LIST)
                })
                .catch(function (error) {
                  console.log(error);
                });
            }
            else {
              for (let i = 0; i < res.data.length; i++) {
                if (res.data[i].name === id) {
                  foundObject = res.data[i].recommendation;
                  break;
                }
              }

              for (let i = 0; i < foundObject.length; i++) {
                RCM_LIST.push({
                  imageUrl: foundObject[i].imageUrl,
                  title: foundObject[i].title,
                  price: foundObject[i].price,
                  id: foundObject[i].id,
                  description: foundObject[i].description,
                  color: foundObject[i].color,
                });
              }
              console.log(RCM_LIST)
              setForYou(RCM_LIST)
            }

          })
          /*.then(json =>{
            console.log(json.data)
            console.log("Good")
          })*/
          .catch(err => {
            console.log("Bad")
            console.log(err)
          });
      } catch (err) {
        console.log(err);
      }
    }

    fetchData();

    fetchDoc();
  }, [reload]);

  //Scroll screen to top
  const scrollViewRef = useRef();
  const scrollToTop = () => {
    scrollViewRef.current.scrollTo({ y: 0, animated: true });
  };


  return (
    <View style={{ flex: 1 }}>
      <ScrollView ref={scrollViewRef}
        style={{ flex: 1 }}>
        <Image
          source={{
            uri: imageUrl
          }}
          resizeMode="contain"
          style={{
            height: 750
          }} />

        <Text
          style={{
            fontSize: 26,
            fontWeight: "600",
            color: colors.text,
            textShadowColor: "rgba(0,0,0,0.2)",
            textShadowOffset: {
              height: 1,
              width: 0,
            },
            textShadowRadius: 4,
            paddingBottom: 20,
            paddingLeft: 20,
          }}
        >
          You may also like
        </Text>

        <MasonryList
          data={forYou}
          numColumns={2}
          contentContainerStyle={{ paddingHorizontal: 16 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, i }) => {
            return (
              <View style={{ padding: 6, paddingBottom: 100 }}>
                <TouchableOpacity
                  onPress={() => {
                    reloadScreen();
                    scrollViewRef.current.scrollTo({ y: 0, animated: true });
                    navigation.navigate("Details Screen", {
                      id: item.id,
                      imageUrl: item.imageUrl,
                      price: item.price,
                      name: item.title,
                      description: item.description,
                      color: item.color,
                    });
                  }}
                >
                  <View
                    style={{
                      aspectRatio: i === 0 ? 1 : 2 / 3,
                      position: "relative",
                      overflow: "hidden",
                      backgroundColor: colors.background,
                      borderRadius: 24,
                    }}>
                    <Image
                      source={{ uri: item.imageUrl }}
                      resizeMode="cover"
                      style={StyleSheet.absoluteFill} />

                    <View style={[StyleSheet.absoluteFill,
                    { padding: 12, }]
                    }>
                      <View style={{ flexDirection: "row", gap: 8, padding: 4 }}>
                        <Text
                          style={{
                            flex: 1,
                            fontSize: 16,
                            fontWeight: "600",
                            color: colors.text,
                            textShadowColor: "rgba(0,0,0,0.2)",
                            textShadowOffset: {
                              height: 1,
                              width: 0,
                            },
                            textShadowRadius: 4,
                          }}>
                          {item.title}
                        </Text>
                        <View
                          style={{
                            backgroundColor: colors.background,
                            borderRadius: 100,
                            height: 32,
                            aspectRatio: 1,
                            alignItems: "center",
                            justifyContent: "center",
                          }}>
                          <Icon name={!favouriteString.includes(item.id) ? 'heart-outline' : 'heart'} size={20} color={!favouriteString.includes(item.id) ? '#000' : 'red'} />
                        </View>
                      </View>

                      <View style={{ flex: 1, }} />
                      <BlurView
                        style={{
                          flexDirection: "row",
                          backgroundColor: "rgba(0, 0, 0, 0.45)",
                          alignItems: "center",
                          padding: 8,
                          borderRadius: 100,
                          overflow: "hidden"
                        }}
                        intensity={20}>
                        <Text
                          style={{
                            flex: 1,
                            fontSize: 16,
                            fontWeight: "600",
                            color: "#fff",
                            marginLeft: 8,
                          }}
                          numberOfLines={1}>
                          ${item.price}
                        </Text>

                        <TouchableOpacity
                          onPress={() => { handleAddToCart(item) }}
                          style={{
                            paddingHorizontal: 16,
                            paddingVertical: 8,
                            borderRadius: 100,
                            backgroundColor: "#fff"
                          }}>
                          <Icon name="basket-outline" size={20} color="#000" />
                        </TouchableOpacity>
                      </BlurView>

                    </View>
                  </View>
                </TouchableOpacity>
              </View>);
          }}
          onEndReachedThreshold={0.1}
        />
      </ScrollView>

      <SafeAreaView
        edges={["top"]}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0
        }}>

        <StatusBar style="light" />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 20,
            gap: 8
          }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              width: 52,
              aspectRatio: 1,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 52,
              borderWidth: 1,
              borderColor: 'black'
            }}>
            <Icon name={"arrow-left"} size={24} color={"black"} />
          </TouchableOpacity>

          <View style={{ flex: 1 }} />

          <TouchableOpacity
            onPress={() => favoriteBtnClick()}
            style={{
              width: 52,
              aspectRatio: 1,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 52,
              borderWidth: 1,
              borderColor: isButtonOn ? "red" : "black"
            }}>
            <Icon
              name={isButtonOn ? "heart" : "heart-outline"}
              size={24}
              color={isButtonOn ? "red" : "black"} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Cart Screen')}
            style={{
              width: 52,
              aspectRatio: 1,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 52,
              borderWidth: 1,
              borderColor: 'black'
            }}>
            <Icon name={"basket-outline"} size={24} color={"black"} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={[80, 500]}
        detached={true}
        style={{ marginHorizontal: 20 }}
        bottomInset={insets.bottom + 20}
        backgroundStyle={{
          borderRadius: 24,
          backgroundColor: colors.background,
        }}
        handleIndicatorStyle={{
          backgroundColor: colors.primary,
        }}>
        <View
          style={{
            padding: 16,
            gap: 16,
            flex: 1
          }}>
          <Text style={{ fontSize: 20, fontWeight: "600", color: colors.text }}>
            {name}
          </Text>

          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: "row", gap: 2 }}>
                {new Array(5).fill("").map((_, i) =>
                  <Icon
                    key={i}
                    name={i < 3 ? "star" : "star-outline"}
                    color={"#facc15"}
                    size={20} />)}
              </View>
              <Text
                style={{
                  fontSize: 14,
                  color: colors.text,
                  opacity: 0.5,
                  marginTop: 4,
                }}>3.0 (250k Reviews)</Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 6,
                backgroundColor: colors.primary,
                padding: 6,
                borderRadius: 100,
              }}>
              <TouchableOpacity
                onPress={() => setCount((count) => Math.max(1, count - 1))}
                style={{
                  backgroundColor: colors.card,
                  width: 34,
                  aspectRatio: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 34,
                }}>
                <Icon name={"minus"} size={20} color={colors.text} />
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  color: colors.background
                }}>{count}</Text>
              <TouchableOpacity
                onPress={() => setCount((count) => Math.min(10, count + 1))}
                style={{
                  backgroundColor: colors.card,
                  width: 34,
                  aspectRatio: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 34,
                }}>
                <Icon name={"plus"} size={20} color={colors.text} />
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  flex: 1,
                  fontSize: 16,
                  fontWeight: "600",
                  color: colors.text,
                  textTransform: "uppercase"
                }}>
                Model is 6'1'', Size M
              </Text>
              <Text
                style={{
                  color: colors.text,
                  opacity: 0.5
                }}>
                Size guide
              </Text>
            </View>

            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 6, marginTop: 6 }}>
              {SIZES.map((s, i) =>
                <TouchableOpacity key={i} onPress={() => setSize(s)}
                  style={{
                    width: 44,
                    height: 44,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: s === size ? colors.primary : colors.card,
                    borderRadius: 44
                  }}>
                  <Text
                    style={{
                      color: s === size ? "#fff" : colors.text,
                      fontSize: 16,
                      fontWeight: "600"
                    }}>{s}</Text>
                </TouchableOpacity>)}
            </View>

            <View>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  marginBottom: 6,
                  color: colors.text,
                }}>
                Description
              </Text>
              <Text
                style={{
                  color: colors.text,
                  opacity: 0.75,
                }}
                numberOfLines={6}>
                {description}
              </Text>
            </View>
          </View>

          <View style={{ flex: 1 }} />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 16
            }}>

            <View style={{ flex: 1 }}>
              <Text
                style={{ color: colors.text, opacity: 0.75, marginBottom: 4 }}
              >
                Total
              </Text>
              <Text
                style={{ color: colors.text, fontSize: 18, fontWeight: "600" }}
              >
                ${price.toLocaleString()}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => handleAddToCart(id)}
              style={{
                backgroundColor: colors.primary,
                height: 64,
                borderRadius: 64,
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                flexDirection: "row",
                padding: 12,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  color: colors.background,
                  paddingHorizontal: 16,
                }}
              >
                Add to cart
              </Text>

              <View
                style={{
                  backgroundColor: colors.card,
                  width: 40,
                  aspectRatio: 1,
                  borderRadius: 40,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon name={"arrow-right"} size={24} color={colors.text} />
              </View>
            </TouchableOpacity>

          </View>
        </View>
      </BottomSheet>
    </View>
  );
}

export default DetailsScreen;