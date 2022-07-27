import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import TextBox from "../components/TextBox";
import Btn from "../components/Btn";
import firebase from "firebase/app";
import "firebase/auth";
import FacebookScreen from "../components/FacebookScreen";
import Googles from "../components/Googles";
import { LogBox } from "react-native";

export default function Loginscreen({ navigation }) {
  LogBox.ignoreLogs([
    "Warning: Async Storage has been extracted from react-native core",
  ]);

  return (
    <View style={{ justifyContent: "center", alignSelf: "center", flex: 1 }}>
      <View style={{ justifyContent: "center", alignSelf: "center" }}>
        <TouchableOpacity style={{flexDirection:'row',marginBottom:20}} onPress={() => navigation.navigate("Signin")}>
          <Text>Already A Member?</Text>
          <Text style={{marginLeft:4,fontWeight:'bold'}}>Login</Text>
        </TouchableOpacity>
      </View>
          <View
            style={{
              marginVertical: 10,
            }}
          >
            <Googles />
          </View>
      <View
        style={{
          marginVertical: 10,
        }}
      >
        <FacebookScreen navigation={navigation} />
      </View>

      <View>
        <TouchableOpacity
          style={{ alignItems: "center", alignSelf: "center", padding: 15,top:91 }}
          onPress={() => {
            navigation.navigate("Signin");
          }}
        >
          <Image 
          style={{width:35,height:35}}
          source={require("../../assets/next.png")} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
