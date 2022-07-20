import React, { useRef } from "react";
import { useContext, useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
  View,
  Button,
  ImageBackground,
  TouchableOpacity,
  Touchable,
  Animated,
  useWindowDimensions,
  ListViewComponent
} from "react-native";
/* import * as React from "react"; */
import { useNavigation } from "@react-navigation/native";
import { MyDate, MyImage, MyLogo, MyTitle, MyInput } from "../atoms/Atom";
import { render } from "react-dom";

export default HomeScreen = () => {
  const [data, setData] = React.useState([]);
  const [data1, setData1] = React.useState([]);
/*   const idCategory = 2; */

  const getInfoEvent = () => {
    fetch("https://netevent-api.herokuapp.com/api/events?page=1&eventTags.tags=2",{
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        /* console.log(data); */
        /* console.log(data[0].id);
        console.log(data[0].eventTags[0].tags.title);
        data.map(() => {
          console.log(data[0].id);
        }); */
        setData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getInfoEvent();
  }, []);

  /*===============================================*/

  const getInfoTags = () => {
    fetch("https://netevent-api.herokuapp.com/api/tags",{
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data1) => {
        console.log(data1);
        let i = 0;
        data1.map(() => {
          console.log(data1[i].title);
          i++;
        });
        console.log("===STOP===")
        setData1(data1);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getInfoTags();
  }, []);

  const navigation = useNavigation();

  const styles = StyleSheet.create({
    button: {
      height: 120
    },
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center"
    },
    scrollContainer: {
      height: 120,
      alignItems: "center",
      justifyContent: "center"
    },
    card: {
      flex: 1,
      marginVertical: 4,
      marginHorizontal: 16,
      borderRadius: 5,
      overflow: "hidden",
      alignItems: "center",
      justifyContent: "center"
    },
    card1: {
      flex: 1,
      height: 300,
      marginVertical: 4,
      marginHorizontal: 16,
      borderRadius: 5,
      overflow: "hidden",
      alignItems: "center",
      justifyContent: "center"
    },
    textContainer: {
      backgroundColor: "rgba(0,0,0, 0.2)",
      paddingVertical: 8,
      borderRadius: 5,
      height: 120,
      width: 200
    },
    infoText: {
      color: "white",
      fontSize: 16,
      fontWeight: "bold"
    },
    normalDot: {
      height: 8,
      width: 8,
      borderRadius: 4,
      backgroundColor: "silver",
      marginHorizontal: 4
    },
    indicatorContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center"
    }
  });

  const images = new Array(data.length).fill('https://images.unsplash.com/photo-1556740749-887f6717d7e4');
  console.log(images);
  const mainImage = new Array(1).fill('https://images.unsplash.com/photo-1556740749-887f6717d7e4');

  const { width: windowWidth } = useWindowDimensions();

  var i = -1;

  return (
    <SafeAreaView style={styles.container}>
      {data1.map(() => {
            i++;
            console.log(i);
      })}

      {/* <Text style={{ color: "black" }}>{{ data[0].eventTags[0].tags.title }}</Text>
      <View style={styles.scrollContainer}>
        <ScrollView
          horizontal={true}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
        >
          {images.map((image, imageIndex) => {
            return (
              <View
                style={{ width: windowWidth/2}}
                key={imageIndex}
              >
                  <ImageBackground source={{ uri: image }} style={styles.card}>
                      <TouchableOpacity onPress={() => navigation.navigate("Event", {idEvent: data[imageIndex].id})}>
                        <View style={styles.textContainer}></View>
                      </TouchableOpacity>
                  </ImageBackground>
              </View>
            );
          })}
        </ScrollView>
        </View> */}
    </SafeAreaView>
  );
};
