import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Beach from '../../beach.jpg';
import VibeLogo from '../../bannerlogo.jpg';
import { CSSTransitionGroup } from 'react-transition-group' // ES6


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
    height:'100%',
    margin: theme.spacing(1),
    marginLeft: theme.spacing(8)
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
    color: "#0097a7 !important"
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#0097a7",
    "&:hover": {
      //you want this to be the same as the backgroundColor above
      backgroundColor: "#0097a7 !important"
    },
  },
  borderOutline: {
    borderWidth: "1px",
    borderColor: "#0097a7 !important"
  },
  sideTextOne: {
    color: "rgb(255, 255, 255)",
    marginTop: theme.spacing(20),
    fontSize: "80px"
  },
  sideTextTwo: {
    color: "rgb(255, 255, 255)",
    marginTop: theme.spacing(-10),
    fontSize: "80px"
  }
}));

export default function Login() {
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image}>
        <div>
        <h1 className={classes.sideTextOne}>Track Your</h1>
        <CSSTransitionGroup
          transitionName="example"
          transitionAppear={true}
          transitionAppearTimeout={20000}
          transitionEnter={false}
          transitionLeave={false}>
          <h1 className={classes.sideTextTwo}>Good Vibes</h1>
        </CSSTransitionGroup>
        </div>
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <img className={classes.title} src={VibeLogo}/>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              InputLabelProps = {{
                classes: {
                  focused: classes.labels
                }
              }}
              InputProps = {{
                classes: {
                  root: classes.borderOutline,
                  focused: classes.borderOutline,
                  notchedOutline: classes.borderOutline
                }
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              InputLabelProps = {{
                classes: {
                  focused: classes.labels
                }
              }}
              InputProps = {{
                classes: {
                  root: classes.borderOutline,
                  focused: classes.borderOutline,
                  notchedOutline: classes.borderOutline
                }
              }}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}