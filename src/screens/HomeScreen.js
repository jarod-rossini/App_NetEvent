import React, { useRef } from "react";
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
import { Title } from "react-native-paper";

export default HomeScreen = () => {
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

  const scrollX = useRef(new Animated.Value(0)).current;

  const { width: windowWidth } = useWindowDimensions();
  return (
    <SafeAreaView style={styles.container}>
      <Text>Category 1</Text>
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
