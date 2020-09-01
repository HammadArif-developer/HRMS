import React, { Component } from "react";
import "./editDepartment.css";
import TextField from "@material-ui/core/TextField";
import Navbar from "../adminNavbar/navbar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { green } from "@material-ui/core/colors";
import { Link } from "react-router-dom";

const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});

class editDepartment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: true,
    };
  }
  componentDidMount() {
    const token = localStorage.getItem("token");
    if(token === null) {
      this.setState({
        loggedIn: false,
      });
    }
  }
  onClickSave(event) {
    this.props.history.push("/department");
  }
  onClickCancel(event) {
    this.props.history.push("/department");
  }
  render() {
    if(this.state.loggedIn === false) {
      return <Link to="/" style={{ textDecoration: "none" }}>You are not LoggedIn( Click Here )</Link>
    }
    return (
      <div>
        <Navbar />
        <div className="ContainerPlacing">
          <Container fixed>
            <h1>Edit Department Information</h1>
            <Typography
              component="div"
              style={{ backgroundColor: "#fff", height: "auto" }}
            >
              <form className="formContainer">
                <div className="myForm">
                  
                  <TextField
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                    defaultValue="Finance"
                  />
                  <TextField
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    defaultValue="finance@mylums.edu.pk"
                  />
                  <TextField
                    id="outlined-basic"
                    label="Extension Code"
                    variant="outlined"
                    defaultValue="090078601"
                  />
                  <TextField
                    id="outlined-basic"
                    label="Head of Department"
                    variant="outlined"
                    defaultValue="Babar Ali"
                  />
                  <TextField
                    id="outlined-basic"
                    label="Email HOD"
                    variant="outlined"
                    defaultValue="babar@mylums.edu.pk"
                  />
                  <TextField
                    id="outlined-basic"
                    label="Phone Number HOD"
                    variant="outlined"
                    defaultValue="03001234567"
                  />{" "}
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
export default editDepartment;
