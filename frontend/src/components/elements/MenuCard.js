import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardHeader from '@material-ui/core/CardHeader';


import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  media: {
    height: 140,

  },
}));

export default function MenuCard(props) {
  const classes = useStyles();

  return (
    <Grid
      container
      spacing={0}
      alignItems="center"
      justify="center"
      width={10000}
    >
     <Grid item xs={8}>

      <Card className={classes.root}>
        
        <CardActionArea href={props.route}>
          <CardHeader
            title={props.title}
          />
       
          <CardMedia
            className={classes.media}
            image={props.image}
            title={props.imagetitle}
          />
        </CardActionArea>
      </Card>
     </Grid>
    </Grid>
  );
}
