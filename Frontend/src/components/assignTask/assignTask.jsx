import React, { Component } from "react";
import "./assignTask.css";
import TextField from "@material-ui/core/TextField";
import Navbar from "../userNavbar/navbar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { green } from "@material-ui/core/colors";
import axios from 'axios';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
  } from "@material-ui/pickers";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import DateFnsUtils from "@date-io/date-fns";
import Calendar from "../calendar/calendar";
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { Link } from "react-router-dom";
//code borrowed from material-ui for snackbar and alert pop up.
//color theme provided to button.
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
class assignTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subordinateList: [],
      subordinateDictionary: {},
      priorityList: ['Low', 'Medium', 'High'],
      priority: 'Low',
      taskName : '',
      deadline: new Date(),
      assignee: '',
      assignedOn: new Date(),
      loggedIn: true,
      open: false
    };
    this.inputChange = this.inputChange.bind(this);
    this.handleDateChange = this.handleDeadlineChange.bind(this);
    this.subordinateChange = this.subordinateChange.bind(this);
  }
  handleDeadlineChange(date) {
    this.setState({
      deadline: date,
    });
  }
  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({
      open: true,
    });
    this.props.history.push("/view_assigned_task");
  };
    subordinateChange(e) {
        this.setState({
          assignee: this.state.subordinateDictionary[e.target.value],
        });
      }

  inputChange(e) {
    this.setState({
        [e.target.name] : e.target.value
    });
  }
  
// for state management. setting loggedin value according to the token which is null in case user hasn't log in through credentials. Basically for security.
//fetching subordiante list from the server for the user.
componentDidMount() {
  const token = localStorage.getItem("token");
  console.log(localStorage.getItem("user_id"));
  if(token === null) {
    this.setState({
      loggedIn: false,
    });
  }
  var apiBaseUrl =  "http://3.8.136.131:4000/api/";
  var self = this;
  var payload = {
      'message': 'subordinates',
      'userId': localStorage.getItem("user_id"),
  }
  axios.post(apiBaseUrl+'assign_task', payload)
  .then(function(response){
      self.setState({
        subordinateDictionary: response.data.dict,
        subordinateList: response.data.list
      });
  })
}
  onClickAssign(event) {
    event.preventDefault()
    var apiBaseUrl =  "http://3.8.136.131:4000/api/";
    var self = this;
    var payload = {
        'user_id': localStorage.getItem("user_id"),
        'description': this.state.taskName,
        'deadline' : this.state.deadline,
        'priority': this.state.priority,
        'assigned_to': this.state.assignee,
        'assigned_on': this.state.assignedOn
        // 'assigned_on': date,
        // 'type': this.state.type,
        // 'reason': this.state.reason,
    }
    axios.post(apiBaseUrl+'assign_task', payload)
    .then(function(response){
        if (response.data.code === 200) {
          self.setState({
            open: true,
          });
        }
    })
    return
  }
//routing user to pages according to their click.
  onClickCancel(event) {
    this.props.history.push("/user_dashboard");
  }
  onClickAssignTask(event) {
    this.props.history.push("/assign_task");
  }
  onClickViewAssignTask(event) {
    this.props.history.push("/view_assigned_task");
  }
  onClickToDoTask(event) {
    this.props.history.push("/to_do_task");
  }
  render() {
    if(this.state.loggedIn === false) {
      return <Link to="/" style={{ textDecoration: "none" }}>You are not LoggedIn( Click Here )</Link>
    }
    return (
      <div>
        <Navbar />
        <div className="ContainerPlacing">
        <Paper square>
              <Tabs
                indicatorColor="primary"
                textColor="primary"
                centered
              >
                <Tab label="Assign Task" onClick={this.onClickAssignTask.bind(this)}/>
                <Tab label="View Assigned Task"  onClick={this.onClickViewAssignTask.bind(this)}/>
                <Tab label="To Do Task" onClick={this.onClickToDoTask.bind(this)}/>
              </Tabs>
            </Paper>
          <Container fixed>
            <div className = "heading">
            <h1>Assign Task</h1></div>
            <Typography
              component="div"
              style={{ backgroundColor: "#fff", height: "auto" }}
            >
             
              
              <form>
                
                <div className="formpositioning">
                
                <div className="myform">
                  
                  <TextField
                    required
                    name="taskName"
                    id="outlined-basic"
                    label="Task Name"
                    variant="outlined"
                    defaultValue=""
                    onChange = {this.inputChange}
                  />
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      required
                      autoOk
                      variant="inline"
                      inputVariant="outlined"
                      label="Deadline"
                      format="yyyy/MM/dd"
                      value={this.state.toDate}
                      InputAdornmentProps={{ position: "start" }}
                      onChange={(date) => this.handleDeadlineChange(date)}
                    />
                  </MuiPickersUtilsProvider>
                  
                  <FormControl
                    variant="outlined"
                    className="priorityDropdown"
                    required
                  >
                    <InputLabel id="demo-simple-select-outlined-label">
                      Priority
                    </InputLabel>
                    <Select
                      name="priority"
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={this.state.priority}
                      onChange = {this.inputChange}
                      label="Priority"
                    >
                      {this.state.priorityList.map((d) => {
                        return <MenuItem value={d}>{d}</MenuItem>;
                      })}
                    </Select>
                  </FormControl>
                  
                  <FormControl
                    variant="outlined"
                    className="priorityDropdown"
                    required
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
                        Task Assigned!
                      </Alert>
                    </Snackbar>
                  </div>
                    <InputLabel id="demo-simple-select-outlined-label">
                      Assignee
                    </InputLabel>
                    <Select
                      name="assignee"
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={this.state.assignee}
                      onChange = {this.subordinateChange}
                      label="Assignee"
                    >
                      {this.state.subordinateList.map((d) => {
                        return <MenuItem value={d}>{d}</MenuItem>;
                      })}
                    </Select>
                  </FormControl>

                </div>
                <div className="cal">
                  <Calendar/>
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
                onClick={this.onClickAssign.bind(this)}
              >
                Assign
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

export default assignTask;
