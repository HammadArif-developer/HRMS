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
//the table and the code for table was borrowed from www.material-ui.com and modified to fit our needs

//setting properties of table here
const columns = [
  { id: "user_id", label: "ID", minWidth: 170 },
  { id: "full_name", label: "Name", minWidth: 170 },
  {
    id: "department",
    label: "Department",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString(),
  },
  {
    id: "job_title",
    label: "Job Title",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString(),
  },
];
//React component starts here
class table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
    };
    this.onClickAddUser = this.onClickAddUser.bind(this);
  }

  //updated data being sent to server here
  onClickAddUser(row) {
    var apiBaseUrl = "http://3.8.136.131:4000/api/";
    var payload = {
      id: row.user_id,
    };
    axios
      .post(apiBaseUrl + "view_user_info", payload)
      .then(function (response) {});
    this.props.history.push("/view_user_info");
  }

  //user data is being recieved from the backend here on page load
  componentDidMount() {
    var apiBaseUrl = "http://3.8.136.131:4000/api/";
    var self = this;
    var payload = {
      msg: "Send Data",
    };
    axios.post(apiBaseUrl + "users", payload).then(function (response) {
      self.setState({
        rows: response.data,
      });
    });
    return;
  }
  //following code defines the component the code above were the functions being used in the component
  render() {
    return (
      <Paper>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {/* table column data defined by us being mapped to table columns here */}
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
              {/* the date fetched from server being mapped to rows here */}
              {this.state.rows.map((row) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.code}
                    onClick={(e) => this.onClickAddUser(row)}
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
export default withRouter(table);
