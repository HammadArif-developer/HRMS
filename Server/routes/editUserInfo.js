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

exports.edit = async function (req, res) {
  if (req.body.Id > 0 && req.body.Message === "give employee info") { //employee se aa raha hai
    console.log(req.body.Message)
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
          departments[results[index].dept_name] = results[index].dept_id;
        }

        connection.query(
          "SELECT * FROM HRUSER WHERE user_id = ?",
          [req.body.Id],
          async function (error, results, fields) {
            if (error) {
              console.log(error);
            } else {
              results = JSON.parse(JSON.stringify(results));
              results = results[0];
              //delete results.user_password;
              console.log('kuch',results);
              res.send({
                code: 200,
                user: results,
                dept: departments,
              });
            }
          }
        );
      }
    });
  }
  else if (req.body.Id > 0 && req.body.Message === "give user info") { //admin se aa raha hai
    id = req.body.Id; 
    res.send({
      code: 200,
    });
  } else if (req.body.Message === "updated info employee") {
    console.log("frontend sent", req.body);
    var values = [
      req.body.Name,
      req.body.Email,
      req.body.phoneNumber,
      req.body.maritalStatus,
      req.body.bloodGroup,
      req.body.designation,
      req.body.department,
      req.body.manager,
      req.body.nationality,
      req.body.location,
      req.body.address,
      req.body.Id,
    ];

    connection.query(
      "UPDATE HRUSER SET full_name = ?, email = ?, contact_no = ?, marital_status = ?, blood_type = ?, job_title = ?, department = ?, manager = ?, nationality = ?, location = ?, address = ? WHERE user_id = ?",
      values,
      async function (error, results, fields) {
        if (error) {
          console.log(error);
        } else {
          console.log("shukar");
        }
      }
    );
  } else if (req.body.Message === "updated info user") {
    console.log("frontend sent", req.body);
    values = [
      req.body.Name,
      req.body.Email,
      req.body.phoneNumber,
      req.body.maritalStatus,
      req.body.bloodGroup,
      req.body.dob.substring(0,10),
      req.body.gender,
      req.body.nationality,
      req.body.address,
      req.body.Id,
    ];

    connection.query(
      "UPDATE HRUSER SET full_name = ?, email = ?, contact_no = ?, marital_status = ?, blood_type = ?, dob = ?, gender = ?, nationality = ?, address = ? WHERE user_id = ?",
      values,
      async function (error, results, fields) {
        if (error) {
          console.log(error);
        } else {
          console.log("shukar shukar");
        }
      }
    );
  } else {
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
          departments[results[index].dept_name] = results[index].dept_id;
        }

        connection.query(
          "SELECT * FROM HRUSER WHERE user_id = ?",
          [id],
          async function (error, results, fields) {
            if (error) {
              console.log(error);
            } else {
              results = JSON.parse(JSON.stringify(results));
              results = results[0];
              //delete results.user_password;
              console.log('kuch',results);
              res.send({
                code: 200,
                user: results,
                dept: departments,
              });
            }
          }
        );
      }
    });
  }
  // if (req.body.Message === 'give user info') {

  // }
  // else {
  //     connection.query('SELECT * FROM DEPARTMENT', async function (error, results, fields) {
  //         if (error) {
  //             console.log(error);
  //         } else {
  //             console.log('lets send some');
  //             var departments = {};
  //             results = JSON.parse(JSON.stringify(results));
  //             for (var index = 0; index < results.length; index++) {
  //                 departments[results[index].dept_name] = results[index].dept_id;
  //             }
  //             res.send({
  //                 'code' : 200,
  //                 'dept' :  departments
  //             });
  //         }
  //     });
  // }
};