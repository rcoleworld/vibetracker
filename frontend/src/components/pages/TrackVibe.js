import React, { useEffect } from 'react';
import ReactMapboxGl, { Layer, Feature, Marker } from 'react-mapbox-gl';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useSnackbar } from 'notistack';
import {addLocation} from '../../functions/locations';

import LocationOnIcon from '@material-ui/icons/LocationOn';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';

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
  button: {
    margin: theme.spacing(3, 0, 2),
    color: black,
    "&:hover": {
      //you want this to be the same as the backgroundColor above
      color: `${black} !important`
    },
  },
  borderOutline: {
    borderWidth: "1px",
    borderColor: `${black} !important`
  },
  labels: {
    color: `${black} !important`
  },
}));

export default function TrackVibe() {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");

  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const changeTitle = (event) => {
    setTitle(event.target.value);
  }

  const changeDescription = (event) => {
    setDescription(event.target.value);
  }

  const add = () => {
    addLocation(localStorage.getItem("username"), title, description, localStorage.getItem("latitude"), localStorage.getItem("longitude")).then((resp) => {
      if (resp) {
        let okResponse = JSON.stringify(resp).includes("New location created");
        if (okResponse) {
          enqueueSnackbar("Vibe added!" , {variant: "success"})
          setOpen(false);
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
        onClick={handleOpen}
        className={classes.submit}
      >Add Vibe
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Vibe</DialogTitle>
        <DialogContent>
          <TextField
            onChange={changeTitle}
            className={classes.borderOutline}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={title}
            name="title"
            label="Title"
            type="text"
            id="title"
            autoComplete="title"
            InputLabelProps={{
              classes: {
                focused: classes.labels
              }
            }}
            InputProps={{
              classes: {
                root: classes.borderOutline,
                focused: classes.borderOutline,
                notchedOutline: classes.borderOutline
              }
            }}
          />
          <TextField
            onChange={changeDescription}
            className={classes.borderOutline}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={description}
            name="description"
            label="Description"
            type="text"
            id="description"
            autoComplete="description"
            InputLabelProps={{
              classes: {
                focused: classes.labels
              }
            }}
            InputProps={{
              classes: {
                root: classes.borderOutline,
                focused: classes.borderOutline,
                notchedOutline: classes.borderOutline
              }
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button className={classes.button} onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button className={classes.button} onClick={add} color="primary">
            Add Vibe
          </Button>
        </DialogActions>
      </Dialog>
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
            <LocationOnIcon/>
          </Marker>
        </Map>
      }

    </div>
  );
}