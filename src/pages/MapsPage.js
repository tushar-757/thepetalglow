import  { useEffect, useState } from 'react';
import GoogleMap from '../components/MapsContainer';
import { Geolocation } from '@ionic-native/geolocation'
import { IonButton } from '@ionic/react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;
export default function MapsPage(){
  const [lat,setLat]=useState('')
  const [long,setLong]=useState('')
  useEffect(()=>{
     Geolocation.getCurrentPosition().then((resp) => {
      //  console.log( resp.coords.latitude, resp.coords.longitude)
       setLat(resp.coords.latitude)
       setLong(resp.coords.longitude)
      }).catch((error) => {
        console.log('Error getting location', error);
      });
   },[])
    return (
           <div style={{ height: '50vh', width: '100%' }}>
              <GoogleMap lat1={lat} long1={long}/>
           </div>
)}

 // const printCurrentPosition = async () => {
    //   const coordinates = await Geolocation.getCurrentPosition();
    //   //  Geolocation.watchPosition({enableHighAccuracy: true, timeout: 10000},(position, err) => {
      //   //   // self.marker.setLngLat([position.coords.longitude, position.coords.latitude])
  //   //   if(position!=undefined||position!=null){
  //   //   setlat(position.coords.latitude)
  //   //   setLong(position.coords.longitude)
  //   //   }
  //   //   console.log(position)
  //   // })
  //     console.log('Current position:', coordinates);
  // }
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