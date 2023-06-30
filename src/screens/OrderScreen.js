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
    FlatList,
    Dimensions } from 'react-native';
  import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
  import { useTheme } from '@react-navigation/native';
  import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
  import OrderNavigator from '../navigators/OrderNavigator';

  const OrderScreen = ({navigation}) => {
    return(
        <SafeAreaProvider style={{
            paddingVertical: 24,
            }}>
            <SafeAreaView
                style={{
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
                    fontWeight: "600",
                }}>My Order</Text>
                <View style={{width: 30}}/>   
            </SafeAreaView>

            <OrderNavigator/>

        </SafeAreaProvider>
    )
  }

  export default OrderScreen;