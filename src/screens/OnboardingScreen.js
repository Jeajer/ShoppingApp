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
  import Animated, {
    useSharedValue, 
    useAnimatedScrollHandler,
    useAnimatedRef,
    useAnimatedStyle,
    interpolate,
    Extrapolate, } from "react-native-reanimated";
  import Pagination from "../components/Pagination";
  import CustomButton from "../components/CustomButton";
  
  const data = [
    {
      id: 1,
      image: 'https://cdn.dribbble.com/users/5350761/screenshots/11658661/media/e41b2780f5632ee3623a8f39d6a25b76.gif',
      title: 'Never Before - Forever After',
      text: 'The future of football is here. The 2023 Nike National Team Kits feature our most sustainable performance innovations. Sign up to be notified so you don’t miss the drop.',
    },
    {
      id: 2,
      image: 'https://i.pinimg.com/originals/e9/f8/74/e9f8742f120ef18eb215a8dfd4814e49.gif',
      title: 'UNAPOLOGETICALLY ORIGINAL',
      text: 'Serve up your undeniable style in the iconic versatility of a hoops legend.',
    },
    {
      id: 3,
      image: 'https://media.tenor.com/TiTr2lZbnMMAAAAC/justdoit-nike.gif',
      title: 'STEP INTO SUMMER STYLE',
      text: 'For days when you need fresh kicks that can keep up with your every move. #ChaseTheDay',
    },
  ];
  
  const HomeScreen = ({navigation}) => {
    const widthWindow = Dimensions.get('window').width;
  
    const {colors} = useTheme();

    const flatListRef = useAnimatedRef(null);
    const flatListIndex = useSharedValue(0);
    const x = useSharedValue(0);

    const onViewableItemsChanged = ({viewableItems}) => {
      flatListIndex.value = viewableItems[0].index;
    }

    const onScroll = useAnimatedScrollHandler({
      onScroll: event => {
        x.value = event.contentOffset.x;
      }
    })
  
    const RenderItem = ({item, index}) => {
      const imageAnimationStyle = useAnimatedStyle(() => {
        const opacityAnimation = interpolate(x.value, 
          [
            (index - 1) * widthWindow,
            index * widthWindow,
            (index + 1) * widthWindow,
          ],
          [0,1,0],
          Extrapolate.CLAMP,
          );
          const translateYAnimation = interpolate(
            x.value,
            [
              (index - 1) * widthWindow,
              index * widthWindow,
              (index + 1) * widthWindow,
            ],
            [100,0,100],
            Extrapolate.CLAMP,
          )
          return{
            opacity: opacityAnimation,
            width: widthWindow * 0.8, 
            height: widthWindow * 0.8,
            transform: [{translateY: translateYAnimation}],
          }
      });
      const textAnimationStyle = useAnimatedStyle(() => {
        const opacityAnimation = interpolate(x.value, 
          [
            (index - 1) * widthWindow,
            index * widthWindow,
            (index + 1) * widthWindow,
          ],
          [0,1,0],
          Extrapolate.CLAMP,
          );
          const translateYAnimation = interpolate(
            x.value,
            [
              (index - 1) * widthWindow,
              index * widthWindow,
              (index + 1) * widthWindow,
            ],
            [100,0,100],
            Extrapolate.CLAMP,
          )
          return{
            opacity: opacityAnimation,
            transform: [{translateY: translateYAnimation}],
          }
      });
      return (
        <View style={[styles.itemContainer, {width: widthWindow}]}>
          <Animated.Image 
            source={{uri: item.image}} 
            style={imageAnimationStyle}/>
          <Animated.View style={textAnimationStyle}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemText}>{item.text}</Text>
          </Animated.View>
        </View>
      )
    }
  
    return(
      <SafeAreaView style={styles.container}>
        <Animated.FlatList 
          ref={flatListRef}
          onScroll={onScroll}
          data={data}
          renderItem={({item, index}) => {
            return <RenderItem item={item} index={index}/>}}
          keyExtractor={item => item.id}
          scrollEventThrottle={16}
          horizontal={true}
          bounces={false}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          onViewableItemsChanged={onViewableItemsChanged}/>
        <View style={styles.bottomContainer}>
          <Pagination data={data} x={x} screenWidth={widthWindow}/>
          <CustomButton 
            flatListRef={flatListRef} 
            flatListIndex={flatListIndex} 
            dataLength={data.length}/>
        </View>
      </SafeAreaView>
    )
  }
  
  export default HomeScreen;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
    },
    itemContainer: {
      flex: 1,
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: "#fff",
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
  