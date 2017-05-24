var mysql = require('mysql');

var db = {};
// Database connection
var db = mysql.createConnection({
    host     : 'qt.chfwru12q1ji.us-west-1.rds.amazonaws.com',
    user     : 'qt',
    password : 'quicktutor',
    database : 'qt'
});

module.exports = db;


