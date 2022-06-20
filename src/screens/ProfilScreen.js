import * as React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Image,
  Pressable,
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
      setEmail(result);
    }
  }

  async function getValueForId() {
    let result = await SecureStore.getItemAsync("idUser");
    if (result) {
      setId(result);
    }
  }

  getValueForEmail();
  getValueForId();

  return (
    <View style={styles.view}>
      <View style={styles.viewImage}>
        <Image
          source={{
            uri: "https://img2.freepng.fr/20180802/xaw/kisspng-clip-art-portable-network-graphics-computer-icons-user-staff-person-man-profile-boss-circle-svg-png-5b62ed560cb369.529707841533209942052.jpg",
          }}
          style={styles.image}
        />
        <Text style={styles.text}>{email}</Text>
      </View>
      <View style={styles.viewButtonModify}>
        <Pressable
          style={styles.buttonModify}
          onPress={() =>
            navigation.navigate("ChangeMdp", {
              userId: id,
              userEmail: email,
            })
          }
        >
          <Text style={styles.textButtonModify}>CHANGER DE MOT DE PASSE</Text>
        </Pressable>
      </View>
      <View style={styles.viewButtonDisconnect}>
        <Pressable style={styles.buttonDisconnect} onPress={() => signOut()}>
          <Text style={styles.textButtonDisconnect}>DISCONNECT</Text>
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
  viewImage: {
    alignItems: "center",
    justifyContent: "flex-end",
    height: "40%",
  },
  viewButtonModify: {
    alignItems: "center",
    justifyContent: "center",
    height: "30%",
  },
  viewButtonDisconnect: {
    alignItems: "flex-end",
    justifyContent: "center",
    height: "30%",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    marginBottom: 30,
  },
  text: {
    color: "white",
  },
  buttonModify: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 15,
    elevation: 3,
    backgroundColor: "white",
    width: 200,
  },
  buttonDisconnect: {
    alignItems: "center",
    width: 200,
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 15,
    elevation: 3,
    backgroundColor: "red",
  },
  textButtonModify: {
    fontSize: 12,
    letterSpacing: 0.25,
    color: "black",
  },
  textButtonDisconnect: {
    fontSize: 12,
    letterSpacing: 0.25,
    color: "white",
  },
});
