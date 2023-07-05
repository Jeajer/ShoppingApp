import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, FlatList, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Button } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { useTheme } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ORDER_LIST = [
  {
    name_pro: "PUMA Everyday",
    img: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/a5db19b7-dd9a-4e7d-8249-77223324c09f/life-woven-military-short-sleeve-button-down-shirt-4hD9x8.png",
    color: "green",
    price: 300,
    quantity: "1",
  },
  {
    name_pro: "PUMA Everyday",
    img: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/a5db19b7-dd9a-4e7d-8249-77223324c09f/life-woven-military-short-sleeve-button-down-shirt-4hD9x8.png",
    color: "green",
    price: 3000,
    quantity: "1",
  },
  
];

const DetailOrderScreen = ({navigation}) => {
    const {colors} = useTheme();

    const RenderItem = ({item, index}) => {
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
                  source={{uri: item.img}}
                  resizeMode="contain"
                  height={100}
                  width={100}
                  style={{borderRadius: 24,}}/>

              <View style={{padding: 12, gap: 6}}>
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
                      textShadowRadius: 4,
                    }}>
                        {item.name_pro}
                </Text>

                <View style={{flexDirection: "row", gap: 7, alignItems: "center"}}>                    
                  <View 
                      style={{
                        backgroundColor: item.color, 
                        width: 16, 
                        height: 16,
                        borderRadius: 8,
                    }}/>
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
              </View>

              <View style={{justifyContent: "flex-end", alignItems: "flex-end"}}>
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
          gap: 20
          }}>
            <View style={{
                paddingHorizontal: 24,
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row"
                }}>
                <TouchableOpacity
                    onPress={() => {navigation.goBack()}}>
                    <Icon name='chevron-left' size={30} color="#000"/>
                </TouchableOpacity>
                <Text style={{
                    fontSize: 24,
                    fontWeight: "700",
                    }}>Detail Order</Text>
                <View style={{width: 30}}/>
            </View>

            <Text style={{
                fontSize: 20,
                fontWeight: "700",
                paddingHorizontal: 24,
                }}>
                    Order: No1212
            </Text>

            <View style={{
                justifyContent: "flex-start",
                alignItems: "flex-start",
                flexDirection: "row",
                height: "40%"}}>
                <FlatList 
                    data={ORDER_LIST}
                    contentContainerStyle={{
                        paddingHorizontal: 24,
                        gap: 18,
                    }}
                    renderItem={({item, index}) => {
                    return (
                        <View>
                            <RenderItem item={item} index={index}/>
                            <View style={{height: 1, backgroundColor: colors.border, marginTop: 18}}/>
                        </View>
                    )
                }}/>
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
                  ${(600000).toLocaleString()}
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
                  ${(40000).toLocaleString()}
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
                  - ${(40000).toLocaleString()}
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
                  ${(768000).toLocaleString()}
                </Text>
              </View>

        
            </View>

            <View style={{
              paddingHorizontal: 40,
              alignItems: "flex-start",}}>
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
              <View style={{height: 15, width:2, backgroundColor: "black", alignItems: "flex-start", marginLeft: 25}}/>
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
              <View style={{height: 15, width:2, backgroundColor: "black", alignItems: "flex-start", marginLeft: 25}}/>
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