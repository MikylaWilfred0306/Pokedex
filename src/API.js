import React, { Component } from 'react';
import EnhancedTableHead, {createDataArr} from './table.js';
import {jsUcfirst} from './usefulfunctions.js';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
});
class API extends Component {
    constructor(props)
    {
        super();
        this.state = {
            testers: [], 
            loading: true,
            columns: ["name", "url"],
            dcolumns: ["Pokemon Name", "API Url"]
        };
    }

    componentDidMount() {
        fetch('https://pokeapi.co/api/v2/pokemon?limit=100')
                .then(results => {return results.json();}
                )
                .then(data => {
                data.results.map((html) => {
                   let arr = [jsUcfirst(html.name),html.url];
                   this.state.testers.push(createDataArr(this.state.columns, arr));
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
            <EnhancedTableHead data={this.state.testers} columns={this.state.columns} displayColumns={this.state.dcolumns} />
        </div>
      );
  }
}


export default withStyles(styles, { withTheme: true })(API);