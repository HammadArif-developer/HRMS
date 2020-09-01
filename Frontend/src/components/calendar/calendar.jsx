import React, { Component } from "react";
import Navbar from "../userNavbar/navbar";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calendar.css';
import { Link } from "react-router-dom";

//used react calendar.
class calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
        date: new Date(),
        event: '',
        loggedIn: true,
    };
    this.onChangedate = this.onChangedate.bind(this);
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
//by clicking on each date it gives the event on that date.
  onChangedate= date => {
      this.setState({date})
      this.setState({
          event: '*event on this Date*',
      });
  };
  render() {
    if(this.state.loggedIn === false) {
      return <Link to="/" style={{ textDecoration: "none" }}>You are not LoggedIn( Click Here )</Link>
    }
    return (
      <React.Fragment>
          <Navbar />
        <div className="placing">
        <Calendar onChange={this.onChangedate} value={this.state.date}/> 
        </div>
        <div style={{ fontSize:15 , color: "blue", textAlign: "center", marginTop: "20px"}}>
            {this.state.event}
        </div>
      </React.Fragment>
    );
  }
}
export default calendar;