import * as React from "react";
import { View, Text, Button, StyleSheet, TextInput, SafeAreaView } from "react-native";

export default ChangeMdpScreen = ({ route }) => {
  const { userId, userEmail } = route.params;
  const [password, onChangePassword] = React.useState('');
  const [newPassword, onChangeNewPassword] = React.useState('');
  const [verifPassword, setVerifPassword] = React.useState('');

  const changeMdp = () => {
    if (password == '' || newPassword == '' ) {
      console.log('password or newpassword null')
      return null
    }
    console.log('on passe le remplissage')
    const dataPassword = {
      username: userEmail,
      password: password
    };

    
      fetch("https://jeremy-dejoux.students-laplateforme.io/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataPassword),
     })
      .then((response) => response.json())
      //Then with the data from the response in JSON...
      .then((data) => {
        console.log('token', data?.token)
        setVerifPassword(true)
      })
      //Then with the error genereted...
      .catch((error) => {
        console.log(" le mdp n'est pas bon")
      });

    
    if (verifPassword === true) {
      console.log('on passe le verif password')
      const dataNewPassword = {
        password: newPassword
      }
      console.log("https://jeremy-dejoux.students-laplateforme.io/api/users/" + userId)
      fetch("https://jeremy-dejoux.students-laplateforme.io/api/users/" + userId, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/merge-patch+json",
        },
        body: JSON.stringify(dataNewPassword),
      })
        .then((response) => response.json())
        //Then with the data from the response in JSON...
        .then((data) => {
          console.log(data)
        })
        //Then with the error genereted...
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }
  
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
        <Button 
          title="changer mot de passe"
          onPress={changeMdp}
        />
      </SafeAreaView>
      <Text>{newPassword}</Text>
      <Text>{password}</Text>
      <Text>{userId}</Text>
      <Text>{userEmail}</Text>
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
