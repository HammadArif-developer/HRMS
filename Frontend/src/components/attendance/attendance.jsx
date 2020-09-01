import React, { Component } from "react";
import "./attendance.css";
import Navbar from "../userNavbar/navbar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import Table from "../attendance/attendanceTable";
//show number of times user present , absent and on leave.
//dates, time in and time out of each day present.
class Attendance extends Component {
  constructor(props) {
    super(props);
    this.state = {
        attendance: 330,
        leaves: 25,
        absences: 10,
        loggedIn: true,
    };
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
            <h1>Attendance</h1>
            <Typography
              component="div"
              style={{ backgroundColor: "#fff", height: "auto", marginTop: "50px"}}
            >
              <div>
                <ul>
                  <li>
                    <div>
                      <h5>
                        <b>Present:</b>
                      </h5>
                      <h4> {this.state.attendance}</h4>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h5>
                        <b>Absences:</b>
                      </h5>
                      <h4> {this.state.absences}</h4>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h5>
                        <b>Leaves:</b>
                      </h5>
                      <h4>{this.state.leaves}</h4>
                    </div>
                  </li>
                </ul>
              </div>
            </Typography>
          </Container>
        </div >
        <div className="tableplacing">
        <Table/>
        </div>
      </div>
    );
  }
}
export default Attendance;