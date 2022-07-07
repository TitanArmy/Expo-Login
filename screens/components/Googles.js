import * as React from 'react';
import { Text, View, TouchableOpacity, StyleSheet,Image } from 'react-native';
import * as Google from 'expo-google-app-auth'
import * as firebase from 'firebase';

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


export default class App extends React.Component {
  constructor(props) {
    super(props);

    if (!firebase.apps.length) {
      firebase.initializeApp(Config);
    }
  }

  onPress = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId: '513477020718-j9c5dqpq19e0ejb1vl4g5co085ik97mb.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        const { idToken, accessToken } = result;
        const credential = firebase.auth.GoogleAuthProvider.credential(idToken,accessToken);
        
        firebase
          .auth()
          .signInAndRetrieveDataWithCredential(credential)
          .then(res => {
            console.log("loggedIn:",res)
            // user res, create your user, do whatever you want
          })
          .catch(error => {
            console.log('firebase cred err:', error.message);
          });
      } else {
        return { cancelled: true };
      }
    } catch (err) {
      console.log('err:', err);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={this.onPress}>
        <Image style={{height: 20, width: 220}}
          source={require('../../assets/google.png')}/>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    bottom:90,
    padding: 8,
  },
  button: {
    marginHorizontal: 90,
   
    justifyContent: 'center',
    
    
  },
  text: {
    textAlign: 'center',
  },
});