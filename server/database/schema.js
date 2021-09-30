const con = require('./sql_connect')

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query("CREATE DATABASE IF NOT EXISTS vsm", function (err, result) {
      if (err) throw err;
        console.log("Database created");
      });
  });
  
var customer ="CREATE TABLE IF NOT EXISTS customer (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255),email VARCHAR(255),password VARCHAR(255), street VARCHAR(255), city VARCHAR(255), state VARCHAR(255))"

var job_card="CREATE TABLE IF NOT EXISTS job_card(card_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL, customer_id INT NOT NULL,street VARCHAR(30) NOT NULL, city VARCHAR(30) NOT NULL, state VARCHAR(30) NOT NULL,job_id INT NOT NULL,chassis_no VARCHAR(15) NOT NULL, purchase_date DATE NOT NULL, stage1 BOOLEAN,stage2 BOOLEAN,stage3 BOOLEAN,license_no INT NOT NULL)"  

var job_card_details="CREATE TABLE IF NOT EXISTS job_card_details(srno INT AUTO_INCREMENT PRIMARY KEY,card_id INT NOT NULL,job_id INT NOT NULL,price INT,Assign_dt DATE NOT NULL,Complete_dt DATE NOT NULL,Status BOOLEAN NOT NULL,Employee_id INT)"

var job="CREATE TABLE IF NOT EXISTS job(job_id INT AUTO_INCREMENT PRIMARY KEY,job_name VARCHAR(50) NOT NULL,price INT NOT NULL)"

con.query(customer, function (err) {
  if (err) throw err;
  console.log(" Customer Table created");
});

con.query(job_card, function (err) {
  if (err) throw err;
  console.log("Job Card Table created");
});

con.query(job_card_details, function (err) {
  if (err) throw err;
  console.log("Job Card Details Table created");
});

con.query(job, function (err) {
  if (err) throw err;
  console.log("Job Table created");
});