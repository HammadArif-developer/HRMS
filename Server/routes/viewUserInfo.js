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
var id = 0;
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
exports.display = async function (req, res) {
  if (req.body.id > 0) {
    id = req.body.id;
  }
  connection.query(
    "SELECT * FROM HRUSER WHERE user_id = ?",
    [id],
    async function (error, results, fields) {
      if (error) {
        console.log(error);
      } else {
        results = JSON.parse(JSON.stringify(results));
        results.forEach((element) => {
          element.user_id = element.user_id.toString();
          element.department = departments[element.department];
          element.contact_no = element.contact_no.toString();
          element.address = element.address.toString();
          element.dob = element.dob.toString();
          element.marital_status = element.marital_status.toString();
          element.nationality = element.nationality.toString();
          element.blood_type = element.nationality.toString();
          element.location = element.location.toString();

          delete element.manager;
          delete element.user_password;
          delete element.photo;
          delete element.employment_status;
          delete element.presences;
          delete element.absences;
        });
        console.log(results);
        res.send(results);
      }
    }
  );
};
