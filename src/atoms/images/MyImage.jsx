import React from 'react'
import { StyleSheet, View, Image } from 'react-native';


const MyImage = () => {
 return (
        <Image style={styles.MyImage} source = {require('../../assets/Japan.jpg')} />
 )
}

const styles = StyleSheet.create({
    MyImage:{
        resizeMode: 'cover',
        width: 500,
        height: 500
    }
})

export default MyImage;