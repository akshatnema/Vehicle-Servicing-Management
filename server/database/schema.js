const con = require('./sql_connect')

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query("CREATE DATABASE IF NOT EXISTS vsm", function (err, result) {
      if (err) throw err;
        console.log("Database created");
      });
  });
  