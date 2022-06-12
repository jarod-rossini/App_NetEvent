import { View, Text, Button } from 'react-native'
import React, {useState, useEffect} from 'react'
import { MyInput } from "../../atoms/Atom"
import DateTimePicker from '@react-native-community/datetimepicker'
import { Picker } from "@react-native-picker/picker";


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
    }, []);
    
    const [name, setName] = useState('Nom');
    const [content, setContent] = useState('Description');
    const [user] = '/api/users/1';
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
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2NTQwMzMzNDAsImV4cCI6MTY1NDAzNjk0MCwicm9sZXMiOlsic3RyaW5nIiwiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoiZW1tYW51ZWxAaG90bWFpbC5mciJ9.F2jHswj1-zNT7AGewUwFkz0Qy51brrLYb8DXGEAGkohDHOY1pnJUr0xF4_SLkxKdfaGU9yM7vgP3T_6vf7GO_VluiAY3xHqoTjmNnTRw3xZMBvd-B6IVPU18YXDpLQNqikX9_le1iEtFbfanCkLslqVTJeTv8mR5kdC3V_oRRfo7dOWSGcu-hX3akQfruMVZcWRDYpt5AOfGGVrwb306T-bgZz1RhCyh9Uyk2kQ0drmjeQmu1vDow5UIY74cah0Vt6UqNV6qUl8KCGCQMjZzzY41UTms0nsWudYIFoE1WR-z85Fvcter6H_JsrddfSHh4ZyLD1zTxot3L7Tssh-Gew',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(eventCreate)
        }).then((response) => response.json())
        .then((data) => {
            console.log('new blog added');
            console.log(name, content, user, capacity, dateStart, city, price, dateEnd, tags);
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