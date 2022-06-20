import * as React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  SafeAreaView,
  Pressable,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/context.js";
import { useContext, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";

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
      roles: [],
      password: password,
    };

    let createUser = fetch("https://netevent-api.herokuapp.com/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(inputValue),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.email == null) {
          alert("Cette email existe déjà");
          return false;
        }
        signIn({ username, password });
      });
  };
  return (
    <View style={styles.view}>
      <View style={styles.viewIcon}>
        <MaterialIcons name="app-registration" size={50} color="red" />
      </View>
      <View style={styles.viewForm}>
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
        <Pressable style={styles.buttonConnexion} onPress={inscription}>
          <Text style={styles.text}>INSCRIPTION</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "black",
  },
  viewIcon: {
    justifyContent: "center",
    height: "30%",
  },
  viewForm: {
    alignItems: "center",
    justifyContent: "center",
    height: "40%",
  },
  input: {
    height: 40,
    width: 200,
    backgroundColor: "white",
    margin: 12,
    borderWidth: 1,
    padding: 10,
    textAlign: "center",
  },
  buttonConnexion: {
    width: 200,
    marginTop: 15,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 15,
    elevation: 3,
    backgroundColor: "red",
  },
  text: {
    color: "white",
  },
});
