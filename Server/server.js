var express = require("express");
var login = require('./routes/login');
var users = require('./routes/users');
var addUser= require('./routes/addUser');
var departments = require('./routes/departments');
var addDepartment = require('./routes/addDepartment');
var viewUserInfo = require('./routes/viewUserInfo');
var viewPersonalInfo = require('./routes/viewPersonalInfo');
var editUserInfo = require('./routes/editUserInfo');
var viewDeptInfo = require('./routes/viewDeptInfo');
var bodyParser = require('body-parser');

let cors = require('cors')
// body parser added
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Allow cross origin requests
app.use(cors())
var router = express.Router();

// test route
router.get('/', function(req, res) {
    res.json({ message: 'welcome to our upload module apis' });
});

router.post('/login', login.login);
router.post('/users', users.display);
router.post('/add_user', addUser.add);
router.post('/departments', departments.display);
router.post('/add_dept', addDepartment.add);
router.post('/view_user_info', viewUserInfo.display);
router.post('/view_personal_info', viewPersonalInfo.display);
router.post('/view_dept_info', viewDeptInfo.display);
router.post('/edit_user_info', editUserInfo.display);

app.use('/api', router);
app.listen(4000);
console.log('server is listening...');