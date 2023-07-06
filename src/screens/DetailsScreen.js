import { React, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomSheet from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../firebaseConfig';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';

const SIZES = ["XS", "S", "M", "L", "XL", "XXL", "3XL"];

const DetailsScreen = ({navigation, route: {params: {id, name, price, descripton, img}}}) => {
  const bottomSheetRef = useRef(null);
  const insets = useSafeAreaInsets();

  const {colors} = useTheme();
  const [count, setCount] = useState(1);
  const [size, setSize] = useState(SIZES[0]);
  const [imag, setImag] = useState('')
  
  

  return (
    <View style={{ flex: 1}}>
      <Image 
        source={{
          uri: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/fbfd2bdd-f1a6-4600-bfa2-0bef8a87952f/jordan-essentials-oversized-graphic-t-shirt-nmkFRm.png"
        }}
        style={{
          flex: 1
        }}/>

      <SafeAreaView 
        edges={["top"]}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0
        }}>
        <StatusBar style="light"/>
        <View 
          style={{
            flexDirection: "row", 
            alignItems: "center", 
            padding:20,
            gap: 8}}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              width: 52,
              aspectRatio: 1,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 52,
              borderWidth: 1,
              borderColor: '#fff'
            }}>
            <Icon name={"arrow-left"} size={24} color={"#fff"}/>
          </TouchableOpacity>

          <View style={{flex: 1}}/>

          <TouchableOpacity
            style={{
              width: 52,
              aspectRatio: 1,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 52,
              borderWidth: 1,
              borderColor: '#fff'
            }}>
            <Icon name={"heart-outline"} size={24} color={"#fff"}/>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: 52,
              aspectRatio: 1,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 52,
              borderWidth: 1,
              borderColor: '#fff'
            }}>
            <Icon name={"basket-outline"} size={24} color={"#fff"}/>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={[64, 500]}
        detached={true}
        style={{marginHorizontal: 20}}
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
          <Text style={{fontSize: 20, fontWeight: "600", color: colors.text }}>
            PUMA Everyday Hussle
          </Text>

          <View style={{flexDirection: "row", alignItems: "center", gap: 8}}>
            <View style={{flex: 1}}>
              <View style={{flexDirection: "row", gap: 2}}>
                {new Array(5).fill("").map((_,i) => 
                  <Icon 
                    key={i} 
                    name={ i<3 ? "star" : "star-outline"} 
                    color={"#facc15"}
                    size={20}/>)}
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
                borderRadius: 100,}}>
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
                <Icon name={"minus"} size={20} color={colors.text}/>
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
                <Icon name={"plus"} size={20} color={colors.text}/>
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <View style={{flexDirection: "row", alignItems: "center"}}>
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

            <View style={{flexDirection: "row", flexWrap: "wrap", gap: 6, marginTop: 6}}>
              {SIZES.map((s, i) => 
                <TouchableOpacity key={i} onPress={() => setSize(s)} 
                  style={{
                    width: 44, 
                    height: 44, 
                    alignItems: "center", 
                    justifyContent: "center",
                    backgroundColor: s===size ? colors.primary : colors.card,
                    borderRadius: 44}}>
                  <Text 
                    style={{
                      color: s===size ? "#fff" : colors.text,
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
                numberOfLines={3}>
                Baggy, comfy, cool, what's it to you? This roomy, everyday tee features an all-over tie-dye effect, adding a seasonal touch to your 'fit.
              </Text>
            </View>
          </View>

          <View style={{flex: 1}}/>
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
                ${(25000).toLocaleString()}
              </Text>
            </View>

            <TouchableOpacity
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