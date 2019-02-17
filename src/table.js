import React from "react";
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import DraggableTable from "./DraggableTable";
import {isEmpty} from './usefulfunctions.js';

let counter = 0;
export function createDataArr(columns, arr) {
    counter++;
    let obj = {};
    let id = {id: counter};
    Object.assign(obj, id);
    let i = 0;
    for(i; i < arr.length; i++){
        var key = columns[i];
        var temp= {};
        temp[key] = arr[i];
        Object.assign(obj, temp);
    }
    return obj;
}


class EnhancedTableHead extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data:   this.props.data 
  }
  this.columndata = this.columndata.bind(this);
}


columndata(){
  let columns = [];
  let i = 0;
  for(i; i < this.props.columns.length; i++){
    let displayColumns;
    if (isEmpty(this.props.displayColumns)){
      displayColumns = this.props.columns[i];
    } else{
      displayColumns = this.props.displayColumns[i];
    }
     columns.push({
          Header: displayColumns,
          accessor: this.props.columns[i]
      });
  };
  return columns;
}

render(){
    const { data } = this.state;
    let fieldMap = this.props.columns;

    let heads = this.props.columns;
    let columns = this.columndata();
    
    return (
      <div>
        
        <Typography paragraph style={{ textAlign: "center" }}>
          Tip: Hold shift when sorting to multi-sort!
        </Typography>
        <br />
        <DraggableTable
          rows={data}
          columns={columns}
          defaultPageSize={this.props.defaultPageSize}
          className="-striped -highlight"
        />
        
      </div>
    );
  }
}

EnhancedTableHead.propTypes = {
  data: PropTypes.object.isRequired,
  columns: PropTypes.object.isRequired,
  defaultPageSize: PropTypes.number,
  displayColumns: PropTypes.object
}

EnhancedTableHead.defaultProps = {
  defaultPageSize: 5,
  displayColumns: []
}
export default EnhancedTableHead;
