import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Image } from 'react-native';


import * as firebase from 'firebase';
import * as Facebook from 'expo-facebook';

// Your web app's Firebase configuration

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
// Initialize Firebase
if (!firebase.apps.length)
  firebase.initializeApp(firebaseConfig);

// Listen for authentication state to change.
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log("Logged in with user: ", user);
  } else {
    console.log('Not logged in')
  }
});

export default function App({navigation}) {
  // TODO: Implementation
  const handleAuth = async () => {
    try {
      await Facebook.initializeAsync('988070555215597'); // enter your Facebook App Id 
      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', 'email'],
      });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const credential = firebase.auth.FacebookAuthProvider.credential(token);
        firebase.auth().signInWithCredential(credential)
          .then(user => {
            console.log('Logged in successfully', user)
            navigation.navigate('Home');
          })
          .catch((error) => {
            console.log('Error occurred ', error)
          });
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleAuth} >
        <Image style={{height: 20, width: 220}}
          source={require('../../assets/fb.png')}/>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});