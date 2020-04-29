import React, { useEffect } from 'react';
import ReactMapboxGl, { Layer, Feature, Marker } from 'react-mapbox-gl';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useSnackbar } from 'notistack';
import {addLocation} from '../../functions/locations';

const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoicmNvbGV3b3JsZCIsImEiOiJjazlmanB1dzYwY2cxM2duYWdtbjN3YjJmIn0.LNMjiEtpqEIDq4oZtmO0wQ'
});

const black = 'rgb(0, 0, 0)'
const useStyles = makeStyles((theme) => ({
  submit: {
    borderRadius: '0px',
    backgroundColor: black,
    "&:hover": {
      //you want this to be the same as the backgroundColor above
      backgroundColor: `${black} !important`
    },
  },

}));

//-92.6036243758132
// 32.53369667134067
export default function TrackVibe() {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const add = () => {
    addLocation(localStorage.getItem("username"), "title", "description", localStorage.getItem("latitude"), localStorage.getItem("longitude")).then((resp) => {
      if (resp) {
        let okResponse = JSON.stringify(resp).includes("New location created");
        if (okResponse) {
          enqueueSnackbar("Vibe added!" , {variant: "success"})
        }
        else {
          enqueueSnackbar("Could not add vibe", {variant: "error"})
        }
      }
    })
  }
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(function (position) {
        if (!localStorage.getItem('latitude') || !localStorage.getItem('longitude'))
          window.location.reload()
          
        window.localStorage.setItem('latitude', position.coords.latitude.toString())
        window.localStorage.setItem('longitude', position.coords.longitude.toString())
      });
    }
  }, [])
  
  let long = window.localStorage.getItem('longitude');
  let lat = window.localStorage.getItem('latitude');

  return (
    <div>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        onClick={add}
        className={classes.submit}
      >Add Vibe</Button>
      {long && lat &&
        <Map
          style="mapbox://styles/mapbox/streets-v10"
          containerStyle={{
            height: '100vh',
            width: '100vw'
          }}
          minZoom={15}
          center={[long, lat]}
        >
          <Marker
            coordinates={[long, lat]}
            anchor="bottom">
            <img src='https://i.imgur.com/MK4NUzI.png'/>
          </Marker>
        </Map>
      }

    </div>
  );
}