var express = require('express');
var path = require('path');
var expressLayout = require('express-ejs-layouts');
var mysql = require('mysql');
var port = 8000;
var jobsRouter = require('./routes/jobs');
var app = express();
const session = require('express-session');
const { nanoid } = require('nanoid')
var schema=require('./database/schema');
var jobs=require('./database/jobs');
var mainroutes=require('./routes/main')
var admin=require('./routes/admin')
const sessionOptions = { secret: 'asecretkeyforsession', resave: false, saveUninitialized: false }

app.set('views', path.join(__dirname, '../web/views'));
// app.use(express.static('../web/public'));
app.use('/', express.static('../web/public'));
app.set('view engine', 'ejs');
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session(sessionOptions))
app.use('/',mainroutes);
app.use('/jobs', jobsRouter);
// app.use('/customer', customer);
app.use('/admin',admin)
// app.get('/',function(req, res){
//   res.render('index');
// })
// app.get('/register',function(req, res){
//   res.render('register');
// })
// app.get('/dashboard',function(req, res){
//   res.render('dashboard');
// })
// app.get('/admin-login',function(req, res){
//   res.render('admin-login');
// })
// app.get('/take-appointment',function(req, res){
//   res.render('take-appointment');
// })
// app.get('/book-vehicle',function(req, res){
//   res.render('registerVehicle');
// })
// app.get('/feedback',function(req, res){
//   res.render('feedBack');
// })
// app.get('/add-employee',function(req, res){
//   res.render('add-employee');
// })
// app.get('/adminDashboard',function(req, res){
//   res.render('adminDashboard');
// })


app.listen(port,function(){
    console.log("Server listening on http://localhost:8000");
})

module.exports = app;