import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";

import { View, Text } from "react-native";

import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDuwXgZGhUT3trfO00TMr6egGxw3J3LJeo",
  authDomain: "instagram-demo-8d3dd.firebaseapp.com",
  projectId: "instagram-demo-8d3dd",
  storageBucket: "instagram-demo-8d3dd.appspot.com",
  messagingSenderId: "420047934079",
  appId: "1:420047934079:web:e95b3b49b344d110e8654a",
  measurementId: "G-C10YW3Q9W5"
};
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}
import { NavigationContainer } from "@react-navigation/native";
import LandingScreen from "./components/auth/Landing";
import RegisterScreen from "./components/auth/Register";
import LoginScreen from './components/auth/Login'

import { createStackNavigator } from "@react-navigation/stack";
import { TextInput } from "react-native-gesture-handler";
const Stack = createStackNavigator();




export class App extends Component {
  constructor(props) {
    super()
    this.state = {
      loaded: false,
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          loggedIn: false,
          loaded: true,
        })
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
        })
      }
    })
  }
  render() {
    const { loggedIn, loaded } = this.state;
    if (!loaded) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text>Loading</Text>
        </View>
      )
    }

    if (!loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
    return(
      <View style={{ flex: 1, justifyContent: 'center' }}> 
        <Text>User is Loggedin</Text>
      </View>
    )
  }
}

export default App


