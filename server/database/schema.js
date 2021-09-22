const con = require('./sql_connect')

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query("CREATE DATABASE IF NOT EXISTS vsm", function (err, result) {
      if (err) throw err;
        console.log("Database created");
      });
  });
  
var queries ="CREATE TABLE IF NOT EXISTS customer (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255),email VARCHAR(255),password VARCHAR(255), street VARCHAR(255), city VARCHAR(255), state VARCHAR(255))"  

con.query(queries, function (err) {
  if (err) throw err;
  console.log("Table created");
});