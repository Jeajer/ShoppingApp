import React, { useState } from 'react';
import {
    View,
    TextInput,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FIREBASE_AUTH } from '../../firebaseConfig';
import { sendPasswordResetEmail } from 'firebase/auth';

const ResetPasswordScreen = ({ navigation }) => {
    const { colors } = useTheme();
    const [email, setEmail] = useState('')
    const [isNewPassFocused, setIsNewPassFocused] = React.useState(false);

    const [errors, setErros] = useState({})
    const [loading, setLoading] = useState(false)

    const user = FIREBASE_AUTH.currentUser;

    const getErrors = (email) => {
        const errors = {};

        if (!email) {
            errors.email = 'Please enter email!';
        } else if (!email.includes('@') || !email.includes('.com')) {
            errors.email = 'Please valid email';
        }

        return errors;
    };

    handleReset = async (email) => {        
        const errors = getErrors(email);
        if (Object.keys(errors).length > 0) {
            setErros(errors)
            console.log(errors)
        } else {
            setErros(errors)
            resetPassword(email)
        }
    }

    const resetPassword = async (email) => {
        setLoading(true);
        sendPasswordResetEmail(FIREBASE_AUTH, email)
            .then(() => {
                navigation.navigate('Login Screen')
                alert('Check your email')
                setLoading(false)
            })
            .catch((error) => {                
                if (error.code === 'auth/user-not-found'){
                    const errors = getErrors(email);
                    errors.email = 'User not found'
                    setErros(errors);
                    setLoading(false)
                }                
            });
    }

    return (
        <SafeAreaView style={{
            paddingVertical: 24,
            gap: 50,
        }}>
            <View style={{
                paddingHorizontal: 24,
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row"
            }}>
                <TouchableOpacity
                    onPress={() => { navigation.goBack() }}>
                    <Icon name='chevron-left' size={30} color="#000" />
                </TouchableOpacity>
                <Text style={{
                    fontSize: 24,
                    fontWeight: "600",
                }}>Reset Password</Text>
                <View style={{ width: 30 }} />
            </View>
            <View style={{
                paddingHorizontal: 30,
                gap: 10
            }}>                
                
                <View style={{ marginVertical: 10 }}>
                    <Text style={styles.headerBox}>
                        Email
                    </Text>

                    <View style={[styles.passwordContainer, { borderColor: isNewPassFocused ? "#1E1D2E" : "#EAEDFB" }]}>
                        <TextInput
                            style={styles.input}
                            secureTextEntry={false}
                            keyboardType='email-address'
                            placeholder='Enter your email address'
                            autoCapitalize='none'
                            onFocus={
                                () => {
                                    setIsNewPassFocused(true);
                                }}
                            onBlur={() => { setIsNewPassFocused(false) }}
                            onChangeText={(text) => { setEmail(text) }}
                            value={email}
                        >
                        </TextInput>
                    </View>
                    {errors.email && (
                        <Text style={styles.errorText}>
                            *{errors.email}
                        </Text>
                    )}
                </View>

            </View>

            <View
                style={{
                    paddingHorizontal: 30,
                }}>

                {loading ?
                    (<ActivityIndicator
                        size='large'
                        color='#0000ff'
                        style={{ marginTop: 50, marginBottom: 20, padding: 5.5, }}
                    />)
                    : (
                        <>
                            <TouchableOpacity
                                onPress={() => { handleReset(email) }}
                                style={{
                                    backgroundColor: colors.primary,
                                    height: 64,
                                    borderRadius: 64,
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    flexDirection: "row",
                                    padding: 12,
                                }}
                            >
                                <View />
                                <Text
                                    style={{
                                        fontSize: 16,
                                        fontWeight: "600",
                                        color: colors.background,
                                    }}
                                >
                                    Confirm
                                </Text>

                                <View
                                    style={{
                                        backgroundColor: colors.card,
                                        width: 40,
                                        aspectRatio: 1,
                                        borderRadius: 40,
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}>
                                    <Icon name={"arrow-right"} size={24} color={colors.text} />
                                </View>
                            </TouchableOpacity>
                        </>)
                }

            </View>

        </SafeAreaView>
    );
};


export default ResetPasswordScreen;

const styles = StyleSheet.create({
    input: {
        backgroundColor: "transparent",
        paddingVertical: 10,
        paddingHorizontal: 0,
        fontSize: 16,
        width: '90%',
    },
    passwordContainer: {
        flexDirection: 'row',
        justifyContent: 'left',
        alignItems: 'center',
        backgroundColor: '#F9F9FD',
        height: 50,
        borderRadius: 10,
        marginTop: 5,
        paddingHorizontal: 20,
        borderWidth: 2,
    },
    searchIcon: {
        paddingStart: 0,
        marginEnd: 0,
    },
    inputStyle: {
        flex: 1,
    },
    headerBox: {
        color: "gray",
        fontWeight: 'normal',
        fontSize: 12
    },
    errorText: {
        fontSize: 12,
        color: 'red',
        fontStyle: 'italic'
    },
})

