import React, { Component } from 'react';
import {jsUcfirst} from './Components/Functions/usefulfunctions';
import { withStyles } from '@material-ui/core/styles';
import TitlebarGridList from './gridtable.js';


const styles = theme => ({
});
class API extends Component {
    constructor(props)
    {
        super();
        this.state = {
            testers: [], 
            loading: true,
        };
    }


    /*
        const tileData = [
        *   {
        *     img: image,
        *     title: 'Image',
        *     author: 'author',
        *   },
        *   {
        *     [etc...]
        *   },
        * ];
    */

    componentDidMount() {
        fetch('https://pokeapi.co/api/v2/pokemon?limit=10')
                .then(results => {return results.json();}
                )
                .then(data => {
                data.results.map((html) => {
                    let obj = {}; 
                    let url = 'https://img.pokemondb.net/artwork/' + html.name + '.jpg';
                    let img = {img: url};
                    let title = {title: jsUcfirst(html.name)};
                    let author = {author: 'Pokemon'};
                    let url_name = {url: html.url};
                    Object.assign(obj, img);
                    Object.assign(obj, title);
                    Object.assign(obj, author);
                    Object.assign(obj, url_name);
                   this.state.testers.push(obj);

                })       
            this.setState({ loading: false})
            })
        .catch(error => console.error(error));
    }
  

  render() {
    console.log(this.state.loading);
    if(this.state.loading) {
        return 'Loading...';
    } 
    return (
        <div >
             <TitlebarGridList dataArr={this.state.testers} />
        </div>
      );
  }
}


export default withStyles(styles, { withTheme: true })(API);