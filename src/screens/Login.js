import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native'
import React, { useEffect, useState, Component } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { FIREBASE_AUTH, FIREBASE_PROVIDER } from '../../firebaseConfig';
import { signInWithPopup, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { SignInWithGoogle } from '../utilities/Utilities';

const img = "https://images.squarespace-cdn.com/content/v1/5e62cbf3daf9e45668fae6f0/1586199684548-T1XPYLITQ9EXU7RNV75J/BannerAnimation3.gif?format=2500w"
const fbImg = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/2048px-2021_Facebook_icon.svg.png"
const ggImg = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2008px-Google_%22G%22_Logo.svg.png"

const Login = ({ navigation }) => {

    const [toggleCheckBox, setToggleCheckBox] = useState(false)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [value, setValue] = useState('')
    const [show, setShow] = React.useState(false);
    const [visible, setVisible] = React.useState(true);
    const inputRef = React.useRef(null);

    const auth = FIREBASE_AUTH

    const [isFocused, setIsFocused] = React.useState(false);
    const [isPassFocused, setIsPassFocused] = React.useState(false);
    

    const handleClickGG = () => {
        signInWithPopup(FIREBASE_AUTH, FIREBASE_PROVIDER)
            .then((data) => {
                setValue(data.user.email)
                localStorage.setItem("email", data.user.email)
            })
    }

    // useEffect(()=>{
    //     setValue(localStorage.getItem('email'))
    // })

    const [errors, setErros] = useState({})
    const [showErrors, setShowErros] = useState(false)
    

    const getErrors = (email, password, cpassword, firstName, lastname) => {
        const errors = {};
        if (!email) {
            errors.email = 'Please enter email!';
        } else if (!email.includes('@') || !email.includes('.com')) {
            errors.email = 'Please valid email';
        }

        if (!password) {
            errors.password = 'Please enter password!';
        } else if (password.length < 6) {
            errors.password = 'Enter password of 6 characters';
        }

        return errors;
    };

    handleSignIn = async (email, password) => {
        // setLoading(true);
        const errors = getErrors(email, password);
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
        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log(response);
        } catch (error) {
            if (error.code === 'auth/user-not-found'){
                alert('User not found');
                errors.email = 'User not found'
                setErros(errors)
            }
            if (error.code === 'auth/wrong-password') {
                alert('Wrong password');
                errors.password = 'Wrong password'
                setErros(errors)
            }
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <SafeAreaView style={{
            backgroundColor: "white",
            flex: 1,

        }}>
            <ScrollView
                style={{
                    paddingHorizontal: 30,
                }}
                showsVerticalScrollIndicator={false}
            >
                <View
                >
                    <View style={{
                        alignItems: "center",
                        backgroundColor: "white"
                    }}>
                        <Image source={{ uri: img }}
                            style={{
                                width: 180,
                                aspectRatio: 1,
                                alignContent: "center",
                                marginTop: 10,
                            }}
                            resizeMode="cover"
                        />
                    </View>

                    <View style={{
                        backgroundColor: "white",
                        // margin: 15,
                        marginTop: -40,
                        paddingVertical: 20,
                        // paddingHorizontal: 15,
                        borderRadius: 10
                    }}>
                        <Text style={[styles.textFormat]}>
                            Welcome back!
                        </Text>

                        <View style={{ marginVertical: 10 }}>
                            <Text style={styles.headerBox}>
                                Email
                            </Text>

                            <View style={[styles.passwordContainer, { borderColor: isFocused ? "#1E1D2E" : "#EAEDFB" }]}>
                                <TextInput placeholder="Enter your email"
                                    placeholderTextColor='gray'
                                    style={styles.input}
                                    autoCapitalize='none'
                                    onFocus={
                                        () => {
                                            // onFocus();
                                            setIsFocused(true);
                                        }}
                                    onBlur={() => { setIsFocused(false) }}
                                    keyboardType="email-address"
                                    onChangeText={(text) => setEmail(text)}
                                    value={email}
                                >
                                </TextInput>
                                <Icon name='email-outline' size={20} color={isFocused ? "#1E1D2E" : "#B1B3CD"} />
                            </View>
                            {errors.email && (
                                <Text style={styles.errorText}>
                                    *{errors.email}
                                </Text>
                            )}
                        </View>

                        <View style={{ marginVertical: 10 }}>
                            <Text style={styles.headerBox}>
                                Password
                            </Text>

                            <View style={[styles.passwordContainer, { borderColor: isPassFocused ? "#1E1D2E" : "#EAEDFB" }]}>

                                <TextInput placeholder='Enter your password'
                                    placeholderTextColor='gray'
                                    style={styles.input}
                                    autoCapitalize='none'
                                    onFocus={
                                        () => {
                                            setIsPassFocused(true);
                                        }}
                                    onBlur={() => { setIsPassFocused(false) }}
                                    keyboardType='default'
                                    secureTextEntry={visible}
                                    onChangeText={(text) => setPassword(text)}
                                    value={password}
                                >
                                </TextInput>
                                <TouchableOpacity style={styles.searchIcon} onPress={
                                    () => {
                                        setShow(!show)
                                        setVisible(!visible)
                                    }
                                }>
                                    <Icon name={show === false ? 'eye-outline' : 'eye-off-outline'} size={20} color={isPassFocused ? "#1E1D2E" : "#B1B3CD"} />
                                </TouchableOpacity>
                            </View>
                            {errors.password && (
                                <Text style={styles.errorText}>
                                    *{errors.password}
                                </Text>
                            )}
                        </View>

                    </View>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('Reset Password Screen')}
                        style={{}}>
                        <Text style={styles.forgot}>
                            Forgot password?
                        </Text>
                    </TouchableOpacity>

                    <Text style={{
                        color: 'gray',
                        fontSize: 13,
                        marginTop: 30,
                        textAlign: 'center',
                    }}>
                        Or, login with...
                    </Text>

                    <View style={styles.loginMethodLayout}>
                        <TouchableOpacity
                            onPress={() => SignInWithGoogle()}
                            style={styles.loginMethod}
                        >
                            <Image
                                source={{ uri: ggImg }}
                                style={{
                                    width: 25,
                                    alignContent: "center",
                                    aspectRatio: 1,
                                }}
                                resizeMode="stretch"
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => { }}
                            style={styles.loginMethod}
                        >
                            <Image
                                source={{ uri: fbImg }}
                                style={{
                                    width: 25,
                                    alignContent: "center",
                                    aspectRatio: 1,
                                }}
                                resizeMode="stretch"
                            />
                        </TouchableOpacity>
                    </View>

                    {loading ?
                        (<ActivityIndicator
                            size='large'
                            color='#0000ff'
                            style={{ marginTop: 50, marginBottom: 20, padding: 5.5, }}
                        />)
                        : (
                            <>                                
                                <TouchableOpacity
                                    onPress={() => handleSignIn(email, password)}
                                    style={{
                                        backgroundColor: '#1E1D2E',
                                        marginTop: 50,
                                        padding: 15,
                                        borderRadius: 10,
                                        marginBottom: 20,
                                        alignItems: 'center',
                                    }}
                                >
                                    <Text style={{
                                        fontWeight: '700',
                                        fontSize: 16,
                                        color: '#fff'
                                    }}>
                                        Login
                                    </Text>
                                </TouchableOpacity>
                            </>)
                    }

                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 20,
                    }}>
                        <Text style={{
                            textAlign: 'center',
                            fontSize: 15
                        }}>
                            Don't have an account?
                        </Text>

                        <TouchableOpacity
                            onPress={() => navigation.navigate('Signup Screen')}
                            style={{
                                alignContent: 'center'
                            }}>
                            <Text style={{
                                color: '#2078F4',
                                fontWeight: 'bold',
                                marginStart: 5,
                                textAlign: 'center',
                                fontSize: 15,
                            }}>
                                Sign up now
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

        </SafeAreaView>
    )
}

export default Login

const styles = StyleSheet.create({
    textFormat: {
        color: "black",
        fontWeight: 'bold',
        fontSize: 25,
        textAlign: "center",
        marginBottom: 20,
    },
    forgot: {
        textDecorationLine: 'underline',
        position: 'absolute',
        right: 10,
        top: '50%',
        marginTop: -20,
        color: '#1E1D2E',
    },
    loginMethod: {
        borderColor: '#EAEDFB',
        borderWidth: 2,
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
        backgroundColor: '#F9F9FD',
        alignContent: 'space-between',
    },
    loginMethodLayout: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20,
        marginHorizontal: 100,
    },
    input: {
        backgroundColor: "transparent",
        paddingVertical: 10,
        paddingHorizontal: 0,
        fontSize: 16,
        width: '90%',
    },
    passwordContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F9F9FD',
        height: 50,
        borderRadius: 10,
        marginTop: 5,
        paddingHorizontal: 10,
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