import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, Modal } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useState } from 'react'
import DatePicker from 'react-native-modern-datepicker'
import {getToday, getFormatedDate} from 'react-native-modern-datepicker'


const DatepickerBox = ({ title, icon, keyboard, onFocus = () => { { } } }) => {

    const [isFocused, setIsFocused] = useState(false);
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState(title);

    const today = new Date();
    const startDate = getFormatedDate(today.setDate(today.getDate() + 1), 'DD/MM/YYYY');

    function handleOnPress () {
        setOpen(!open);
    }

    function handleChange (date) {
        this.setState({
            startDate: date,
        });
    }

    return (
        <View style={{ marginVertical: 10 }}>
            <Text style={{
                color: "gray",
                fontWeight: 'normal',
                fontSize: 12
            }}>
                {title}
            </Text>

            <TouchableOpacity
                style={[
                    styles.passwordContainer, { borderColor: isFocused ? "#2078F4" : "#EAEDFB" }
                ]}
                onPress={handleOnPress}
            >
                <Text
                    style={{
                        backgroundColor: "transparent",
                        paddingVertical: 10,
                        paddingHorizontal: 0,
                        fontSize: 16,
                        width: '90%',
                        color: 'gray',
                    }}
                    onFocus={
                        () => {
                            onFocus();
                            setIsFocused(true);
                        }}
                    onBlur={() => { setIsFocused(false) }}
                    keyboardType={keyboard}
                >
                    {date}
                </Text>
                <Icon name={icon} size={20} color={isFocused ? "#2078F4" : "#B1B3CD"} />
            </TouchableOpacity>

            <Modal
                animationType='slide'
                transparent={true}
                visible={open}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <DatePicker
                            mode='calendar'
                            selected={date}
                            onDateChange={(date)=>setDate(date)}
                            minimumDate={startDate}
                        />
                        <TouchableOpacity onPress={handleOnPress}>                            
                            <Text style={{textAlign: 'center',}}>
                                Close
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
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
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        width: '90%',
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
})

export default DatepickerBox