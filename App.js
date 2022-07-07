import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "./screens/src/Login"
import HomeScreen from "./screens/src/Home"
import SignUpScreen from "./screens/src/SignUp"
import Location from './screens/src/Location'
import Users from './screens/components/Users'
import firebase from 'firebase/app';
import "firebase/auth";
import faceBookScreen from './screens/components/Facebooks';

const Stack = createNativeStackNavigator();

function App() {

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
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Location" component={Location} options={{ headerShown: false }} />
        <Stack.Screen name="Users" component={Users} options={{ headerShown: false }} />
      </Stack.Navigator> :
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Sign Up" component={SignUpScreen} options={{ headerShown: false }} />
          <Stack.Screen name="faceBookScreen" component={faceBookScreen} options={{ headerShown: false }} />
        </Stack.Navigator>}
    </NavigationContainer>
  );
}

export default App;
