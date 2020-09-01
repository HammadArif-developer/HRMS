import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import DateRangeIcon from "@material-ui/icons/DateRange";
import BusinessIcon from "@material-ui/icons/Business";
import { Link } from "react-router-dom";
import Logout from "../logoutMenu/logoutMenu";
import "./navbar.css";
//Code taken from material-ui and modified and styled according to our apps need.
const drawerWidth = 240;
//styling navbar
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background:
      "linear-gradient(45deg, rgba(29, 157, 210, 1) 0%, rgba(1, 154, 66, 1) 100%)",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    background:
      "linear-gradient(180deg, rgba(29, 157, 210, 1) 0%, rgba(1, 154, 66, 1) 100%)",
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  margin: {
    margin: theme.spacing(1),
  },
}));
//styling buttons, options and their text.
const buttonstyle = {
  background: "#292770",
};
const iconstyle = {
  color: "#ffffff",
};
const textstyle = {
  color: "#ffffff",
};
export default function ClippedDrawer() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <div className="placinglog">
          <div className="hr">
            <Toolbar>
              <Typography variant="h6" noWrap>
                HRESOURCIFY
              </Typography>
            </Toolbar>
          </div>
          <div className="log">
            <Logout />
          </div>
        </div>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            <Link to="/admin_dashboard" style={{ textDecoration: "none" }}>
              <ListItem style={buttonstyle} button key={"Dashboard"}>
                <ListItemIcon style={iconstyle}>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText style={textstyle} primary={"Dashboard"} />
              </ListItem>
            </Link>

            <Link to="/user" style={{ textDecoration: "none" }}>
              <ListItem style={buttonstyle} button key={"Users"}>
                <ListItemIcon style={iconstyle}>
                  <PeopleAltIcon />
                </ListItemIcon>
                <ListItemText style={textstyle} primary={"Users"} />
              </ListItem>
            </Link>

            <Link to="/department" style={{ textDecoration: "none" }}>
              <ListItem style={buttonstyle} button key={"Departments"}>
                <ListItemIcon style={iconstyle}>
                  <BusinessIcon />
                </ListItemIcon>
                <ListItemText style={textstyle} primary={"Departments"} />
              </ListItem>
            </Link>
            <Link to = "pending_leave_request" style={{ textDecoration: "none" }}>
            <ListItem style={buttonstyle} button key={"Leave Requests"}>
              <ListItemIcon style={iconstyle}>
                <DateRangeIcon />
              </ListItemIcon>
              <ListItemText style={textstyle} primary={"Leave Requests"} />
            </ListItem>
            </Link>
          </List>
        </div>
      </Drawer>
    </div>
  );
}
