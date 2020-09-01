import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import axios from "axios";
import {  withRouter } from "react-router-dom";
// The Table was borrowed from www.material-ui.com and was altered according to our needs

// Setting Table Columns here
const columns = [
{
    id: "requested_on",
    label: "Requested On",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString(),
    },
  { id: "from_date", 
    label: "From Date", 
    minWidth: 170 ,
    align: "center",},
  {
    id: "to_date",
    label: "To Date",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString(),
  },
  {
    id: "type",
    label: "Type",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString(),
  },
  {
    id: "status",
    label: "Status",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString(),
  },
];

// React component which will fetch data from the backend and display it in the Table
class viewAppliedLeavesTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
    };
    
  }
//   Receiving data from the backend
  componentDidMount() {
    var apiBaseUrl = "http://3.8.136.131:4000/api/";
    var self = this;
    var payload = {
      msg: "Show Previous Leaves Data",
    };
    axios.post(apiBaseUrl + "view_applied_leaves", payload).then(function (response) {
      self.setState({
        rows: response.data,
      });
    });
    return;
  }
//   Displaying the required data using the helper functions defined above. 
  render() {
    return (
      <Paper>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.rows.map((row) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.code}
                    
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    );
  }
}
export default withRouter(viewAppliedLeavesTable);