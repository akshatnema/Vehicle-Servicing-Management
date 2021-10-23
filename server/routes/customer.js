const express = require("express");
const session = require("express-session");
const con = require("../database/sql_connect");
const bcrypt = require("bcrypt");
var router = express.Router();


//functions
function protectLogin(req, res, next) {
  if (!session.userID) {
    console.log("Login to continue");
    req.flash('error','login to continue');
    return res.redirect("/");
  } else if (session.userType === "admin") {
    console.log("logged in as admin");
    res.redirect("/admin/dashboard");
  } else {
    
    next();
  }
}

function already(email) {
  const q0 = `SELECT * FROM customer WHERE email="${email}";`;
  console.log("go in");
  con.query(q0, (err, result) => {
    if (err) {
      throw err;
    }
    if (result.length === 0) {
      console.log("not found");
      return "not found";
    } else {
      console.log("found");
      return "found";
    }
  });
}


//Login Section
router.get("/login", (req, res) => {
  if (session.userType === "admin") { 
    res.redirect("/admin/dashboard");
  } else if (session.userID) {
    res.redirect("/customer/dashboard");
  } else {
    res.redirect("/");
  }
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  let pass = "";
  const q = `SELECT password FROM customer WHERE email = "${email}" `;
  con.query(q, async (err, result) => {
    if (err) {
      console.log("Wrong credentials");
      res.redirect("/");
    }
    if (result.length === 0) {
      console.log("No credentials found");
      req.flash('error','No credentials found');
      res.redirect("/");
    } else {
      console.log(result);
      pass = result[0].password;
      console.log(pass);
      const isCorrect = await bcrypt.compare(password, pass);
      console.log(isCorrect);
      if (isCorrect) {
        var sql = `SELECT id FROM customer WHERE email = '${email}'`;
        con.query(sql, (err, data, fields) => {
          if (err) {
            console.log("Something went wrong");
            req.flash('error',err.sqlMessage)
            res.redirect("/register");
          }
          session.userID = data[0].id;
          session.userType = "customer";
          req.flash('success','logged in as customer');
          res.redirect("/customer/dashboard");
        });
      }
    }
  });
});

router.get("/register",protectLogin, (req, res) => {
  if (!session.userID) {
    res.render("./register");
  } else if (session.userID === "admin") {
    console.log("you are logged in as admin");
    res.redirect("admin/dashboard");
  } else {
    res.redirect("dashboard");
  }
});

router.post("/register", async function (req, res) {
  const { name, email, mobile, address, city, state, password } = req.body;
  if (already(email) == "found") {
    console.log("This email is already registered");
    req.flash('error', 'This email is already registered')
    res.redirect("/");
  } else {
    const hash = await bcrypt.hash(password, 5);

    const query =
      "INSERT INTO customer (name,email,street,city,state,password,mobile) VALUES (?,?,?,?,?,?,?)";
    con.query(
      query,
      [name, email, address, city, state, hash, mobile],
      (err, result) => {
        if (err) {
          console.log(err);
          console.log("Something went wrong");
          req.flash('error', 'Something went wrong')
          res.redirect("/register");
        } else {
          console.log("success");
        }
      }
    );
    req.flash('success','registered successfully');
    res.redirect("/");
    var sql = `SELECT id FROM customer WHERE email = '${email}'`;
    con.query(sql, (err, data, fields) => {
      if (err) {
        console.log("Something went wrong");
        res.redirect("register");
      }
      // console.log(data);
      session.userID = data[0].id;
      // console.log(data[0].id);
      session.userType = "customer";
    });
  }
});

router.post("/logout", (req, res) => {
  console.log("logout successfully");
  session.userID = null;
  session.userType = null;
  req.flash('success','logout successfully');
  res.redirect("/");
});



//dashboard
router.get("/dashboard", protectLogin, (req, res) => {
  const q = `SELECT * FROM customer WHERE id="${session.userID}"`;
  con.query(q, (err, data, fields) => {
    if (err) {
      console.log(err);
      res.redirect("/customer/dashboard");
    }
    res.render("dashboard", {
      userdata: data, error: req.flash('error'), success:req.flash('success')
    });
  });
});

// Feedback Section
router.get("/feedback", protectLogin, (req, res) => {
  res.render("feedBack", {
    userid: session.userID, error: req.flash('error')
  });
});

router.post("/feedback", (req, res) => {
  const { userid, text } = req.body;
  const sql = `INSERT INTO feedback(customer_id,content) VALUES('${session.userID}','${text}')`;
  con.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      req.flash('error', 'Some error occured');
      res.redirect("/customer/feedback");
    } else {
      console.log("Feedback submitted");
      req.flash('success', 'Feedback submitted successfully')
      res.redirect("/customer/dashboard");
    }
  });
});


// Vehicle Sections
router.get("/registerVehicle",protectLogin, function (req, res, next) {
  res.render("registerVehicle", {
    title: "vehicles",
  });
});

