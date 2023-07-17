import React, { useCallback, useMemo, useRef, useState } from 'react';
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
import { signInWithEmailAndPassword, updateEmail } from 'firebase/auth';

const ChangeEmailScreen = ({ navigation }) => {
    const { colors } = useTheme();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cnewEmail, setcNewEmail] = useState('')
    const [isPassFocused, setIsPassFocused] = React.useState(false);
    const [isNewPassFocused, setIsNewPassFocused] = React.useState(false);
    const [isFocused, setIsFocused] = React.useState(false);

    const [errors, setErros] = useState({})
    const [showErrors, setShowErros] = useState(false)
    const [loading, setLoading] = useState(false)

    const user = FIREBASE_AUTH.currentUser;

    const getErrors = (password, email, cnewEmail) => {
        const errors = {};

        if (!password) {
            errors.password = 'Please enter password!';
        } else if (password.length < 6) {
            errors.password = 'Enter password of 6 characters';
        }

        if (!email) {
            errors.email = 'Please enter email!';
        } else if (!email.includes('@') || !email.includes('.com')) {
            errors.email = 'Please valid email';
        }

        if (!cnewEmail) {
            errors.cnewEmail = 'Please enter email!';
        } else if (!cnewEmail.includes('@') || !cnewEmail.includes('.com')) {
            errors.cnewEmail = 'Please valid email';
        } else if (cnewEmail !== email) {
            errors.cnewEmail = 'Email does not match';
        }

        return errors;
    };

    const handleChangeEmail = async (password, email, cnewEmail) => {
        const errors = getErrors(password, email, cnewEmail);
        if (Object.keys(errors).length > 0) {
            setShowErros(true);
            setErros(errors)
            console.log(errors)
        } else {
            setShowErros(false);
            setErros(errors)
            signIn(email, password)
        }
    }

    const signIn = async (email, password) => {
        setLoading(true)
        try {
            const response = await signInWithEmailAndPassword(FIREBASE_AUTH, FIREBASE_AUTH.currentUser.email, password)
            .then(async () => {
                await updateEmail(FIREBASE_AUTH.currentUser, email);
                console.log(response);
                alert('Email change successfully');
                navigation.navigate('Account Screen');
            })               
            .catch((error) => {
                const errors = getErrors(password, email, cnewEmail);
                if (error.code === 'auth/wrong-password') {
                    alert('Wrong password');
                    errors.password = 'Wrong password'
                    setErros(errors)
                }
            }) 
        } catch (error) {
            const errors = getErrors(password, email, cnewEmail);
            if (error.code === 'auth/wrong-password') {
                alert('Wrong password');
                errors.password = 'Wrong password'
                setErros(errors)
            }
            console.log(error);
        } finally {            
            setLoading(false)
        }
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
                }}>Change Email</Text>
                <View style={{ width: 30 }} />
            </View>
            <View style={{
                paddingHorizontal: 30,
                gap: 10
            }}>
                <View style={{ marginVertical: 10 }}>
                    <Text style={styles.headerBox}>
                        Current password
                    </Text>

                    <View style={[styles.passwordContainer, { borderColor: isPassFocused ? "#1E1D2E" : "#EAEDFB" }]}>
                        <TextInput
                            style={styles.input}
                            secureTextEntry={true}
                            placeholder='Enter your password'
                            autoCapitalize='none'
                            onFocus={
                                () => {
                                    setIsPassFocused(true);
                                }}
                            onBlur={() => { setIsPassFocused(false) }}
                            onChangeText={(text) => { setPassword(text) }}
                            value={password}
                        >
                        </TextInput>
                    </View>
                    {errors.password && (
                        <Text style={styles.errorText}>
                            *{errors.password}
                        </Text>
                    )}
                </View>

                <View style={{ marginVertical: 10 }}>
                    <Text style={styles.headerBox}>
                        New email
                    </Text>

                    <View style={[styles.passwordContainer, { borderColor: isFocused ? "#1E1D2E" : "#EAEDFB" }]}>
                        <TextInput
                            style={styles.input}
                            placeholder='Enter your new email address'
                            autoCapitalize='none'
                            onFocus={
                                () => {
                                    setIsFocused(true);
                                }}
                            onBlur={() => { setIsFocused(false) }}
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

                <View style={{ marginVertical: 10 }}>
                    <Text style={styles.headerBox}>
                        Confirm Email
                    </Text>

                    <View style={[styles.passwordContainer, { borderColor: isNewPassFocused ? "#1E1D2E" : "#EAEDFB" }]}>
                        <TextInput
                            style={styles.input}
                            placeholder='Confirm your new email address'
                            autoCapitalize='none'
                            onFocus={
                                () => {
                                    setIsNewPassFocused(true);
                                }}
                            onBlur={() => { setIsNewPassFocused(false) }}
                            onChangeText={(text) => { setcNewEmail(text) }}
                            value={cnewEmail}
                        >
                        </TextInput>
                    </View>
                    {errors.cnewEmail && (
                        <Text style={styles.errorText}>
                            *{errors.cnewEmail}
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
                                onPress={() => { handleChangeEmail(password, email, cnewEmail) }}
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
                                    Save Change
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


export default ChangeEmailScreen;

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

