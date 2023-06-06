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
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MasonryList from '@react-native-seoul/masonry-list';
import { BlurView } from 'expo-blur';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import CustomBackdrop from "../components/CustomBackdrop";
import FilterView from "../components/FilterView";

const data = [
  {
    id: 1,
    image: 'https://sourcingjournal.com/wp-content/uploads/2021/01/NikeDunkColorways.gif',
    title: 'Never Before - Forever After',
    text: 'The future of football is here. The 2023 Nike National Team Kits feature our most sustainable performance innovations. Sign up to be notified so you don’t miss the drop.',
  },
  {
    id: 2,
    image: 'https://i.pinimg.com/originals/f3/6f/e5/f36fe5b69a745c8e78516eaf8330b434.gif',
    title: 'UNAPOLOGETICALLY ORIGINAL',
    text: 'Serve up your undeniable style in the iconic versatility of a hoops legend.',
  },
  {
    id: 3,
    image: 'https://images.solecollector.com/complex/images/fl_lossy/c_crop,h_632,w_1124,x_157,y_105/c_scale,w_690,dpr_2.0/v1/isblnpb1mc6yv14xamyb/emotionally-unavailable-nike-air-force-1-high-pair',
    title: 'STEP INTO SUMMER STYLE',
    text: 'For days when you need fresh kicks that can keep up with your every move. #ChaseTheDay',
  },
  {
    id: 4,
    image: 'https://www.highsnobiety.com/static-assets/wp-content/uploads/2022/07/21115527/ezgif.com-gif-maker-64.gif',
    title: 'Nike Invincible 3',
    text: 'All the cushion. All the feels. ',
  },
];

const HomeScreen = ({navigation}) => {
  const widthWindow = Dimensions.get('window').width;

  const {colors} = useTheme();

  const now = new Date().toLocaleDateString('en-us', { weekday:"long", month:"short", day:"numeric"})

  const RenderItem = ({item, index}) => {
    return (
      <View style={styles.itemContainer}>
        <Image 
          source={{uri: item.image}} 
          style={{width: widthWindow * 0.9, height: widthWindow * 0.9}}/>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemText}>{item.text}</Text>
      </View>
    )
  }

  return(
    <SafeAreaView style={styles.container}>
      <Text style={{fontSize: 24, fontWeight: "600", paddingHorizontal: 24}}>Discover</Text>
      <Text style={{fontSize: 16, fontWeight: "400", paddingHorizontal: 24, marginBottom: 10}}>{now}</Text>
      <FlatList 
        data={data}
        renderItem={({item, index}) => {
          return <RenderItem item={item} index={index}/>
        }}/>
    </SafeAreaView>
  )
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 24,
    gap: 8,
  },
  itemContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  itemTitle: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  itemText: {
    textAlign: 'center',
    marginHorizontal: 35,
    color: 'black',
    lineHeight: 20,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    paddingVertical: 20,
  },
});
