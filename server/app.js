var express = require('express');
var path = require('path');
var expressLayout = require('express-ejs-layouts');
var port = 8000;
var app = express();

app.set('views', path.join(__dirname, '../web/views'));
app.use(expressLayout);
app.set('view engine', 'ejs');

app.get('/',function(req, res){
  res.render('index');
})

app.listen(port,function(){
    console.log("Server listening on ", port);
})

