import { StyleSheet, Text } from 'react-native'

const MyDate = ({date_event}) => {
    return(
        <Text style={styles.StylesDate}>{date_event}</Text>
    )
}

const styles = StyleSheet.create({
    StylesDate:{
        backgroundColor: 'yellow'
    }
})

export default MyDate