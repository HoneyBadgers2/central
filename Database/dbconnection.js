const mysql = require('mysql');

var db = mysql.createConnection({
    host: 'localhost',
    user: 'student',
    database: 'taskmon',
    password: 'student'
});

db.connect((err, res) => {
    if(err) {
        console.log('cant connect');
    } else {
        console.log('connected to db');
    }
});

module.exports = db;
