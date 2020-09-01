import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import axios from "axios";
import { Route, withRouter } from "react-router-dom";

const columns = [
  { id: "description", label: "Task Name", minWidth: 170, align: "center" },
  { id: "assigned_on", label: "Assigned On", minWidth: 170, align: "center" },
  { id: "deadline", label: "Deadline", minWidth: 170, align: "center" },
  {
    id: "priority",
    label: "Priority",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString(),
  },
];

class viewAssignedTaskTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
    };
  }
  componentDidMount() {
    var apiBaseUrl = "http://3.8.136.131:4000/api/";
    var self = this;
    var payload = {
      msg: "Send Data",
      id: localStorage.getItem("user_id")
    };
    axios.post(apiBaseUrl + "view_todo_task", payload).then(function (response) {
      self.setState({
        rows: response.data.data,
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
export default withRouter(viewAssignedTaskTable);