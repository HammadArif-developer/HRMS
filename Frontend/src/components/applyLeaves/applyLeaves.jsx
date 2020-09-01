import React, { Component } from "react";
import "./applyLeaves.css";
import TextField from "@material-ui/core/TextField";
import Navbar from "../userNavbar/navbar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { green } from "@material-ui/core/colors";
import axios from "axios";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { Link } from "react-router-dom";
//borrowed code for textfields and datepicker from material-ui and modified them to fit our apps need.
//color theme provide to buttons.
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
class applyLeave extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: "",
      Department: "",
      HOD: "",
      fromDate: new Date(),
      toDate: new Date(),
      type: "",
      reason: "",
      loggedIn: true,
      open: false
    };
    this.inputChange = this.inputChange.bind(this);
    this.handleFromDateChange = this.handleFromDateChange.bind(this);
    this.handleToDateChange = this.handleToDateChange.bind(this);
  }
// for state management. setting loggedin value according to the token which is null in case user hasn't log in through credentials. Basically for security.
  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token === null) {
      this.setState({
        loggedIn: false,
      });
    }
  }
//setting state to new input values.
  handleFromDateChange(date) {
    this.setState({
      fromDate: date,
    });
  }
  handleToDateChange(date) {
    this.setState({
      toDate: date,
    });
  }
  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({
      open: true,
    });
    this.props.history.push("/user_dashboard");
  };
  inputChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
//sending input data to backend
  onClickApply(event) {
    event.preventDefault();
    var apiBaseUrl = "http://3.8.136.131:4000/api/";
    var self = this;
    var payload = {
      userId: localStorage.getItem("user_id"),
      currentDate: new Date(),
      fromDate: this.state.fromDate,
      toDate: this.state.toDate,
      type: this.state.type,
      reason: this.state.reason,
    };
    axios.post(apiBaseUrl + "apply_leave", payload).then(function (response) {
      if (response.data.code === 200) {
        self.setState({
          open: true,
        });
      }
    });
    return;
  }
//routing user back to dashboard on clicking cancel
  onClickCancel(event) {
    this.props.history.push("/user_dashboard");
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
            <h1>Apply for Leave</h1>
            <Typography
              component="div"
              style={{ backgroundColor: "#fff", height: "auto" }}
            >
              <form>
                <div className="formContainer">
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      required
                      autoOk
                      name='fromDate'
                      variant="inline"
                      inputVariant="outlined"
                      label="From"
                      format="yyyy/MM/dd"
                      value={this.state.fromDate}
                      InputAdornmentProps={{ position: "start" }}
                      onChange={(date) => this.handleFromDateChange(date)}
                    />
                  </MuiPickersUtilsProvider>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      required
                      autoOk
                      name="toDate"
                      variant="inline"
                      inputVariant="outlined"
                      label="To"
                      format="yyyy/MM/dd"
                      value={this.state.toDate}
                      InputAdornmentProps={{ position: "start" }}
                      onChange={(date) => this.handleToDateChange(date)}
                    />
                  </MuiPickersUtilsProvider>
                  <FormControl
                    required
                    variant="outlined"
                    className="typeDropdown"
                  >
                    <InputLabel id="demo-simple-select-outlined-label">
                      Type
                    </InputLabel>
                    <Select
                      name="type"
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={this.state.type}
                      onChange={this.inputChange}
                      label="Type"
                    >
                      <MenuItem value={"Medical"}>Medical</MenuItem>
                      <MenuItem value={"Unpaid"}>Unpaid</MenuItem>
                      <MenuItem value={"Maternity"}>Maternity</MenuItem>
                      <MenuItem value={"Paternity"}>Paternity</MenuItem>
                      <MenuItem value={"Sick"}>Sick</MenuItem>
                      <MenuItem value={"Annual"}>Annual</MenuItem>
                      <MenuItem value={"Other"}>Other</MenuItem>
                      
                    </Select>
                  </FormControl>
                  <TextField
                    className="reasonInput"
                    required
                    name="reason"
                    id="outlined-multiline-static"
                    label="reason"
                    rows={4}
                    multiline
                    variant="outlined"
                    defaultValue=""
                    onChange={this.inputChange}
                  />{" "}
                </div>
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
                        Request sent successfully!
                      </Alert>
                    </Snackbar>
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
                onClick={this.onClickApply.bind(this)}
              >
                Apply
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

export default applyLeave;
