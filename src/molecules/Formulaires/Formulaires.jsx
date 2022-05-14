import { View, Text, Button } from 'react-native'
import React, {useState, useEffect} from 'react'
import { MyInput } from "../../atoms/Atom"
import DateTimePicker from '@react-native-community/datetimepicker'

const Formulaires = () => {


    const [data, setData] = useState([]);

    const Create = () => {
        const [name, setName] = useState('default-name');
        const [description, setDescription] = useState('default-description');
        const [user, setUser] = useState('/api/users/1');
        const [capacity, setCapacity] = useState(5);
        const [dateStart, setDateStart] = useState('2022-05-14T21:04:07.542Z');
        const [dateEnd, setDateEnd] = useState('2002-05-14T21:04:07.541Z');
        const [city, setCity] = useState('Marseille');
        const [price, setPrice] = useState(5);
    }

    const postEvent = () => {
        e.preventDefault();
        const eventCreate = {name, description, user, capacity, dateStart, dateEnd, city, price}

        fetch('https://jeremy-dejoux.students-laplateforme.io/api/events/publisher', {
            method: 'post',
            mode: 'no-cors',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2NTI1NjIzNTYsImV4cCI6MTY1MjU2NTk1Niwicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoiZW1tYW51ZWxAaG90bWFpbC5mciJ9.o9TKB4POLhGffQSK80Z5AeuBZujAbgvY-OQQ27DuHnIHZKc1FCdeTBUSbnSS7TKEEfomcCCLw1GxbN4acf5A89WS7-16C4Sf9_-xLWNf1Q-htgVVOuTB2JwFiCRgWN7vXgggmIcuqCnc3WTCHZtyiirkNMnqt65BWEJM8Z7jCU5F_iwxZAuoHmcxOyMfD5zzwmM5R8iJ0nmzsBC8CiJr239z9DiEGMf2x2szP7_5B56BDhnXAp2tT-mWnPqAJD_-8Nj8zbYNZ3UqmxLw47GDYe32vijZHPzCF552RpLPPI9lz6juxZ9oOn8KSKr7HfTq0Pj_QQHY1lIqCIz7lNT_kw',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(eventCreate)
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            console.log(data)
        })
        .catch((error) => {
            console.error(error);
        });
    }


    // useEffect(() => {
    //     postEvent();
    //   }, []);

    // Date_Start && Date_End
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [text, setText] = useState('Empty');

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
        setShow(false);
        let tempDate = new Date(currentDate);
        let fullDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
        
        setText(fullDate);
        
    }

    const showMode = (currenMode) => {
        setShow(true);
        setMode(currenMode);
    }




  return (
    <View>
        <MyInput/>
        <MyInput/>
        <MyInput/>
        <MyInput/>
        <MyInput/>
        <MyInput/>
        
        <Text>{text}</Text>

        <View>
            <Button title='DatePicker' onPress={() => showMode('date')}></Button>
        </View>
        {show && (
            <DateTimePicker
            testID='dateTimePicker'
            value={date}
            mode={mode}
            is24Hour={true}
            display='default'
            onChange={onChange}
        />)}

    </View>
  )
}

export default Formulaires;