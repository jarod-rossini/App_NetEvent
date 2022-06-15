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

        if ((dateStart.getTime() - dateEnd.getTime()) > 0) {
            alert('La date de début doit commencer avant la date de fin')
            return setIsPending(false);
        }        

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
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(eventCreate)
        }).then((response) => response.json())
        .then((data) => {
            console.log(data);
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
        let fullTime = 'Hours: ' + tempDate.getHours() + ' | Minutes: ' + tempDate.getMinutes();
                
        setTextDateStart(fullDate + '\n' + fullTime);
    }

    const onChangeDateEnd = (event, selectedDate) => {
        const currentDate = selectedDate || dateEnd;
        setDateEnd(currentDate);
        setShowEnd(false);
        let tempDate = new Date(currentDate);
        let fullDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
        let fullTime = 'Hours: ' + tempDate.getHours() + ' | Minutes: ' + tempDate.getMinutes();
                
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
  return (
    <View>
        <MyInput inputValue={name} inputSet={setName}/>
        <MyInput inputValue={content} inputSet={setContent}/>
        <MyInput inputValue={capacity} inputSet={setCapacity} inputType={'parseInt'} inputKeyboardType='numeric'/>


        <View style={{margin:20}}>
            <Button title='Date de début' onPress={() => showModeStart('date')}></Button>
            <Button title='Heure de début' onPress={() => showModeStart('time')}></Button>
            <Text>{textDateStart}</Text>
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
            <Button title='Date de fin' onPress={() => showModeEnd('date')}></Button>
            <Button title='Heure de fin' onPress={() => showModeEnd('time')}></Button>
            <Text>{textDateEnd}</Text>
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
        
        { !isPending && <Button title='Creer' onPress={postEvent}/>}
        { isPending && <Button title='Creation...' disabled/> }

    </View>
  )
}

export default Formulaires;