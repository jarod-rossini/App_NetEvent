import React, { Component } from "react";
import { View, StyleSheet } from "react-native";

import MyTitle from "../../atoms/Title/MyTitle";
import MyImage from "../../atoms/images/MyImage";

class Catégories extends Component{
    state = {
        title: {}
    }

    componentDidMount(){
        fetch('https://jeremy-dejoux.students-laplateforme.io/api/events?page=1')
            .then((response) => {
                return response.json()
            })
            .then((result) => {
                this.setState({title: result})
                console.log(result['hydra:member'][0])
            })
    }

    render() {
        return (
            <View>
                <MyTitle title={'Test'}/>
            </View>
        )
    }
}

export default Catégories