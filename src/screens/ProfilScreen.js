import * as React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/context.js";
import { useContext, useState } from "react";
import * as SecureStore from "expo-secure-store";

export default ProfilScreen = () => {
  const navigation = useNavigation();

  const { signOut } = useContext(AuthContext);
  const [id, setId] = useState([]);
  const [email, setEmail] = useState([]);

  async function getValueForEmail() {
    let result = await SecureStore.getItemAsync("emailUser");
    if (result) {
      setEmail(result)
    }
  }

  async function getValueForId() {
    let result = await SecureStore.getItemAsync("idUser");
    if (result) {
      setId(result)
    }
  }

  getValueForEmail()
  getValueForId()
  

  return (
    <View style={styles.view}>
      <Image
        source={{
          uri: "https://img2.freepng.fr/20180802/xaw/kisspng-clip-art-portable-network-graphics-computer-icons-user-staff-person-man-profile-boss-circle-svg-png-5b62ed560cb369.529707841533209942052.jpg",
        }}
        style={styles.image}
      />
      <Text style={styles.text}>{email}</Text>
      <Button
        title="changer de mot de passe"
        onPress={() =>
          navigation.navigate("ChangeMdp", {
            userId: id, 
            userEmail: email,
          })
        }
      />
      <Button title="Disconnect" onPress={() => signOut()} />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    marginBottom: 30,
  },
  text: {
    marginBottom: 15,
  },
});
