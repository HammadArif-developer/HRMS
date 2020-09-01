const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "database-hrms1.c0sl004lok1n.eu-west-2.rds.amazonaws.com",
  user: "Aleeha",
  password: "Yehmeridbhai",
  port: "3306",
  database: "HRMS",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
});

const getDepartment = async function () {
  var departments = {};
  connection.query("SELECT * FROM DEPARTMENT", async function (
    error,
    results,
    fields
  ) {
    if (error) {
      console.log(error);
    } else {
      results = JSON.parse(JSON.stringify(results));
      for (var index = 0; index < results.length; index++) {
        departments[results[index].dept_id] = results[index].dept_name;
      }
    }
  });
  return departments;
};

exports.display = async function (req, res) {
  var departments = await getDepartment();
  connection.query("SELECT * FROM HRUSER LIMIT 10", async function (
    error,
    results,
    fields
  ) {
    if (error) {
      console.log(error);
    } else {
      results = JSON.parse(JSON.stringify(results));
      results.shift();
      results.forEach((element) => {
        element.user_id = element.user_id.toString();
        element.department = departments[element.department];
        delete element.user_password;
        delete element.photo;
        delete element.contact_no;
        delete element.address;
        delete element.dob;
        delete element.gender;
        delete element.marital_status;
        delete element.nationality;
        delete element.blood_type;
        delete element.manager;
        delete element.location;
        delete element.employment_status;
        delete element.presences;
        delete element.absences;
      });
      console.log(results);
      res.send(results);
    }
  });
};
