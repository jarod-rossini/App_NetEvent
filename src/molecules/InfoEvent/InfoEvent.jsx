import React, { Component } from "react";
import { View, StyleSheet } from "react-native";

import { MyDate, MyImage, MyLogo, MyTitle, MyInput } from "../../atoms/Atom"


class InfoEvent extends Component {

    state = {
        title: {}
    }

    componentDidMount(){
        fetch('https://jeremy-dejoux.students-laplateforme.io/api/events/3')
            .then((response) => {
                return response.json()
            })
            .then((result) => {
                this.setState({title: result})
                console.log(result)
            })
    }

    render() {
        return (
            <View>
                <MyImage/>
                <View style={styles.InfoEvent}>
                    <MyLogo logoName='heart-outline' logoSize={24} logoColor='black'/>
                    <View style={styles.nameEvent}>
                        <MyTitle title={this.state.title.name}/>
                        <MyDate date_event={new Date(this.state.title.dateStart).toLocaleDateString('fr-FR')}/>
                    </View>
                    <MyLogo logoName='information-circle-outline' logoSize={24} logoColor='black'/>
                </View>
                <MyInput/>
            </View>
        )
    }    
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