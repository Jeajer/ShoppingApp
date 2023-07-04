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
} from 'react-native'
import React, { useState } from 'react'
import Input from '../uc/Input'
import PasswordBox from '../uc/PasswordBox'
import DatepickerBox from '../uc/DatepickerBox'
import { FIREBASE_AUTH, FIREBASE_PROVIDER, FIREBASE_DB } from '../../firebaseConfig';
import { signInWithPopup, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import firebase from '../../firebaseConfig';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const img = "https://img.freepik.com/premium-vector/shopping-cart-with-gift-boxes-shopping-bags-from-online-shop-e-commerce-marketing-provided-with-sale-discount-blue_249405-55.jpg?w=1060"
const fbImg = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/2048px-2021_Facebook_icon.svg.png"
const ggImg = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2008px-Google_%22G%22_Logo.svg.png"

const Signup = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [show, setShow] = React.useState(false);
    const [visible, setVisible] = React.useState(true);
    const [loading, setLoading] = useState(false)

    const auth = FIREBASE_AUTH

    const [isFocused, setIsFocused] = React.useState(false);
    const [isFNameFocused, setIsFNameFocused] = React.useState(false);
    const [isLNameFocused, setIsLNameFocused] = React.useState(false);
    const [isPassFocused, setIsPassFocused] = React.useState(false);
    const [isCPassFocused, setIsCPassFocused] = React.useState(false);

    const firebaseDB = FIREBASE_DB;

    registerUser = async (email, password, firstName, lastname) => {
        setLoading(true);
        await createUserWithEmailAndPassword(email, password)
            .then(() => {
                FIREBASE_AUTH.currentUser.sendEmailVerification({
                    handleCodeInApp: true,
                    url: 'shopping-app-691fd.firebaseapp.com',
                })
                    .then(() => {
                        alert('Verification email sent!')
                    }).catch((error) => {
                        alert(error.message)
                    })
                    .then(() => {
                        firebase.FIREBASE_DB().collection('users')
                            .doc(firebase.FIREBASE_AUTH().currentUser.uid)
                            .set({
                                firstName,
                                lastname,
                                email,
                            })
                    })
                    .catch((error) => {
                        alert(error.message)
                    })
            })
            .catch((error) => {
                alert(error.message)
            }).finally(
                setLoading(false)
            )
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

                        {/* first name box */}
                        <View style={{ marginVertical: 10 }}>
                            <Text style={styles.headerBox}>
                                Firt name
                            </Text>

                            <View style={[styles.passwordContainer, { borderColor: isFNameFocused ? "#1E1D2E" : "#EAEDFB" }]}>
                                <TextInput placeholder="Enter your first name"
                                    placeholderTextColor='gray'
                                    style={styles.input}
                                    autoCapitalize='none'
                                    onFocus={
                                        () => {
                                            // onFocus();
                                            setIsFNameFocused(true);
                                        }}
                                    onBlur={() => { setIsFNameFocused(false) }}
                                    keyboardType="default"
                                    secureTextEntry='false'
                                    onChangeText={(text) => setFirstName(text)}
                                    value={firstName}
                                >
                                </TextInput>
                                <Icon name='account-outline' size={20} color={isFNameFocused ? "#1E1D2E" : "#B1B3CD"} />
                            </View>
                        </View>

                        <View style={{ marginVertical: 10 }}>
                            <Text style={styles.headerBox}>
                                Last name
                            </Text>

                            <View style={[styles.passwordContainer, { borderColor: isLNameFocused ? "#1E1D2E" : "#EAEDFB" }]}>
                                <TextInput placeholder="Enter your last name"
                                    placeholderTextColor='gray'
                                    style={styles.input}
                                    autoCapitalize='none'
                                    onFocus={
                                        () => {
                                            // onFocus();
                                            setIsLNameFocused(true);
                                        }}
                                    onBlur={() => { setIsLNameFocused(false) }}
                                    keyboardType="default"
                                    secureTextEntry='false'
                                    onChangeText={(text) => setLastName(text)}
                                    value={email}
                                >
                                </TextInput>
                                <Icon name='account-outline' size={20} color={isFocused ? "#1E1D2E" : "#B1B3CD"} />
                            </View>
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
                                    secureTextEntry='false'
                                    onChangeText={(text) => setEmail(text)}
                                    value={email}
                                >
                                </TextInput>
                                <Icon name='email' size={20} color={isFocused ? "#1E1D2E" : "#B1B3CD"} />
                            </View>
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
                                    <Icon name={show === false ? 'eye-outline' : 'eye-off-outline'} size={20} color={isCPassFocused ? "#1E1D2E" : "#B1B3CD"} />
                                </TouchableOpacity>
                            </View>
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
                            style={{ marginTop: 50, marginBottom: 20, }}
                        />)
                        : (
                            <>
                                <TouchableOpacity
                                    onPress={() => registerUser(email, password, firstName, lastname)}
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
}) 