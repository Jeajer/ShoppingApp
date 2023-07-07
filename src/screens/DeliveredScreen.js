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
  import CreditCard from '../components/CreditCard';

  const GENERAL_LIST = [
    {
      order: "No1212",
      date: "20/05/2023",
      quantity: "03",
      amount: "$150"
    },
  ];

  const DeliveredScreen = ({navigation}) => {
    const {colors} = useTheme();

    const [resultArray, setResultArray] = useState([]);
    const [resultOrder, setResultOrder] = useState([]);

    const getListDataFromAsyncStorage = async (key) => {
      try {
        // Lấy chuỗi JSON từ AsyncStorage
        const jsonValue = await AsyncStorage.getItem(key);
    
        if (jsonValue !== null) {
          // Chuyển đổi chuỗi JSON thành mảng
          const listData = JSON.parse(jsonValue);
          console.log('List data retrieved from AsyncStorage:', listData);
          return listData;
        }
      } catch (error) {
        console.log('Error retrieving list data from AsyncStorage:', error);
      }
    
      return []; // Trả về một mảng rỗng nếu không có dữ liệu trong AsyncStorage
    };

    const getValueFromAsyncStorage = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('favorites');
        if (jsonValue !== null) {
          const value = JSON.parse(jsonValue);
          console.log('Value retrieved from Favorite:', value);
          return value;
        } else {
          console.log('Value not found in AsyncStorage');
          return null;
        }
      } catch (error) {
        console.log('Error retrieving value from AsyncStorage:', error);
        return null;
      }
    };
  
    const fetchValue = async () => {
      
      const order = await getValueFromAsyncStorage();
      setResultOrder(order);

      const result =[];

      order.forEach((item) => {
        result.push(getListDataFromAsyncStorage(item));
      });

      console.log(order);
      console.log(result);
    };
  

    const RenderItem = ({item, index}) => {
      return (
        <View style={{
          gap: 15,
        }}>
          <View style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
          }}>
              <Text style={{fontSize: 16, fontWeight: "500", color: colors.text}}>Order: {item.order}</Text>
              <Text style={{fontSize: 16, fontWeight: "400", color: colors.text, opacity: 0.6}}>{item.date}</Text>
          </View>
          <View style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
          }}>
              <View style={{flexDirection: "row",}}>
                <Text style={{fontSize: 16, fontWeight: "400", color: colors.text, opacity: 0.6}}>Quantity: </Text>
                <Text style={{fontSize: 16, fontWeight: "500", color: colors.text}}>{item.quantity}</Text>
              </View>
              <View style={{flexDirection: "row",}}>
                <Text style={{fontSize: 16, fontWeight: "400", color: colors.text, opacity: 0.6}}>Total Amount: </Text>
                <Text style={{fontSize: 16, fontWeight: "500", color: colors.text}}>{item.amount}</Text>
              </View>
          </View>
          <View style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
          }}>
            <TouchableOpacity 
              onPress={() => navigation.navigate("Detail Order Screen")}
              style={{
                alignItems: "center", 
                backgroundColor: colors.text, 
                paddingHorizontal: 20, 
                paddingVertical: 10,
                borderRadius: 10}}>
              <Text style={{fontSize: 16, fontWeight: "500", color: "white"}}>Detail</Text>
            </TouchableOpacity>
            <View 
              style={{
                alignItems: "center", 
                backgroundColor: "transparent",}}>
              <Text style={{fontSize: 16, fontWeight: "500", color: "green"}}>Delivered</Text>
            </View>
          </View>
        </View>
      )
    }

    return(
        <View style={{paddingVertical: 50}}>
            <View>
            <FlatList 
            contentContainerStyle={{
                paddingHorizontal: 24,
                gap: 40,
              }}
            data={GENERAL_LIST}
            renderItem={({item, index}) => {
            return (
                <View>
                    <RenderItem item={item} index={index}/>
                </View>
            )}}/>
      </View>
        </View>
    )
  }

  export default DeliveredScreen;