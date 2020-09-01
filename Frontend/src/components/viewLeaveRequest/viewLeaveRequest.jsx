import React, { Component } from "react";
import "./viewLeaveRequest.css";
import Navbar from "../adminNavbar/navbar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { green } from "@material-ui/core/colors";
import axios from "axios";
//button placing and styling
const theme = createMuiTheme({
  palette: {
    primary: green,
  },
  style:{
      height: "auto",
      margin: "auto",
  }
});
class viewLeaveRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
    };
  }
//sending decision to backend regarding the leave.
  onClickGrant(event) {
    var apiBaseUrl = "http://3.8.136.131:4000/api/";
    var payload = {
      msg : "grant leave",
      id  : this.state.id
    };
    axios.post(apiBaseUrl + "grant_deny_leave", payload).then(function (response) {
      console.log(response);
    });
    this.props.history.push("/pending_leave_request");
  }
//sending decision to backend regarding the leave.
  onClickDeny(event) {
    var apiBaseUrl = "http://3.8.136.131:4000/api/";
    var payload = {
      msg : "deny leave",
      id  : this.state.id
    };
    axios.post(apiBaseUrl + "grant_deny_leave", payload).then(function (response) {
      console.log(response);
    });
    this.props.history.push("/pending_leave_request");
  }
//routing to pending leave request page on clicking cancel button.
  onClickCancel(event) {
    this.props.history.push("/pending_leave_request");
  }
//fetching data from database to show on screen
  componentDidMount() {
    var apiBaseUrl = "http://3.8.136.131:4000/api/";
    var self = this;
    var payload = {
      msg: "Send Data"
    };
    axios.post(apiBaseUrl + "view_leave_request", payload).then(function (response) {
      console.log(response);
      self.setState({
        id: response.data.info.request_id,
        name: response.data.info.full_name,
        department: response.data.info.department,
        HOD: response.data.info.hod,
        fromDate: response.data.info.start_date.substring(0,10),
        toDate: response.data.info.end_date.substring(0,10),
        type: response.data.info.type,
        reason: response.data.info.reason,
        requestedOn: response.data.info.requested_on.substring(0,10),
      });
    });
    return;
  }
  render() {
    return (
      <div>
        <Navbar />
        <div className="ContainerPlacing">
          <Container fixed>
            <h1>Leave Request</h1>
            <Typography
              component="div"
              style={{ backgroundColor: "#fff", height: "auto" }}
              className="ContainerPlacing"
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
                        <b>Department:</b>
                      </h5>
                      <h4> {this.state.department}</h4>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h5>
                        <b>H.O.D:</b>
                      </h5>
                      <h4>{this.state.HOD}</h4>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h5>
                        <b>From Date:</b>
                      </h5>
                      <h4> {this.state.fromDate}</h4>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h5>
                        <b>To Date:</b>
                      </h5>
                      <h4>{this.state.toDate}</h4>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h5>
                        <b>Type:</b>
                      </h5>
                      <h4> {this.state.type}</h4>
                    </div>
                  </li>
                  <li>
                    <div>
            
                    </div>
                  </li>
                  <li>
                  <div>
                      <h5>
                        <b>Requested On:</b>
                      </h5>
                      <h4> {this.state.requestedOn}</h4>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h5>
                        <b>Reason:</b>
                      </h5>
                      <h4> {this.state.reason}</h4>
                    </div>
                  </li>
                  
                  
                </ul>
              </div>
            </Typography>
          </Container >
            
          
        
        <div >
            <ThemeProvider theme={theme }  >
              <Button
                variant="contained"
                size="small"
                color="primary"
                className="margin"
                onClick={this.onClickGrant.bind(this)}

              >
                Grant
              </Button>
              <Button
                variant="contained"
                size="small"
                color="primary"
                className="margin"
                onClick={this.onClickDeny.bind(this)}
              >
                Deny
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
export default viewLeaveRequest;
