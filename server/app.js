var express = require('express');
var path = require('path');
var expressLayout = require('express-ejs-layouts');
var port = 8000;
var app = express();

app.set('views', path.resolve(__dirname, '../web/views'));
app.use(express.static('../web/public'));
app.set('view engine', 'ejs');

app.get('/',function(req, res){
  res.render('index');
})
app.get('/user_register',function(req, res){
  res.render('user_register');
})

app.listen(port,function(){
    console.log("Server listening on http://localhost:8000");
})
