import * as SecureStore from 'expo-secure-store';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import axios from 'axios';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import DetailScreen from './src/screens/DetailScreen';
import { AuthContext } from './src/context/context';
import React, { useContext, useState } from "react";

const Stack = createNativeStackNavigator();

function HomeScreen() {

    const { signOut } = useContext(AuthContext);

    return (
        <View>
            <Text>HomeScreen</Text>
            <Button
                title="Disconnect"
                onPress={() => signOut()}
            />
        </View>
    );
}


function SignInScreen() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const { signIn } = React.useContext(AuthContext);

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
}

export default function App({ navigation }) {
    const [state, dispatch] = React.useReducer(
        (prevState, action) => {
            switch (action.type) {
                case 'RESTORE_TOKEN':
                    return {
                        ...prevState,
                        userToken: action.token,
                        isLoading: false,
                    };
                case 'SIGN_IN':
                    return {
                        ...prevState,
                        isSignout: false,
                        userToken: action.token,
                    };
                case 'SIGN_OUT':
                    return {
                        ...prevState,
                        isSignout: true,
                        userToken: null,
                    };
            }
        },
        {
            isLoading: true,
            isSignout: false,
            userToken: null,
        }
    );

    React.useEffect(() => {
        const bootstrapAsync = async () => {
            let userToken;
            console.log(userToken);

            try {
                userToken = await SecureStore.getItemAsync('userToken');
                console.log(userToken);
            } catch (e) {
                console.log("Erreur dans la recuperation du token")
            }

            dispatch({ type: 'RESTORE_TOKEN', token: userToken });
        };

        bootstrapAsync();
    }, []);

    const authContext = React.useMemo(
        () => ({
            signIn: async (data) => {
                async function save(key, value) {
                    await SecureStore.setItemAsync(key, value);
                }

                try {
                    const response = await axios.post("https://jeremy-dejoux.students-laplateforme.io/api/login", {
                        username: data.username,
                        password: data.password,
                    }, {
                        headers: {
                            'content-type': 'application/json'
                        }
                    }
                    )
                    const data = await response.data
                    return data
                        .then(data => {
                            token = data.token
                            tokenStringified = JSON.stringify(token)
                            save('userToken', tokenStringified)
                            dispatch({ type: 'SIGN_IN', token: tokenStringified });
                        })
                } catch (error) {
                    console.log("Erreur dans getToken")
                }

            },
            signOut: () => {
                SecureStore.deleteItemAsync("userToken");
                dispatch({ type: 'SIGN_OUT' });
            },
            signUp: async (data) => {

                dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
            },
        }),
        []
    );

    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
                <Stack.Navigator>
                    {state.userToken == null ? (
                        // Screens for logged in users
                        <Stack.Group>
                            <Stack.Screen name="SignIn" component={SignInScreen} />
                        </Stack.Group>
                    ) : (
                        <Stack.Group>
                            <Stack.Screen name="Home" component={HomeScreen} />
                            <Stack.Screen name="Detail" component={DetailScreen} />
                        </Stack.Group>
                    )}
                </Stack.Navigator>
            </NavigationContainer>
        </AuthContext.Provider>
    );
}