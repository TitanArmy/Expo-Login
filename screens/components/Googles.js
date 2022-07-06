// import React from "react";
// import { StyleSheet, View, Button } from "react-native";
// import * as Google from "expo-google-app-auth";

// const LoginScreen = ({ navigation }) => {
//   const signInAsync = async () => {
//     // console.log("LoginScreen.js 6 | loggin in");
//     try {
//       const { type, user } = await Google.logInAsync({
       
//         androidClientId: `513477020718-j9c5dqpq19e0ejb1vl4g5co085ik97mb.apps.googleusercontent.com`,
//       });

//       if (type === "success") {
//         // Then you can use the Google REST API
//         console.log("LoginScreen.js 17 | success, navigating to profile");
//         navigation.navigate("Users", { user});
//       }
//     } catch (error) {
//       console.log("LoginScreen.js 19 | error with login", error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Button title="Login with Google" onPress={signInAsync} />
//     </View>
//   );
// };

// export default LoginScreen;

// const styles = StyleSheet.create({});




import React, { useEffect, useState } from 'react';
import { AsyncStorage, Button, StyleSheet, Text, View } from 'react-native';
import * as AppAuth from 'expo-app-auth';

export default function App() {
  let [authState, setAuthState] = useState(null);

  useEffect(() => {
    (async () => {
      let cachedAuth = await getCachedAuthAsync();
      if (cachedAuth && !authState) {
        setAuthState(cachedAuth);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Expo AppAuth Example</Text>
      <Button
        title="Sign In with Google "
        onPress={async () => {
          const _authState = await signInAsync();
          setAuthState(_authState);
        }}
      />
      <Button
        title="Sign Out "
        onPress={async () => {
          await signOutAsync(authState);
          setAuthState(null);
        }}
      />
      <Text>{JSON.stringify(authState, null, 2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const config = {
  issuer: 'https://accounts.google.com',
  clientId: '513477020718-j9c5dqpq19e0ejb1vl4g5co085ik97mb.apps.googleusercontent.com',
  scopes: ['profile'],
};

let StorageKey = '@MyApp:CustomGoogleOAuthKey';


export async function signInAsync() {
  let authState = await AppAuth.authAsync(config);
  await cacheAuthAsync(authState);
  console.log('signInAsync', authState);
  return authState;
}

async function cacheAuthAsync(authState) {
  return await AsyncStorage.setItem(StorageKey, JSON.stringify(authState));
}

export async function getCachedAuthAsync() {
  let value = await AsyncStorage.getItem(StorageKey);
  let authState = JSON.parse(value);
  console.log('getCachedAuthAsync', authState);
  if (authState) {
    if (checkIfTokenExpired(authState)) {
      return refreshAuthAsync(authState);
    } else {
      return authState;
    }
  }
  return null;
}

function checkIfTokenExpired({ accessTokenExpirationDate }) {
  return new Date(accessTokenExpirationDate) < new Date();
}

async function refreshAuthAsync({ refreshToken }) {
  let authState = await AppAuth.refreshAsync(config, refreshToken);
  console.log('refreshAuth', authState);
  await cacheAuthAsync(authState);
  return authState;
}
