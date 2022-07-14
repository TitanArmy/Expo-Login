import React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { ResponseType } from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import firebase from 'firebase';
import { Button,StyleSheet } from 'react-native';



const Config = {
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
if (!firebase.apps.length) {
  firebase.initializeApp(Config);
}

WebBrowser.maybeCompleteAuthSession();

export default function App() {

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
    {
      clientId: '513477020718-9l7r57nku76f7rm16fmbd4st590304ff.apps.googleusercontent.com',
      },
  );

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      
      const credential = firebase.auth.GoogleAuthProvider.credential(id_token);
      firebase.auth().signInWithCredential(credential);
    }
  }, [response]);

  return (

    <Button 
      disabled={(!request)}
      title=" SignIN With Google"
      onPress={() => {
        promptAsync();
        }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

