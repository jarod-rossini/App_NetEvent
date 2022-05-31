import * as React from "react";
import { View, Text, Button, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from '../context/context.js';
import { useContext, useState } from "react";

export default ConnectionScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { signIn }  = useContext(AuthContext);
    return (
        <View>
            <TextInput
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Sign in" onPress={() => signIn({ username, password })} />
        </View>
    );
};
