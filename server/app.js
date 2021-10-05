var express = require('express');
var path = require('path');
var schema =require('./database/schema');
var expressLayout = require('express-ejs-layouts');
var mysql = require('mysql');
var port = 8000;
var app = express();

// var con=mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: ''
// });

// con.connect(schema, function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   con.query("CREATE DATABASE IF NOT EXISTS vsm", function (err, result) {
//     if (err) throw err;
//       console.log("Database created");
//     });
// });

app.set('views', path.resolve(__dirname, '../web/views'));
app.use(express.static('../web/public'));
app.set('view engine', 'ejs');

app.get('/',function(req, res){
  res.render('index');
})
app.get('/user_register',function(req, res){
  res.render('user_register');
})
app.get('/dashboard',function(req, res){
  res.render('dashboard');
})
app.get('/admin-login',function(req, res){
  res.render('admin-login');
})
app.get('/take-appointment',function(req, res){
  res.render('take-appointment');
})
app.get('/book-vehicle',function(req, res){
  res.render('registerVehicle');
})
app.get('/feedback',function(req, res){
  res.render('feedBack');
})

app.listen(port,function(){
    console.log("Server listening on http://localhost:8000");
})
