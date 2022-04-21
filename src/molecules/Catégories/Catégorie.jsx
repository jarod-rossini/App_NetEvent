import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";

import MyTitle from "../../atoms/Title/MyTitle";
import MyImage from "../../atoms/images/MyImage";

const Catégories = () =>{

    const [data, setData] = useState([]);
    const [tag, setTag] = useState([]);
    const [nameTag, setNameTag] = useState([]);

    const getInfoCategorie = () => {
        fetch('https://jeremy-dejoux.students-laplateforme.io/api/events/3')
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            setData(data)
        })
        .catch((error) => {
            console.error(error);
        });
    }

    const getInfoTag = () => {
        fetch('https://jeremy-dejoux.students-laplateforme.io'+data.eventTags)
        .then((response) => response.json())
        .then((data2) => {
            console.log(data2)
            setTag(data2)
        })
        .catch((error) => {
            console.log(error)
        });
    }

    const getNameTag = () => {
        fetch('https://jeremy-dejoux.students-laplateforme.io'+tag.tags)
        .then((response) => response.json())
        .then((data3) => {
            console.log(data3)
            setNameTag(data3)
        })
        .catch((error) => {
            console.log(error)
        });
    }

    useEffect(() => {
        getInfoCategorie();
        getInfoTag();
        getNameTag();
      }, []);

    return(
        <View>
            <MyTitle title={nameTag.title}/>
        </View>
    )
}

export default Catégories