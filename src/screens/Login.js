import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import * as React from 'react'
import Input from '../uc/Input'
import PasswordBox from '../uc/PasswordBox'
import * as font from 'expo-font';

const img = "https://img.freepik.com/free-vector/discount-concept-illustration_114360-2301.jpg?w=826&t=st=1684950014~exp=1684950614~hmac=fa9f3262a769754773084fbac1bc65dada51363b2f3faad2f403c8fb91811ade"

const Login = () => {

    const [toggleCheckBox, setToggleCheckBox] = React.useState(false)

    return (
        <ScrollView style = {{
            backgroundColor: "white",
                flex: 1,
                padding: 30, 
            }}>
            <View 
            >
                <View style={{
                    alignItems: "center",
                    backgroundColor: "white"
                }}>
                    <Image source={{ uri: img }}
                        style={{
                            width: 150,
                            aspectRatio: 1,
                            alignContent: "center",
                            marginTop: 40,
                        }}
                        resizeMode="cover"
                    />
                </View>

                <View style={{                    
                    backgroundColor: "white",
                    // margin: 15,
                    marginTop: -10,
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
                onPress={() => {}}
                style={{}}>                    
                    <Text style={styles.forgot}>
                        Forgot password?
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    onPress={() => {}}
                    style={{
                        backgroundColor: '#2B71F5',
                        marginTop: 40,
                        padding: 15,
                        borderRadius: 10,
                        marginBottom: 30,
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
            </View>
        </ScrollView>        
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
        color: '#2B71F5',              
    }
}) 