import React, { Component } from "react";
import "./addUser.css";
import TextField from "@material-ui/core/TextField";
import Navbar from "../adminNavbar/navbar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { green } from "@material-ui/core/colors";
import axios from "axios";
import DateFnsUtils from "@date-io/date-fns";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { Link } from "react-router-dom";

import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
//assigning green color to button
const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});

function Alert(props) {
  return (
    <MuiAlert
      style={{
        leftMargin: "100px",
      }}
      elevation={6}
      variant="filled"
      {...props}
    />
  );
}
class addUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      departmentDictionary: {},
      Name: "",
      Email: "",
      phoneNumber: "",
      cnic: "",
      dob: new Date(),
      maritalStatus: "",
      bloodGroup: "",
      designation: "",
      departmentList: [],
      department: "",
      nationality: "",
      location: "",
      address: "",
      gender: "",
      manager: "",
      loggedIn: true,
      open: false
    };
    this.inputChange = this.inputChange.bind(this);
  }
  handleGenderChange(gender) {
    this.setState({
      gender: gender,
    });
  }
  handleDateChange(date) {
    this.setState({
      dob: date,
    });
  }
  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({
      open: true,
    });
    this.props.history.push("/user");
  };
  inputChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
// for state management. setting loggedin value according to the token which is null in case user hasn't log in through credentials. Basically for security.
//fetching list of departments available to choose.
  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token === null) {
      this.setState({
        loggedIn: false,
      });
    }
    var apiBaseUrl = "http://3.8.136.131:4000/api/";
    var self = this;
    var payload = {
      Message: "show depts",
    };
    axios.post(apiBaseUrl + "add_user", payload).then(function (response) {
      if (response.data.code === 200) {
        var tempdept = Object.keys(response.data.dept);
        self.setState({
          departmentDictionary: response.data.dept,
          departmentList: tempdept,
        });
      }
    });
    return;
  }
//sending input data back to server to update the sqldatabase with new user.
  onClickAddUser(event) {
    event.preventDefault();
    var apiBaseUrl = "http://3.8.136.131:4000/api/";
    var self = this;
    var payload = {
      Message: "add user",
      Name: this.state.Name,
      Email: this.state.Email,
      phoneNumber: this.state.phoneNumber,
      cnic: this.state.cnic,
      dob: this.state.dob,
      maritalStatus: this.state.maritalStatus,
      bloodGroup: this.state.bloodGroup,
      designation: this.state.designation,
      department: this.state.departmentDictionary[this.state.department],
      nationality: this.state.nationality,
      location: this.state.location,
      address: this.state.address,
      gender: this.state.gender,
      manager: this.state.manager,
    };

    axios.post(apiBaseUrl + "add_user", payload).then(function (response) {
      if (response.data.code === 200) {
        //success
        self.setState({
          open: true,
        });
      }
    });
    return;
  }
//on cancelling routing back to users table.
  onClickCancel(event) {
    this.props.history.push("/user");
  }
  render() {
    if (this.state.loggedIn === false) {
      return (
        <Link to="/" style={{ textDecoration: "none" }}>
          You are not LoggedIn( Click Here )
        </Link>
      );
    }
    return (
      <div>
        <Navbar />
        <div className="ContainerPlacing">
          <Container fixed>
            <h1>Add New Employee</h1>
            <Typography
              component="div"
              style={{ backgroundColor: "#fff", height: "auto" }}
            >
              <form>
                <div className="formContainer">
                  <TextField
                    required
                    name="Name"
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                    defaultValue=""
                    onChange={this.inputChange}
                  />
                  <TextField
                    required
                    name="Email"
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    defaultValue=""
                    onChange={this.inputChange}
                  />
                  <TextField
                    required
                    name="phoneNumber"
                    id="outlined-basic"
                    label="Phone Number"
                    variant="outlined"
                    defaultValue=""
                    onChange={this.inputChange}
                  />
                  <TextField
                    required
                    name="cnic"
                    id="outlined-basic"
                    label="CNIC"
                    variant="outlined"
                    defaultValue=""
                    onChange={this.inputChange}
                  />
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      required
                      autoOk
                      variant="inline"
                      inputVariant="outlined"
                      label="D.O.B"
                      format="yyyy/MM/dd"
                      value={this.state.dob}
                      InputAdornmentProps={{ position: "start" }}
                      onChange={(date) => this.handleDateChange(date)}
                    />
                  </MuiPickersUtilsProvider>
                  <FormControl
                    required
                    variant="outlined"
                    className="departmentDropdown"
                  >
                    <InputLabel id="demo-simple-select-outlined-label">
                      Department
                    </InputLabel>
                    <Select
                      name="department"
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={this.state.department}
                      onChange={this.inputChange}
                      label="Department"
                    >
                      {this.state.departmentList.map((d) => {
                        return <MenuItem value={d}>{d}</MenuItem>;
                      })}
                    </Select>
                  </FormControl>
                  <TextField
                    required
                    name="maritalStatus"
                    id="outlined-basic"
                    label="Marital Status"
                    variant="outlined"
                    defaultValue=""
                    onChange={this.inputChange}
                  />
                  <TextField
                    required
                    name="bloodGroup"
                    id="outlined-basic"
                    label="Blood Group"
                    variant="outlined"
                    defaultValue=""
                    onChange={this.inputChange}
                  />
                  <TextField
                    required
                    name="designation"
                    id="outlined-basic"
                    label="Designation"
                    variant="outlined"
                    defaultValue=""
                    onChange={this.inputChange}
                  />
                  <FormControl
                    required
                    variant="outlined"
                    className="formControl"
                  >
                    <InputLabel id="demo-simple-select-outlined-label">
                      Gender
                    </InputLabel>
                    <Select
                      name="gender"
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={this.state.gender}
                      onChange={this.inputChange}
                      label="Gender"
                    >
                      <MenuItem value={"M"}>M</MenuItem>
                      <MenuItem value={"F"}>F</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    required
                    name="manager"
                    id="outlined-basic"
                    label="Manager"
                    variant="outlined"
                    defaultValue=""
                    onChange={this.inputChange}
                  />
                  <TextField
                    required
                    name="nationality"
                    id="outlined-basic"
                    label="Nationality"
                    variant="outlined"
                    defaultValue=""
                    onChange={this.inputChange}
                  />
                  <TextField
                    required
                    name="location"
                    id="outlined-basic"
                    label="Location"
                    variant="outlined"
                    defaultValue=""
                    onChange={this.inputChange}
                  />
                  <TextField
                    required
                    name="address"
                    id="outlined-multiline-static"
                    label="Address"
                    rows={4}
                    multiline
                    variant="outlined"
                    defaultValue=""
                    onChange={this.inputChange}
                  />{" "}
                  <div className="alert">
                    <Snackbar
                      open={this.state.open}
                      autoHideDuration={2000}
                      onClose={this.handleClose.bind(this)}
                    >
                      <Alert
                        onClose={this.handleClose.bind(this)}
                        severity="success"
                      >
                        User added Successfully!
                      </Alert>
                    </Snackbar>
                  </div>
                </div>
              </form>
            </Typography>
          </Container>
          <div className="centerplacing">
            <ThemeProvider theme={theme}>
              <Button
                variant="contained"
                size="small"
                color="primary"
                className="margin"
                onClick={this.onClickAddUser.bind(this)}
              >
                Add
              </Button>

              <Button
                variant="contained"
                size="small"
                color="primary"
                className="margin"
                onClick={this.onClickCancel.bind(this)}
              >
                Cancel
              </Button>
            </ThemeProvider>
          </div>
        </div>
      </div>
    );
  }
}

export default addUser;
