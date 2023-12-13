import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    TextInput,
    ActivityIndicator,
    ToastAndroid,
} from 'react-native'
import React, { useState } from 'react'
import { FIREBASE_AUTH, FIREBASE_PROVIDER, FIREBASE_DB } from '../../firebaseConfig';
import { updateProfile, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { firebase } from '../../firebaseConfig';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'

const img = "https://images.squarespace-cdn.com/content/v1/5e62cbf3daf9e45668fae6f0/1586199684548-T1XPYLITQ9EXU7RNV75J/BannerAnimation3.gif?format=2500w"
const fbImg = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/2048px-2021_Facebook_icon.svg.png"
const ggImg = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2008px-Google_%22G%22_Logo.svg.png"

const Signup = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCPassword] = useState('');
    const [fullname, setFullname] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [country, setCountry] = useState('');
    const [show, setShow] = React.useState(false);
    const [visible, setVisible] = React.useState(true);
    const [cshow, setCShow] = React.useState(false);
    const [cvisible, setCVisible] = React.useState(true);
    const [loading, setLoading] = useState(false)

    const auth = FIREBASE_AUTH
    const user = FIREBASE_AUTH.currentUser

    const [isFocused, setIsFocused] = React.useState(false);
    const [isFullnameFocused, setIsFullnameFocused] = React.useState(false);
    const [isLNameFocused, setIsLNameFocused] = React.useState(false);
    const [isPassFocused, setIsPassFocused] = React.useState(false);
    const [isCPassFocused, setIsCPassFocused] = React.useState(false);
    const [isAddressFocused, setIsAddressFocused] = React.useState(false);
    const [isCountryFocused, setIsCountryFocused] = React.useState(false);
    const [isPhoneFocused, setIsPhoneFocused] = React.useState(false);
    const [errors, setErros] = useState({})
    const [showErrors, setShowErros] = useState(false)

    const getErrors = (email, password, cpassword, fullname, phone, address, country) => {
        const errors = {};
        if (!email) {
            errors.email = 'Please enter email!';
        } else if (!email.includes('@') || !email.includes('.com')) {
            errors.email = 'Please valid email';
        }

        if (!fullname) {
            errors.fullname = 'Please enter full name!';
        }

        if (!phone) {
            errors.phone = 'Please enter phone number!';
        }

        if (!address) {
            errors.address = 'Please enter address!';
        }

        if (!country) {
            errors.country = 'Please enter country!';
        }

        if (!password) {
            errors.password = 'Please enter password!';
        } else if (password.length < 6) {
            errors.password = 'Enter password of 6 characters';
        }

        if (!cpassword) {
            errors.cpassword = 'Please enter confirm password!'
        } else if (cpassword.length < 6) {
            errors.cpassword = 'Enter password of 6 characters';
        } else if (password !== cpassword) {
            errors.cpassword = 'Password and Confirm Password does not match';
        }

        return errors;
    };

    const firebasestore = FIREBASE_DB;

    registerUser = async (email, password, cpassword, fullname, phone, address, country) => {
        setLoading(true);
        const errors = getErrors(email, password, cpassword, fullname, phone, address, country);
        if (Object.keys(errors).length > 0) {
            setShowErros(true);
            setErros(errors)
            console.log(errors)
        } else {
            setShowErros(false);
            setErros(errors)
            handleSignIn(email, password)
        }
    }

    const handleSignIn = async (email, password) => {
        setLoading(true)
        createUserWithEmailAndPassword(auth, email, password)
            .then(async () => {
                // updateProfile(FIREBASE_AUTH.currentUser, {
                //     displayName: fullname,
                //     photoURL: 'https://in.pinterest.com/pin/324470348158135032/',
                // }).then(() => {
                //     console.log(user.displayName)
                // }).catch((error) => {
                //     console.log(error.message)
                // });

                try{
                    await setDoc(doc(FIREBASE_DB, "Users", FIREBASE_AUTH.currentUser.uid), {
                        displayName: fullname,
                        country: country,
                        address: address,
                        id: FIREBASE_AUTH.currentUser.uid,
                        img: 'https://in.pinterest.com/pin/324470348158135032/',
                        username: user.email,
                        phone: phone,
                        timeStamp: serverTimestamp(),
                    }
                    ).then(() => {
                        console.log('Success')
                    }).catch((error) => {
                        console.log(error.message)
                    })
                } catch (error) {
                    console.log(error.message)
                }
            }).catch((error) => {
                if (error.code === 'auth/email-already-in-use') {
                    alert('User is already existed');
                    errors.email = 'User is already existed';
                    setErros(errors)
                }
                console.log(error.code);
                setLoading(false)
            })
        setLoading(false);
    }

    return (
        <SafeAreaView style={{
            backgroundColor: "white",
            flex: 1,
        }}>
            <ScrollView
                style={{
                    paddingHorizontal: 30,
                    paddingVertical: 40,
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
                                marginTop: -10,
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
                            Become a member!
                        </Text>

                        <View style={{ marginVertical: 10 }}>
                            <Text style={styles.headerBox}>
                                Full name
                            </Text>

                            <View style={[styles.passwordContainer, { borderColor: isFullnameFocused ? "#1E1D2E" : "#EAEDFB" }]}>
                                <TextInput placeholder="Enter your full name"
                                    placeholderTextColor='gray'
                                    style={styles.input}
                                    autoCapitalize='words'
                                    onFocus={
                                        () => {
                                            // onFocus();
                                            setIsFullnameFocused(true);
                                        }}
                                    onBlur={() => { setIsFullnameFocused(false) }}
                                    keyboardType="default"
                                    onChangeText={(text) => setFullname(text)}
                                    value={fullname}
                                >
                                </TextInput>
                                <Icon name='account-outline' size={20} color={isFullnameFocused ? "#1E1D2E" : "#B1B3CD"} />
                            </View>
                            {errors.fullname && (
                                <Text style={styles.errorText}>
                                    *{errors.fullname}
                                </Text>
                            )}
                        </View>

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
                                <Icon name='email' size={20} color={isFocused ? "#1E1D2E" : "#B1B3CD"} />
                            </View>
                            {errors.email && (
                                <Text style={styles.errorText}>
                                    *{errors.email}
                                </Text>
                            )}
                        </View>

                        <View style={{ marginVertical: 10 }}>
                            <Text style={styles.headerBox}>
                                Address
                            </Text>

                            <View style={[styles.passwordContainer, { borderColor: isAddressFocused ? "#1E1D2E" : "#EAEDFB" }]}>
                                <TextInput placeholder="Enter your address"
                                    placeholderTextColor='gray'
                                    style={styles.input}
                                    autoCapitalize='none'
                                    onFocus={
                                        () => {
                                            // onFocus();
                                            setIsAddressFocused(true);
                                        }}
                                    onBlur={() => { setIsAddressFocused(false) }}
                                    keyboardType="default"
                                    onChangeText={(text) => setAddress(text)}
                                    value={address}
                                >
                                </TextInput>
                                <Icon name='email' size={20} color={isAddressFocused ? "#1E1D2E" : "#B1B3CD"} />
                            </View>
                            {errors.address && (
                                <Text style={styles.errorText}>
                                    *{errors.address}
                                </Text>
                            )}
                        </View>

                        <View style={{ marginVertical: 10 }}>
                            <Text style={styles.headerBox}>
                                Country
                            </Text>

                            <View style={[styles.passwordContainer, { borderColor: isCountryFocused ? "#1E1D2E" : "#EAEDFB" }]}>
                                <TextInput placeholder="Enter your country"
                                    placeholderTextColor='gray'
                                    style={styles.input}
                                    autoCapitalize='none'
                                    onFocus={
                                        () => {
                                            // onFocus();
                                            setIsCountryFocused(true);
                                        }}
                                    onBlur={() => { setIsCountryFocused(false) }}
                                    keyboardType="default"
                                    onChangeText={(text) => setCountry(text)}
                                    value={country}
                                >
                                </TextInput>
                                <Icon name='email' size={20} color={isCountryFocused ? "#1E1D2E" : "#B1B3CD"} />
                            </View>
                            {errors.country && (
                                <Text style={styles.errorText}>
                                    *{errors.country}
                                </Text>
                            )}
                        </View>

                        <View style={{ marginVertical: 10 }}>
                            <Text style={styles.headerBox}>
                                Phone
                            </Text>

                            <View style={[styles.passwordContainer, { borderColor: isPhoneFocused ? "#1E1D2E" : "#EAEDFB" }]}>
                                <TextInput placeholder="Enter your phone number"
                                    placeholderTextColor='gray'
                                    style={styles.input}
                                    autoCapitalize='none'
                                    onFocus={
                                        () => {
                                            // onFocus();
                                            setIsPhoneFocused(true);
                                        }}
                                    onBlur={() => { setIsPhoneFocused(false) }}
                                    keyboardType="default"
                                    onChangeText={(text) => setPhone(text)}
                                    value={phone}
                                >
                                </TextInput>
                                <Icon name='email' size={20} color={isPhoneFocused ? "#1E1D2E" : "#B1B3CD"} />
                            </View>
                            {errors.phone && (
                                <Text style={styles.errorText}>
                                    *{errors.phone}
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

                        <View style={{ marginVertical: 10 }}>
                            <Text style={styles.headerBox}>
                                Confirm password
                            </Text>

                            <View style={[styles.passwordContainer, { borderColor: isCPassFocused ? "#1E1D2E" : "#EAEDFB" }]}>

                                <TextInput placeholder='Enter your password again'
                                    placeholderTextColor='gray'
                                    style={styles.input}
                                    autoCapitalize='none'
                                    onFocus={
                                        () => {
                                            setIsCPassFocused(true);
                                        }}
                                    onBlur={() => { setIsCPassFocused(false) }}
                                    keyboardType='default'
                                    secureTextEntry={cvisible}
                                    onChangeText={(text) => setCPassword(text)}
                                    value={cpassword}
                                >
                                </TextInput>
                                <TouchableOpacity style={styles.searchIcon} onPress={
                                    () => {
                                        setCShow(!cshow)
                                        setCVisible(!cvisible)
                                    }
                                }>
                                    <Icon name={cshow === false ? 'eye-outline' : 'eye-off-outline'} size={20} color={isCPassFocused ? "#1E1D2E" : "#B1B3CD"} />
                                </TouchableOpacity>
                            </View>
                            {errors.cpassword && (
                                <Text style={styles.errorText}>
                                    *{errors.cpassword}
                                </Text>
                            )}
                        </View>

                    </View>

                    <Text style={{
                        color: 'gray',
                        fontSize: 13,
                        marginTop: 10,
                        textAlign: 'center',
                    }}>
                        Or, login with...
                    </Text>

                    <View style={styles.loginMethodLayout}>
                        <TouchableOpacity
                            onPress={() => { }}
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
                                    onPress={() => { registerUser(email, password, cpassword, fullname, phone, address, country) }}
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
                                        Signup
                                    </Text>
                                </TouchableOpacity>
                            </>)
                    }

                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 60,
                    }}>
                        <Text style={{
                            textAlign: 'center',
                            fontSize: 15
                        }}>
                            Already have an account?
                        </Text>

                        <TouchableOpacity
                            onPress={() => navigation.navigate('Login Screen')}
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
                                Sign in.
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

        </SafeAreaView>
    )
}

export default Signup

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
        marginEnd: 15,
    },
    loginMethodLayout: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
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