import * as React from "react";
import { View, Text, Button } from "react-native";
import { AuthContext } from "../context/context.js";
import { useContext, useState } from "react";
import * as SecureStore from "expo-secure-store";

export default DetailsScreen = ({ navigation }) => {
  const { isExpiredToken, refreshToken } = useContext(AuthContext);
  const [token, setToken] = useState([]);
  const [tokenRefresh, setTokenRefresh] = useState([]);

  async function getValueForRefreshToken() {
    let result = await SecureStore.getItemAsync("userRefreshToken");
    if (result) {
      setTokenRefresh(result);
    }
  }

  async function getValueForToken() {
    let result = await SecureStore.getItemAsync("userToken");
    if (result) {
      setToken(result);
    }
  }
  getValueForRefreshToken();
  getValueForToken();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <Text >Favoris screen</Text>
      <Button title="is expired token?" onPress={() => isExpiredToken(token)} />
      <Button title="refresh token" onPress={() => refreshToken(tokenRefresh)} />
      <Text >{token}</Text>
      <Text >{tokenRefresh}</Text>
    </View>
  );
};
