const con = require('./sql_connect')

var q1 = "INSERT IGNORE INTO job (job_id,job_name, price) VALUES ('1','Replace Wheels / Wheel balancing','1000')"
con.query(q1, function (err) {
    if (err) throw err;
    // console.log("Data Inserted");
});

var q2 = "INSERT IGNORE INTO job (job_id,job_name, price) VALUES ('2','Refill Engine Oil','200')"
con.query(q2, function (err) {
    if (err) throw err;
    // console.log("Data Inserted");
});

var q3 = "INSERT IGNORE INTO job (job_id,job_name, price) VALUES ('3','Change Oil','400')"
con.query(q3, function (err) {
    if (err) throw err;
    // console.log("Data Inserted");
});

var q4 = "INSERT IGNORE INTO job (job_id,job_name, price) VALUES ('4','Change Air Filter','300')"
con.query(q4, function (err) {
    if (err) throw err;
    // console.log("Data Inserted");
});

var q5 = "INSERT IGNORE INTO job (job_id,job_name, price) VALUES ('5','Change Spark Plug','600')"
con.query(q5, function (err) {
    if (err) throw err;
    // console.log("Data Inserted");
});

var q6 = "INSERT IGNORE INTO job (job_id,job_name, price) VALUES ('6','Change Break Fluid','400')"
con.query(q6, function (err) {
    if (err) throw err;
    // console.log("Data Inserted");
});

var q7 = "INSERT IGNORE INTO job (job_id,job_name, price) VALUES ('7','Change AC Belt','2000')"
con.query(q7, function (err) {
    if (err) throw err;
    // console.log("Data Inserted");
});

var q8 = "INSERT IGNORE INTO job (job_id,job_name, price) VALUES ('8','Change Seat Belt','4000')"
con.query(q8, function (err) {
    if (err) throw err;
    // console.log("Data Inserted");
});

var q9 = "INSERT IGNORE INTO job (job_id,job_name, price) VALUES ('9','Check Sound System','1000')"
con.query(q9, function (err) {
    if (err) throw err;
    // console.log("Data Inserted");
});
var q10 = "INSERT IGNORE INTO job (job_id,job_name, price) VALUES ('10','Check Headlights','3000')"
con.query(q10, function (err) {
    if (err) throw err;
    // console.log("Data Inserted");
});

var q11 = "INSERT IGNORE INTO job (job_id,job_name, price) VALUES ('11','Change all Tyres ','10000')"
con.query(q11, function (err) {
    if (err) throw err;
    // console.log("Data Inserted");
});

var q12 = "INSERT IGNORE INTO job (job_id,job_name, price) VALUES ('12','Full Car Wash','1000')"
con.query(q12, function (err) {
    if (err) throw err;
    // console.log("Data Inserted");
});

var q13 = "INSERT IGNORE INTO job (job_id,job_name, price) VALUES ('13','Check Wiper Operations','1000')"
con.query(q13, function (err) {
    if (err) throw err;
    // console.log("Data Inserted");
});

var q14 = "INSERT IGNORE INTO job (job_id,job_name, price) VALUES ('14','Change Battery','5000')"
con.query(q14, function (err) {
    if (err) throw err;
    // console.log("Data Inserted");
});

var q15 = "INSERT IGNORE INTO job (job_id,job_name, price) VALUES ('15','Change Seat Covers','5000')"
con.query(q15, function (err) {
    if (err) throw err;
    // console.log("Data Inserted");
});

var q16 = "INSERT IGNORE INTO job (job_id,job_name, price) VALUES ('16','Remove Scratches','500')"
con.query(q16, function (err) {
    if (err) throw err;
    // console.log("Data Inserted");
});

var q17 = "INSERT IGNORE INTO job (job_id,job_name, price) VALUES ('17','Check Hand-Brake','1000')"
con.query(q17, function (err) {
    if (err) throw err;
    // console.log("Data Inserted");
});

var q18 = "INSERT IGNORE INTO job (job_id,job_name, price) VALUES ('18','Charging systems check','200')"
con.query(q18, function (err) {
    if (err) throw err;
    // console.log("Data Inserted");
});

var q19 = "INSERT IGNORE INTO job (job_id,job_name, price) VALUES ('19','Steering check','1000')"
con.query(q19, function (err) {
    if (err) throw err;
    // console.log("Data Inserted");
});

var q20 = "INSERT IGNORE INTO job (job_id,job_name, price) VALUES ('20','Check Mirrors','500')"
con.query(q20, function (err) {
    if (err) throw err;
    // console.log("Data Inserted");
});



