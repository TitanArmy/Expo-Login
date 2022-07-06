import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Btn from "../components/Btn";
import firebase from "firebase/app";
import "firebase/auth";
import Location from "./Location";

const styles = StyleSheet.create({
  view: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default function Loginscreen({ navigation }) {
  return (
    <View style={styles.view}>
      <Text style={{ fontSize: 34, fontWeight: "800", marginBottom: 20 }}>
        Home -Screen
      </Text>
      <Btn title="Log Out" onClick={() => firebase.auth().signOut()} />

      
      <Btn
          onClick={() => navigation.navigate("Location")}
          title="Location"
          style={{ width: "48%", backgroundColor: "#344869",top:50 }}
        />
    </View>
  );
}
