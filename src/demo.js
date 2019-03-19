import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import HeaderSideBar from './sidebar.js';

import FooterText from './footer-ext.js'; 
import './App.css'
import API_Grid from './API_Grid.js';
//https://img.pokemondb.net/artwork/bulbasaur.jpg

const styles = theme => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  }
});

class FrontPage extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />

        <HeaderSideBar />

        <main className={classes.content}>]

        <Typography paragraph>
          <br></br>
          <br></br>
          <br></br>
          </Typography>
        <API_Grid />
        <FooterText/>
        </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(FrontPage);