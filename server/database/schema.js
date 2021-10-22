const con = require('./sql_connect')

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query("CREATE DATABASE IF NOT EXISTS vsm", function (err, result) {
      if (err) throw err;
        console.log("Database created");
      });
  });
  
var customer ="CREATE TABLE IF NOT EXISTS customer (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255),email VARCHAR(255),password VARCHAR(255), street VARCHAR(255), city VARCHAR(255), state VARCHAR(255), mobile INT(10))"

var job_card="CREATE TABLE IF NOT EXISTS job_card(card_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, customer_id INT NOT NULL,chasis_no INT NOT NULL ,price INT,date DATE NOT NULL,street VARCHAR(30) NOT NULL,Complete_dt DATE , city VARCHAR(30) NOT NULL, state VARCHAR(30) NOT NULL,job_id INT NOT NULL,license_no INT NOT NULL, Status BOOLEAN NOT NULL,Employee_id INT, FOREIGN KEY (customer_id) REFERENCES customer(id),FOREIGN KEY (job_id) REFERENCES job(job_id),FOREIGN KEY (chasis_no) REFERENCES vehicle(chasis_no),FOREIGN KEY (Employee_id) REFERENCES employee(id))"  


var job="CREATE TABLE IF NOT EXISTS job(job_id INT PRIMARY KEY ,job_name VARCHAR(50) NOT NULL,price INT NOT NULL)"

var employee="CREATE TABLE IF NOT EXISTS employee(id INT AUTO_INCREMENT PRIMARY KEY,name VARCHAR(100) NOT NULL,post VARCHAR(100) NOT NULL,email VARCHAR(100) NOT NULL,contact_no INT(10), street VARCHAR(255), city VARCHAR(255), state VARCHAR(255))"

var feedback="CREATE TABLE IF NOT EXISTS feedback(customer_id INT, content VARCHAR(255), FOREIGN KEY (customer_id) REFERENCES customer(id))"

var vehicle="CREATE TABLE IF NOT EXISTS vehicle(chasis_no INT PRIMARY KEY,customer_id INT NOT NULL,model_name VARCHAR(255),model_no VARCHAR(255),brand VARCHAR(255),purchase_date DATE NOT NULL,stage_1 BOOLEAN, stage_2 BOOLEAN, FOREIGN KEY (customer_id) REFERENCES customer(id))"

con.query(customer, function (err) {
  if (err) throw err;
  console.log(" Customer Table created");
});

con.query(job, function (err) {
  if (err) throw err;
  console.log("Job Table created");
});


con.query(employee, function (err) {
  if (err) throw err;
  console.log("employee Table created");
});

con.query(feedback, function (err) {
  if (err) throw err;
  console.log("feedback Table created");
});
con.query(vehicle, function (err) {
  if (err) throw err;
  console.log("Vehicle Table created");
});
con.query(job_card, function (err) {
  if (err) throw err;
  console.log("Job Card Table created");
});
