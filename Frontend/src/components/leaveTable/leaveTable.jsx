import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import axios from "axios";
import { withRouter } from "react-router-dom";

//above components were borrowed from material-ui.com and modified to fit our code
//properties of table defined here
const columns = [
  { id: "requested_by", label: "ID", minWidth: 170 },
  { id: "full_name", label: "Name", minWidth: 170 },
  {
    id: "department",
    label: "Department",
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
];

//react component begins here
class leaveRequestTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
    };
    this.onClickViewRequest = this.onClickViewRequest.bind(this);
  }
  //data being fetched from server here
  onClickViewRequest(row) {
    var apiBaseUrl = "http://3.8.136.131:4000/api/";
    var payload = {
      request_id: row.request_id,
      full_name: row.full_name,
      department_id: row.department_id,
      department: row.department,
    };
    console.log(payload);
    axios
      .post(apiBaseUrl + "view_leave_request", payload)
      .then(function (response) {
        // console.log(response.data);
      });
    this.props.history.push("/view_leave_request");
  }
  componentDidMount() {
    var apiBaseUrl = "http://3.8.136.131:4000/api/";
    var self = this;
    var payload = {
      msg: "Send Data",
    };
    axios.post(apiBaseUrl + "leaves", payload).then(function (response) {
      self.setState({
        rows: response.data,
      });
    });
    return;
  }
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
              {/* data from server being mapped to table here */}
              {this.state.rows.map((row) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.code}
                    onClick={(e) => this.onClickViewRequest(row)}
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
export default withRouter(leaveRequestTable);
