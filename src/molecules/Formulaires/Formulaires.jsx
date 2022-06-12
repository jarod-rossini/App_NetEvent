import { View, Text, Button } from 'react-native'
import React, {useState, useEffect} from 'react'
import { MyInput } from "../../atoms/Atom"
import DateTimePicker from '@react-native-community/datetimepicker'
import { Picker } from "@react-native-picker/picker";
import * as SecureStore from "expo-secure-store";


const Formulaires = () => {


    const [allTags, setAllTags] = useState('test');
    const [tags, setTags] = useState('/api/tags/5')

    const getTags = () => {
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

    useEffect(() => {
        getTags();
        getValueForToken()
        getValueForId()
    }, []);

    const [user, setUser] = useState([]);
    const [token, setToken] = useState([]);

    async function getValueForId() {
        let result = await SecureStore.getItemAsync("idUser");
        if (result){
            setUser("api/users/" + result);
        }
    }

    async function getValueForToken() {
        let result = await SecureStore.getItemAsync("userToken");
        if (result){
            setToken(result);
        }
    }
    


    const [name, setName] = useState('Nom');
    const [content, setContent] = useState('Description');
    const [capacity, setCapacity] = useState('');
    const [dateStart, setDateStart] = useState(new Date());
    const [dateEnd, setDateEnd] = useState(new Date());
    const [city, setCity] = useState('Ville');
    const [price, setPrice] = useState('');

    const [isPending, setIsPending] = useState(false);

    const postEvent = (e) => {
        e.preventDefault();
        setIsPending(true);

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
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2NTUwNDIyMTIsImV4cCI6MTY1NTA0NTgxMiwicm9sZXMiOlsic3RyaW5nIiwiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoiZW1tYW51ZWxAaG90bWFpbC5mciJ9.GmrfpG_pk7Ek9CNikG9dnEGySw-gzM3c4aHB6K0IbB7odST1kCY7wRdiMQvqxQdw07Q8RPGC2UXZhPdr94ou9M0j4Vb1KMo7cGqUjsF6AOV15dcaMhKRhmks0RKOIno0TM554vR_BEiFeQJC57QPvaMwz2_AYbipmMQxasN6sim5OzkiXU_xvQiAoCpuiwP4NtykACUfvKADJDLd48pTv9UXA6EygRgoAvOeLgzGMJ4HG1oJcFHye0mDSDcNa5w2xT83Vi9UDPQ2qjn-bUJbddjAOAdmq68esAK9X4e4uhxZxoFSlIiZVvbReYpQ6DZjz5f7QKAvhZ5JK9ulMwGXUg',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(eventCreate)
        }).then((response) => response.json())
        .then((data) => {
            console.log(data);
            console.log(name, content, user, capacity, dateStart, city, price, dateEnd);
            setIsPending(false);
        })
    }

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
        
        setTextDateStart(fullDate);
    }

    const onChangeDateEnd = (event, selectedDate) => {
        const currentDate = selectedDate || dateEnd;
        setDateEnd(currentDate);
        setShowEnd(false);
        let tempDate = new Date(currentDate);
        let fullDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
        
        setTextDateEnd(fullDate);
    }

    const showModeStart = (currenMode) => {
        setShowStart(true);
        setMode(currenMode);
    }

    const showModeEnd = (currenMode) => {
        setShowEnd(true);
        setMode(currenMode);
    }

    const [country, setCountry] = useState('Unknown');


  return (
    <View>
        <MyInput inputValue={name} inputSet={setName}/>
        <MyInput inputValue={content} inputSet={setContent}/>
        <MyInput inputValue={capacity} inputSet={setCapacity} inputType={'parseInt'} inputKeyboardType='numeric'/>


        <View style={{margin:20}}>
            <Button title='Start' onPress={() => showModeStart('date')}></Button>
            {showStart && <DateTimePicker
                testID='dateTimePicker'
                value={dateStart}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChangeDateStart}
            />}
        </View>

        <View style={{margin:20}}>
            <Button title='End' onPress={() => showModeEnd('date')}></Button>
            {showEnd && <DateTimePicker
                testID='dateTimePicker'
                value={dateEnd}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChangeDateEnd}
            />}
        </View>

        <MyInput inputValue={city} inputSet={setCity}/>
        <MyInput inputValue={price} inputSet={(setPrice)} inputType={'parseInt'} inputKeyboardType='numeric'/>

        <Picker selectedValue={tags} onValueChange={(value, index) => setTags(value)} mode="dropdown">
            {Object.keys(allTags).map((key, index) => {
                return <Picker.Item label={allTags[key].title} value={allTags[key].id}/>
            })}
        </Picker>
        
        { !textDateStart && <Text>{textDateStart}</Text> }
        { !textDateEnd && <Text>{textDateEnd}</Text> }

        
        { !isPending && <Button title='Creer' onPress={postEvent}/>}
        { isPending && <Button title='Creation...' disabled/> }

    </View>
  )
}

export default Formulaires;