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
import { FIREBASE_AUTH, FIREBASE_DB } from '../../firebaseConfig';
import {
    doc,
    setDoc,
    getDoc,
    collection,
    query,
    where,
    getDocs,
    deleteDoc,
    updateDoc
} from 'firebase/firestore';

const ConfirmCancelScreen = ({ navigation, route: { params: { id } } }) => {
    const { colors } = useTheme();
    const [loading, setLoading] = useState(false)

    handleUpdate = async () => {
        const cancelRef = doc(FIREBASE_DB, "Orders", id);
        setLoading(true)

        try {
            await updateDoc(cancelRef, {
                status: 'Canceled'
            })
        } catch (error) {
            console.log(error.message)
        } finally {
            setLoading(false)
        }
        navigation.navigate("Order Screen")
    }

    return (
        <SafeAreaView style={{
            paddingVertical: 24,
            gap: 50,
            flex: 1,
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
                gap: 10,
                flex: 1,
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
            }}>
                <Text style={styles.textStylesCap}>
                    You are about to begin a process to cancel your order.
                </Text>
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
                                onPress={() => handleUpdate() }
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


export default ConfirmCancelScreen;

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
        fontSize: 16,
        color: 'gray',
        marginBottom: 10,
        fontWeight: '300',
    },
})

