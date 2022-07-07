// import React from "react";
// import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
// import Btn from "../components/Btn";
// import firebase from "firebase/app";
// import "firebase/auth";
// import Location from "./Location";

// const styles = StyleSheet.create({
//   view: {
//     flex: 1,
//     width: "100%",
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });

// export default function Loginscreen({ navigation }) {
//   return (
//     <View style={styles.view}>
//       <Text style={{ fontSize: 34, fontWeight: "800", marginBottom: 20 }}>
//         Home -Screen
//       </Text>
//       <Btn title="Log Out" onClick={() => firebase.auth().signOut()} />

      
//       <Btn
//           onClick={() => navigation.navigate("Location")}
//           title="Location"
//           style={{ width: "48%", backgroundColor: "#344869",top:50 }}
//         />
//     </View>
//   );
// }


import * as React from "react"
import { Dimensions, StyleSheet, Text, View,TouchableOpacity, Image} from "react-native"
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
import MapView, { Callout, Circle, Marker } from "react-native-maps"
import Btn from "../components/Btn";
import firebase from "firebase/app";
import "firebase/auth";

export default function App() {
	const [ pin, setPin ] = React.useState({
		latitude: 28.539927134661628,
					longitude: 77.34059570765518
	})
	const [ region, setRegion ] = React.useState({
		latitude: 28.539927134661628,
					longitude: 77.34059570765518,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421
	})

	return (
		<View style={{ marginTop: 20 }}>
       <Btn title="Log Out" onClick={() => firebase.auth().signOut()}
       style={{ width: "98%", backgroundColor: "#344869",top:20}} />
			<GooglePlacesAutocomplete
				placeholder="Search"
				fetchDetails={true}
				GooglePlacesSearchQuery={{
					rankby: "distance"
				}}
				onPress={(data, details = null) => {
					// 'details' is provided when fetchDetails = true
					console.log(data, details)
					setRegion({
						latitude: details.geometry.location.lat,
						longitude: details.geometry.location.lng,
            latitudeDelta: 0.04,
            longitudeDelta: 0.05,
					})
				}}
				query={{
					key: "KEY",
					language: "en",
					components: "country:us",
					types: "establishment",
					radius: 30000,
					location: `${region.latitude}, ${region.longitude}`
				}}
				styles={{
					container: { flex: 0, position: "absolute", width: "100%", zIndex: 1 },
					listView: { backgroundColor: "white" }
				}}
			/>
			<MapView
				style={styles.map}
				showsUserLocation={true}
				provider="google"
				initialRegion={{
					latitude: 28.539927134661628,
					longitude: 77.34059570765518,
          latitudeDelta: 0.04,
          longitudeDelta: 0.05,
				}}
        
			>
				<Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />
				<Marker
					coordinate={pin}
					pinColor="blue"
					draggable={true}
					onDragStart={(e) => {
						console.log("Drag start", e.nativeEvent.coordinates)
					}}
          
					onDragEnd={(e) => {
						setPin({
							latitude: e.nativeEvent.coordinate.latitude,
							longitude: e.nativeEvent.coordinate.longitude
						})
					}}
				>
					<Callout>
						<Text>I'm here</Text>
					</Callout>
				</Marker>
				<Circle center={pin} radius={1000} />
			</MapView>
     
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center"
	},
	map: {
		width: Dimensions.get("window").width,
		height: Dimensions.get("window").height
	}
})