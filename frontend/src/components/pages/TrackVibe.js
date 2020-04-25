import React, { useEffect } from 'react';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';

const Map = ReactMapboxGl({
    accessToken:
      'pk.eyJ1IjoicmNvbGV3b3JsZCIsImEiOiJjazlmanB1dzYwY2cxM2duYWdtbjN3YjJmIn0.LNMjiEtpqEIDq4oZtmO0wQ'
});

//-92.6036243758132
// 32.53369667134067
export default function TrackVibe() {
  const [location, setLocation] = React.useState([]);

  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

    // function success(pos) {
    //   var crd = pos.coords;
    //   setLocation([crd.longitude, crd.latitude])
    //   console.log('Your current position is:');
    //   console.log(`Latitude : ${crd.latitude}`);
    //   console.log(`Longitude: ${crd.longitude}`);
    //   console.log(`More or less ${crd.accuracy} meters.`);
    // }
  
    // function error(err) {
    //   console.warn(`ERROR(${err.code}): ${err.message}`);
    // }

    // setTimeout(() => {
    //     navigator.geolocation.getCurrentPosition(success, error, options);
    //     console.log(location)
    // }, 3000)

    // navigator.geolocation.getCurrentPosition(success, error, options);
    // console.log("Location " + location)
    return (
        
        <div>
            <h1>Track Vibe</h1>
            <Map
            style="mapbox://styles/mapbox/streets-v9"
            containerStyle={{
                height: '100vh',
                width: '100vw'
            }}
            center={[-92.6036243758132, 32.53369667134067]}
            >
              <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
                  <Feature coordinates={[-92.6036243758132, 32.53369667134067]}/>
              </Layer>
            </Map>
        </div>
    );
}