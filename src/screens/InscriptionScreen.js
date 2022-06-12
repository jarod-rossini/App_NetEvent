import * as React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  SafeAreaView,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/context.js";
import { useContext, useState } from "react";

export default InscriptionScreen = ({ navigation }) => {
  const [username, onChangeUsername] = useState("");
  const [password, onChangePassword] = useState("");

  const { signIn } = useContext(AuthContext);

  const inscription = () => {
    if (username == "" || password == "") {
      alert("Veuillez remplir tous les champs");

      return;
    }

    const inputValue = {
      email: username,
      roles: [

      ],
      password: password,
    };

    let createUser = fetch(
      "https://netevent-api.herokuapp.com/api/users",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Accept': 'application/json'
        },
        body: JSON.stringify(inputValue),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.email == null) {
          console.log(data);
          alert("Cette email existe déjà");
          return false;
        }
        signIn({username, password})
        
      });
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <Text>Formulaire pour changer de mot de passe</Text>
      <SafeAreaView>
        <TextInput
          style={styles.input}
          onChangeText={onChangeUsername}
          value={username}
          placeholder="your email"
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangePassword}
          value={password}
          placeholder="your password"
          secureTextEntry
        />
        <Button title="Inscription" onPress={inscription} />
      </SafeAreaView>
      <Text>{username}</Text>
      <Text>{password}</Text>
      
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
