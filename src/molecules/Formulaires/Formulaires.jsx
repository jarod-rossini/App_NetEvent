import { View, Text, Button, StyleSheet, ScrollView } from 'react-native'
import React, {useState, useEffect} from 'react'
import { MyButton, MyInput } from "../../atoms/Atom"
import DateTimePicker from '@react-native-community/datetimepicker'
import { Picker } from "@react-native-picker/picker";
import * as SecureStore from "expo-secure-store";


const Formulaires = () => {

    const [allTags, setAllTags] = useState([]);
    const [tags, setTags] = useState('/api/tags/5')
    const getTags = () => { //Récupération de Tous les Tags
        fetch ('https://netevent-api.herokuapp.com/api/tags', {
            headers: {
                'Accept': 'application/json'
            }
        })
        .then((response) => response.json())
        .then((data) => {
            setAllTags(data)
        })
    }

    //Récupère les informations de l'User
    const [user, setUser] = useState([]);
    const [token, setToken] = useState([]);
    async function getValueForId() { //Récupère l'id de l'user
        let result = await SecureStore.getItemAsync("idUser");
        if (result){
            setUser("api/users/" + result);
        }
    }
    async function getValueForToken() { //Rècupère le token de l'user
        let result = await SecureStore.getItemAsync("userToken");
        if (result){
            setToken(result);
        }
    }

    useEffect(() => {
        getTags();
        getValueForToken()
        getValueForId()
    }, []);   


    const [name, setName] = useState('');
    const [content, setContent] = useState('');
    const [capacity, setCapacity] = useState('');
    const [dateStart, setDateStart] = useState(new Date());
    const [dateEnd, setDateEnd] = useState(new Date());
    const [city, setCity] = useState('');
    let [price, setPrice] = useState('');

    const [isPending, setIsPending] = useState(false);


    const stringIntoNumber = () =>{
        return new Promise((resolve) => {
            resolve(parseInt(price))
        })
    }

    const postEvent = async (e) => {
        e.preventDefault();
        setIsPending(true);

        if ((dateStart.getTime() - dateEnd.getTime()) > 0) { //Vérifie la différence entre les dates
            alert('La date de début doit commencer avant la date de fin')
            return setIsPending(false);
        }
        price = await stringIntoNumber()
        console.log(price)
        const eventCreate = {name, content, user, capacity, dateStart, dateEnd, city, price}
        Object.keys(eventCreate).map((key, index) => {
            if (eventCreate[key].length == 0 || eventCreate[key] == ' ' || eventCreate[key] == '') {
                alert(`Le champ ${key} ne peut pas être vide`);
                return setIsPending(false);
            }
        })

        fetch('https://netevent-api.herokuapp.com/api/events/publisher', {
            method: 'post',
            mode: 'no-cors',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2NTUzOTYxNjgsImV4cCI6MTY1NTM5OTc2OCwicm9sZXMiOlsic3RyaW5nIiwiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoiZW1tYW51ZWxAaG90bWFpbC5mciJ9.szEWaGYYS4pB3L3tubWy8rhs3Q6EbNlWUDT0xjq4uJMI3LkJVcN1fTfEK76pOoWpGmE5ym8O9mPNc8GRJ3sivobu2TK7HDaCEXG3DlwRbrgZaMLLtJRbl86esZkdJdl8u8A9vZHNzOaaQsv9yfzWFJtC2Z3uecpm4K-T0Rrqo4kuuHgArNgyFoicqAYQH-TbQMz1MLVetzuvGGSTXa91JsYdKeJmDky15Qrn1asAPg-Lo1o9-dmzYbBWLtXOl9uFMtWL17VMhn00VU50-3anE2EhJz-suH0B-5R_KY1Fn2qlcvJZBO-us8r7hGoxolWTTgIsyWHkgjSsn6iVOEHaYg',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(eventCreate)
        }).then((response) => response.json())
        .then((data) => {
            console.log(data);
            setIsPending(false);
        })
    }


    //Affichage DateTimePicker
    const [mode, setMode] = useState('date');
    const [showStart, setShowStart] = useState(false);
    const [showEnd, setShowEnd] = useState(false);
    const [textDateStart, setTextDateStart] = useState('Empty');
    const [textDateEnd, setTextDateEnd] = useState('Empty');

    const onChangeDateStart = (event, selectedDate) => {
        const currentDate = selectedDate || dateStart;
        setDateStart(currentDate);
        setShowStart(false);
        let tempDate = new Date(currentDate);
        let fullDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
        let fullTime = tempDate.getHours() + 'h' + tempDate.getMinutes();
                
        setTextDateStart(fullDate + '\n' + fullTime);
    }

    const onChangeDateEnd = (event, selectedDate) => {
        const currentDate = selectedDate || dateEnd;
        setDateEnd(currentDate);
        setShowEnd(false);
        let tempDate = new Date(currentDate);
        let fullDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
        let fullTime = tempDate.getHours() + 'h' + tempDate.getMinutes();
                
        setTextDateEnd(fullDate + '\n' + fullTime);
    }

    const showModeStart = (currenMode) => {
        setShowStart(true);
        setMode(currenMode);
    }
    const showModeEnd = (currenMode) => {
        setShowEnd(true);
        setMode(currenMode);
    }

    const testalert = () => {
        alert('bonjour');
    }




    return (
        <View style={styles.container}>
            <ScrollView style={styles.ScrollView}>

                <MyInput placeholder={'Nom Evenement'} placeHoldeTextColor={'white'} inputStyle={styles.myInput} inputValue={name} inputSet={setName}/>
                <MyInput placeholder={'Description'} placeHoldeTextColor={'white'} inputStyle={styles.myInput} inputValue={content} inputSet={setContent}/>


                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <Button title='Date de début' onPress={() => showModeStart('date')}></Button>
                    <Button title='Heure de début' onPress={() => showModeStart('time')}></Button>
                    {showStart && <DateTimePicker
                        testID='dateTimePicker'
                        value={dateStart}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={onChangeDateStart}
                    />}
                </View>
                <Text style={styles.dateText}>{textDateStart}</Text>

                <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <Button title='Date de fin' onPress={() => showModeEnd('date')}></Button>
                    <Button title='Heure de fin' onPress={() => showModeEnd('time')}></Button>
                    {showEnd && <DateTimePicker
                        testID='dateTimePicker'
                        value={dateEnd}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={onChangeDateEnd}
                    />}
                </View>
                <Text style={styles.dateText}>{textDateEnd}</Text>

                <MyInput placeholder={'Adresse'} placeHoldeTextColor={'white'} inputStyle={styles.myInput} inputValue={city} inputSet={setCity}/>

                <View style={styles.number}>
                    <MyInput placeholder={'Prix'} placeHoldeTextColor={'white'} inputStyle={styles.myInputNumber} inputValue={price} inputSet={(setPrice)} inputType={'parseInt'} inputKeyboardType='numeric'/>
                    <MyInput placeholder={'Nb Personnes'} placeHoldeTextColor={'white'} inputStyle={styles.myInputNumber} inputValue={capacity} inputSet={setCapacity} inputType={'parseInt'} inputKeyboardType='numeric'/>
                </View>
                
                <Picker selectedValue={tags} onValueChange={(value) => setTags(value)} mode="dropdown">
                    {allTags.map((item) => {
                        return ( <Picker.Item label={item.title} value={item.id} key={item.id}/> )
                    })}
                </Picker>
                
                { !isPending && <MyButton pressable={styles.pressable} button={styles.myButton} buttonText={styles.buttonText} text={'Creer'} onPress={postEvent}/>}
                { isPending && <MyButton pressable={styles.pressable} button={styles.myButton} buttonText={styles.buttonText} text={'Creation...'} disabled={true}/> }
            </ScrollView>
        </View>
    )
}



const styles = StyleSheet.create({
    container:{
        paddingVertical: 10,
        paddingHorizontal: 10,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black'
    },

    ScrollView:{
        width: '100%',
        backgroundColor: 'black',
    },

    number:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',

        backgroundColor: 'black'
    },

    myInput:{
        marginVertical: 10,
        width: '40%',        
        borderBottomWidth: 1,
        borderColor: 'white',
        color: 'white',        
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 24,
        color: 'white',
    },

    myInputNumber:{
        marginVertical: 10,
        width: '40%',        
        borderBottomWidth: 1,
        borderColor: 'white',
        color: 'white',        
        alignSelf: 'center',
        textAlign: 'center',
        width: '20%', 
        fontSize: 24
    },

    dateText:{
        color: 'white',
        textAlign: 'center',
        fontSize: 24,
        marginVertical: 10
    },

    myButton:{
        padding: 10,
        marginHorizontal: '30%',
        backgroundColor: 'white',
        borderRadius: 10
    },

    buttonText:{
        fontSize: 24,
        textAlign: 'center',
        textTransform: 'uppercase',
        fontWeight: 'bold',
    }
})
export default Formulaires;