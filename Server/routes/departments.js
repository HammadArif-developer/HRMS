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

exports.display = async function (req, res) {
    connection.query('SELECT dept_id, dept_name FROM DEPARTMENT LIMIT 10', async function (error, results, fields) {
        if (error) {
            console.log(error);
        } else {
            results = JSON.parse(JSON.stringify(results));
            console.log(results);
            res.send(results);
        }
    });
}