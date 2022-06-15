import * as React from "react";
import { View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default HomeScreen = () => {
  const navigation = useNavigation();
  return (
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
  );
};
