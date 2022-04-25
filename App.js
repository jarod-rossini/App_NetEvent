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
import {
  MaterialCommunityIcons,
  AntDesign,
  Ionicons,
} from "@expo/vector-icons";

const HomeStack = createNativeStackNavigator();

function HomeStackScreen(dispatch) {
  console.log(dispatch)
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
function FavorisStackScreen( dispatch ) {
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
  const [isSignedIn, dispatch] = React.useState(false);
  console.log('1',dispatch)

  return (
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
        {isSignedIn ? (
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
            children={() => <ConnectionStackScreen dispatch={dispatch}  />}
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

        {isSignedIn ? (
          <Tab.Screen
            name="/Favoris"
            component={FavorisStackScreen}
            options={{
              headerShown: false,
              tabBarLabel: "Create Event",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="heart" size={24} color={color} />
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
                <MaterialCommunityIcons name="heart" size={24} color={color} />
              ),
            }}
          />
        )}

        {isSignedIn ? (
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
  );
}
