import { 
    React,
    useState,
    useRef,
    useCallback ,
    useMemo} from 'react';
  import {
    View, 
    Text,
    Button, 
    StyleSheet, 
    ScrollView, 
    Image, 
    Touchable, 
    TouchableOpacity,
    FlatList } from 'react-native';
  import { SafeAreaView } from 'react-native-safe-area-context';
  import { useTheme } from '@react-navigation/native';
  import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
  import MasonryList from '@react-native-seoul/masonry-list';
  import { BlurView } from 'expo-blur';
  import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
  import CustomBackdrop from "../components/CustomBackdrop";
  import FilterView from "../components/FilterView";
  
  const CATEGORIES = [
    "Clothing",
    "Shoes",
    "Accessories 1",
    "Accessories 2",
    "Accessories 3",
    "Accessories 4",
  ]
  
  const AVATAR_URL = "https://static.nike.com/a/images/f_auto/dpr_1.3,cs_srgb/h_455,c_limit/12f2c38e-484a-44be-a868-2fae62fa7a49/nike-just-do-it.jpg";
  const MESONARY_LIST_DATA = [
    {
      imageUrl:
        "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/a5db19b7-dd9a-4e7d-8249-77223324c09f/life-woven-military-short-sleeve-button-down-shirt-4hD9x8.png",
      title: "PUMA Everyday Hussle",
      price: 160,
    },
    {
      imageUrl:
        "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/a6106db6-e16c-4de9-9407-be02a10da88b/sportswear-everyday-modern-woven-short-sleeve-top-hRTvkd.png",
      title: "PUMA Everyday",
      price: 180,
    },
    {
      imageUrl:
        "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/0440d244-bff7-4fdf-aab3-cbd00c5d05c7/sportswear-team-nike-short-sleeve-top-l77Dq3.png",
      title: "PUMA Everyday",
      price: 200,
    },
    {
      imageUrl:
        "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/7e7db949-aadc-435e-a709-abb1deac22f7/golf-t-shirt-f1pqcz.png",
      title: "PUMA Everyday",
      price: 180,
    },
    {
      imageUrl:
        "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/e42dbedf-8a3a-4f94-be8d-eef8567e4423/sportswear-icon-clash-short-sleeve-tie-top-GdbMh0.png",
      title: "PUMA Everyday",
      price: 120,
    },
  ];
  
  const ShoppingScreen = ({navigation}) => {
    const {colors} = useTheme();
    const [categoryIndex, setCategoryIndex] = useState(0);
    const bottomSheetModalRef = useRef(null);
  
    const openFilterModal = useCallback(() => {
      bottomSheetModalRef.current?.present();
    }, []);
  
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
                onPress={openFilterModal}
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
              <Card
                onPress={() => {
                  navigation.navigate("Details Screen", {
                    id: "123"
                  });
                }}
                price={130}
                imageUrl="https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80"
              /> 
              
              <View style={{flex: 1, gap: 12}}>
                <Card
                  onPress={() => {
                    navigation.navigate("Details Screen", {
                      id: "456"
                    });
                  }}
                  price={120}
                  imageUrl="https://images.unsplash.com/photo-1571945153237-4929e783af4a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
                />
                <Card
                  onPress={() => {
                    navigation.navigate("Details Screen", {
                      id: "789"
                    });
                  }}
                  price={170}
                  imageUrl="https://images.unsplash.com/photo-1485218126466-34e6392ec754?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2342&q=80"
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
            data={MESONARY_LIST_DATA}
            keyExtractor={item => item}
            numColumns={2}
            contentContainerStyle={{paddingHorizontal: 16}}
            showsVerticalScrollIndicator={false}
            renderItem={({item, i}) => {
              return (
                <View style={{padding: 6}}>
                  <View 
                  style={{
                    aspectRatio: i === 0 ? 1 : 2/3,
                    position: "relative",
                    overflow: "hidden",
                    backgroundColor: colors.background,
                    borderRadius: 24,
                  }}>
                    <Image
                      source={{uri: item.imageUrl}}
                      resizeMode="cover"
                      style={StyleSheet.absoluteFill}/>     
  
                    <View style={[StyleSheet.absoluteFill,
                      {padding: 12,}]
                      }>
                      <View style={{flexDirection: "row", gap: 8, padding: 4}}>
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
                          <Icon name='heart-outline' size={20} color="#000"/>
                        </View>
                      </View>
                      
                      <View style={{flex: 1, }}/>
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
            <FilterView/>
        </BottomSheetModal>
      </ScrollView>
    );
  }
  
  export default ShoppingScreen;
  
  const Card = ({ 
    price, 
    imageUrl, 
    onPress 
  } : {
    price: number;
    imageUrl: string;
    onPress: () => void;
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