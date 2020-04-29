import React from 'react';

import { Link as RouterLink } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Beach from '../../beach.jpg';
import { CSSTransitionGroup } from 'react-transition-group' // ES6
import { userSignup } from '../../functions/signup';
import { useSnackbar } from 'notistack';

const blue = "#0097a7"
const black = "rgb(0, 0, 0)"
const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(${Beach})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundSize: "cover",
    width: "110%"
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    width: '100%',
    height: '100%',
    margin: theme.spacing(1),
    marginLeft: theme.spacing(3),
    marginTop: theme.spacing(-5)
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  labels: {
    color: `${black} !important`
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: black,
    "&:hover": {
      //you want this to be the same as the backgroundColor above
      backgroundColor: `${black} !important`
    },
  },
  borderOutline: {
    borderWidth: "1px",
    borderColor: `${black} !important`
  },
  sideTextOne: {
    color: "rgb(255, 255, 255)",
    marginTop: theme.spacing(5),
    fontSize: "80px"
  },
  sideTextTwo: {
    color: "rgb(255, 255, 255)",
    marginTop: theme.spacing(-10),
    fontSize: "80px"
  }
}));

export default function Signup() {
  const classes = useStyles();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [wasCreated, setWasCreated] = React.useState(false);

  // password confirmation field
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const { enqueueSnackbar } = useSnackbar();

  const changeUsername = (event) => {
    setUsername(event.target.value);
  }

  const changePassword = (event) => {
    setPassword(event.target.value);
  }

  const changeConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  }

  const signup = () => {
    if (password === confirmPassword) {
      userSignup(username, password).then((resp) => {
        if(resp) {
          let okResponse = JSON.stringify(resp).includes('User created');
          if (okResponse) {
            setWasCreated(true);
            return true;
          } else {
            console.log('Error creating user');
            enqueueSnackbar("Could not create user!", {variant: "error"})

            return false;
          }
        } else {
          console.log('Could Not Fetch');
          enqueueSnackbar("Could not create user!", {variant: "error"})

          return false;
        }
      });
    }
    else {
      enqueueSnackbar("Username and password do not match!", {variant: "error"})
      return false;
    }
  }

  if(wasCreated) {
    return <Redirect to='/'/>
  }
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image}>
        <div>
          <h1 className={classes.sideTextOne}>Start Your</h1>
          <CSSTransitionGroup
            transitionName="example"
            transitionAppear={true}
            transitionAppearTimeout={20000}
            transitionEnter={false}
            transitionLeave={false}>
            <h1 className={classes.sideTextTwo}>Journey</h1>
          </CSSTransitionGroup>
        </div>
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <h1>Vibe Tracker</h1>
          <form className={classes.form} noValidate>
            <TextField
              onChange={changeUsername}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="text"
              autoFocus
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
              onChange={changePassword}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
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
              onChange={changeConfirmPassword}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="confirm"
              label="Confirm Password"
              type="password"
              id="confirm"
              autoComplete="current-password"
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={signup}
              component={ RouterLink }
              // href="/home"
            >
              Sign Up
            </Button>
            <Grid container>              
              <Grid item>
                <Link href="/" variant="body2">
                  {"Already have an account? Sign in."}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}