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

export default InscriptionScreen = ({ navigation }) => {
  const [email, onChangeEmail] = React.useState("");
  const [password, onChangePassword] = React.useState("");

  const inscription = () => {
    if (email == "" || password == "") {
      alert("Veuillez remplir tous les champs");

      return;
    }

    const inputValue = {
      username: email,
      roles: [],
      password: password,
    };

    let createUser = fetch(
      "https://jeremy-dejoux.students-laplateforme.io/api/users",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputValue),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log('on passe')
        if (data.email == null) {
          alert("error lors de l'enregistrement");
          return false;
        }
        alert(data.email)
        
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
          onChangeText={onChangeEmail}
          value={email}
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
