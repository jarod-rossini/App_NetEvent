import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfilScreen from "./src/screens/ProfilScreen";
import CreateEventScreen from "./src/screens/CreateEventScreen";
import SearchScreen from "./src/screens/SearchScreen";
import ConnectionScreen from "./src/screens/ConnectionScreen";
import FavorisScreen from "./src/screens/FavorisScreen";
import HomeScreen from "./src/screens/HomeScreen";
import DetailsScreen from "./src/details/DetailsScreen";
import ChangeMdpScreen from "./src/screens/ChangeMdpScreen";
import ChangeCityScreen from "./src/screens/ChangeCityScreen";
import { AuthContext } from "./src/context/context";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import {
  MaterialCommunityIcons,
  AntDesign,
  Ionicons,
} from "@expo/vector-icons";

const HomeStack = createNativeStackNavigator();

function HomeStackScreen(dispatch) {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "NetEvent",
          headerStyle: { backgroundColor: "black" },
          headerTitleStyle: {
            fontSize: 25,
            color: "red",
          },
        }}
      ></HomeStack.Screen>
      <HomeStack.Screen
        name="City"
        component={ChangeCityScreen}
        options={{
          headerStyle: { backgroundColor: "black" },
          headerTitleStyle: {
            color: "white",
          },
          headerTintColor: "#fff",
        }}
      />
      <HomeStack.Screen
        name="Details"
        component={DetailsScreen}
        options={{
          headerStyle: { backgroundColor: "black" },
          headerTitleStyle: {
            color: "white",
          },
          headerTintColor: "#fff",
        }}
      />
    </HomeStack.Navigator>
  );
}

const SearchStack = createNativeStackNavigator();

function SearchStackScreen() {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerStyle: { backgroundColor: "black" },
          headerTitleStyle: {
            color: "white",
          },
        }}
      />
      <SearchStack.Screen
        name="Details"
        component={DetailsScreen}
        options={{
          headerStyle: { backgroundColor: "black" },
          headerTitleStyle: {
            color: "white",
          },
          headerTintColor: "#fff",
        }}
      />
    </SearchStack.Navigator>
  );
}

const CreateEventStack = createNativeStackNavigator();
function CreateEventStackScreen(dispatch) {
  return (
    <CreateEventStack.Navigator>
      <CreateEventStack.Screen
        name="Create Event"
        children={() => <CreateEventScreen dispatch={dispatch} />}
        options={{
          headerStyle: { backgroundColor: "black" },
          headerTitleStyle: {
            color: "white",
          },
        }}
      />
      <CreateEventStack.Screen
        name="Details"
        component={DetailsScreen}
        options={{
          headerStyle: { backgroundColor: "black" },
          headerTitleStyle: {
            color: "white",
          },
          headerTintColor: "#fff",
        }}
      />
    </CreateEventStack.Navigator>
  );
}

const FavorisStack = createNativeStackNavigator();
function FavorisStackScreen(dispatch) {
  return (
    <FavorisStack.Navigator>
      <FavorisStack.Screen
        name="Favoris"
        children={() => <FavorisScreen dispatch={dispatch} />}
        options={{
          headerStyle: { backgroundColor: "black" },
          headerTitleStyle: {
            color: "white",
          },
        }}
      />
      <FavorisStack.Screen
        name="Details"
        component={DetailsScreen}
        options={{
          headerStyle: { backgroundColor: "black" },
          headerTitleStyle: {
            color: "white",
          },
          headerTintColor: "#fff",
        }}
      />
    </FavorisStack.Navigator>
  );
}

const ProfilStack = createNativeStackNavigator();
function ProfilStackScreen(dispatch) {
  return (
    <ProfilStack.Navigator>
      <ProfilStack.Screen
        name="Profil"
        children={() => <ProfilScreen dispatch={dispatch} />}
        options={{
          headerStyle: { backgroundColor: "black" },
          headerTitleStyle: {
            color: "white",
          },
        }}
      />
      <ProfilStack.Screen
        name="ChangeMdp"
        component={ChangeMdpScreen}
        options={{
          headerStyle: { backgroundColor: "black" },
          headerTitleStyle: {
            color: "white",
          },
          headerTintColor: "#fff",
        }}
      />
    </ProfilStack.Navigator>
  );
}

