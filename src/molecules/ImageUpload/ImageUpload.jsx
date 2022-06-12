import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

const ImageUpload = () => {
  return (
    <View style={styles.container}>
      <View>
          <TouchableOpacity style={styles.uploadBtn}>
              <Text>Upload Image</Text>
          </TouchableOpacity>
          <Text>Skip</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'yellow',
        justifyContent: 'center',
        alignItems: 'center',
    },

    uploadBtn:{
        height: 125,
        width: 125,
        borderRadius: 125 / 2,
        justifyContent: 'center',
        alignItems: 'center',
        borderStyle: 'dashed',
        borderWidth: 1
    }
})

export default ImageUpload