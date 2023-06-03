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


const HomeScreen = ({navigation}) => {
  
}

export default HomeScreen;
