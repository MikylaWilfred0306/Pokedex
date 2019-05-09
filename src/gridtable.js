import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import './Components/StyleSheets/popup.css'
import CardContent from './CardContent'



const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: '100%',
    height: '100%',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  contentStyle: {
    maxWidth: "600px",
    width: "90%"
  }
});


class TitlebarGridList extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            tileData:  []
        }
    }
    
    render(){
        this.state.tileData = this.props.dataArr;    
        const { classes } = this.props;
        return (
            <div className={classes.root}>
            <GridList cellHeight={'auto'} className={classes.gridList} cols={5}>
                {this.state.tileData.map(tile => (
                <GridListTile key={tile.img}>
                    <img src={tile.img} alt={tile.title} />
                    <GridListTileBar
                    title={tile.title}
                    actionIcon={
                            <CardContent apurl={tile.url}> </CardContent>
                    }
                    />
                </GridListTile>
                ))}
            </GridList>
            </div>
        );
    }
}


TitlebarGridList.propTypes = {
  dataArr: PropTypes.array.isRequired,
};

export default withStyles(styles)(TitlebarGridList);
