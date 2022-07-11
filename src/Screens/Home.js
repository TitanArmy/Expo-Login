import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { Component } from "react";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import firebase from "firebase/app";
import "firebase/auth";



export class Home extends Component {
  state = {
    coordinate: {
      latitude: 28.539927134661628,
      longitude: 77.34059570765518,
    },
	marginBottom:1
  };

  render() {
    let { latitude, longitude } = this.state.coordinate;
    // console.log(this.state.coordinate, "welfjkernhfjwrehficwhed");
    return (
		<>
      <View style={{flex:1}}>
        <View style={{ zIndex:1,marginTop:30,width:30,marginHorizontal:15}}>
          <TouchableOpacity 
		  
		//   onPress={() => firebase.auth().signOut()}
		  >
            <Image
              source={require("../../assets/back1.png")}
              style={{
				 width: 50,
				 height:50
				}}
            ></Image>
          </TouchableOpacity>
        </View>
        <View style={[styles.map, { zIndex: 1, marginTop: "50%", marginLeft: "50%" }]}>
          <Image
            source={require("../../assets/marker.png")}
            style={{ width: 50,}}
            resizeMode="contain"
          ></Image>
        </View>
		
		
        <MapView
          style={[styles.map,{marginBottom: this.state.marginBottom}]}
          initialRegion={{
            latitude,
            longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={true}
          showsMyLocationButton={true}
          onPress={(e)=>{this.setState({
          	coordinate:e.nativeEvent.coordinate
          })}}
        //   onRegionChange={(region) =>
        //     this.setState({
        //       coordinate: region,
        //     })
        //   }
		  onMapReady={()=>{this.setState({marginBottom:0})}}
        >
          {/* <Marker
      coordinate={{
		latitude,
		longitude,
	  }}
      title="Text Description"
	  description='desk'
     
    /> */}
        </MapView>
		<View style={{backgroundColor: '#000080',width:140,height:40,
			borderRadius:19,marginTop:550,marginLeft:130}}>
			<TouchableOpacity style={{alignSelf:'center'}}>
				<Text style={{color:'white',alignSelf:'center',marginTop:8}}>Drop</Text>
			</TouchableOpacity>
		</View>
		
      </View>
	  <View style={{marginBottom:30,flexDirection:'row',justifyContent:'space-around',marginTop:20}}>
		<TouchableOpacity>
	  <Image source={require("../../assets/down.png")}
	  />
	  </TouchableOpacity>
	  <TouchableOpacity onPress={() => { this.props.navigation.navigate('Second') }}>
	  <Image source={require("../../assets/up.png")}/>
	  </TouchableOpacity>
	  
  </View>
  </>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Home;











// import React, { useState } from "react";
// import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
// import { Marker } from "react-native-maps";

// import MapView from "react-native-maps";

// const Home = (props) => {
//   const [region, setRegion] = useState({
//     latitude: 28.539927134661628,
//     longitude: 77.34059570765518,
//   });

//   const onRegionChange =coordinate
//   const {latitude,longitude} = props
//   console.log(latitude,'dhewhfdwghedy')

//   return (
// 	<MapView
// 	          style={styles.map}
// 	          initialRegion={{
// 				latitude: 28.539927134661628,
// 				longitude: 77.34059570765518,
// 	            latitudeDelta: 0.0922,
// 	            longitudeDelta: 0.0421,
// 	          }}
// 	          showsUserLocation={true}
// 	          showsMyLocationButton={true}
// 	          // onPress={(e)=>{this.setState({
// 	          // 	coordinate:e.nativeEvent.coordinate
// 	          // })}}
// 	          onRegionChangeComplete={onRegionChange}
// 	        >
// 	          <Marker
// 	      coordinate={{
// 			latitude: 28.539927134661628,
// 				longitude: 77.34059570765518,
// 		  }}
// 	      title="Text Description"
// 		  description='desk'
		 
// 	    />
// 	        </MapView>
//   );
// };

// const styles = StyleSheet.create({
//   map: {
//     ...StyleSheet.absoluteFillObject,
//   },
// });

// export default Home;

