
// import * as React from 'react';
// import * as WebBrowser from 'expo-web-browser';
// import { ResponseType } from 'expo-auth-session';
// import * as Google from 'expo-auth-session/providers/google';
// import { initializeApp } from 'firebase/app';
// import { getAuth, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
// import { Button } from 'react-native';
// import firebase from "firebase";

// // Initialize Firebase

// const Config = {
//   apiKey: "AIzaSyCflhxjfW0Kf1NG-T51i2LzJd7SSC47BaI",
//   authDomain: "projectexpo-fce16.firebaseapp.com",
//   databaseURL: "https://projectexpo-fce16-default-rtdb.firebaseio.com",
//   projectId: "projectexpo-fce16",
//   storageBucket: "projectexpo-fce16.appspot.com",
//   messagingSenderId: "513477020718",
//   appId: "1:513477020718:web:bee1c1ad733e7b9dbb23bf",
//   measurementId: "G-QR3TBQN02D"
// };

// if (!firebase.apps.length) 
//   // Your web app's Firebase configuration
//   // Initialize Firebase
//   firebase.initializeApp(Config);

// WebBrowser.maybeCompleteAuthSession();

// export default function App() {

//   const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
//     {
//       clientId: '513477020718-9l7r57nku76f7rm16fmbd4st590304ff.apps.googleusercontent.com',
//       androidClientId:'513477020718-j9c5dqpq19e0ejb1vl4g5co085ik97mb.apps.googleusercontent.com'
//       },
//   );

//   React.useEffect(() => {
//     if (response?.type === 'success') {
//       const { id_token } = response.params;
      
//       const auth = getAuth();
//       const provider = new GoogleAuthProvider();
//       const credential = provider.credential(id_token);
//       signInWithCredential(auth, credential);
//     }
//   }, [response]);

//   return (
//     <Button
//       disabled={!request}
//       title="Login"
//       onPress={() => {
//         promptAsync();
//         }}
//     />
//   );
// }



import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { ResponseType } from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import firebase from 'firebase';
import { Button } from 'react-native';



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
      title="Login"
      onPress={() => {
        promptAsync();
        }}
    />
  );
}





