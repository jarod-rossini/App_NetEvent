import * as React from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  SafeAreaView,
  StyleSheet,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/context.js";
import { useContext, useState } from "react";
import { Foundation } from "@expo/vector-icons";

export default ConnectionScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { signIn } = useContext(AuthContext);
  return (
    <View style={styles.view}>
      <View style={styles.viewKey}>
        <Foundation name="key" size={50} color="white" />
      </View>
      <View style={styles.viewForm}>
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
        <Pressable
          style={styles.buttonConnexion}
          onPress={() => signIn({ username, password })}
        >
          <Text style={styles.textConnexion}>CONNEXION</Text>
        </Pressable>
      </View>
      <View styles={styles.viewInscription}>
        <Pressable
          style={styles.buttonInscription}
          onPress={() => navigation.navigate("Inscription")}
        >
          <Text style={styles.textInscription}>INSCRIPTION</Text>
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
  viewKey: {
    alignItems: "center",
    justifyContent: "center",
    height: "30%",
  },
  viewForm: {
    alignItems: "center",
    justifyContent: "flex-start",
    height: "55%",
  },
  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "white",
  },
  textInscription: {
    color: "white",
  },
  textConnexion: {
    color: "red",
  },
  buttonInscription: {
    width: "40%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 15,
    elevation: 3,
    backgroundColor: "red",
  },
  buttonConnexion: {
    width: "40%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 15,
    elevation: 3,
    backgroundColor: "white",
  },
});
