import React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { ResponseType } from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import firebase from 'firebase';
import { Alert, Button,StyleSheet, TouchableOpacity,Image,Text } from 'react-native';
import * as AppAuth from 'expo-app-auth';
import { initializeApp } from 'firebase/app';

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

WebBrowser.maybeCompleteAuthSession('https://auth.expo.io/@vishalmisra/LoginApp');

export default function App() {

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
      {
      clientId: '513477020718-9l7r57nku76f7rm16fmbd4st590304ff.apps.googleusercontent.com',
      androidClientId:'513477020718-tu1opfdkav42q6l0adatnavd9eqbsqd5.apps.googleusercontent.com',
      // redirectUrl: `${AppAuth.OAuthRedirect}:/oauthredirect`,
      },
  );

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = firebase.auth.GoogleAuthProvider.credential(id_token);
      firebase.auth().signInWithCredential(credential);
    }
  }, 
  [response]
  );

  return (
   <>
    <TouchableOpacity
        style={{backgroundColor:'orange',alignItems:'center',marginHorizontal:35,borderRadius:30,padding:17,width:320,height:55}}
        disabled={!request}
        onPress={() => {
          promptAsync();
        }}
      >
        
        <Text style={{color:'#FFF9FF',fontWeight:'bold',fontSize:18,textAlign:'center'}}>REGISTER WITH GOOGLE</Text>
        <Image 
        style={{justifyContent:'center',right:120,bottom:16,width:18,height:18}}
        source={require('../../assets/gmail.png')} />
      </TouchableOpacity>
      </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


// redirectUri: makeRedirectUri({
//   scheme: 'com.vishalmisra.LoginApp'
//   }),
