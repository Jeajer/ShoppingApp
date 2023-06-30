import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import * as React from 'react'
import Input from '../uc/Input'
import PasswordBox from '../uc/PasswordBox'
import { SafeAreaView } from 'react-native-safe-area-context';

const img = "https://img.freepik.com/premium-vector/laptop-with-online-shop-where-catalog-clothes-shows-t-shirt-socks-shorts-blue_249405-51.jpg?w=1380"
const fbImg = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/2048px-2021_Facebook_icon.svg.png"
const ggImg = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2008px-Google_%22G%22_Logo.svg.png"

const Login = ({ navigation }) => {

    const [toggleCheckBox, setToggleCheckBox] = React.useState(false)

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
                            Welcome back!
                        </Text>

                        <Input
                            title='E-mail address'
                            icon='email-outline'
                            placeholder='Enter your e-mail address'
                            keyboard='default'
                        />
                        <PasswordBox
                            title='Password'
                            placeholder='Enter your password'
                            keyboard='default'
                        />
                    </View>

                    <TouchableOpacity
                        onPress={() => { }}
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

                    <TouchableOpacity
                        onPress={() => {navigation.navigate("Profile1 Screen") }}
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

                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 40,
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
        marginEnd: 15,
    },
    loginMethodLayout: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    }
}) 