import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Button } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { useTheme } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../theme/colors';

const CreditCard = ({ name, cvc, number, expiryYear, expiryMonth }) => {

    const formatCreditCardNumber = (value) => {
        if (!value) {
            return '';
          }
      
          // Remove all non-digit characters from the input string
          const formattedNumber = value.replace(/\D/g, '');
      
          // Apply the desired formatting
          let formattedString = '';
      
          // Add space after every 4 digits
          for (let i = 0; i < formattedNumber.length; i++) {
            if (i > 0 && i % 4 === 0) {
              formattedString += '     ';
            }
            formattedString += formattedNumber[i];
          }
      
          return formattedString;
      };


    return(
        <View style={styles.container}>
            <View style={styles.cardHeader}>
                <View >
                    <Icon name={"integrated-circuit-chip"} size={50} color={colors.yellow}/>
                </View>

                <View>
                    <Image 
                        style={styles.image}
                        source={require("../assets/MasterCardIcon.png")}/>
                </View>        
            </View>
            <View style={styles.cardCenter}>
                <Text style={styles.cardNumber}>{formatCreditCardNumber(number)}</Text>
            </View>

            <View style={styles.cardFooter}>
                <View style={styles.cardHolder}>
                    <Text style={styles.textMedium}>{name}</Text>
                </View>
                <View style={styles.cardExpiry}>
                    <Text style={styles.textMedium}>{expiryMonth}/{expiryYear}</Text>
                </View>
            </View>
        </View>
    )
}

export default CreditCard;

const styles = StyleSheet.create({
    container: {
        width: '80%',
        marginHorizontal: 20,
        height: 200,
        backgroundColor: colors.dark,
        borderRadius: 20,
        alignSelf: 'center',
        justifyContent: 'space-between',
    },
    cardHeader: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    image: {
        width: 50,
        height: 50,
    },
    cardCenter: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent:'center',
        width: "80%",
        height: "40%",
    },
    cardNumber: {
        textAlign: 'center',
        color: colors.white,
        fontSize: 20,
    },
    cardFooter: {
        paddingHorizontal: 15,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    cardHolder:{},
    textMedium: {
        color: colors.white,
        fontSize: 16,
        textTransform: "uppercase",
    },
    cardExpiry:{},
})

