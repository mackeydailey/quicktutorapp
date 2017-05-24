var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);

// Session Storage connection
var sessionStore = new MySQLStore({
    host     : 'qt.chfwru12q1ji.us-west-1.rds.amazonaws.com',
    user     : 'qt',
    password : 'quicktutor',
    database : 'qt_session'
});

// Routes file
var routes = require('./routes/index');

// Init App
var app = express();

// Body Parser Middelware
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Express Session
app.use(session({
    secret: 'e2lp2nza',
    saveUninitialized: false, 
    maxAge: 320000,
    resave: true,
    store: sessionStore
}));

app.use('/', routes);

app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function() {
    console.log('Server started on port '+app.get('port'));
});

