import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { isAssertEntry } from 'typescript'

const Input = ({title, icon, placeholder, isPassword, keyboard, onFocus, onChangeText, value, maxLength}) => {

    const [isFocused, setIsFocused] = React.useState(false);

    return (
        <View style={{marginVertical: 10}}>
            <Text style={{
                color: "gray",
                fontWeight: 'normal',
                fontSize: 12
            }}>
                {title}
            </Text>

            <View style={[styles.passwordContainer, { borderColor: isFocused ? "#2078F4" : "#EAEDFB" }]}>
                
                <TextInput placeholder={placeholder}
                    placeholderTextColor='gray'
                    style={{
                        backgroundColor: "transparent",
                        paddingVertical: 10,
                        paddingHorizontal: 0,
                        fontSize: 16,
                        width: '90%',
                    }}
                    onChangeText={onChangeText}
                    onFocus={
                        () => {
                            setIsFocused(true);
                        }}
                    onBlur={() => { setIsFocused(false) }}
                    keyboardType={keyboard}
                    secureTextEntry={isPassword}
                    value={value}
                    maxLength={maxLength}
                >
                </TextInput>    
                <Icon name={icon} size={20} color={isFocused ? "#2078F4" : "#B1B3CD"} />
            </View>            
        </View>
    )
}

const styles = StyleSheet.create({
    passwordContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F9F9FD',
        height: 50,     
        borderRadius: 10,   
        marginTop: 5,
        paddingHorizontal: 15,
        borderWidth: 2,
    },
    searchIcon: {
        padding: 10,
        marginEnd: 5,
    },
    inputStyle: {
        flex: 1,
    },
})

export default Input