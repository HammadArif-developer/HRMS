import React, { Component } from "react";
import "./login.css";
import logo from "./img/pngformat.png";
import axios from "axios";
import { Link } from "react-router-dom";

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Username: "",
      Password: "",
      errorMessage: "",
      user: {
        userID: "",
        userType: "",
      },
      loggedIn: false,
    };
    // let myuser = new userclass()
    this.handleClick = this.handleClick.bind(this);
    this.inputChange = this.inputChange.bind(this);
  }
  //checking here if the user is already logged in or not
  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token === null) {
      this.setState({ loggedIn: false });
    } else {
      this.setState({ loggedIn: true });
    }
  }
  //new values that user types in are being updated here
  inputChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  //data being sent to server here
  handleClick(event) {
    event.preventDefault();
    var apiBaseUrl = "http://localhost:4000/api/";
    var self = this;
    var payload = {
      Username: this.state.Username,
      Password: this.state.Password,
    };
    axios.post(apiBaseUrl + "login", payload).then(function (response) {
      if (response.data.code === 200) {
        // server indicated successful login by sending code 200

        /*conditions checking if the user is an admin or an employee and his/here data and id being stored 
        accordingly. The user redirected to admin dashboard or employee dashboard accordingly*/
        if (response.data.user === "admin") {
          localStorage.setItem("token", "LoggedInAsAdmin");
          localStorage.setItem("user_id", self.state.Username);
          self.setState({ loggedIn: true });
          self.props.history.push("/admin_dashboard");
        } else if (response.data.user === "employee") {
          localStorage.setItem("token", "LoggedInAsEmployee");
          localStorage.setItem("user_id", self.state.Username);
          self.setState({ loggedIn: true });
          self.props.history.push("/user_dashboard");
        }
      } else if (response.data.code === 204) {
        // server indicates invalid credentials by error code 204
        self.setState({
          errorMessage: "Invalid Username or Password",
        }); // incorrect Username or password
      } else if (response.data.code === 206) {
        // server indicates
        self.setState({
          errorMessage: "User Does Not Exist",
        }); // employee does not exist
      }
    });
    return;
  }
  render() {
    //checking here if user is already logged in
    if (this.state.loggedIn === true) {
      const token = localStorage.getItem("token");
      if (token === "LoggedInAsAdmin") {
        return (
          <Link to="/admin_dashboard" style={{ textDecoration: "none" }}>
            You are already Logged In
          </Link>
        );
      } else {
        return (
          <Link to="/user_dashboard" style={{ textDecoration: "none" }}>
            You are already Logged In
          </Link>
        );
      }
    }
    //login properties begin here
    return (
      <div className="container-login">
        <div className="wrap-login">
          <img src={logo} alt="logo" />
          <div id="CUTTING_EDGE__SOLUTION__to_all">
            {/* login screen text (HResourcify moto) */}
            <h2>
              CUTTING-EDGE
              <br />
              SOLUTION
            </h2>
            <h1>to all your </h1>
            <h2>HR</h2>
            <h1>needs</h1>
          </div>
          <form className="login-form validate-form">
            <span className="login-form-title">Login</span>
            {/* login input fields */}
            <div className="wrap-input100 validate-input">
              <input
                className="input100"
                type="text"
                name="Username"
                placeholder="Username"
                required
                onChange={this.inputChange}
              ></input>
            </div>

            <div className="wrap-input100 validate-input">
              <input
                className="input100"
                type="password"
                name="Password"
                placeholder="Password"
                required
                onChange={this.inputChange}
              ></input>
            </div>
            {/* error message being displayed here */}
            <div style={{ fontSize: 12, color: "red", textAlign: "center" }}>
              {this.state.errorMessage}
            </div>
            <div className="container-login-form-btn">
              <button className="login-form-btn" onClick={this.handleClick}>
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Counter;
