import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";

import MyTitle from "../../atoms/Title/MyTitle";
import MyImage from "../../atoms/images/MyImage";

const Catégories = () =>{

    const [data, setData] = useState([]);

    const getInfoCategorie = () => {
        fetch('https://jeremy-dejoux.students-laplateforme.io/api/events/3')
        .then((response) => response.json())
        .then((data) => {
            setData(data)
        })
        .catch((error) => {
            console.error(error);
        });
    }

    useEffect(() => {
        getInfoCategorie();
      }, []);

    return(
        <View>
            <MyTitle title={data.eventTags ? data.eventTags[0].tags.title : 'pas de catégorie'}/>
        </View>
    )
}

export default Catégories