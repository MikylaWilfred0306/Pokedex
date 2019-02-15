import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import HeaderSideBar from './sidebar.js';
import EnhancedTableHead from './table.js';
import './App.css'


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

        <main className={classes.content}>
          <Typography paragraph>
          <br></br>
          <br></br>
          <br></br>
          </Typography>

        <EnhancedTableHead />


        </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(FrontPage);