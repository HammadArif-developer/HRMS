import React, { Component } from "react";
import "./pendingLeaveRequests.css";
import Navbar from "../adminNavbar/navbar";
import Form from "../leaveTable/leaveTable";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

class pendingLeaveRequests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: true,
    };
  }

  //checking if user is already logged in
  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token === null) {
      this.setState({
        loggedIn: false,
      });
    }
  }
  // user being redirected to add user screen
  onClickAddUser(event) {
    this.props.history.push("/add_user");
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
        <div className="formplacing">
          <h1>Pending Leave Requests</h1>
          <Form />
        </div>
      </div>
    );
  }
}
export default withRouter(pendingLeaveRequests);
