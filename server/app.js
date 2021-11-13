var express = require('express');
var path = require('path');
var expressLayout = require('express-ejs-layouts');
var mysql = require('mysql');
var port = 8000;
var flash = require('connect-flash')

var customer=require('./routes/customer');
var app = express();
const session = require('express-session');
const { nanoid } = require('nanoid')
var schema=require('./database/schema');
var jobs=require('./database/jobs');
var employees = require('./database/employees')
var mainroutes=require('./routes/main')
var admin=require('./routes/admin')

const sessionOptions = { secret: 'asecretkeyforsession', resave: false, saveUninitialized: false }
app.use(flash())
app.set('views', path.join(__dirname, '../web/views'));
// app.use(express.static('../web/public'));
app.use('/', express.static('../web/public'));
app.set('view engine', 'ejs');
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session(sessionOptions))

app.use('/',mainroutes);
app.use('/customer', customer);
app.use('/admin',admin)


app.listen(port,function(){
    console.log("Server listening on http://localhost:8000");
})

module.exports = app;