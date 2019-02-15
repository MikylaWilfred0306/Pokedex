import React from "react";
import Typography from '@material-ui/core/Typography';
// Import Table
import DraggableTable from "./DraggableTable";

let counter = 0;
function createData(name, calories, fat, carbs, protein) {
    counter += 1;
    return { id: counter, name, calories, fat, carbs, protein };
  }

class EnhancedTableHead extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [
        createData('Cupcake', 305, 3.7, 67, 4.3),
        createData('Donut', 452, 25.0, 51, 4.9),
        createData('Eclair', 262, 16.0, 24, 6.0),
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
        createData('Honeycomb', 408, 3.2, 87, 6.5),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('Jelly Bean', 375, 0.0, 94, 0.0),
        createData('KitKat', 518, 26.0, 65, 7.0),
        createData('Lollipop', 392, 0.2, 98, 0.0),
        createData('Marshmallow', 318, 0, 81, 2.0),
        createData('Nougat', 360, 19.0, 9, 37.0),
        createData('Oreo', 437, 18.0, 63, 4.0),
      ]
    };
  }
  render() {
    const { data } = this.state;
    const fieldMap = ["name", "calories", "fat", "carbs", "protein"];

    const heads = ["name", "calories", "fat", "carbs", "protein"];
    const columns = [
      {
        Header: "name",
        accessor: "name"
      },
      {
        Header: "calories",
        accessor: "calories"
      },
      {
        Header: "fat",
        accessor: "fat"
      },
      {
        Header: "carbs",
        accessor: "carbs"
      },
      {
        Header: "protein",
        accessor: "protein"
      }
    ];
    return (
      <div>
        <DraggableTable
          rows={data}
          columns={columns}
          defaultPageSize={5}
          className="-striped -highlight"
        />
        <br />
        <Typography paragraph style={{ textAlign: "center" }}>
        Tip: Hold shift when sorting to multi-sort!
          </Typography>
      </div>
    );
  }
}

export default EnhancedTableHead;
