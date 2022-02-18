import React from 'react';
import { StyleSheet, Text } from 'react-native';

const MyTitle = ({title}) => {
 return(
     <Text style={styles.MyTitle}>{title}</Text>
 )
}
const styles = StyleSheet.create({
    MyTitle:{
        color: 'black'
    }
})
export default MyTitle