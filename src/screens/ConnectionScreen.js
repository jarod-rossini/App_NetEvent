import * as React from "react";
import { View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default ConnectionScreen = ({ dispatch }) => {
  const navigation = useNavigation();
  console.log("connection", dispatch);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
      }}
    >
      <Text style={{ color: "white" }}>Connection screen </Text>
      <Button
        title="to Details"
        onPress={() => navigation.navigate("Details")}
      />
      <Button
        title="press to connect"
        onPress={() => dispatch.dispatch(true)}
      />
    </View>
  );
};
