import React, { Component } from "react";
import "./accountSettings.css";
import TextField from "@material-ui/core/TextField";
import Navbar from "../adminNavbar/navbar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { green } from "@material-ui/core/colors";
import axios from "axios";
import { Link } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
// Alert and SnackBar code is taken from maetrial-ui and we modified it to adjust with our screens.
// Styling for alert pop up.
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
//color assigned green to button from material-ui
const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});
//class created for edit user
class accountSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: "",
      newPassword: "",
      confirmNewPassword: "",
      oldPasswordTyped: "",
      loggedIn: true,
      errorMessageNewNotMatch: "",
      errorMessageOldNotMatch: "",
      open: false,
    };
    this.inputChange = this.inputChange.bind(this);
  }
//to close the alert pop up and history is used to redirect to admin or user according to their credentials.
  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({
      open: true,
    });

    if (localStorage.getItem("user_id") === "admin") {
      this.props.history.push("/admin_dashboard");
    } else {
      this.props.history.push("/user_dashboard");
    }
  };
//assigning input value to state variables
  inputChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
//sending data to backend to update new password in sql database.
  onClickSave(event) {
    if (this.state.newPassword !== this.state.confirmNewPassword) {
      this.setState({
        errorMessageNewNotMatch: "Passwords do not match",
      });
      return;
    }
    var apiBaseUrl = "http://3.8.136.131:4000/api/";
    var self = this;
    var payload = {
      Message: "updated password",
      Id: localStorage.getItem("user_id"),
      oldPasswordTyped: this.state.oldPasswordTyped,
      newPassword: this.state.newPassword,
      confirmNewPassword: this.state.confirmNewPassword,
    };

    axios
      .post(apiBaseUrl + "account_settings", payload)
      .then(function (response) {
        if (response.data.message === "Incorrect password") {
          self.setState({
            errorMessageOldNotMatch: "Incorrect Password",
          });
        } else {
          self.setState({
            open: true,
          });
        }
      });
  }
  onClickCancel(event) {
    if (localStorage.getItem("user_id") === "admin") {
      this.props.history.push("/admin_dashboard");
    } else {
      this.props.history.push("/user_dashboard");
    }
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
            <h1>Account Settings</h1>
            <Typography
              component="div"
              style={{ backgroundColor: "#fff", height: "auto" }}
            >
              <form className="formContainer">
                <div className="myForm">
                  <div className="textfield">
                    <TextField
                      required
                      name="oldPasswordTyped"
                      id="outlined-basic"
                      type="password"
                      label="Old Password"
                      variant="outlined"
                      onChange={this.inputChange}
                    />
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "red",
                      textAlign: "center",
                    }}
                  >
                    {this.state.errorMessageOldNotMatch}
                  </div>
                  <div className="textfield">
                    <TextField
                      required
                      name="newPassword"
                      id="outlined-basic"
                      label="New Password"
                      type="password"
                      variant="outlined"
                      onChange={this.inputChange}
                    />
                  </div>
                  <div className="textfield">
                    <TextField
                      required
                      name="confirmNewPassword"
                      id="outlined-basic"
                      label="Confirm New Password"
                      type="password"
                      variant="outlined"
                      onChange={this.inputChange}
                    />
                    <div
                      style={{
                        fontSize: 12,
                        color: "red",
                        textAlign: "center",
                      }}
                    >
                      {this.state.errorMessageNewNotMatch}
                    </div>
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
                        Password Changed Successfully!
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
export default accountSettings;
