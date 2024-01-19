import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useTheme } from "@react-navigation/native";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PriceRangeSelector from "./PriceRangeSelector";

const MIN_PRICE = 0;
const MAX_PRICE = 500;

const COLORS = [
  {
    color: "red",
    label: "Red",
    itemCount: 4,
  },
  {
    color: "blue",
    label: "Blue",
    itemCount: 2,
  },
  {
    color: "yellow",
    label: "Yellow",
    itemCount: 6,
  },
  {
    color: "purple",
    label: "Purple",
    itemCount: 10,
  },
];

const SLEEVES = [
  {
    id: "sortsleeve",
    label: "Sort Sleeve",
    itemCount: 20,
  },
  {
    id: "longsleeve",
    label: "Long Sleeve",
    itemCount: 100,
  },
  {
    id: "sleeveless",
    label: "Sleeve Less",
    itemCount: 60,
  },
];

const FilterView = () => {
  const [startPrice, setStartPrice] = useState(50);
  const [endPrice, setEndPrice] = useState(250);
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1 }}>
      <BottomSheetScrollView style={{ flex: 1 }}>
        <View style={{ paddingVertical: 24, gap: 20 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 24,
            }}>
            <Text style={{ flex: 1, fontSize: 20, fontWeight: "700" }}>
              Filter
            </Text>
            <TouchableOpacity>
              <Text>Reset</Text>
            </TouchableOpacity>
          </View>

          {/* Range Selector */}
          <PriceRangeSelector
            minPrice={MIN_PRICE}
            maxPrice={MAX_PRICE}
            startPrice={startPrice}
            endPrice={endPrice}
            onStartPriceChange={setStartPrice}
            onEndPriceChange={setEndPrice} />

          {/* Color Filter */}
          <View style={{ paddingHorizontal: 24 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                marginBottom: 12,
              }}>Color</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
              {COLORS.map((item, i) => {
                return (
                  <Chip
                    key={i}
                    itemCount={item.itemCount}
                    label={item.label}
                    color={item.color}
                    isSelected={i === 0} />
                );
              })}
            </View>
          </View>

          {/* Sleeves Filter */}
          <View style={{ paddingHorizontal: 24 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                marginBottom: 12,
              }}>Sleeves</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
              {SLEEVES.map((item, i) => {
                return (
                  <Chip
                    key={i}
                    itemCount={item.itemCount}
                    label={item.label}
                    isSelected={i === 0} />
                );
              })}
            </View>
          </View>

          <View style={{ flex: 1 }} />
        </View>
      </BottomSheetScrollView>
      {/* Button */}
      <View
        style={{
          padding: 24,
          paddingBottom: 24 + insets.bottom,
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: theme.colors.primary,
            height: 64,
            borderRadius: 64,
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: theme.colors.background
            }}>Apply filters</Text>

          <View
            style={{
              backgroundColor: theme.colors.card,
              width: 40,
              aspectRatio: 1,
              borderRadius: 40,
              alignItems: "center",
              justifyContent: "center",
              position: "absolute",
              top: 12,
              right: 12,
              bottom: 12
            }}>
            <Icon name={"arrow-right"} size={24} color={theme.colors.text} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FilterView;

const Chip = ({
  isSelected,
  label,
  itemCount,
  color
}) => {
  const theme = useTheme();

  return (
    <View
      style={{
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 100,
        backgroundColor: isSelected ? color : theme.colors.background,
        flexDirection: "row",
        alignItems: "center"
      }}>
      <View
        style={{
          backgroundColor: color,
          width: 12,
          height: 12,
          borderRadius: 8,
          marginRight: 4,
        }} />
      <Text
        style={{
          fontSize: 14,
          fontWeight: "600",
          color: isSelected ? theme.colors.background : theme.colors.text
        }}>
        {label} [{itemCount}]
      </Text>
    </View>
  );
};