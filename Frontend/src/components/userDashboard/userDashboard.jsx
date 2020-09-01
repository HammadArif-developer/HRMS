import React, { Component } from "react";
import "./userDashboard.css";
import Button from "@material-ui/core/Button";
import Navbar from "../userNavbar/navbar";
import Clock from "../clock/clock";
import Piechart from "../piechart/piechart";
import { Link } from "react-router-dom";

//buttons were borrowed from material-ui.com and modified

class userDashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        userID: "",
        userType: "",
      },
      loggedIn: true,
    };
  }
  //being checked here if user has logged in or not
  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token === null) {
      this.setState({
        loggedIn: false,
      });
    }
  }
  //user being redirected according to the button they have pressed
  onClickPersonalInfo(event) {
    this.props.history.push("/view_personal_info");
  }
  onClickViewAssignedTasks() {
    // console.log(userclass.returnUser());
    // console.log("abhi krna hai");
    this.props.history.push("/view_assigned_task");
  }
  onClickToDoTasks() {
    // console.log("abhi krna hai");
    this.props.history.push("/to_do_task");
  }
  onClickAssignTasks() {
    // console.log("abhi krna hai");
    this.props.history.push("/assign_task");
  }
  onClickCalendar(event) {
    this.props.history.push("/calendar");
  }
  onClickLeave(event) {
    this.props.history.push("/apply_leaves");
  }
  onClickAttendance(event) {
    this.props.history.push("/attendance");
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
      <React.Fragment>
        <Navbar />
        <div>
          {/* clock and piechart being rendered here */}
          <div className="clockContainer">
            <div className="clock">
              <Clock />
            </div>
            <button
              className="piechart"
              onClick={this.onClickAttendance.bind(this)}
            >
              <h1>Attendance</h1>
              <Piechart />
            </button>
          </div>
          <div className="positioning">
            <div className="userDashboard">
              {/* dashboard buttons begin here */}
              <Button
                variant="contained"
                style={{
                  marginLeft: "10%",
                  // marginTop: "50px",
                  minWidth: "130px",
                  minHeight: "130px",
                  maxWidth: "130px",
                  maxHeight: "130px",
                  background: "#292770",
                  borderRadius: "30px",
                  fontSize: "1em",
                }}
                color="default"
                onClick={this.onClickAssignTasks.bind(this)}
              >
                Assign Tasks
              </Button>
              <Button
                variant="contained"
                style={{
                  marginLeft: "10%",
                  // marginTop: "50px",
                  minWidth: "130px",
                  minHeight: "130px",
                  maxWidth: "130px",
                  maxHeight: "130px",
                  background: "#292770",
                  borderRadius: "30px",
                  fontSize: "1em",
                }}
                color="default"
                onClick={this.onClickViewAssignedTasks.bind(this)}
              >
                View Assigned Tasks
              </Button>
              <Button
                variant="contained"
                style={{
                  marginLeft: "10%",
                  // marginTop: "50px",
                  minWidth: "130px",
                  minHeight: "130px",
                  maxWidth: "130px",
                  maxHeight: "130px",
                  background: "#292770",
                  borderRadius: "30px",
                  fontSize: "1em",
                }}
                color="default"
                onClick={this.onClickToDoTasks.bind(this)}
              >
                To Do Tasks
              </Button>

              <Button
                variant="contained"
                style={{
                  marginLeft: "10%",
                  marginTop: "50px",
                  minWidth: "130px",
                  minHeight: "130px",
                  maxWidth: "130px",
                  maxHeight: "130px",
                  background: "#292770",
                  borderRadius: "30px",
                  fontSize: "1em",
                }}
                color="default"
                onClick={this.onClickCalendar.bind(this)}
              >
                Calendar
              </Button>
              <Button
                variant="contained"
                style={{
                  marginLeft: "10%",
                  marginTop: "50px",
                  minWidth: "130px",
                  minHeight: "130px",
                  maxWidth: "130px",
                  maxHeight: "130px",
                  background: "#292770",
                  borderRadius: "30px",
                  fontSize: "1em",
                }}
                color="default"
                onClick={this.onClickLeave.bind(this)}
              >
               Apply for Leave
              </Button>
              <Button
                variant="contained"
                style={{
                  marginLeft: "10%",
                  marginTop: "50px",
                  minWidth: "130px",
                  minHeight: "130px",
                  maxWidth: "130px",
                  maxHeight: "130px",
                  background: "#292770",
                  borderRadius: "30px",
                  fontSize: "1em",
                }}
                color="default"
                onClick={this.onClickPersonalInfo.bind(this)}
              >
                Personal Info
              </Button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default userDashBoard;
