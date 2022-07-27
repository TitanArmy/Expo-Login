import React, { useState } from "react";
import { Text, View, StyleSheet,ScrollView, TouchableOpacity,Image } from "react-native";
import TextBox from "../components/TextBox";
import Btn from "../components/Btn";
import firebase from "firebase/app";
import "firebase/auth";
import { LogBox } from 'react-native';



const styles = StyleSheet.create({
  view: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default function SigninScreen({ navigation }) {
  

  const [values, setValues] = useState({
    email: "",
    pwd: "",
  });

  function handleChange(text, eventName) {
    LogBox.ignoreLogs(['AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and importedSee']);
    setValues((prev) => {
      return {
        ...prev,
        [eventName]: text,
      };
    });
  }

  function Login() {
    const { email, pwd } = values;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, pwd)
      // .then(() => {navigation.navigate('Home')})
      .catch((error) => {
        alert(error.message);
        // ..
      });
  }

  return (
    
    <View style={styles.view}>
      <Text style={{ fontSize: 34, fontWeight: "800", marginBottom: 20 }}>
        Login
      </Text>
      <TextBox
        placeholder="Email Address"
        onChangeText={(text) => handleChange(text, "email")}
      />
      <TextBox
        placeholder="Password"
        onChangeText={(text) => handleChange(text, "pwd")}
        secureTextEntry={true}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "92%",
        }}
      >

        <Btn onClick={() => Login()} title="Login" style={{ width: "48%" }} />
        <Btn
          onClick={() => navigation.navigate("SignUp")}
          title="Sign Up"
          style={{ width: "48%", backgroundColor: "#344869" }}
        />
      </View>
      <View style={{marginTop:140}}>
        <TouchableOpacity onPress={()=> navigation.navigate('Login')}>
        <Image style={{width:40,height:40}}
        source={require('../../assets/back.png')}>
        </Image>
        </TouchableOpacity>
      </View>
    </View>
  );
}

