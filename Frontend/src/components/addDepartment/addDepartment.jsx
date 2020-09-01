import React, { Component } from "react";
import "./addDepartment.css";
import TextField from "@material-ui/core/TextField";
import Navbar from "../adminNavbar/navbar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { green } from "@material-ui/core/colors";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { Link } from "react-router-dom";
//front end code for adding new department.
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
class addDepartment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: "",
      Email: "",
      ExtNO: "",
      HeadofDept: "",
      hodID: "",
      loggedIn: true,
      open: false
    };
    this.inputChange = this.inputChange.bind(this);
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
  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({
      open: true,
    });
    this.props.history.push("/department");
  };
//setting states to new input values 
  inputChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
//sending the new input data for department to backend to update the mysql database.
  onClickAddUser(event) {
    event.preventDefault();
    var apiBaseUrl = "http://3.8.136.131:4000/api/";
    var self = this;
    var payload = {
      name: this.state.Name,
      email: this.state.Email,
      extNo: this.state.ExtNO,
      hod: this.state.HeadofDept,
      hodID: this.state.hodID,
    };
    axios.post(apiBaseUrl + "add_dept", payload).then(function (response) {
      if (response.data.code === 200) {
        self.setState({
          open: true,
        });
      } else if (response.data.code === 400) {
        // hod id name do not match
      }
    });
    return;
  }
//on cancel go to department main page. 
  onClickCancel(event) {
    this.props.history.push("/department");
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
            <h1>Add New Department</h1>
            <Typography
              component="div"
              style={{ backgroundColor: "#fff", height: "auto" }}
            >
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
                        Department added Successfully!
                      </Alert>
                    </Snackbar>
                  </div>
              <form>
                <div className="formContainer">
                  <TextField
                    required
                    name="Name"
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                    defaultValue=""
                    margin="auto"
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
                    name="ExtNO"
                    id="outlined-basic"
                    label="Extension Code"
                    variant="outlined"
                    defaultValue=""
                    onChange={this.inputChange}
                  />
                  <TextField
                    required
                    name="HeadofDept"
                    id="outlined-basic"
                    label="HOD Name"
                    variant="outlined"
                    defaultValue=""
                    onChange={this.inputChange}
                  />
                  {
                    <TextField
                      required
                      name="hodID"
                      id="outlined-basic"
                      label="HOD ID"
                      variant="outlined"
                      defaultValue=""
                      onChange={this.inputChange}
                    />
                  }{" "}
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

export default addDepartment;
