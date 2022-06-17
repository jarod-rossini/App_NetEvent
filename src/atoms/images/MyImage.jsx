import React from 'react'
import { StyleSheet, View, Image } from 'react-native';


const MyImage = ({url_image}) => {
 return (
        <Image style={styles.MyImage} source={{uri:url_image}} />
 )
}

const styles = StyleSheet.create({
    MyImage:{
        resizeMode: 'cover',
        width: '100%',
        height: 200
    }
})

export default MyImage;