import React, { Component } from "react";
import "./adminDashboard.css";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Navbar from "../adminNavbar/navbar";
//admin dashboard frontend.
class adminDashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: true,
    };
  }
// for state management. setting loggedin value according to the token which is null in case user hasn't log in through credentials. Basically for security.
  componentDidMount() {
    const token = localStorage.getItem("token");
    if(token === null) {
      this.setState({
        loggedIn: false,
      });
    }
  }
//routing user to pages according to the button they clicked.
  onClickAccountSettings(event) {
    this.props.history.push("/account_settings")
  }
  onClickAddUser(event) {
    this.props.history.push("/add_user");
  }
  onClickDeleteUser() {
    this.props.history.push("/user");
  }
  onClickAddDepartment() {
    this.props.history.push("/add_department");
  }
  onClickDepartment() {
    this.props.history.push("/department");
  }
  onClickViewLeaveRequest() {
    this.props.history.push("/pending_leave_request");
  }
  render() {
    if(this.state.loggedIn === false) {
      return <Link to="/" style={{ textDecoration: "none" }}>You are not LoggedIn( Click Here )</Link>
    }
    return (
      <div>
        <Navbar />
        <div className="dashboard">
          <Button
            variant="contained"
            style={{
              marginLeft: "100px",
              marginTop: "100px",
              minWidth: "200px",
              minHeight: "200px",
              maxWidth: "200px",
              maxHeight: "200px",
              background: "#292770",
              borderRadius: "30px",
              fontSize: "1.5em",
            }}
            size="large"
            color="default"
            onClick={this.onClickDeleteUser.bind(this)}
          >
            Users
          </Button>
          <Button
            variant="contained"
            style={{
              marginLeft: "100px",
              marginTop: "100px",
              minWidth: "200px",
              minHeight: "200px",
              maxWidth: "200px",
              maxHeight: "200px",
              background: "#292770",
              borderRadius: "30px",
              fontSize: "1.5em",
            }}
            size="large"
            color="default"
            onClick={this.onClickDepartment.bind(this)}
          >
            Departments
          </Button>
          <Button
            variant="contained"
            style={{
              marginLeft: "100px",
              marginTop: "100px",
              minWidth: "200px",
              minHeight: "200px",
              maxWidth: "200px",
              maxHeight: "200px",
              background: "#292770",
              borderRadius: "30px",
              fontSize: "1.5em",
            }}
            size="large"
            color="default"
            onClick={this.onClickViewLeaveRequest.bind(this)}
          >
            View Leave Request
          </Button>
          <Button
            variant="contained"
            style={{
              marginLeft: "100px",
              marginTop: "100px",
              minWidth: "200px",
              minHeight: "200px",
              maxWidth: "200px",
              maxHeight: "200px",
              background: "#292770",
              borderRadius: "30px",
              fontSize: "1.5em",
            }}
            size="large"
            color="default"
            onClick={this.onClickAddUser.bind(this)}
          >
            Add User
          </Button>
          <Button
            variant="contained"
            style={{
              marginLeft: "100px",
              marginTop: "100px",
              minWidth: "200px",
              minHeight: "200px",
              maxWidth: "200px",
              maxHeight: "200px",
              background: "#292770",
              borderRadius: "30px",
              fontSize: "1.5em",
            }}
            size="large"
            color="default"
            onClick={this.onClickAddDepartment.bind(this)}
          >
            Add Department
          </Button>
          <Button
            variant="contained"
            style={{
              marginLeft: "100px",
              marginTop: "100px",
              minWidth: "200px",
              minHeight: "200px",
              maxWidth: "200px",
              maxHeight: "200px",
              background: "#292770",
              borderRadius: "30px",
              fontSize: "1.5em",
            }}
            size="large"
            color="default"
            onClick={this.onClickAccountSettings.bind(this)}

          >
            Account Settings
          </Button>
        </div>
      </div>
    );
  }
}
export default adminDashBoard;
