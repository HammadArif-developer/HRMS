import React, { Component } from "react";
import "./users.css";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { green } from "@material-ui/core/colors";
import Navbar from "../adminNavbar/navbar";
import UserTable from "../userTable/userTable";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
// button imported from material-ui.com
const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});

class user extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: true,
    };
  }
  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token === null) {
      this.setState({
        loggedIn: false,
      });
    }
  }
  onClickAddUser(event) {
    this.props.history.push("/add_user");
  }
  render() {
    // checking if user is logged in or not
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
          <ThemeProvider theme={theme}>
            <Button
              variant="contained"
              size="small"
              color="primary"
              className="useStyle"
              onClick={this.onClickAddUser.bind(this)}
            >
              Add User
            </Button>
          </ThemeProvider>
          {/* table being rendered here */}
          <UserTable />
        </div>
      </div>
    );
  }
}
export default withRouter(user);
