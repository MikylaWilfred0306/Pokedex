import React, { Component } from 'react';
import EnhancedTableHead, {createDataArr} from './table.js';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import './StyleSheets/buyRatesLoader.css'
import PropTypes from 'prop-types';


const styles = theme => ({
});


function generateKeys(obj) { 
    var hasOwn = Object.prototype.hasOwnProperty;
        var keys = [], name;
        for (name in obj) {
            if (hasOwn.call(obj, name)) {
                keys.push(name);
            }
        }
    return keys;
}

function removeColumn(arr, removeArr){
    if (removeArr.length > 0){
        var j = 0;
        for(j; j <= removeArr.length-1; j++){ 
            if(typeof removeArr[j] == 'number'){
                arr.splice(removeArr[j], 1);
            }else{
                var i = 0;
                let flag = true;
                for( i; i <= arr.length-1; i++){ 
                    if (arr[i] === removeArr[j]) {
                        arr.splice(i, 1); 
                        flag = false;
                    }               
              } 
              if (flag){
                console.log(removeArr[j] + " in remove arry, position " + j + " was not found.");
               }   
            }
            
        }
    }
    return arr;
}

class API extends Component {
    constructor(props)
    {
        super();
        this.state = {
            testers: [], 
            errorString: [], 
            loading: true,
            error: false,
            columns: [],
            count: 0
        };
    }

    componentDidMount() {
        
        fetch(this.props.url, {
            method: 'post',
            body: this.props.parameters
        })
                .then(results => {return results.json();}
                )
                .then(data => {
                let arrayColumns =  generateKeys(data.sqlReturn.Table[0]);    
                let removeArr = this.props.removeArr;
                this.setState({columns: removeColumn(arrayColumns, removeArr)});   
                this.setState({count: data.rowCount});   
                data.sqlReturn.Table.map((html) => {
                   let arr = this.state.columns;
                   let values = [];
                   arr.map((dynamicinator) => {
                     values.push(eval('html.' + dynamicinator));
                   })        
                   this.state.testers.push(createDataArr(this.state.columns, values));
                })    
            this.setState({ loading: false});
            })
        .catch(error =>  {
                console.error(error);
                this.setState({ loading: false, error: true, errorString: error});
        });
    }
  

  render() {
    
    if(this.state.loading) {
        return (
            <div class="outer">
                <Typography paragraph>
                <br></br>
                </Typography>
                <div class="loader"></div>
            </div>    
        )
    } 
   else if(this.state.error) {
        return (
            <div class="outer">
                <Typography paragraph>
                <br></br>
                &emsp;&emsp;&emsp;
                </Typography>
                <h2>An error has occured.</h2> 
            </div>    
        )
    } 
    else if (this.state.count == 0){
        return (
            <div class="outer">
                <Typography paragraph>
                <br></br>
                &emsp;&emsp;&emsp;
                </Typography>
                <h2>No rows were found.</h2>
            </div>  
            )   
    } else{
    return (
        <div >
              <div class="outer">
                <h2>{this.state.count} rows were found.</h2>
                </div>
            <EnhancedTableHead data={this.state.testers} defaultPageSize={10} columns={this.state.columns}/>
        </div>
      );
    }
  }
}


API.propTypes = {
    url : PropTypes.string.isRequired,
    parameters:  PropTypes.string.isRequired, 
    removeArr: PropTypes.array
  }
  
  API.defaultProps = {
    removeArr: []
}


export default withStyles(styles, { withTheme: true })(API);