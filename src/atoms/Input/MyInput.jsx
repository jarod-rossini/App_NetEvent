import React from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';

const MyInput = ({inputValue, inputSet, inputType, inputKeyboardType}) => {
    return (
        <TextInput style={styles.myInput} value={inputValue} onChangeText={inputKeyboardType == 'numeric' ? newText => inputSet(parseInt(newText)) : newText => inputSet(newText)} keyboardType={inputKeyboardType}/>
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