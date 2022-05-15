import * as React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Image
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default ProfilScreen = ({ dispatch }) => {
  const navigation = useNavigation();

  const [token, setToken] = React.useState([]);
  const [me, setMe] = React.useState([]);
  const [text, onChangeText] = React.useState("Useless Text");
  const [number, onChangeNumber] = React.useState(null);

  //Obj of data to send in future like a dummyDb
  const data = {
    username: "emmanuel@hotmail.fr",
    password: "0000",
  };

  //POST request with body equal on data in JSON format
  const requete = () => {
    fetch("https://jeremy-dejoux.students-laplateforme.io/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      //Then with the data from the response in JSON...
      .then((data) => {
        setToken(data);
      })
      //Then with the error genereted...
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  React.useEffect(() => {
    requete();
  }, []);

  if (token != "undefined") {
    const requeteMe = () => {
      fetch("https://jeremy-dejoux.students-laplateforme.io/api/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.token}`,
        },
      })
        .then((response) => response.json())
        //Then with the data from the response in JSON...
        .then((data) => {
          setMe(data);
        })
        //Then with the error genereted...
        .catch((error) => {
          console.error("Error:", error);
        });
    };
    requeteMe();
  }
  return (
    <View
      style={styles.view}
    >
      <Image
        source={{
          uri: "https://img2.freepng.fr/20180802/xaw/kisspng-clip-art-portable-network-graphics-computer-icons-user-staff-person-man-profile-boss-circle-svg-png-5b62ed560cb369.529707841533209942052.jpg",
        }}
        style={styles.image}
      />
      <Text
        style={styles.text}
      >{me.email}</Text>
      <Button
        title="changer de mot de passe"
        onPress={() =>
          navigation.navigate("ChangeMdp", {
            userId: me.id,
            userEmail: me.email,
          })
        }
      />

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
  image:{
      width: 100,
      height: 100,
      borderRadius: 100/2,
      marginBottom: 30
  },
  text: {
    marginBottom: 15
  }

})
