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
exports.add = async function(req, res) {
    console.log(req.body)
    req.body.hodID = parseInt(req.body.hodID)
    connection.query('SELECT full_name FROM HRUSER WHERE user_id = ?', [req.body.hodID], async function(error, results, fields) {
        if (error) {
            console.log(error);
        } else if (results[0].full_name != req.body.hod) {
            console.log('HOD ID and name do not match');
            res.send({
                'code'    : 400,
                'success' : 'ID and name do not match'
            });
        } else {
            values = [
                req.body.name,
                req.body.email,
                req.body.hodID,
                req.body.extNo
            ]
        
            connection.query('INSERT INTO DEPARTMENT (dept_name, email, hod, extension_code) VALUES (?, ?, ?, ?)', values, async function(error, results, fields) {
                if (error) {
                    console.log(error);
                    res.send({
                        'code'    : 500,
                        'success' : 'Server error'
                    });
                } else {
                    console.log('Department inserted successfully.');
                    res.send({
                        'code'    : 200,
                        'success' : 'Inserted successfully'
                    });

                    let title = 'HOD';
                    console.log('updating job title');
                    connection.query('UPDATE HRUSER SET job_title =? WHERE user_id =?', [title, req.body.hodID], async function (error, results, fields){
                        if (error){
                            throw error;
                            console.log('masla ho raha hai');
                        }
                        else{
                            console.log('job_title updated to HOD')
                        }

                    });

                    connection.query('UPDATE HRUSER SET department = (Select dept_id from DEPARTMENT where dept_name = ?) WHERE user_id =?', [req.body.name, req.body.hodID], async function (error, results, fields){
                        if (error){
                            throw error;
                            console.log('masla ho raha hai');
                        }
                        else{
                            console.log('job_title updated to HOD')
                        }
                    });
                }
            });
        }
    });
    
    // department_id = departments[req.body.department];
    // connection.query('SELECT COUNT(*) FROM HRUSER', async function(error, results, fields) {
    //     if (error) {
    //         console.log(error);
    //     } else {
    //         user_id = results[0]['COUNT(*)'] + 2000;
    //         values = [
    //             user_id,
    //             req.body.Name,
    //             user_password,
    //             req.body.Email,
    //             req.body.phoneNumber,
    //             req.body.cnic,
    //             req.body.dob,
    //             req.body.maritalStatus,
    //             req.body.bloodGroup,
    //             req.body.designation,
    //             department_id,
    //             req.body.nationality,
    //             req.body.location,
    //             req.body.address
    //         ]

    //         connection.query('INSERT INTO HRUSER (user_id, full_name, user_password, email, contact_no, cnic, dob, marital_status, blood_type, job_title, department, nationality, location, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', values, async function(error, results, fields) {
    //             if (error) {
    //                 console.log(error);
    //                 res.send({
    //                     'code': 500,
    //                     'success': 'Server error'
    //                 });
    //             } else {
    //                 console.log('Employee inserted successfully');
    //                 res.send({
    //                     'code': 200,
    //                     'success': 'Added successfully'
    //                 });
    //             }
    //         });
    //     }
    // });  
}