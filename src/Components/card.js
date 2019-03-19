import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  card: {
    height: '100%',
    marginLeft: '20%',
    marginRight: '5%',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
  },
 
});


class CardUnique extends React.Component {

    
render(){
      const { classes } = this.props;

  return (
      <div>            
              <Grid item key={this.props.cardnum} >
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image= {this.props.imageRec} // eslint-disable-line max-len
                    title={this.props.headerTxt}
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom  component="h2">
                            {this.props.headerTxt}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="large" color="primary">
                      View Table
                    </Button>
                    
                  </CardActions>
                </Card>
              </Grid>
           
        </div>
  );
}
}

CardUnique.propTypes = {
  classes: PropTypes.object.isRequired,
  card: PropTypes.number.isRequired,
  imageRec: PropTypes.string.isRequired,
  headerTxt: PropTypes.string.isRequired,
  desp: PropTypes.string.isRequired,
};

export default withStyles(styles)(CardUnique);
