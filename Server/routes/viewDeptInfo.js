const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'database-hrms1.c0sl004lok1n.eu-west-2.rds.amazonaws.com',
    user: 'Aleeha',
    password: 'Yehmeridbhai',
    port:'3306',
    database: 'HRMS'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
});
var id = 0;
var departments = {};
connection.query('SELECT * FROM DEPARTMENT', async function (error, results, fields) {
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
        id = req.body.id
        console.log('yeh lo yaar', id);
    }
    connection.query('SELECT * FROM DEPARTMENT WHERE dept_id = ?', [id] ,async function (error, results, fields) {
        if (error) {
            console.log(error);
        } else {
        console.log('hadd hai', results);
            results = JSON.parse(JSON.stringify(results));
            console.log(results[0].hod)
            connection.query('SELECT full_name, email, contact_no FROM HRUSER WHERE user_id = ?', [results[0].hod], async function(error, results2, fields) {
                if(error) {
                    console.log(error);
                } else {
                    console.log('hadd barh rahi hai', results2);
                    data = {
                        'dept_name' : results[0].dept_name,
                        'email' : results[0].email,
                        'hod' : results2[0].full_name,
                        'hod_phone' : results2[0].contact_no,
                        'hod_email' : results2[0].email,
                        'extension_code' : results[0].extension_code
                    }
                    // results.extension_code = results.extension_code;
                    // results.email = results.email;
                    // results.hod = results2[0].full_name.toString();
                    // results.hod_phone = results2[0].contact_no.toString();
                    // results.hod_email = results2[0].email.toString();
                    console.log(data);
                    res.send(data);
                }
            });
            
        }
    });
}