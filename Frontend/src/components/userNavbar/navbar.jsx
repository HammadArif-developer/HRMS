import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DateRangeIcon from "@material-ui/icons/DateRange";
import AssignmentIcon from "@material-ui/icons/Assignment";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import HowToRegIcon from "@material-ui/icons/HowToReg";
import EventIcon from "@material-ui/icons/Event";
import Logout from "../logoutMenu/logoutMenu";
import "./navbar.css";

// code for navbar imported from material-ui.com and modified to fit our needs
// icons also imported from material-ui.com

const drawerWidth = 240;
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
// styling the buttons and texts according to our needs
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
          {/* navbar buttons begin here */}
          <List>
            <Link to="/user_dashboard" style={{ textDecoration: "none" }}>
              <ListItem style={buttonstyle} button key={"Dashboard"}>
                <ListItemIcon style={iconstyle}>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText style={textstyle} primary={"Dashboard"} />
              </ListItem>
            </Link>
            <Link to="/to_do_task" style={{ textDecoration: "none" }}>
              <ListItem style={buttonstyle} button key={"Tasks"}>
                <ListItemIcon style={iconstyle}>
                  <AssignmentIcon />
                </ListItemIcon>
                <ListItemText style={textstyle} primary={"Tasks"} />
              </ListItem>
            </Link>
            <Link to="/attendance" style={{ textDecoration: "none" }}>
              <ListItem style={buttonstyle} button key={"Attendance"}>
                <ListItemIcon style={iconstyle}>
                  <HowToRegIcon />
                </ListItemIcon>
                <ListItemText style={textstyle} primary={"Attendance"} />
              </ListItem>
            </Link>
            <Link to="/apply_leaves" style={{ textDecoration: "none" }}>
              <ListItem style={buttonstyle} button key={"Leaves"}>
                <ListItemIcon style={iconstyle}>
                  <DateRangeIcon />
                </ListItemIcon>
                <ListItemText style={textstyle} primary={"Leaves"} />
              </ListItem>
            </Link>
            <Link to="/calendar" style={{ textDecoration: "none" }}>
              <ListItem style={buttonstyle} button key={"Calendar"}>
                <ListItemIcon style={iconstyle}>
                  <EventIcon />
                </ListItemIcon>
                <ListItemText style={textstyle} primary={"Calendar"} />
              </ListItem>
            </Link>
            <Link to="/view_personal_info" style={{ textDecoration: "none" }}>
              <ListItem style={buttonstyle} button key={"Personal Info"}>
                <ListItemIcon style={iconstyle}>
                  <PermIdentityIcon />
                </ListItemIcon>
                <ListItemText style={textstyle} primary={"Personal Info"} />
              </ListItem>
            </Link>
          </List>
        </div>
      </Drawer>
    </div>
  );
}
