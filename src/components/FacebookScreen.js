import React from "react";
import * as WebBrowser from "expo-web-browser";
import { ResponseType } from "expo-auth-session";
import * as Facebook from "expo-auth-session/providers/facebook";
import firebase from "firebase";
import {
  Alert,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View
} from "react-native";
import * as AppAuth from "expo-app-auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCflhxjfW0Kf1NG-T51i2LzJd7SSC47BaI",
  authDomain: "projectexpo-fce16.firebaseapp.com",
  databaseURL: "https://projectexpo-fce16-default-rtdb.firebaseio.com",
  projectId: "projectexpo-fce16",
  storageBucket: "projectexpo-fce16.appspot.com",
  messagingSenderId: "513477020718",
  appId: "1:513477020718:web:bee1c1ad733e7b9dbb23bf",
  measurementId: "G-QR3TBQN02D",
};
// Initialize Firebase
if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const [request, response, promptAsync] = Facebook.useAuthRequest({
    responseType: ResponseType.Token,
    clientId: "988070555215597",
  });

  React.useEffect(() => {
    if (response?.type === "success") {
      const { access_token } = response.params;

      // const auth = getAuth();
      // const provider = new FacebookAuthProvider();
      const credential =
        firebase.auth.FacebookAuthProvider.credential(access_token);
      // Sign in with the credential from the Facebook user.
      firebase.auth().signInWithCredential(credential);
    }
  }, [response]);

  const colorpicker = "#2E4DA7";

  return (
    <View style={{justifyContent:'center'}}>
      <TouchableOpacity
        style={{backgroundColor:colorpicker,alignItems:'center',marginHorizontal:35,borderRadius:30,padding:17,width:320,height:55}}
        disabled={!request}
        onPress={() => {
          promptAsync();
        }}
      >
        <Text style={{color:'#FFF9FF',fontWeight:'bold',fontSize:18,textAlign:'center'}}>    CONTINUE WITH FACEBOOK</Text>
        <Image 
        style={{justifyContent:'center',right:121,bottom:18,width:20,height:20}}
        source={require('../../assets/fb.png')} />
      </TouchableOpacity>
      </View>
  );
}

// import React from 'react';
// import { StyleSheet, Text, View, TouchableOpacity,Image,Button } from 'react-native';
// import * as firebase from 'firebase';
// import * as Facebook from 'expo-facebook';
// import { LogBox } from 'react-native';

// // Your web app's Firebase configuration

//   const firebaseConfig = {
//     apiKey: "AIzaSyCflhxjfW0Kf1NG-T51i2LzJd7SSC47BaI",
//     authDomain: "projectexpo-fce16.firebaseapp.com",
//     databaseURL: "https://projectexpo-fce16-default-rtdb.firebaseio.com",
//     projectId: "projectexpo-fce16",
//     storageBucket: "projectexpo-fce16.appspot.com",
//     messagingSenderId: "513477020718",
//     appId: "1:513477020718:web:bee1c1ad733e7b9dbb23bf",
//     measurementId: "G-QR3TBQN02D"
//   };
// // Initialize Firebase
// if (!firebase.apps.length)
//   firebase.initializeApp(firebaseConfig);

// // Listen for authentication state to change.
// firebase.auth().onAuthStateChanged((user) => {
//   if (user) {
//     // console.log("Logged in with user: ", user);
//   } else {
//     // console.log('Not logged in')
//   }
// });

// export default function FacebookScreen() {
//   LogBox.ignoreLogs(['Warning: Async Storage has been extracted from react-native core']);
//   // TODO: Implementation
//   const handleAuth = async () => {
//     try {
//       await Facebook.initializeAsync('988070555215597'); // enter your Facebook App Id
//       const { type, token } = await Facebook.logInWithReadPermissionsAsync({
//         permissions: ['public_profile', 'email'],
//       });
//       if (type === 'success') {
//         // Get the user's name using Facebook's Graph API
//         const credential = firebase.auth.FacebookAuthProvider.credential(token);
//         firebase.auth().signInWithCredential(credential)
//           .then(user => {
//             // console.log('Logged in successfully', user)
//             // navigation.navigate('Home')
//           })

//           .catch((error) => {
//             console.log('Error occurred ', error)
//           });
//       } else {
//         // type === 'cancel'
//       }
//     } catch ({ message }) {
//       alert(`Facebook Login Error: ${message}`);
//     }
//   }
//   const colorpicker = '#2E4DA7';

//   return (
//     // <View style={styles.container}>
//     //   <TouchableOpacity onPress={()=>()} >
//     //     <Image style={{height: 20, width: 220}}
//     //       source={require('../../assets/fb.png')}/>
//     //   </TouchableOpacity>
//     // </View>
//       <Button

//       color={colorpicker}
//       title=" SIGN-UP WITH FACEBOOK"
//       onPress={() => {
//         handleAuth();
//         }}
//     />
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
