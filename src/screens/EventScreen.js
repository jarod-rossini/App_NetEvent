import * as React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Image,
  
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/context.js";
import { useContext, useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { MyDate, MyImage, MyLogo, MyTitle, MyInput } from "../atoms/Atom"

export default EventScreen = ({ route }) => {
    const { idEvent } = route.params;
    const navigation = useNavigation();
    
    const [data, setData] = React.useState([]);

    const getInfoEvent = () => {
        fetch('https://netevent-api.herokuapp.com/api/events/' + idEvent,
        {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
        })
        .then((response) => response.json())
        .then((data) => {

            console.log(data)
            setData(data)
        })
        .catch((error) => {
            console.error(error);
        });
    }
    
    useEffect(() => {
        getInfoEvent();
      }, []);

      return (
        <View>            
            <MyImage url_image={'https://netevent-api.herokuapp.com'+data.fileUrl}/>
            <View style={styles.InfoEvent}>
                <MyLogo logoName='heart-outline' logoSize={24} logoColor='black'/>
                <MyLogo logoName='information-circle-outline' logoSize={24} logoColor='black'/>
                <MyTitle title={data.content}/>
                <MyDate date_event={data.dateStart}/>
            </View>
        </View>
    );

  /*   <Text>{idEvent}</Text> */

}

const styles = StyleSheet.create({
    InfoEvent:{
        flexDirection: "row",
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: 'green',
        height: 50
    },
    nameEvent:{
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: 'yellow',
        height: '100%'
    }
})