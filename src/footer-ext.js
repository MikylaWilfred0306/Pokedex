import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import pokeapi from './pokeapi.png';

const styles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing.unit * 8,
    padding: `${theme.spacing.unit * 6}px 0`,
  },
});

function FooterText(props) {
  const { classes } = props;

  return (
    <React.Fragment>
      <CssBaseline />
      <footer className={classes.footer}>
      <Typography variant="subtitle1" align="center" component="p">
            Data all gathered from  <a href="https://pokeapi.co/">PokeAPI</a>.
        </Typography>
        <Typography variant="h6" align="center" gutterBottom>
            <a href="https://pokeapi.co/"><img src={pokeapi} alt="pokeapi" width="200px"/></a> 
        </Typography>
        <Typography variant="subtitle1" align="center" component="p">
           I do not own any of this information.
        </Typography>
      </footer>
    </React.Fragment>
  );
}

FooterText.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FooterText);