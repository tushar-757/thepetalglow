import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import React, { Component, useState } from "react";
import { IonButton,useIonToast } from "@ionic/react";
import { setLatLng } from "../Actions";
import {useSelector,useDispatch } from "react-redux";
import { Geolocation } from '@capacitor/geolocation';
import { useHistory } from "react-router";
import LoadingBox from "./LoadingComponent";
// ...

const containerStyle = {
  position: "relative",
  width: "100%",
  height: "70%",
};
function MapContainer({onMarkerDragEnd,map,lat1,long1,windowHasClosed,windowHasOpened,google}){
    const dispatch=useDispatch()
    const latitude=useSelector((state)=>state.UserReducer.lat)
    const longitude=useSelector((state)=>state.UserReducer.lng)
    // const [isTracking,setIsTracking]=useState(false)
    // let [watch,SetWatch]=useState("")
    // const [LocationCollection,setLocationCollection]=useState([])
    const FARIDABAD_BOUNDS = {
      north: 28.25,
      east:77.18
    };
    const [lat,setLat]=useState(lat1)
    const [long,setLng]=useState(long1)
    const [present1, dismiss] = useIonToast();

    const History=useHistory()
      const [state,setState]=useState(
        {
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            markers: [
                {
                  name: "Current position",
                  position: {
                    lat:latitude,
                    lng:longitude
                  }
                }
              ]
          }
      )
      onMarkerDragEnd = (coord, index) => {
        const { latLng } = coord;
        const lat = latLng.lat();
        const lng = latLng.lng();
        setState(prevState => {
          const markers = [...state.markers];
          markers[index] = { ...markers[index], position: { lat, lng } };
          return { markers };
        });
      };
    const  onMarkerClick = (props, marker, e) =>
    setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

 const onMapClicked = (props) => {
    if (state.showingInfoWindow) {
      setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };
  const setLocationHandler=()=>{
      dispatch(setLatLng(state.markers[0].position.lat,state.markers[0].position.lng))
      // History.goBack()
      present1(
        {
            color: 'success',
            duration: 2000,
            message: `Location is set successfully`
          })
  }


    return (
        <>
      <Map
        google={google}
        style={containerStyle}
        initialCenter={{
          lat: 28.4089,
          lng:77.3178
        }}

        zoom={15}
       latLngBounds={{north: 83.8, south: -57, west: -180, east: 180}}
        onClick={()=>onMapClicked()}
      >
     {state.markers.map((marker, index) => (
          <Marker
          key={index}
            draggable={true}
            // onClick={()=>onMarkerClick(marker)}
            onDragend={(t, map, coord) => onMarkerDragEnd(coord, index)}
            name={marker.name}
          >

  <InfoWindow
  onOpen={windowHasOpened}
  onClose={windowHasClosed}
  visible={state.showingInfoWindow}>
    <div>
      <h1 style={{color:"black"}}>dede</h1>
    </div>
</InfoWindow>
          </Marker>
        ))}
      </Map>
      <div style={{display:"flex",justifyContent:"center",alignItems:"center ",position: 'absolute',
         top:' 72%',width:"100%"}}>
      <IonButton
      color="dark"
      style={{
         width: '50%',color:"white"
         }} onClick={()=>setLocationHandler()}>Set Location</IonButton>
      </div>
      </>
    );
}

const LoadingContainer = (props) => <LoadingBox/>;

const GoogleMap = GoogleApiWrapper({
apiKey: (process.env.REACT_APP_BASIC_API_KEY),
  LoadingContainer: LoadingContainer,
})(MapContainer);


export default GoogleMap;
//  const printCurrentPosition = async () => {
//       const coordinates = await Geolocation.getCurrentPosition();
//       //  Geolocation.watchPosition({enableHighAccuracy: true, timeout: 10000},(position, err) => {
//         //   // self.marker.setLngLat([position.coords.longitude, position.coords.latitude])
//     //   if(position!=undefined||position!=null){
//     //   setlat(position.coords.latitude)
//     //   setLong(position.coords.longitude)
//     //   }
//     //   console.log(position)
//     // })
//       console.log('Current position:', coordinates);
//   }
  // printCurrentPosition();
        // Geolocation.getCurrentPosition({
        //   enableHighAccuracy: true,
        //   }).then((resp) => {
        //     // resp.coords.latitude
        //     // resp.coords.longitude
        //     // console.log(resp,resp.coords.latitude,resp.coords.longitude)
        //     setlat(resp.coords.latitude)
        //     setLong(resp.coords.longitude)
        //     setacurate(resp.coords.accuracy)
        //    }).catch((error) => {
        //      console.log('Error getting location', error);
        //    });
// Use Capacitor to track our geolocation
// const watch =string, const isTraking=boolean
// startTracking() {
//   this.isTracking = true; var
//   this.watch = Geolocation.watchPosition({}, (position, err) => {
//     if (position) {
//       this.addNewLocation(
//         position.coords.latitude,
//         position.coords.longitude,
//         position.timestamp
//       );
//     }
//   });
// }
// Unsubscribe from the geolocation watch using the initial ID
// stopTracking() {
//   Geolocation.clearWatch({ id: this.watch }).then(() => {
//     this.isTracking = false; var
//   });
// }
// Save a new location to db and center the map
//const locationcollection=[]
// addNewLocation(lat, lng, timestamp) {
//   this.locationsCollection.add({
//     lat,
//     lng,
//     timestamp
//   });
//   let position = new google.maps.LatLng(lat, lng);
//   this.map.setCenter(position);
//   this.map.setZoom(5);
// }

// updateMap(locations) {
//   // Remove all current marker
//   this.markers.map(marker => marker.setMap(null));
//   this.markers = [];

//   for (let loc of locations) {
//     let latLng = new google.maps.LatLng(loc.lat, loc.lng);

//     let marker = new google.maps.Marker({
//       map: this.map,
//       animation: google.maps.Animation.DROP,
//       position: latLng
//     });
//     this.markers.push(marker);
//   }
// }