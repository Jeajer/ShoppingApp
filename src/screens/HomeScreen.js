import { 
  React,
  useState } from 'react';
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

const CATEGORIES = [
  "Clothing",
  "Shoes",
  "Accessories 1",
  "Accessories 2",
  "Accessories 3",
  "Accessories 4",
]

const AVATAR_URL = "https://static.nike.com/a/images/f_auto/dpr_1.3,cs_srgb/h_455,c_limit/12f2c38e-484a-44be-a868-2fae62fa7a49/nike-just-do-it.jpg"

const HomeScreen = () => {
  const {colors} = useTheme();
  const [categoryIndex, setCategoryIndex] = useState(0);

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
          data={[1,2,3,454,4,56,44]}
          keyExtractor={item => item}
          numColumns={2}
          contentContainerStyle={{paddingHorizontal: 24}}
          showsVerticalScrollIndicator={false}
          renderItem={({item, i}) => {
            return (
              <TouchableOpacity 
                style={{
                  aspectRatio: i === 0 ? 1 : 2/3,
                  position: "relative",
                  overflow: "hidden",
                  backgroundColor: colors.background,
                  marginTop: 16,
                  borderRadius: 24,
                }}>
                  <Image
                    source={{uri: "https://scontent.fsgn2-5.fna.fbcdn.net/v/t39.30808-6/328103934_1796182617448631_3012007103537352558_n.jpg?stp=cp6_dst-jpg&_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=OTKlYKpiIW4AX_w6jIa&_nc_ht=scontent.fsgn2-5.fna&oh=00_AfA9wUzfoJatGPpn3xYuKNmli_Mv1VQ7EgZOh6kfGgxuLA&oe=6470811F"}}
                    resizeMode="cover"
                    style={StyleSheet.absoluteFill}/>     

                  <View style={[StyleSheet.absoluteFill,
                    {padding: 12,}]
                    }>
                    <View style={{flexDirection: "row", gap: 8}}>
                      <Text 
                        style={{
                          flex: 1, 
                          fontSize: 16, 
                          fontWeight: "600",
                          color: colors.text,
                      }}>
                            PUMA Everyday Hussle
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
                        alignItems: "center"}}
                      intensity={20}>
                      <Text style={{flex: 1, fontSize: 16, fontWeight: "600", color: "#fff"}}
                        numberOfLines={1}>
                        $160.00
                      </Text>
                    </BlurView>
                    
                  </View>        
              </TouchableOpacity>);
            }}
          onEndReachedThreshold={0.1}
        />
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
          180 $
        </Text>
      </View>
    </TouchableOpacity>
  );
};