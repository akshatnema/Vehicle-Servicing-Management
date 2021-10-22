const con = require('./sql_connect')

var q = "INSERT IGNORE INTO employee (id,name) VALUES (1,'No Employee Assigned')"
con.query(q, function (err) {
    if (err) throw err;
    // console.log("Data Inserted 1");
});
var q1 = "INSERT IGNORE INTO employee (id,name,post, email, contact_no,street,city,state) VALUES (2,'Tiffany Wheeler','Mechanic','tiffany@gmail.com',2233445532,'Astreet', 'Acity', 'Astate')"
con.query(q1, function (err) {
    if (err) throw err;
    // console.log("Data Inserted 1");
});

var q2 = "INSERT IGNORE INTO employee (id,name,post, email, contact_no,street,city,state) VALUES (3,'Gardner Graves','Mechanic','gardner@gmail.com',1177880929,'Bstreet', 'Bcity', 'Bstate')"
con.query(q2, function (err) {
    if (err) throw err;
    //  console.log("Data Inserted 2");
});

var q3 = "INSERT IGNORE INTO employee (id,name,post, email, contact_no,street,city,state) VALUES (4,'Craig Hart','Mechanic','craig@gmail.com',4455880022,'Cstreet', 'Ccity', 'Cstate')"
con.query(q3, function (err) {
    if (err) throw err;
    // console.log("Data Inserted 3");
});