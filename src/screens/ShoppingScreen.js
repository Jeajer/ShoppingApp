import {
  React,
  useState,
  useRef,
  useCallback,
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
  FlatList
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MasonryList from '@react-native-seoul/masonry-list';
import { BlurView } from 'expo-blur';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import CustomBackdrop from "../components/CustomBackdrop";
import FilterView from "../components/FilterView";
import { FIREBASE_AUTH, FIREBASE_DB } from '../../firebaseConfig';
import { doc, getDoc, setDoc, collection, query, where, getDocs, onSnapshot } from 'firebase/firestore';

const CATEGORIES = [
  "Clothing",
  "Shoes",
]

const AVATAR_URL = "https://static.nike.com/a/images/f_auto/dpr_1.3,cs_srgb/h_455,c_limit/12f2c38e-484a-44be-a868-2fae62fa7a49/nike-just-do-it.jpg";


const ShoppingScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const [categoryIndex, setCategoryIndex] = useState(0);
  const bottomSheetModalRef = useRef(null);

  const MESONARY_LIST_DATA = [];
  const SHOES_LIST_DATA = [];

  const user = FIREBASE_AUTH.currentUser;
  const [favouriteString, setFavouriteString] = useState('');

  const [clothesCollection, setClothesCollection] = useState([])
  const [shoesCollection, setShoesCollection] = useState([])

  const [newCollection1, setNewCollection1] = useState({});
  const [newCollection2, setNewCollection2] = useState({});
  const [newCollection3, setNewCollection3] = useState({});

  const getData = (data) => {
    const collectionData = {};
    collectionData.category = data.category;
    collectionData.color = data.color;
    collectionData.description = data.description;
    collectionData.id = data.id;
    collectionData.img = data.img;
    collectionData.name = data.name;
    collectionData.price = data.price;
    collectionData.index = data.index;
    collectionData.subImg = data.subImg;

    return collectionData
  }

  const handleAddToCart = async (item) => {
      try {
        await setDoc(doc(FIREBASE_DB, "Users", FIREBASE_AUTH.currentUser.uid, "Carts", item.id), {
          id: item.id,
          description: item.description,
          name: item.title,
          price: item.price,
          img: item.imageUrl,
          color: item.color,
          quantity: 1,
        });
      } catch (error) {
        console.log(error.message)
      } finally {
        console.log('Successfully added')
      }
    alert('Successfully added')
  }

  useEffect(() => {
    const fetchDoc = async () => {
      const querySnapshot = await getDocs(collection(FIREBASE_DB, "Products"));
      const newQuerySnapshot = await getDocs(collection(FIREBASE_DB, "New Collections"));
      let productQuery = Object.freeze({ name: "Score", points: 157 });
      let shoesQuery = Object.freeze({ name: "Score", points: 157 });

      querySnapshot.forEach((doc) => {
        if (doc.data().category === 'clothes') {
          MESONARY_LIST_DATA.push({
            imageUrl: doc.data().img,
            title: doc.data().name,
            price: doc.data().price,
            id: doc.id,
            description: doc.data().description,    
            color: doc.data().color,        
          });
        } else {
          SHOES_LIST_DATA.push({
            imageUrl: doc.data().img,
            title: doc.data().name,
            price: doc.data().price,
            id: doc.id,
            description: doc.data().description,
            color: doc.data().color,
          });
        }
      });

      newQuerySnapshot.forEach((doc) => {
        if (doc.data().index === 1) {
          const collectionData = getData(doc.data());
          setNewCollection1(collectionData);
        } else if (doc.data().index === 2) {
          const collectionData = getData(doc.data());
          setNewCollection2(collectionData);
        } else if (doc.data().index === 3) {
          const collectionData = getData(doc.data());
          setNewCollection3(collectionData);
        }
      })

      shoesQuery = SHOES_LIST_DATA;
      productQuery = MESONARY_LIST_DATA;
      setClothesCollection(productQuery);
      setShoesCollection(shoesQuery);

      let favouriteStr = '';

      const favouriteSnap = await getDocs(collection(FIREBASE_DB, "Users", user.uid, "Favourite"));
      if (favouriteSnap) {
        favouriteSnap.forEach((doc) => {
          favouriteStr = favouriteStr + doc.data().id + ' ';
        });
      }
      setFavouriteString(favouriteStr)
    }
    fetchDoc();
  }, []);

  const handleCategory = async () => { }

  // Retrieve the documents in the collection

  const handle = async () => {
    const q = query(collection(FIREBASE_DB, "Products"), where("category", "==", "clothes"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const clothes = [];
      querySnapshot.forEach((doc) => {
        clothes.push(doc.data().name);
      });
      console.log("Current products as clothes: ", clothes.join(", "));
    });
  }

  const openFilterModal = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  return (
    <ScrollView>
      <SafeAreaView style={{ paddingVertical: 24, gap: 24 }}>
        {/* Header Section */}
        <View style={{
          paddingHorizontal: 24,
          flexDirection: "row",
          alignItems: "center",
          gap: 8
        }}>
          <Image source={{ uri: AVATAR_URL }}
            style={{ width: 52, aspectRatio: 1, borderRadius: 52 }}
            resizeMode="cover" />
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 6, color: colors.text }}>
              {/* Hi, {user.displayName} 👋 */}
              Hi {user ? user.displayName : 'Guest'} 👋
            </Text>
            <Text style={{ color: colors.text, opacity: 0.75 }}
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
              borderColor: colors.border
            }}
            onPress={() => { handle() }}
          >
            <Icon name="bell" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        {/* Search Bar Section */}
        <View style={{ flexDirection: "row", paddingHorizontal: 24, gap: 12 }}>
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
              gap: 12
            }}>
            <Icon
              name="magnify"
              size={24}
              color={colors.text}
              style={{ opacity: 0.5 }} />
            <Text
              style={{
                flex: 1,
                fontSize: 16,
                color: colors.text,
                opacity: 0.5
              }}>
              Search
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={openFilterModal}
            style={{
              width: 52,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 52,
              backgroundColor: colors.primary
            }}>
            <Icon
              name="tune"
              size={24}
              color={colors.background} />
          </TouchableOpacity>
        </View>

        {/* Grid Collection View */}
        <View style={{ paddingHorizontal: 24 }}>
          {/* Title bar */}
          <View style={{ flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 12, }}>
            <Text style={{ fontSize: 20, fontWeight: "700" }}>New Collection</Text>
            <TouchableOpacity>
              <Text>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row", height: 200, gap: 12 }}>
            {/* Card */}
            <Card
              onPress={() => {
                navigation.navigate("Details Screen", {
                  id: newCollection1.id,
                  imageUrl: newCollection1.subImg,
                  price: newCollection1.price,
                  name: newCollection1.name,
                  descripton: newCollection1.description,
                  color: newCollection1.color,
                });
              }}
              id={newCollection1.id}
              imageUrl={newCollection1.img}
              price={newCollection1.price}
            />

            <View style={{ flex: 1, gap: 12 }}>
              <Card
                onPress={() => {
                  navigation.navigate("Details Screen", {
                    id: newCollection2.id,
                    imageUrl: newCollection2.subImg,
                    price: newCollection2.price,
                    name: newCollection2.name,
                    descripton: newCollection2.description,
                    color: newCollection2.color,
                  });
                }}
                id={newCollection2.id}
                price={newCollection2.price}
                imageUrl={newCollection2.img}
              />
              <Card
                onPress={() => {
                  navigation.navigate("Details Screen", {
                    id: newCollection3.id,
                    imageUrl: newCollection3.subImg,
                    price: newCollection3.price,
                    name: newCollection3.name,
                    descripton: newCollection3.description,
                    color: newCollection3.color,
                  });
                }}
                id={newCollection3.id}
                price={newCollection3.price}
                imageUrl={newCollection3.img}
              />
            </View>
          </View>
        </View>

        {/* Categories Section */}
        <FlatList
          data={CATEGORIES}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 24,
            gap: 12,
          }}
          renderItem={({ item, index }) => {
            const isSelected = categoryIndex === index;
            return (
              <TouchableOpacity
                onPress={() => setCategoryIndex(index)}
                style={{
                  backgroundColor: isSelected ? colors.primary : colors.card,
                  paddingHorizontal: 20,
                  paddingVertical: 12,
                  borderRadius: 100,
                  borderWidth: isSelected ? 0 : 1,
                  borderColor: colors.border,
                }}
              >
                <Text
                  style={{
                    color: isSelected ? colors.background : colors.text,
                    fontWeight: "600",
                    fontSize: 14,
                    opacity: isSelected ? 1 : 0.5,
                  }}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            );
          }}
        />

        {/* MasonryList */}
        <MasonryList
          data={categoryIndex === 0 ? clothesCollection : shoesCollection}
          numColumns={2}
          contentContainerStyle={{ paddingHorizontal: 16 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, i }) => {
            return (
              <View style={{ padding: 6 }}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Details Screen", {
                      id: item.id,
                      imageUrl: item.imageUrl,
                      price: item.price,
                      name: item.title,
                      descripton: item.description,
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
                          onPress={() => {handleAddToCart(item)}}
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
      </SafeAreaView>

      <BottomSheetModal
        snapPoints={['80%']}
        index={0}
        ref={bottomSheetModalRef}
        backdropComponent={(props) => <CustomBackdrop {...props} />}
        backgroundStyle={{
          borderRadius: 24,
        }}>
        <FilterView />
      </BottomSheetModal>
    </ScrollView>
  );
}

export default ShoppingScreen;

const Card = ({
  price,
  imageUrl,
  id,
  onPress
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flex: 1,
        position: "relative",
        overflow: "hidden",
        borderRadius: 24,
      }}
    >
      <Image
        source={{
          uri: imageUrl,
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
          ${price}
        </Text>
      </View>
    </TouchableOpacity>
  );
};