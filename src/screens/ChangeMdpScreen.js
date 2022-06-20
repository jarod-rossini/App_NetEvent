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
import { MaterialCommunityIcons } from '@expo/vector-icons';

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
    <View style={styles.view} >
      <View style={styles.viewIcon}>
        <MaterialCommunityIcons name="form-textbox-password" size={50} color="red" />
      </View>
      <View style={styles.viewForm}>
      <Text>Formulaire pour changer de mot de passe</Text>
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
        <Pressable style={styles.buttonChangeMdp} onPress={changeMdp} >
          <Text style={styles.text}>Change mot de passe</Text>
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
    flex:1,
    width: "100%",
    backgroundColor: "white",
    margin: 12,
    padding: 10,
  },
  buttonChangeMdp: {
    width: 200,
    marginTop: 15,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 15,
    elevation: 3,
    backgroundColor: "red",
  },
  input: {
    backgroundColor: "white",
    height: 40,
    margin: 12,
    width: 200,
    borderWidth: 1,
    padding: 10,
    textAlign: "center",
  },
  text: {
    color: "white",

  },
});
