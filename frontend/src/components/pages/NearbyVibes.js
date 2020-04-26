import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import ReactMapboxGl, { Layer, Feature, Marker } from 'react-mapbox-gl';

const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoicmNvbGV3b3JsZCIsImEiOiJjazlmam04d28wMzRvM2xsaTRzMHEyYzN2In0.SM_saZLbPKiRRQF6Cods2g'
});

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
  }
}));

export default function NearbyVibes() {
  const classes = useStyles();

  
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(function (position) {
        if (!localStorage.getItem('latitude') || !localStorage.getItem('longitude') )
          window.location.reload()
        localStorage.removeItem('latitude')
        localStorage.removeItem('longitude')
        localStorage.setItem('latitude', position.coords.latitude.toString())
        localStorage.setItem('longitude', position.coords.longitude.toString())
      });

    }
  })
  let long = localStorage.getItem('longitude');
  let lat = localStorage.getItem('latitude');
  return (
    <div>
      <FormControl variant="outlined" className={classes.formControl}


      >
        <InputLabel id="demo-simple-select-outlined-label"

        >Distance</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          label="Distance"
          className={classes.select}
          InputLabelProps={{
            classes: {
              focused: classes.input
            }
          }}
          InputProps={{
            classes: {
              root: classes.select,
              focused: classes.select,
              notchedOutline: classes.select
            }
          }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>10mi</MenuItem>
          <MenuItem value={100}>100mi</MenuItem>
          <MenuItem value={1000}>1000mi</MenuItem>
        </Select>
      </FormControl>
      <Map
        style="mapbox://styles/mapbox/streets-v10"
        containerStyle={{
          height: '100vh',
          width: '100vw'
        }}
        center={[long, lat]}
      >
        <Marker
          coordinates={[long, lat]}
          anchor="bottom">
          <img src='https://i.imgur.com/MK4NUzI.png' />
        </Marker>
      </Map>
    </div>
  );
}