router.post("/registerVehicle", async function (req, res) {
  const {
    vehicleType,
    model_name,
    model_number,
    brand,
    purchase_date,
    chasis_no,
  } = req.body;

  const userId = session.userID;

  var q = `INSERT INTO vehicle(chasis_no,customer_id,model_name,model_no,brand,purchase_date) VALUES (?,?,?,?,?,?)`;

  con.query(
    q,
    [chasis_no, userId, model_name, model_number, brand, purchase_date],
    (err, data, fields) => {
      if (err) {
        console.log(err);
        req.flash('error', err.sqlMessage)
        res.redirect("/customer/dashboard");
      } else {
        console.log("New Vehicle Added");
        req.flash('success','New Vehicle Added')
        res.redirect("/customer/dashboard");
      }
    }
  );
});


//Services
router.get("/services",protectLogin, function (req, res, next) {
  var sql = "SELECT * FROM job";
  const userID = session.userID;
  con.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render("services", {
      title: "JOBS",
      userData: data,
      id: userID,
    });
  });
});


//Appointment Section
router.get("/take-appointment",protectLogin, (req, res) => {
  const userID = session.userID;
  var sql1 = `SELECT * FROM vehicle WHERE customer_id="${userID}"`;
  var sql2 = "SELECT * FROM job";
  con.query(sql1, function (err, data1) {
    if (err) throw err;
    con.query(sql2, function (err, data2) {
      if (err) throw err;
      //  console.log(data2);

      res.render("take-appointment", {
        data1: data1,
        data2: data2,
      });
    });
  });
});

router.post("/take-appointment", protectLogin, async function (req, res) {

  const {
    vehicles,
    jobs,
    license,
    date,
    address, city, state
  } = req.body;

  userID = session.userID;

  var sqlp = `SELECT * FROM job WHERE job_id=${jobs}`;
  con.query(sqlp, (err, data, fields) => {
    if (err) throw err;
    else {
      var prices = data[0].price;

      var sql = "INSERT INTO job_card(customer_id,chasis_no,date,price,street,city,state,job_id,license_no,status,Employee_id) VALUES(?,?,?,?,?,?,?,?,?,?,?)";

      con.query(sql, [userID, vehicles, date, prices, address, city, state, jobs, license, 0, 1], function (err, data, fields) {
        if (err) {
          console.log(err);
          res.redirect("/customer/take-appointment")
        }
        else {
          console.log("Appointment done.");
          req.flash("success", "Appointment done.")
          res.redirect("/customer/dashboard")
        }
      })
    }
  });

router.get('/updateProfile', function(req, res, next) {
  const id=session.userID;
  console.log(id);
  var sql = "SELECT i.job_name as service_name, j.price, j.date as start_date, j.Complete_dt , j.Status, e.name AS Employee_name FROM job_card j, job i,employee e where j.customer_id=? AND j.Employee_id= e.id AND j.job_id=i.job_id;";
  con.query(sql,[id],function (err, data, fields) {
    if (err) throw err;
    res.render("Profile", {
      title: "Your Appointment Details",
      userData: data,
    });
  });
});

router.post('/updateProfile',async function(req, res) {
  const id=session.userID;
  console.log(id);
  const { exampleRadios,correctedInfo } = req.body
  // console.log(correctedInfo)
  
  if(exampleRadios==='option1'){
    const query ="UPDATE customer SET email=? WHERE id=?"
    con.query(query,[correctedInfo,id], (err,result) =>{
       if (err){
           console.log(err);
           console.log('Something went wrong')
       } 
       else {
       console.log('successfully inserted email');
       }
    })
  }
  else if(exampleRadios==='option2'){
    const query ="UPDATE customer SET street=? WHERE id=?"
    con.query(query,[correctedInfo,id], (err,result) =>{
       if (err){
           console.log(err);
           console.log('Something went wrong')
       } 
       else {
       console.log('successfully inserted street');
       }
    })
  }
  else if(exampleRadios==='option3'){
    const query ="UPDATE customer SET city=? WHERE id=?"
    con.query(query,[correctedInfo,id], (err,result) =>{
       if (err){
           console.log(err);
           console.log('Something went wrong')
       } 
       else {
       console.log('successfully inserted city');
       }
    })
  }
  else if(exampleRadios==='option4'){
    const query ="UPDATE customer SET state=? WHERE id=?"
    con.query(query,[correctedInfo,id], (err,result) =>{
       if (err){
           console.log(err);
           console.log('Something went wrong')
       } 
       else {
       console.log('successfully inserted state');
       }
    })
  }
  else if(exampleRadios==='option5'){
    const query ="UPDATE customer SET mobile=? WHERE id=?"
    con.query(query,[correctedInfo,id], (err,result) =>{
       if (err){
           console.log(err);
           console.log('Something went wrong')
       } 
       else {
       console.log('successfully inserted mobile');
       }
    })
  }
  res.redirect('/customer/updateProfile')
});

module.exports=router;
