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

export default ChangeMdpScreen = ({ route }) => {
  const { userId, userEmail } = route.params;
  const [password, onChangePassword] = React.useState("");
  const [newPassword, onChangeNewPassword] = React.useState("");

  const changeMdp = () => {
    if (password == "" || newPassword == "") {
      alert("Veuillez remplir tous les champs");

      return;
    }
    const dataPassword = {
      username: userEmail,
      password: password,
    };
    let isGoodPassword = fetch(
      "https://netevent-api.herokuapp.com/api/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataPassword),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.token == null) {
          alert("Vous n'avez pas rentrer le bon mot de passe");
          return false;
        }
        return true;
      });
      modifyPassword();
      
    async function modifyPassword() {
      if ((await isGoodPassword) != true) {
        return;
      }
      const dataNewPassword = {
        password: newPassword,
      };
      console.log(typeof newPassword)
      fetch(
        "https://netevent-api.herokuapp.com/api/users/" + userId,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/merge-patch+json",
            "accept": "application/json"
          },
          body: JSON.stringify(dataNewPassword),
        }
      )
        .then((data) => {
          onChangePassword("");
          onChangeNewPassword("")
          alert("Mot de passe modifié avec success")
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
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
          onChangeText={onChangePassword}
          value={password}
          placeholder="your password"
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeNewPassword}
          value={newPassword}
          placeholder="new password"
          secureTextEntry
        />
        <Button title="changer mot de passe" onPress={changeMdp} />
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
