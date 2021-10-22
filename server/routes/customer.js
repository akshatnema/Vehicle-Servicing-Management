const express = require("express");
const session = require("express-session");
const con = require("../database/sql_connect");
const bcrypt = require("bcrypt");
const flash = require("connect-flash");
var router = express.Router();

function protectLogin(req, res, next) {
  if (!session.userID) {
    console.log("Login to continue");
    console.log("login to continue");
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
  con.query(q0, (err, result) => {
    if (err) {
      throw err;
    }
    if (result.length === 0) {
      return "not found";
    } else {
      return "found";
    }
  });
}

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

router.post("/logout", (req, res) => {
  console.log("logout successfully");
  session.userID = null;
  session.userType = null;
  res.redirect("/");
});

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
            req.flash('Something went wrong')
            res.redirect("/register");
          }
          console.log(data);
          session.userID = data[0].id;
          session.userType = "customer";
          req.flash('success','logged in as customer');
          res.redirect("/customer/dashboard");
        });
      }
    }
  });
});

router.get("/register", (req, res) => {
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
  if (already(email) === "found") {
    console.log("This email is already registered");
    res.redirect("/");
  } else {
    const hash = await bcrypt.hash(password, 5);
    // const query=`INSERT INTO customer (id,name,email,mobile,street,city,state,password) VALUES ('${id}','${name}','${email}','${mobile}','${address}','${city}','${state}','${hash}')`

    const query =
      "INSERT INTO customer (name,email,street,city,state,password,mobile) VALUES (?,?,?,?,?,?,?)";
    con.query(
      query,
      [name, email, address, city, state, hash, mobile],
      (err, result) => {
        if (err) {
          console.log(err);
          console.log("Something went wrong");
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

// // when user want to register vehicle
router.get("/registerVehicle", function (req, res, next) {
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
        res.redirect("dashboard");
      } else {
        console.log("New Vehicle Added");
        res.redirect("dashboard");
      }
    }
  );
});

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

router.get("/take-appointment",protectLogin, (req, res) => {
  const userID = session.userID;
  var sql1 = `SELECT * FROM vehicle WHERE customer_id="${userID}"`;
  var sql2 = "SELECT * FROM job";
  con.query(sql1, function (err, data1) {
    if (err) throw err;
    //console.log(data1); //this should print

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

router.post('/take-appointment',async function(req,res){
  const userID=session.userID;
   console.log(`"${userID}"`)

    con.query(sql,[userID,vehicles,date,address,city,state,jobs,license],(err,data,fields)=>{
      if(err){
        throw err;
        res.redirect("/customer/take-appointment")
      }
      else{
        console.log("Appointment done.");
        res.redirect("/customer/dashboard")
      } 
    });
router.get('/updateProfile', function(req, res, next) {
  res.render('Profile');
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
});

module.exports=router;
