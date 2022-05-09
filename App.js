import * as React from 'react';
import * as SecureStore from 'expo-secure-store';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import axios from 'axios';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'


const AuthContext = React.createContext();
const Stack = createNativeStackNavigator();

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
        // Fetch the token from storage then navigate to our appropriate place
        const bootstrapAsync = async () => {
            let userToken;

            try {
                userToken = await SecureStore.getItemAsync('userToken');
                console.log(userToken)
            } catch (e) {
                console.log("Erreur dans la recuperation du token")
            }



            // After restoring token, we may need to validate it in production apps

            // This will switch to the App screen or Auth screen and this loading
            // screen will be unmounted and thrown away.
            dispatch({ type: 'RESTORE_TOKEN', token: userToken });
        };

        bootstrapAsync();
    }, []);

    const authContext = React.useMemo(
        () => ({
            signIn: async (data) => {
                // In a production app, we need to send some data (usually username, password) to server and get a token
                // We will also need to handle errors if sign in failed
                // After getting token, we need to persist the token using `SecureStore`
                // In the example, we'll use a dummy token

                const getToken = async () => {
                    try {
                        const response = await axios.post("https://jeremy-dejoux.students-laplateforme.io/api/login", {
                                username: "emmanuel@hotmail.fr",
                                password: "0000",
                            }, {
                                headers: {
                                    'content-type': 'application/json'
                                }
                            }
                        )
                        const data = await response.data
                        return data
                    } catch (error) {
                        console.log("Erreur dans getToken")
                    }
                }  
                
                async function save(key, value) {
                    await SecureStore.setItemAsync(key, value);
                }

                getToken().then(data => {
                    token = data.token
                    tokenStringified = JSON.stringify(token)
                    save('userToken', tokenStringified)
                    dispatch({ type: 'SIGN_IN', token: tokenStringified });
                })
            },
            signOut: () => dispatch({ type: 'SIGN_OUT' }),
            signUp: async (data) => {
                // In a production app, we need to send user data to server and get a token
                // We will also need to handle errors if sign up failed
                // After getting token, we need to persist the token using `SecureStore`
                // In the example, we'll use a dummy token

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
                        <Stack.Screen name="SignIn" component={SignInScreen} />
                        ) : (
                            <Stack.Screen name="Home" component={HomeScreen} />
                        )}
                </Stack.Navigator>
            </NavigationContainer>
        </AuthContext.Provider>
    );
}