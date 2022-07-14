import React, { Component } from "react";
import {
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  StatusBar,
  Keyboard,
  StyleSheet,
  View,
  Text,
  Image,
  Alert
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import MapView, { Marker, Callout } from "react-native-maps";
import firebase from "firebase/app";
import { getRegion } from "../helper/Map";
import * as Location from "expo-location";


import moment from "moment";

export default class Home extends Component {
  state = {
    location: {
      latitude: 28.539927134661628,
      longitude: 77.34059570765518,
    },
    messageText: null,
    sendButtonActive: false,
    messages: [],
  
  
  };

  componentDidMount() {
    this.getLocation();

    firebase
      .database()
      .ref("messages")
      .limitToLast(2)
      .on("child_added", (data) => {
        let messages = [...this.state.messages, data.val()];

        this.setState({ messages }, () => {
          let { latitude, longitude } = [...messages].pop();

          this.map.animateToRegion(getRegion(latitude, longitude, 16000));

          if (this.marker !== undefined) {
            setTimeout(() => {
              this.marker.showCallout();
            }, 100);
          }
        });
      });
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          console.log('User email: ', user.uid);
        }
      });
  }

  onChangeText(messageText) {
    this.setState({
      messageText: messageText,
      sendButtonActive: messageText.length > 0,
    });
  }

  onSendPress() {
    if (this.state.sendButtonActive) {
      firebase
        .database()
        .ref("messages")
        .push({
          text: this.state.messageText,
          latitude: this.state.location.latitude,
          longitude: this.state.location.longitude,
          timestamp: firebase.database.ServerValue.TIMESTAMP,
         
          
        })
        .then(() => {
          this.setState({ messageText: null });

          ToastAndroid.show("Your message has been sent!", ToastAndroid.SHORT);

          Keyboard.dismiss();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  showAlert1() {  
    Alert.alert(  
        'Alert Title',  
        'My Alert Msg',  
        [  
            {  
                text: 'Cancel',  
                onPress: () => console.log('Cancel Pressed'),  
                style: 'cancel',  
            },  
            {text: 'OK', onPress: () => console.log('OK Pressed')},  
        ]  
    );  
}  

  getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status === "granted") {
      let location = await Location.getCurrentPositionAsync({});

      this.setState({
        location: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
      });

      this.map.animateToRegion(
        getRegion(location.coords.latitude, location.coords.longitude, 16000)
      );
    }
  };

  render() {
    let { latitude, longitude } = this.state.location;
    // console.log(this.state.location, "welfjkernhfjwrehficwhed");
    
    return (
      <>
        <View style={styles.container}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Type your message here"
              onChangeText={(messageText) => this.onChangeText(messageText)}
              value={this.state.messageText}
            />
            <View
              style={{
                ...styles.sendButton,
                ...(this.state.sendButtonActive ? styles.sendButtonActive : {}),
              }}
            >
              <TouchableOpacity onPress={this.onSendPress.bind(this)}>
                <MaterialIcons name="send" size={32} color="#fe4027" />
              </TouchableOpacity>
            </View>
            <View style={{ marginHorizontal: 15 }}>
              <TouchableOpacity
                onPress={() => firebase.auth().signOut()}
              >
                <Image
                  source={require("../../assets/back1.png")}
                  style={{
                    width: 50,
                    height: 50,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={[
              styles.map,
              { zIndex: 1, marginTop: "85%", marginLeft: "45%" },
            ]}
          >
            <TouchableOpacity
             onPress={this.showAlert1}  
           >
            <Image
              source={require("../../assets/marker.png")}
              style={{ width: 50 }}
              resizeMode="contain"
            ></Image>
            </TouchableOpacity>
          </View>
          <MapView
            ref={(ref) => (this.map = ref)}
            style={[styles.map]}
            initialRegion={getRegion(
              latitude,
              longitude,  
              160000
            )}
            onRegionChange={(region) =>
              this.setState({
                location: region,
              })
            }
          >
            {this.state.messages.map((message, index) => {
              let { latitude, longitude, text, timestamp} = message;
              
              return (
                <Marker
                  ref={(ref) => (this.marker = ref)}
                  key={index}
                  identifier={"marker_" + index}
                  coordinate={{ latitude, longitude }}
                >
                  <Callout>
                    <View>
                      <Text>{text}</Text>
                      <Text style={{ color: "#999" }}>
                        {moment(timestamp).fromNow()}
                      </Text>
                    </View>
                  </Callout>
                </Marker>
              );
            })}
          </MapView>
          <View
            style={{
              position: "absolute",
              alignSelf: "center",
              bottom: 10,
              backgroundColor: "#000080",
              width: 140,
              height: 40,
              borderRadius: 19,
            }}
          >
            <TouchableOpacity 
            onPress={this.onSendPress.bind(this)}
            style={{ borderRadius:30 }}>
              <Text
                style={{ color: "white", alignSelf: "center", marginTop:8}}
              >
                Drop
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            marginBottom: 30,
            flexDirection: "row",
            justifyContent: "space-around",
            marginTop: 20,
          }}
        >
          <TouchableOpacity>
            <Image source={require("../../assets/down.png")} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("Second");
            }}
          >
            <Image source={require("../../assets/up.png")} />
          </TouchableOpacity>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  inputWrapper: {
    width: "100%",
    position: "absolute",
    padding: 10,
    top: StatusBar.currentHeight,
    left: 0,
    zIndex: 100,
  },
  input: {
    height: 46,
    paddingVertical: 10,
    paddingRight: 50,
    paddingLeft: 10,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 6,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
  sendButton: {
    position: "absolute",
    top: 17,
    right: 20,
    opacity: 0.4,
  },
  sendButtonActive: {
    opacity: 1,
  },
});

