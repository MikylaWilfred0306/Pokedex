import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import Popup from "reactjs-popup";
import {jsUcfirst} from './Components/Functions/usefulfunctions';
import './Components/StyleSheets/popup.css'


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
            flavor_text_entries: "",
        };
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
                        dataThing.flavor_text_entries.map((html) => {
                          if (html.language.name =="en" && thisfLAG){
                            this.setState({ flavor_text_entries: html.flavor_text});
                            thisfLAG = false;
                          }
                         })     


                         
                      })
                    .catch(error => console.error(error));

                
                this.setState({ picture: 'https://img.pokemondb.net/artwork/' + data.name + '.jpg'})
                data.types.map((html) => {
                    this.state.types.push(html.type.name);          

                })   
                
                data.abilities.map((html) => {
                  this.state.ability.push(html.ability.name);          

              })       
            })
        .catch(error => console.error(error));
    }    
    

    render (){            
          const { classes } = this.props;
            return (   
                <div className="example-warper">
                <Popup
                  trigger={<IconButton className={classes.icon}> <InfoIcon /> </IconButton>}
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
                    {nameDisplay(this.state.ability)}
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, a
                    nostrum. Dolorem, repellat quidem ut, minima sint vel eveniet
                    quibusdam voluptates delectus doloremque, explicabo tempore dicta
                    adipisci fugit amet dignissimos?
                    <br />
                    {this.props.apurl}
                    </div>
                    <div className="actions">
                    <Popup
                        trigger={<button className="button"> Menu Demo </button>}
                        position="top center"
                        closeOnDocumentClick
                        contentStyle={{ padding: "0px", border: "none" }}
                    >
                        <div className="menu">
                        <div className="menu-item"> Menu item 1</div>
                        <div className="menu-item"> Menu item 2</div>
                        <div className="menu-item"> Menu item 3</div>
                        <Popup
                            trigger={<div className="menu-item"> sup Menu </div>}
                            position="right top"
                            on="hover"
                            closeOnDocumentClick
                            mouseLeaveDelay={300}
                            mouseEnterDelay={0}
                            contentStyle={{ padding: "0px", border: "none" }}
                            arrow={false}
                        >
                            <div className="menu">
                            <div className="menu-item"> item 1</div>
                            <div className="menu-item"> item 2</div>
                            <div className="menu-item"> item 3</div>
                            </div>
                        </Popup>
                        <div className="menu-item"> Menu item 4</div>
                        </div>
                    </Popup>
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