import React, { Component } from "react";
import "./deleteDepartment.css";
import Navbar from "../adminNavbar/navbar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { green } from "@material-ui/core/colors";
//button styling.
const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});

class deleteDepartment extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
//routing according to user click.
  onClickEditDepartment(event) {
    this.props.history.push("/edit_department");
  }
  onClickDeleteDepartment(event) {
    this.props.history.push("/department");
  }
  render() {
    return (
      <div>
        <Navbar />
        <div className="ContainerPlacing">
          <Container fixed>
            <h1>Department Info</h1>
            <Typography
              component="div"
              className="margin2"
              style={{ backgroundColor: "#fff", height: "auto" }}
            >
              <div>
                
                <ul>
                  <li>
                    <div>
                      <h5>
                        <b>Name:</b>
                      </h5>
                      <h4> Finance</h4>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h5>
                        <b>Email:</b>
                      </h5>
                      <h4> finance@tag.com</h4>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h5>
                        <b>Extension Code:</b>
                      </h5>
                      <h4> 090078601</h4>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h5>
                        <b>Head of Department:</b>
                      </h5>
                      <h4> Babar Ali</h4>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h5>
                        <b>Email HOD:</b>
                      </h5>
                      <h4> babar@mylums.edu.pk</h4>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h5>
                        <b>Phone Number HOD:</b>
                      </h5>
                      <h4> 030012345678</h4>
                    </div>
                  </li>
                </ul>
              </div>
            </Typography>
          </Container>
          <div className="centerplacing">
            <ThemeProvider theme={theme} className="margin2">
              <Button
                variant="contained"
                size="small"
                color="primary"
                className="margin"
                onClick={this.onClickEditDepartment.bind(this)}
              >
                Edit
              </Button>

              <Button
                variant="contained"
                size="small"
                color="primary"
                className="margin"
                onClick={this.onClickDeleteDepartment.bind(this)}
              >
                Delete
              </Button>
            </ThemeProvider>
          </div>
        </div>
      </div>
    );
  }
}
export default deleteDepartment;
