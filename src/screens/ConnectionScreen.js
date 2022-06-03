import * as React from "react";
import { View, Text, Button, TextInput, SafeAreaView, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/context.js";
import { useContext, useState } from "react";


export default ConnectionScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { signIn } = useContext(AuthContext);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <SafeAreaView>
        <TextInput
        style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
        style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button
          style={styles.submit}
          title="Sign in"
          onPress={() => signIn({ username, password })}
        />
        <Button
          style={styles.submit}
          title="Inscription"
          onPress={() =>
            navigation.navigate("Inscription")
          }
        />
      </SafeAreaView>
    </View>
  );
};
const styles = StyleSheet.create({
  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  submit: {
    width: 150,
    marginBottom: 100,
    backgroundColor: 'red',
  },
});
