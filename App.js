import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "./src/Screens/Login"
import Home from "./src/Screens/Home"
import SignUpScreen from "./src/Screens/SignUp"
import Location from './src/Screens/Location'
import Users from './src/components/Users'
import firebase from 'firebase/app';
import FacebookScreen from './src/components/FacebookScreen';
import Second from './src/Screens/Second';
import { LogBox } from 'react-native';
import Signin from './src/Screens/Signin'

const Stack = createNativeStackNavigator();

function App() {


  LogBox.ignoreLogs(['Warning: Async Storage has been extracted from react-native core']);

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const firebaseConfig = {
    apiKey: "AIzaSyCflhxjfW0Kf1NG-T51i2LzJd7SSC47BaI",
    authDomain: "projectexpo-fce16.firebaseapp.com",
    databaseURL: "https://projectexpo-fce16-default-rtdb.firebaseio.com",
    projectId: "projectexpo-fce16",
    storageBucket: "projectexpo-fce16.appspot.com",
    messagingSenderId: "513477020718",
    appId: "1:513477020718:web:bee1c1ad733e7b9dbb23bf",
    measurementId: "G-QR3TBQN02D"
  };

  //Checking if firebase has been initialized
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app();
  }

  firebase.auth().onAuthStateChanged((user) => {
    if (user != null) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false);
    }
  });

  return (
    <NavigationContainer>
      {isLoggedIn ? <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Location" component={Location} options={{ headerShown: false }} />
        <Stack.Screen name="Users" component={Users} options={{ headerShown: false }} />
        <Stack.Screen name="Second" component={Second} options={{ headerShown: false }} />
        </Stack.Navigator> :
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
          <Stack.Screen name="faceBookScreen" component={FacebookScreen} options={{ headerShown: false }} />
          {/* <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} /> */}
          <Stack.Screen name="Signin" component={Signin} options={{ headerShown: false }} />
        </Stack.Navigator>}
    </NavigationContainer>
  );
}

export default App;