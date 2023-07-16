import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const imgUrl = 'https://img.freepik.com/free-vector/no-data-concept-illustration_114360-536.jpg?w=826&t=st=1689483694~exp=1689484294~hmac=8c80c22b59c747054babb9777fdca1aa03fd2d389bf7a3c80527349c7345a03d'

const LoginRequestScreen = () => {
    return (
        <View
            style = {styles.mainContainer}
        >
            <Image
                source={{ uri: imgUrl}}
                style={styles.image}
                resizeMode='contain'
            />

            <TouchableOpacity
                style = {styles.touchableStyle}
            >
                <Text
                    style={styles.textStyle}
                >
                    Login Required
                </Text>
                <Icon 
                    name = 'chevron-right'
                    size = {32}
                />
            </TouchableOpacity>                 
        </View>
    )
}

export default LoginRequestScreen

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignContent: 'center',
        alignItems: 'center',
        verticalAlign: 'center',
        justifyContent: 'center'
    },
    touchableStyle: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: 300,
        height: 300,
    },
    textStyle: {
        fontWeight: 500,
        fontSize: 20,
        textDecorationLine: 'underline',
    }
})