import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import LocationOnIcon from '@material-ui/icons/LocationOn';

import { getAllLocations } from '../../functions/locations';
import ReactMapboxGl, { Layer, Feature, Marker } from 'react-mapbox-gl';

const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoicmNvbGV3b3JsZCIsImEiOiJjazlmam04d28wMzRvM2xsaTRzMHEyYzN2In0.SM_saZLbPKiRRQF6Cods2g'
});

const black = 'rgb(0, 0, 0)'
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: "100vh"
  },
  select: {
    '&:before': {
      borderColor: 'rgb(0, 0, 0) !important',
    },
    '&:after': {
      borderColor: 'rgb(0, 0, 0) !important',
    }
  },
  input: {
    borderColor: 'rgb(0, 0, 0) !important',
    borderWidth: "1px"
  },
  iconButton: {
    width: "10%",
    height: "10%",
  },
  icon: {
    color: 'rgb(255, 255, 255)',
    width: "3%",
    height: "3%"
  },
  button: {
    margin: theme.spacing(3, 0, 2),
    color: black,
    "&:hover": {
      //you want this to be the same as the backgroundColor above
      color: `${black} !important`
    },
  }
}));

export default function NearbyVibes() {
  const classes = useStyles();
  const [locations, setLocations] = React.useState([]);
  
  const getLocations = () => {
    getAllLocations().then((resp) => {
      console.log(locations);
      setLocations(resp)
    });
  }
  useEffect(() => {
    getLocations()
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(function (position) {
        if (!localStorage.getItem('latitude') || !localStorage.getItem('longitude'))
          window.location.reload()

        localStorage.setItem('latitude', position.coords.latitude.toString())
        localStorage.setItem('longitude', position.coords.longitude.toString())
      });
    }
  }, [])
  let long = localStorage.getItem('longitude');
  let lat = localStorage.getItem('latitude');
  return (
    <div>
      <Map
        style="mapbox://styles/mapbox/streets-v10"
        containerStyle={{
          height: '100vh',
          width: '100vw'
        }}
        center={[long, lat]}
      >
        {locations !== 'undefined' && locations.length > 0 && locations.map(location => (
          <Marker
            coordinates={[location.longitude, location.latitude]}
            anchor="bottom">
            <LocationOnIcon className={classes.icon} />
          </Marker>
        ))
        }
      </Map>
    </div>
  );
}