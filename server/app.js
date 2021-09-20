var express = require('express');
var path = require('path');
var expressLayout = require('express-ejs-layouts');
var port = 8000;
var app = express();

app.set('views', path.resolve(__dirname, '../web/views'));
app.use(express.static(__dirname + '../public'));
app.use(expressLayout);
app.set('view engine', 'ejs');

app.get('/',function(req, res){
  res.render('index');
})

app.listen(port,function(){
    console.log("Server listening on ", port);
})

