import React from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';

const MyInput = ({inputValue, placeholder, placeHoldeTextColor, inputSet, inputKeyboardType, inputStyle}) => {
    return (
        <TextInput placeholder={placeholder} style={inputStyle} value={inputValue} onChangeText={inputKeyboardType == 'numeric' ? newText => inputSet(newText) : newText => inputSet(newText)} keyboardType={inputKeyboardType} placeholderTextColor={placeHoldeTextColor} />
    );
};
export default MyInput;