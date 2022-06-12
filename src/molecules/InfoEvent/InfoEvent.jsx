import React, { Component, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";

import { MyDate, MyImage, MyLogo, MyTitle, MyInput } from "../../atoms/Atom"


const InfoEvent = () => {

    const [data, setData] = React.useState([]);

    const getInfoEvent = () => {
        fetch('https://netevent-api.herokuapp.com/api/events/3')
        .then((response) => response.json())
        .then((data) => {


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
}

export default InfoEvent;


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