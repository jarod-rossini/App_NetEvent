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
  useWindowDimensions
} from "react-native";
/* import * as React from "react"; */
import { useNavigation } from "@react-navigation/native";
import { MyDate, MyImage, MyLogo, MyTitle, MyInput } from "../atoms/Atom";

export default HomeScreen = () => {
  const [data, setData] = React.useState([]);

  const getInfoEvent = () => {
    fetch("https://netevent-api.herokuapp.com/api/events",{
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

  const images = new Array(6).fill('https://images.unsplash.com/photo-1556740749-887f6717d7e4');
  const mainImage = new Array(1).fill('https://images.unsplash.com/photo-1556740749-887f6717d7e4');

  const scrollX = useRef(new Animated.Value(0)).current;

  const { width: windowWidth } = useWindowDimensions();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        horizontal={true}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event([
          {
            nativeEvent: {
              contentOffset: {
                x: scrollX
              }
            }
          }
        ])}
        scrollEventThrottle={1}
      >
        {mainImage.map((image, imageIndex) => {
          return (
            <View
              style={{ width: windowWidth}}
              key={imageIndex}
            >
                <ImageBackground source={{ uri: image }} style={styles.card}>
                    {/* <TouchableOpacity onPress={() => navigation.navigate("Event",{idEvent: imageIndex})}>
                      <View style={styles.textContainer}>
                      </View>
                    </TouchableOpacity> */}
                </ImageBackground>
            </View>
          );
        })}
      </ScrollView>
      <Text style={{ color: "black" }}>{ data.title + data.id }</Text>
      <View style={styles.scrollContainer}>
        <ScrollView
          horizontal={true}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX
                }
              }
            }
          ])}
          scrollEventThrottle={1}
        >
          {images.map((image, imageIndex) => {
            return (
              <View
                style={{ width: windowWidth/2}}
                key={imageIndex}
              >
                  <ImageBackground source={{ uri: image }} style={styles.card}>
                      <TouchableOpacity onPress={() => navigation.navigate("Event",/* {idEvent: imageIndex}, */ {event : data.event[imageIndex] })}>
                        <View style={styles.textContainer}>
                          {/* <Text style={styles.infoText}>
                            {"Image - " + imageIndex}
                          </Text> */}
                          {/* <Button style={styles.button} title="Event" onPress={() => navigation.navigate("Event",{idEvent: imageIndex})} /> */}
                        </View>
                      </TouchableOpacity>
                  </ImageBackground>
              </View>
            );
          })}
        </ScrollView>
      </View>
      {/* <View
        style={{
          height: 300,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>City Screen</Text>
        <Button title="City" onPress={() => navigation.navigate("City")} />
        <Text>Home screen</Text>
        <Button title="Details" onPress={() => navigation.navigate("Details")} />
      </View> */}
      <Text>Category 2</Text>
      <View style={styles.scrollContainer}>
        <ScrollView
          horizontal={true}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX
                }
              }
            }
          ])}
          scrollEventThrottle={1}
        >
          {images.map((image, imageIndex) => {
            return (
              <View
                style={{ width: windowWidth/2}}
                key={imageIndex}
              >
                  <ImageBackground source={{ uri: image }} style={styles.card} onPress={() => navigation.navigate("Event",{idEvent: imageIndex})}>
                      <TouchableOpacity onPress={() => navigation.navigate("Event",{idEvent: imageIndex})}>
                        <View style={styles.textContainer}>
                          {/* <Text style={styles.infoText}>
                            {"Image - " + imageIndex}
                          </Text> */}
                          {/* <Button style={styles.button} title="Event" onPress={() => navigation.navigate("Event",{idEvent: imageIndex})} /> */}
                        </View>
                      </TouchableOpacity>
                  </ImageBackground>
              </View>
            );
          })}
        </ScrollView>
      </View>
      <Text>Category 3</Text>
      <View style={styles.scrollContainer}>
        <ScrollView
          horizontal={true}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX
                }
              }
            }
          ])}
          scrollEventThrottle={1}
        >
          {images.map((image, imageIndex) => {
            return (
              <View
                style={{ width: windowWidth/2}}
                key={imageIndex}
              >
                  <ImageBackground source={{ uri: image }} style={styles.card} onPress={() => navigation.navigate("Event",{idEvent: imageIndex})}>
                      <TouchableOpacity onPress={() => navigation.navigate("Event",{idEvent: imageIndex})}>
                        <View style={styles.textContainer}>
                          {/* <Text style={styles.infoText}>
                            {"Image - " + imageIndex}
                          </Text> */}
                          {/* <Button style={styles.button} title="Event" onPress={() => navigation.navigate("Event",{idEvent: imageIndex})} /> */}
                        </View>
                      </TouchableOpacity>
                  </ImageBackground>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );

  
  /* return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
      }}
    >
      <Text>City Screen</Text>
      <Button title="City" onPress={() => navigation.navigate("City")} />
      <Text>Home screen</Text>
      <Button title="Details" onPress={() => navigation.navigate("Details")} />
      <Button title="Event" onPress={() => navigation.navigate("Event",{
        idEvent: "1"
      }
      )} />
    </View>
  ); */
};
