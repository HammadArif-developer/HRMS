import React, { Component } from "react";
import "./editPersonalInfo.css";
import TextField from "@material-ui/core/TextField";
import Navbar from "../userNavbar/navbar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { green } from "@material-ui/core/colors";
import { Link } from "react-router-dom";
import axios from "axios";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import DateFnsUtils from "@date-io/date-fns";

//above components and code for them borrowed from material-ui and modified to fit our code
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});
class editPersonalInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: "",
      name: "",
      phone: "",
      address: "",
      email: "",
      status: "",
      nationality: "",
      bloodType: "",
      dob: "",
      gender: "",

      loggedIn: true,
    };
    this.inputChange = this.inputChange.bind(this);
  }
  // updates the dropdown value
  handleGenderChange(gender) {
    this.setState({
      gender: gender,
    });
  }
  // updates the date
  handleDateChange(date) {
    this.setState({
      dob: date,
    });
  }
  //this functions update the value to what is typed in the box
  inputChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  onClickSave(event) {
    var apiBaseUrl = "http://3.8.136.131:4000/api/";
    //updated user info being sent to server here
    var payload = {
      Message: "updated info user",
      Id: this.state.user_id,
      Name: this.state.name,
      Email: this.state.email,
      phoneNumber: this.state.phone,
      maritalStatus: this.state.status,
      bloodGroup: this.state.bloodType,
      nationality: this.state.nationality,
      location: this.state.location,
      address: this.state.address,
      gender: this.state.gender,
      dob: this.state.dob,
    };

    axios
      .post(apiBaseUrl + "edit_user_info", payload)
      .then(function (response) {});
    this.props.history.push("/view_personal_info");
  }
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
      Message: "give employee info",
      Id: localStorage.getItem("user_id"),
    };
    axios
      //current data of user being fetched from server here
      .post(apiBaseUrl + "edit_user_info", payload)
      .then(function (response) {
        // console.log("data aaya", response.data);
        self.setState({
          user_id: response.data.user.user_id,
          name: response.data.user.full_name.toString(),
          phone: response.data.user.contact_no.toString(),
          address: response.data.user.address.toString(),
          email: response.data.user.email.toString(),
          status: response.data.user.marital_status.toString(),
          gender: response.data.user.gender.toString(),
          dob: response.data.user.dob.toString(),
          nationality: response.data.user.nationality.toString(),
          bloodType: response.data.user.blood_type.toString(),
        });
      });
  }

  onClickCancel(event) {
    this.props.history.push("/view_personal_info");
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
            <h1>Edit Personal Info</h1>
            <Typography
              component="div"
              style={{ backgroundColor: "#fff", height: "auto" }}
            >
              {/* text fields begin here*/}
              {/* helper text in each field displays the current data of user */}
              <form className="formContainer">
                <div className="myForm">
                  <TextField
                    name="name"
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                    helperText={this.state.name}
                    onChange={this.inputChange}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    helperText={this.state.email}
                    onChange={this.inputChange}
                    name="email"
                  />
                  <TextField
                    id="outlined-basic"
                    label="Phone Number"
                    variant="outlined"
                    helperText={this.state.phone}
                    onChange={this.inputChange}
                    name="phone"
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
                      {/* values of dropdown */}
                      <MenuItem value={"M"}>M</MenuItem>
                      <MenuItem value={"F"}>F</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    id="outlined-basic"
                    label="Marital Status"
                    variant="outlined"
                    helperText={this.state.status}
                    onChange={this.inputChange}
                    name="status"
                  />
                  <TextField
                    id="outlined-basic"
                    label="Blood Group"
                    variant="outlined"
                    helperText={this.state.bloodType}
                    onChange={this.inputChange}
                    name="bloodType"
                  />
                  <TextField
                    name="nationality"
                    id="outlined-basic"
                    label="Nationality"
                    variant="outlined"
                    helperText={this.state.nationality}
                    onChange={this.inputChange}
                  />

                  <TextField
                    name="address"
                    id="outlined-multiline-static"
                    label="Address"
                    rows={4}
                    multiline
                    variant="outlined"
                    helperText={this.state.address}
                    onChange={this.inputChange}
                  />
                </div>
              </form>
            </Typography>
          </Container>
          <div className="centerplacing">
            {/* buttons to perform the save and cancel function */}
            <ThemeProvider theme={theme}>
              <Button
                variant="contained"
                size="small"
                color="primary"
                className="margin"
                onClick={this.onClickSave.bind(this)}
              >
                Save
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
export default editPersonalInfo;
