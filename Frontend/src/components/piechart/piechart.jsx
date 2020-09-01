import React, { Component } from "react";
import { PieChart } from "react-minimal-pie-chart";

// code borrowed from:
// https://toomuchdesign.github.io/react-minimal-pie-chart/index.html?path=/story/donut-chart--custom-arcs-width
//values and styling modified to meet our needs

const present = "330"; //insert present value of backend here
const absent = "10"; //insert absences value of backend here
const leave = "25"; //insert leave value of backend here
class piechart extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="chartBackground">
          <PieChart
            animationDuration={500}
            animationEasing="ease-out"
            center={[50, 50]}
            data={[
              {
                color: "#039A4E",
                title: present,
                value: 330,
              },
              {
                color: "#0B3954",
                title: absent,
                value: 10,
              },
              {
                color: "#E63946",
                title: leave,
                value: 25,
              },
            ]}
            lengthAngle={360}
            lineWidth={45}
            paddingAngle={0}
            radius={50}
            startAngle={0}
            viewBoxSize={[100, 100]}
          />
        </div>
      </React.Fragment>
    );
  }
}
export default piechart;
