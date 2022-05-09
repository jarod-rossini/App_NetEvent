import * as React from 'react';

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

export const AuthContext = React.createContext(authContext);