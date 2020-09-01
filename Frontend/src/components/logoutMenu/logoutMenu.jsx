import React, { Component } from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

//above components imported from material-ui.com and modified to fit our code

class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleCloseLogout = this.handleCloseLogout.bind(this);
    this.handleAccountSettings = this.handleAccountSettings.bind(this);
  }
  //following functions assigning actions of what will happen on clicking on the logout dropdown items
  handleAccountSettings = (event) => {
    this.setState({
      anchorEl: null,
    });
    if (localStorage.getItem("user_id") === "admin") {
      this.props.history.push("/account_settings");
    } else {
      this.props.history.push("/account_settings_employee");
    }
  };
  handleCloseLogout = (event) => {
    this.setState({
      anchorEl: event.currentTarget,
    });
    localStorage.removeItem("token");
  };
  handleClick = (event) => {
    this.setState({
      anchorEl: event.currentTarget,
    });
  };
  handleClose = (event) => {
    this.setState({
      anchorEl: null,
    });
  };
  render() {
    return (
      <div>
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={this.state.anchorEl}
          keepMounted
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleClose}
        >
          {/* user being redirected to account settings */}
          <MenuItem onClick={this.handleAccountSettings}>
            Account Settings
          </MenuItem>
          {/* user being redirected to login page */}
          <Link to="/" style={{ textDecoration: "none" }}>
            <MenuItem onClick={this.handleCloseLogout}>Logout</MenuItem>
          </Link>
        </Menu>
      </div>
    );
  }
}
export default withRouter(Logout);
