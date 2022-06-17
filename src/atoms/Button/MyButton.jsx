import { View, Text, Pressable } from 'react-native'
import React from 'react'

const MyButton = ({text, pressable, button, buttonText, onPress, disabled}) => {
  return (
    <Pressable style={pressable} onPress={onPress} disabled={disabled}>
      <View style={button}>
        <Text style={buttonText}>{text}</Text>
      </View>
    </Pressable>
  )
}

export default MyButton