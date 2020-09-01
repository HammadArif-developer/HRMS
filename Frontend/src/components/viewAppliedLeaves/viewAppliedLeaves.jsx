import React, { Component } from "react";
import "./viewAppliedLeaves.css";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { green } from "@material-ui/core/colors";
import Navbar from "../userNavbar/navbar";
import LeavesTable from "./viewAppliedLeavesTable";
import {withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
// Calling previously built components like User navigation bar and Applied Leaves Table
// Using material UI components to enhance User experience

const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});

// React component that displays users previous leaves and allows user to apply for new one
class viewAppliedLeaves extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: true,
    };
  }
//   confirmation for valid user
  componentDidMount() {
    const token = localStorage.getItem("token");
    if(token === null) {
      this.setState({
        loggedIn: false,
      });
    }
  }
//   Redirects user to Apply Leaves Form page
  onClickApplyLeaves(event) {
    this.props.history.push("/apply_leaves");
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
              onClick={this.onClickApplyLeaves.bind(this)}
            >
              Apply For Leaves
            </Button>
          </ThemeProvider>
          <LeavesTable />
        </div>
      </div>
    );
  }
}
export default withRouter(viewAppliedLeaves);
