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
import { deleteUser, reauthenticateWithCredential } from 'firebase/auth';

const DeleteAccountScreen = ({ navigation }) => {
    const { colors } = useTheme();
    const [email, setEmail] = useState('')
    const [isNewPassFocused, setIsNewPassFocused] = React.useState(false);

    const [errors, setErros] = useState({})
    const [loading, setLoading] = useState(false)

    function promptForCredentials() {
        return {};
    }

    const credential = promptForCredentials();
    const user = FIREBASE_AUTH.currentUser;

    const handleDelete = async(user) => {
        reauthenticateWithCredential(user, credential)
        .then(() => {
            // User re-authenticated.
            deleteUser(user).then(() => {
                alert('Delete successfully')
            }).catch((error) => {
                console.log(error.message)
            });
        }).catch((error) => {
            console.log(error.message)
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
                }}>Important</Text>
                <View style={{ width: 30 }} />
            </View>
            <View style={{
                paddingHorizontal: 0,
                gap: 10
            }}>
                <Text style={{
                    fontSize: 20,
                    fontWeight: "600",
                    paddingHorizontal: 24,
                    opacity: 0.6
                }}>Delete your account</Text>

                <View style={{
                    paddingHorizontal: 0,
                    marginTop: 10,
                    gap: 10
                }}>
                    <View style={styles.viewContainer}>
                        <View
                            style={{ width: '100%' }}
                        >
                            <Text style={styles.textStylesCap}>
                                You are about to begin a process to delete your account.
                            </Text>
                        </View>
                    </View>                    
                </View>
            </View>

            <View style={{
                paddingHorizontal: 0,
                gap: 10
            }}>
                <Text style={{
                    fontSize: 20,
                    fontWeight: "600",
                    paddingHorizontal: 24,
                    opacity: 0.6
                }}>Remember:</Text>

                <View style={{
                    paddingHorizontal: 0,
                    marginTop: 10,
                    gap: 10
                }}>
                    <View style={styles.viewContainer}>
                        <View
                            style={{ width: '100%' }}
                        >
                            <Text style={styles.textStylesCap}>
                                You will not be able to track any purchase, return and/or exchange online.
                            </Text>
                            <Text style={styles.textStylesCap}>
                                You will not be able to access your Shop account.
                            </Text>
                        </View>
                    </View>
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
                                onPress={() => { navigation.navigate('Re-Authentication Screen') }}
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


export default DeleteAccountScreen;

const styles = StyleSheet.create({
    viewContainer: {
        paddingHorizontal: 40,
        marginTop: 0,
        gap: 10,
        flexDirection: 'row',
        alignContent: 'center',
    },
    textStyles: {
        fontSize: 15,
        color: 'black',
        fontWeight: '300',
    },
    textStylesCap: {
        fontSize: 14,
        color: 'gray',
        marginBottom: 10,
        fontWeight: '300',
    },
})

