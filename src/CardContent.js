import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import Popup from "reactjs-popup";
import {jsUcfirst} from './Components/Functions/usefulfunctions';
import './Components/StyleSheets/popup.css'
import CustomizedExpansionPanel from './Components/expansionpanel'
import CustomPaginationActionsTable from './Components/CustomPaginationActionsTable'

import SVGIcon from "./Components/icon"; 

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
});

const contentStyle = {
    maxWidth: "600px",
    width: "90%"
  };

function nameDisplayReverse(arr){
    let j =  arr.length -1; 
    let i ='';
    for(j; j>=0 ;j--){
       i = i + (jsUcfirst(arr[j]) + ", ");
    }
    return (i.substring(0, i.length - 2));
}

function nameDisplay(arr){
  let j =  0; 
  let i ='';
  for(j; j < arr.length ;j++){
     i = i + (jsUcfirst(arr[j]) + ", ");
  }
  return (i.substring(0, i.length - 2));
}

class CardContent extends React.Component {  
    constructor(props)
    {
        super();
        this.state = {
            name: 'Loading', 
            picture: 'Loading', 
            types: [],
            ability: [],
            url: [],
            flavor_text_entries: [],
            short: [],
        };
        this.nameDisplaywithArr2asURLs = this.nameDisplaywithArr2asURLs.bind(this)
        this.callAPI = this.callAPI.bind(this)
    }

    callAPI(url){
      fetch(url)
      .then(results => {return results.json();}
      )
      .then(data => {
              this.state.short.push(data.effect_entries[0].short_effect);     
      })
      .catch(error => console.error(error));
    }    
    
    nameDisplaywithArr2asURLs(arr, arr2){
      let j =  0; 
      let i ='';
      for(j; j < arr.length ;j++){ 
       // this.callAPI(arr2[j]);   
        let thisvar = this.state.short[j];
         i = i + (jsUcfirst(arr[j]) + " (" + thisvar + "), ");
      }
      return (i.substring(0, i.length - 2));
    }

    componentDidMount() {
        fetch(this.props.apurl)
                .then(results => {return results.json();}
                )
                .then(data => {
                this.setState({ name: jsUcfirst(data.name)});

                    fetch(data.species.url)
                      .then(results => {return results.json();}
                      )
                      .then(dataThing => {
                        let thisfLAG = true;
                        dataThing.flavor_text_entries.foreach((html) => {
                          if (html.language.name === "en" && thisfLAG){
                            this.setState({ flavor_text_entries: html.flavor_text});
                            thisfLAG = false;
                          }
                         })    
                      })
                    .catch(error => console.error(error));
                
                this.setState({ picture: 'https://img.pokemondb.net/artwork/' + data.name + '.jpg'})
                data.types.foreach((html) => {
                    this.state.types.push(html.type.name);      
                })   
                
                data.abilities.foreach((html) => {
                  this.state.ability.push(html.ability.name);    
                  this.callAPI(html.ability.url);    
              })       
            })
        .catch(error => console.error(error));
    }    
    
    render = () => {            
          const { classes } = this.props;
            return (   
                <div className="example-warper">
                <Popup
                  trigger={<IconButton className={classes.icon}>  <SVGIcon name="ball" width={35} fill="white"/> </IconButton>}
                  modal
                  contentStyle={contentStyle}
                >
                {close => ( 
                <div className="modal">
                    <a className="close" onClick={close}>
                    &times;
                    </a>
                    <div className="header"> 
                        <div className="leftheader">{this.state.name}</div>
                        <div className="rightheader"> { nameDisplayReverse(this.state.types)} </div> 
                        <br></br>
                     </div>
                             
                    <div className="content">
                    {" "}
                    <img src={this.state.picture} className="centerImg" alt={this.state.name} />
                    <div className="desc"> <div className="padding"> {this.state.flavor_text_entries}</div> </div>
                    <br />
                    Abilities: {this.nameDisplaywithArr2asURLs(this.state.ability, this.state.url)}
                    <br /> <CustomPaginationActionsTable>s</CustomPaginationActionsTable> 
                    </div>
                    <div className="actions">
                   
                           
                    <button
                        className="button"
                        onClick={() => {
                        console.log("modal closed ");
                        close();
                        }}
                    >
                        close modal
                    </button>
                    </div>
                </div>
              )} 
              </Popup>
              </div>              
        );
  }
}

CardContent.propTypes = {
    apurl: PropTypes.string.isRequired,
  };


export default withStyles(styles)(CardContent);