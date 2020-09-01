import React, { Component } from "react";
import "./viewPersonalInfo.css";
import Navbar from "../userNavbar/navbar";
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
class viewPersonalInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      phone: "",
      address: "",
      email: "",
      cnic: "",
      dob: "",
      gender: "",
      status: "",
      dept: "",
      job: "",
      loc: "",
      nationality: "",
      bloodgrp: "",
      loggedIn: true,
    };
  }
  onClickEditUser(event) {
    this.props.history.push("/edit_personal_info");
  }
  // checking for the login state/
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
      msg: "Send Data",
      id: localStorage.getItem("user_id"),
    };
    axios
      // data being fetched from server here
      .post(apiBaseUrl + "view_personal_info", payload)
      .then(function (response) {
        self.setState({
          name: response.data[0].full_name,
          phone: response.data[0].contact_no,
          address: response.data[0].address,
          email: response.data[0].email,
          cnic: response.data[0].cnic,
          dob: response.data[0].dob,
          gender: response.data[0].gender,
          status: response.data[0].marital_status,
          dept: response.data[0].department,
          job: response.data[0].job_title,
          loc: response.data[0].location,
          nationality: response.data[0].nationality,
          bloodgrp: response.data[0].blood_type,
        });
      });

    return;
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
            <h1>Personal Info</h1>
            <Typography
              component="div"
              style={{ backgroundColor: "#fff", height: "auto" }}
            >
              {/* data being displayed here */}
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
                        <b>Phone Number:</b>
                      </h5>
                      <h4>{this.state.phone}</h4>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h5>
                        <b>CNIC:</b>
                      </h5>
                      <h4> {this.state.cnic}</h4>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h5>
                        <b>D.O.B:</b>
                      </h5>
                      <h4>{this.state.dob}</h4>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h5>
                        <b>Marital Status:</b>
                      </h5>
                      <h4> {this.state.status}</h4>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h5>
                        <b>Blood Group:</b>
                      </h5>
                      <h4> {this.state.bloodgrp}</h4>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h5>
                        <b>Job Title:</b>
                      </h5>
                      <h4> {this.state.job}</h4>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h5>
                        <b>Department:</b>
                      </h5>
                      <h4> {this.state.dept}</h4>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h5>
                        <b>Location:</b>
                      </h5>
                      <h4> {this.state.loc}</h4>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h5>
                        <b>Nationality:</b>
                      </h5>
                      <h4> {this.state.nationality}</h4>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h5>
                        <b>Address:</b>
                      </h5>
                      <h4> {this.state.address}</h4>
                    </div>
                  </li>
                </ul>
              </div>
            </Typography>
          </Container>
          <div className="centerplacing">
            <ThemeProvider theme={theme}>
              <Button
                variant="contained"
                size="small"
                color="primary"
                className="margin"
                onClick={this.onClickEditUser.bind(this)}
              >
                Edit
              </Button>
            </ThemeProvider>
          </div>
        </div>
      </div>
    );
  }
}
export default viewPersonalInfo;
