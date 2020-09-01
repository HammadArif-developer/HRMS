import React, { Component } from "react";
import "./viewDepartmentInfo.css";
import Navbar from "../adminNavbar/navbar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { green } from "@material-ui/core/colors";
import axios from "axios";
import { Link } from "react-router-dom";

const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});

class viewDepartmentInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: true,
    };
  }
  onClickEditDepartment(event) {
    this.props.history.push("/edit_department");
  }
  onClickviewDepartmentInfo(event) {
    this.props.history.push("/department");
  }
  componentDidMount() {
    const token = localStorage.getItem("token");
    if(token === null) {
      this.setState({
        loggedIn: false,
      });
    }
    var apiBaseUrl = "http://3.8.136.131:4000/api/";
    var self = this;
    var payload = {
      msg: "Send Data",
    };
    axios.post(apiBaseUrl + "view_dept_info", payload).then(function (response) {
      self.setState({
        name: response.data.dept_name,
        email: response.data.email,
        hod: response.data.hod,
        extension_code: response.data.extension_code,
        hod_phone: response.data.hod_phone,
        hod_email: response.data.hod_email
      });
    });
    return;
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
            <h1>Department Info</h1>
            <Typography
              component="div"
              className="margin2"
              style={{ backgroundColor: "#fff", height: "auto" }}
            >
              <div>
                
                <ul>
                  <li>
                    <div>
                      <h5>
                        <b>Name:</b>
                      </h5>
                        <h4> {this.state.name}</h4>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h5>
                        <b>Email:</b>
                      </h5>
                      <h4> {this.state.email}</h4>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h5>
                        <b>Extension Code:</b>
                      </h5>
                      <h4> {this.state.extension_code}</h4>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h5>
                        <b>Head of Department:</b>
                      </h5>
                      <h4> {this.state.hod}</h4>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h5>
                        <b>Email HOD:</b>
                      </h5>
                        <h4>{this.state.hod_email}</h4>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h5>
                        <b>Phone Number HOD:</b>
                      </h5>
                      <h4>{this.state.hod_phone}</h4>
                    </div>
                  </li>
                </ul>
              </div>
            </Typography>
          </Container>
          <div className="centerplacing">
            <ThemeProvider theme={theme} className="margin2">
              <Button
                variant="contained"
                size="small"
                color="primary"
                className="margin"
                onClick={this.onClickEditDepartment.bind(this)}
              >
                Edit
              </Button>

              <Button
                variant="contained"
                size="small"
                color="primary"
                className="margin"
                onClick={this.onClickviewDepartmentInfo.bind(this)}
              >
                Delete
              </Button>
            </ThemeProvider>
          </div>
        </div>
      </div>
    );
  }
}
export default viewDepartmentInfo;
