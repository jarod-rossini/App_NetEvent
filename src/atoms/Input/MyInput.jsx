import React from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';

const MyInput = () => {
    return (
        <TextInput
            style={styles.myInput}
            defaultValue='Ceci est un input'
        />
    );
};

const styles = StyleSheet.create({
    myInput:{
        height: 40,
        width: '60%',
        borderColor: 'gray',
        borderWidth: 1
    }
})
export default MyInput;