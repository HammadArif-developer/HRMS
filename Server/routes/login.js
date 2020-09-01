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

exports.login = async function(req, res){
    console.log(req.body);
    var username = req.body.Username;
    var password = req.body.Password;
    var user_id = username;

    user_id = parseInt(username);
    if (username === 'admin')
        user_id = 2000;
    
    if (isNaN(user_id)) {
        console.log("here")
        res.send({
            'code'    : 206,
            'user'    : 'none',
            'success' : 'Employee does not exist'
        });
    } else {
        connection.query('SELECT user_password FROM HRUSER WHERE user_id = ?', [user_id], async function (error, results, fields) {
            if (error) {
                console.log(error);
                res.send({
                    'code'    : 400,
                    'user'    : 'none',
                    'success' : 'error ocurred'
                })
            } else {
                console.log(results)
                if (results.length > 0){
                    if (password === results[0].user_password) {
                        if (username === 'admin') {
                            res.send({
                                'code'    : 200,
                                'user'    : 'admin',
                                'success' : 'Login sucessful'
                            })
                        } else {
                            res.send({
                                'code'    : 200,
                                'user'    : 'employee',
                                'success' : 'Login sucessful'
                            })
                        }
                        
                    } else {
                        res.send({
                            'code'    : 204,
                            'user'    : 'none',
                            'success' : 'Username and password does not match'
                        })
                    }
                } else {
                    res.send({
                        'code'    : 206,
                        'user'    : 'none',
                        'success' : 'Employee does not exist'
                    });
                }
            }
        });
    }
}
