import * as React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/context.js";
import { useContext, useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { MyDate, MyImage, MyLogo, MyTitle, MyInput } from "../atoms/Atom";
import { MaterialCommunityIcons, MaterialIcons, AntDesign, Ionicons,} from "@expo/vector-icons";
import dayjs from "dayjs";
import ReadMore from '@fawazahmed/react-native-read-more';


export default EventScreen = ({ route }) => {
  const { idEvent } = route.params;
  const navigation = useNavigation();

  const [data, setData] = React.useState([]);

  const getInfoEvent = () => {
    fetch("https://netevent-api.herokuapp.com/api/events/" + idEvent, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getInfoEvent();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView >
      <View style={styles.header}>
        <MyImage
          style={styles.detailImg}
          url_image={"https://netevent-api.herokuapp.com" + data.fileUrl}
        />
        <MyTitle title={data.name} />
        <View style={styles.info}>
          <View style={styles.date}>
            <MaterialCommunityIcons name='calendar' size={22} color="white"/>
            <Text style={styles.detailDate}>{dayjs(data.dateStart).format('DD MMMM YYYY à HH [heures] mm')}</Text>
          </View>
          <View style={styles.localisation}>
            <MaterialIcons name='location-pin' size={22} color="white"/>
            <Text style={styles.detailLocalisation}>{data.city}</Text>
          </View>

        </View>
        <View style={styles.titleAndHeart}>
            <Text style={styles.descriptionTitle}>Description</Text>
            <Ionicons  name='heart-outline' size={24} color="red" />
        </View>
      </View>
      
      <ReadMore numberOfLines={8} style={styles.description} seeLessText="voir moins" seeMoreText="voir plus" >
          {data?.content}
        </ReadMore>
        </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
  },
  link: {
    color: "blue",
  },
  detailImg: {
    height: 200,
    width: 200,
    borderRadius: 100,
    borderColor: "white",
    borderWidth: 1,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "left",
    padding: 5,
    color: "white",
  },
  info: {
    marginLeft: 10,
    width:'100%',
    justifyContent: "flex-start",
    marginVertical: 20,
  },
  date: {
    display: 'flex',
    flexDirection: 'row'
  },
  detailDate: {
    color: 'grey',
    marginLeft: 10,
    fontSize: 16,
    marginBottom: 13,
  },
  localisation: {
    display: 'flex',
    flexDirection: 'row'
  },
  detailLocalisation: {
    color: 'grey',
    marginLeft: 10,
    fontSize: 16,
  },
  titleAndHeart: {
    width: '95%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 5
  },
  descriptionTitle: {
    marginLeft: 5,
    fontSize: 22,
    color: "white",
  },
  description: {
    marginHorizontal: 20,
    fontSize: 16,
    color: "rgb(200,200,200)",
  },
  see: {
    fontSize: 12
  },
  scrollView: {
    marginBottom: 0,
  }
});
