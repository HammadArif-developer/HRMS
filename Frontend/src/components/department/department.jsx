import React, { Component } from "react";
import "./department.css";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { green } from "@material-ui/core/colors";
import Navbar from "../adminNavbar/navbar";
import Form from "../departmentTable/departmentTable";
import { Link } from "react-router-dom";
//color theme provided to button.
const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});
class department extends Component {
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
  onClickAddUser(event) {
    this.props.history.push("/add_department");
  }
  render() {
    if(this.state.loggedIn === false) {
      return <Link to="/" style={{ textDecoration: "none" }}>You are not LoggedIn( Click Here )</Link>
    }
    return (
      <div>
        <Navbar />
        <div className="formplacing">
          <ThemeProvider theme={theme}>
            <Button
              variant="contained"
              size="small"
              color="primary"
              className="useStyle"
              onClick={this.onClickAddUser.bind(this)}
            >
              Add Department
            </Button>
          </ThemeProvider>
          <Form />
        </div>
      </div>
    );
  }
}
export default department;
