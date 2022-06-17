import React from 'react';
import { StyleSheet, Text } from 'react-native';

const MyTitle = ({title}) => {
 return(
     <Text style={styles.MyTitle}>{title}</Text>
 )
}
const styles = StyleSheet.create({
    MyTitle:{
        fontWeight: "bold",
        fontSize: 20,
        textAlign: "center",
        padding: 5,
        color: 'white',
    }
})
export default MyTitle