const ConnectionStack = createNativeStackNavigator();
function ConnectionStackScreen(dispatch) {
  return (
    <ConnectionStack.Navigator>
      <ConnectionStack.Screen
        name="Connection"
        children={() => <ConnectionScreen dispatch={dispatch} />}
        options={{
          headerStyle: { backgroundColor: "black" },
          headerTitleStyle: {
            color: "white",
          },
        }}
      />
      <ConnectionStack.Screen
        name="Details"
        component={DetailsScreen}
        options={{
          headerStyle: { backgroundColor: "black" },
          headerTitleStyle: {
            color: "white",
          },
          headerTintColor: "#fff",
        }}
      />
    </ConnectionStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();


export default function App() {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case "SIGN_OUT":
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
      console.log("userToken1", userToken);

      try {
        userToken = await SecureStore.getItemAsync("userToken");
        console.log("userToken", userToken);
      } catch (e) {
        console.log("Erreur dans la recuperation du token");
      }

      dispatch({ type: "RESTORE_TOKEN", token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        async function save(key, value) {
          await SecureStore.setItemAsync(key, value);
        }
        const response = fetch(
          "https://jeremy-dejoux.students-laplateforme.io/api/login",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: data.username,
              password: data.password,
            }),
          }
        )
          .then((response) => response.json())
          .then((data) => {
            let token = data.token;

            let tokenStringified = JSON.stringify(token);
            save("userToken", tokenStringified);
            dispatch({ type: "SIGN_IN", token: tokenStringified });
          });
      },
      signOut: () => {
        SecureStore.deleteItemAsync("userToken");
        dispatch({ type: "SIGN_OUT" });
      },
      signUp: async (data) => {
        dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
      },
    }),
    []
  );

  const [isSignedIn, dispatche] = React.useState(false);

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarStyle: {
              backgroundColor: "black",
              paddingBottom: 0,
              borderTopWidth: 0,
            },
            tabBarShowLabel: false,
            tabBarActiveTintColor: "white",
            tabBarInactiveTintColor: "grey",
          })}
        >
          <Tab.Screen
            name="/Home"
            component={HomeStackScreen}
            options={{
              headerShown: false,
              tabBarLabel: "Home",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="home" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="/Search"
            component={SearchStackScreen}
            options={{
              headerShown: false,
              tabBarLabel: "Search",
              tabBarIcon: ({ color }) => (
                <Ionicons name="md-search-outline" size={24} color={color} />
              ),
            }}
          />
          { state.userToken != null ? (
            <Tab.Screen
              name="/CreateEvent"
              component={CreateEventStackScreen}
              options={{
                headerShown: false,
                tabBarLabel: "Create Event",
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons
                    name="calendar-plus"
                    size={24}
                    color={color}
                  />
                ),
              }}
            />
          ) : (
            <Tab.Screen
              name="/Connection Create"
              children={() => <ConnectionStackScreen dispatch={dispatch} />}
              options={{
                headerShown: false,
                tabBarLabel: "Connection",
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons
                    name="calendar-plus"
                    size={24}
                    color={color}
                  />
                ),
              }}
            />
          )}

          {state.userToken != null ? (
            <Tab.Screen
              name="/Favoris"
              component={FavorisStackScreen}
              options={{
                headerShown: false,
                tabBarLabel: "Create Event",
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons
                    name="heart"
                    size={24}
                    color={color}
                  />
                ),
              }}
            />
          ) : (
            <Tab.Screen
              name="/Connection Favoris"
              children={() => <ConnectionStackScreen dispatch={dispatch} />}
              options={{
                headerShown: false,
                tabBarLabel: "Connection",
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons
                    name="heart"
                    size={24}
                    color={color}
                  />
                ),
              }}
            />
          )}

          {state.userToken != null ? (
            <Tab.Screen
              name="/Profil"
              children={() => <ProfilStackScreen dispatch={dispatch} />}
              options={{
                headerShown: false,
                tabBarLabel: "Profil",
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons
                    name="account"
                    size={25}
                    color={color}
                  />
                ),
              }}
            />
          ) : (
            <Tab.Screen
              name="/Connection Profil"
              children={() => <ConnectionStackScreen dispatch={dispatch} />}
              options={{
                headerShown: false,
                tabBarLabel: "Connection",
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons
                    name="account-alert"
                    size={25}
                    color={color}
                  />
                ),
              }}
            />
          )}
        </Tab.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
