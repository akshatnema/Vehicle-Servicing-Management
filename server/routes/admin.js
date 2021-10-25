const express = require("express");
const session = require("express-session");
const con = require("../database/sql_connect");
const bcrypt = require("bcrypt");

var router = express.Router();

//Functions
function protectLogin(req, res, next) {
  if (!session.userID) {
    console.log("Login to continue");
    return res.redirect("/admin");
  } else if (session.userType === "customer") {
    console.log("logged in as customer");
    res.redirect("/customer/dashboard");
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

//Dashboard
router.get("/dashboard", protectLogin, (req, res) => {
  res.render("adminDashboard", {error: req.flash('error'), success: req.flash('success')});
});

//Login
router.post("/login", (req, res) => {
  const { aemail, apass } = req.body;
  const password = "12345";
  const admin = "admin@gmail.com";
  if (aemail === admin && apass === password) {
    session.userType = "admin";
    session.userID = "10000";
    req.flash('success','logged in successfully')
    res.redirect("/admin/dashboard");
  } else {
    console.log("Wrong Credentials");
    req.flash('error','wrong credentials')
    res.redirect("/admin");
  }
});

router.post("/logout", (req, res) => {
  console.log("logout successfully");
  session.userID = null;
  session.userType = null;
  req.flash('success','logout successfully')
  res.redirect("/admin");
});

// Employee Section

router.get("/employeeView", protectLogin, function (req, res, next) {
  var sql = "SELECT * FROM employee";
  con.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render("employeeView", {
      title: "Employee Details",
      userData: data,
    });
  });
});

router.get("/addUpdateEmployee", protectLogin, (req, res) => {
  res.render("addUpdateEmployee",{error:req.flash('error'),success:req.flash('success')});
});

router.post("/addEmployee", async function (req, res) {
  const { name, post, email, mobile, street, city, state } = req.body;
  console.log(post);
  if (post == "1") var postValue = "Ford";
  else if (post == "2") var postValue = "Technician";
  else if (post == "3") var postValue = "Manager";
  console.log(postValue);
  const query =
    "INSERT INTO employee (name, post, email, contact_no, street, city, state)  VALUES (?,?,?,?,?,?,?)";
  con.query(
    query,
    [name, postValue, email, mobile, street, city, state],
    (err, result) => {
      if (err) {
        console.log(err);
        console.log("Something went wrong");
        req.flash('error',err.message);
        res.redirect("/register");
      } else {
        console.log("successfully added Employee");
      }
    }
  );
  req.flash('success','Successfully added Employee')
  res.redirect("/admin/addUpdateEmployee");
});

router.post("/updateEmployee", async function (req, res) {
  const { id, exampleRadios, correctedInfo } = req.body;
  let flag=0
  if (exampleRadios === "option1") {
    const query = "UPDATE employee SET name=? WHERE id=?";
    con.query(query, [correctedInfo, id], (err, result) => {
      if (err) {
        console.log(err);
        console.log("Something went wrong");
      } else {
        flag=1
        console.log("successfully inserted name");
      }
    });
  } else if (exampleRadios === "option2") {
    const query = "UPDATE employee SET post=? WHERE id=?";
    con.query(query, [correctedInfo, id], (err, result) => {
      if (err) {
        console.log(err);
        console.log("Something went wrong");
      } else {
        flag=1
        console.log("successfully inserted post");
      }
    });
  } else if (exampleRadios === "option3") {
    const query = "UPDATE employee SET email=? WHERE id=?";
    con.query(query, [correctedInfo, id], (err, result) => {
      if (err) {
        console.log(err);
        console.log("Something went wrong");
      } else {
        flag=1
        console.log("successfully inserted eamil");
      }
    });
  } else if (exampleRadios === "option4") {
    const query = "UPDATE employee SET contact_no=? WHERE id=?";
    con.query(query, [correctedInfo, id], (err, result) => {
      if (err) {
        console.log(err);
        console.log("Something went wrong");
      } else {
        flag=1
        console.log("successfully inserted contact no.");
      }
    });
  } else if (exampleRadios === "option5") {
    const query = "UPDATE employee SET street=? WHERE id=?";
    con.query(query, [correctedInfo, id], (err, result) => {
      if (err) {
        console.log(err);
        console.log("Something went wrong");
      } else {
        flag=1
        console.log("successfully inserted street");
      }
    });
  } else if (exampleRadios === "option6") {
    const query = "UPDATE employee SET city=? WHERE id=?";
    con.query(query, [correctedInfo, id], (err, result) => {
      if (err) {
        console.log(err);
        console.log("Something went wrong");
      } else {
        flag=1
        console.log("successfully inserted city");
      }
    });
  } else if (exampleRadios === "option7") {
    const query = "UPDATE employee SET state=? WHERE id=?";
    con.query(query, [correctedInfo, id], (err, result) => {
      if (err) {
        console.log(err);
        console.log("Something went wrong");
      } else {
        flag=1
        console.log("successfully inserted state");
      }
    });
  }
  if (!flag) {
    req.flash('success','Successfully updated data');
  }
  else{
    req.flash('error','Something went wrong');
  }
  res.redirect("/admin/addUpdateEmployee");
});

router.get("/deleteEmployee", protectLogin, (req, res) => {
  res.render("deleteEmployee",{error:req.flash('error'),success:req.flash('success')});
});

router.post("/deleteEmployee", async function (req, res) {
  const { id, email } = req.body;
  let flag=0
  const query = "DELETE FROM employee WHERE id=? AND email=?";
  con.query(query, [id, email], (err, result) => {
    if (err) {
      console.log(err);
      console.log("Something went wrong");
    } else {
      flag=1
      console.log("successfully deleted Employee!");
    }
    if (flag) {
      req.flash('success','Successfully deleted employee');
    }
    else{
      req.flash('error','Something went wrong');
    } 
    res.redirect("/admin/deleteEmployee");
  });
});

// Customer Section

router.get("/customerView", protectLogin, function (req, res, next) {
  var sql = "SELECT * FROM customer";
  con.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render("customerView", {
      title: "Customer Details",
      userData: data,
    });
  });
});

router.get("/addUpdateCustomer", protectLogin, (req, res) => {
  res.render("addUpdateCustomer",{error:req.flash('error'),success:req.flash('success')});
});

router.post("/addCustomer", async function (req, res) {
  const { name, email, password, street, city, state, mobile } = req.body;
  let flag=0
  if (already(email) === "found") {
    console.log("This email is already registered");
    res.redirect("/admin/addUpdateCustomer");
  } else {
    const hash = await bcrypt.hash(password, 5);
    const query =
      "INSERT INTO customer (name,email,password,street,city,state,mobile) VALUES (?,?,?,?,?,?,?)";
    con.query(
      query,
      [name, email, hash, street, city, state, mobile],
      (err, result) => {
        if (err) {
          console.log(err);
          console.log("Something went wrong");
        } else {
          flag=1
          console.log("successfully admin has added Customer");
        }
      }
    );
    console.log(flag);
    if(!flag){
      req.flash('success','successfully admin has added Customer')
    }
    else{
      req.flash('error','Something went wrong')
    }
    res.redirect("/admin/addUpdateCustomer");
  }
});

router.post("/updateCustomer", async function (req, res) {
  const { id, exampleRadios, correctedInfo } = req.body;
  // console.log(correctedInfo)
  if (exampleRadios === "option1") {
    const query = "UPDATE customer SET name=? WHERE id=?";
    con.query(query, [correctedInfo, id], (err, result) => {
      if (err) {
        console.log(err);
        console.log("Something went wrong");
      } else {
        console.log("successfully inserted name");
      }
    });
  } else if (exampleRadios === "option2") {
    const query = "UPDATE customer SET email=? WHERE id=?";
    con.query(query, [correctedInfo, id], (err, result) => {
      if (err) {
        console.log(err);
        console.log("Something went wrong");
      } else {
        console.log("successfully inserted email");
      }
    });
  } else if (exampleRadios === "option3") {
    const query = "UPDATE customer SET street=? WHERE id=?";
    con.query(query, [correctedInfo, id], (err, result) => {
      if (err) {
        console.log(err);
        console.log("Something went wrong");
      } else {
        console.log("successfully inserted street");
      }
    });
  } else if (exampleRadios === "option4") {
    const query = "UPDATE customer SET city=? WHERE id=?";
    con.query(query, [correctedInfo, id], (err, result) => {
      if (err) {
        console.log(err);
        console.log("Something went wrong");
      } else {
        console.log("successfully inserted city");
      }
    });
  } else if (exampleRadios === "option5") {
    const query = "UPDATE customer SET state=? WHERE id=?";
    con.query(query, [correctedInfo, id], (err, result) => {
      if (err) {
        console.log(err);
        console.log("Something went wrong");
      } else {
        console.log("successfully inserted state");
      }
    });
  } else if (exampleRadios === "option6") {
    const query = "UPDATE customer SET mobile=? WHERE id=?";
    con.query(query, [correctedInfo, id], (err, result) => {
      if (err) {
        console.log(err);
        console.log("Something went wrong");
      } else {
        console.log("successfully inserted mobile");
      }
    });
  }
  res.redirect("/admin/addUpdateCustomer");
});

router.get("/deleteCustomer", protectLogin, (req, res) => {
  res.render("deleteCustomer",{error:req.flash('error'),success:req.flash('success')});
});

router.post("/deleteCustomer", async function (req, res) {
  const { id, email } = req.body;
  // DELETE FROM `employee` WHERE 0
  let flag=0
  const query = "DELETE FROM customer WHERE id=? AND email=?";
  con.query(query, [id, email], (err, result) => {
    if (err) {
      console.log(err);
      console.log("Something went wrong");
    } else {
      console.log(result);
      if(result.affectedRows!=0){flag=1;
      console.log("successfully deleted Customer!");}
      else
      {
        flag=0;
      }
    }
    if(flag)
     req.flash('success','Successfully deleted customer')
    else
     req.flash('error','You Entered Wrong credentials')
    res.redirect("/admin/deleteCustomer");
  });
});

// Feebback Management

router.get("/feedbackView", protectLogin, function (req, res, next) {
  var sql = "SELECT * FROM feedback";
  con.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render("feedbackView", {
      title: "Feedbacks",userData: data});
  });
});


// navbar buttons
router.get("/services", protectLogin, function (req, res, next) {
  var sql = "SELECT * FROM job";
  const userID = "admin@gmail.com";
  con.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render("services", {
      title: "JOBS",
      userData: data,
      id: userID,
    });
  });
});


// Appointment Section
router.get("/viewAppointments",protectLogin,(req,res,next)=>{

var sql=  `SELECT job_card.customer_id,job_card.chasis_no,job_card.date,job.job_name,job_card.Status, employee.name FROM job_card ,job, employee WHERE employee.id=job_card.Employee_id AND job.job_id=job_card.job_id`;


  con.query(sql,async function(err,data){
    if(err)throw err;
    else{
      res.render("viewAppointment",{apps:data});
     }    
      });
    

})


router.get("/assign",protectLogin,(req,res,next)=>{
    
      res.render("assignAppointment");
});
router.post("/assign",protectLogin,(req,res,next)=>{
  const {id,emp,date}=req.body;

  var sql=`UPDATE job_card SET Employee_id=${emp},Complete_dt=?,Status=${1} WHERE card_id=${id}`;

  con.query(sql,[date],(err,results)=>{
       if(err){
        console.log(err);
        req.flash("error","Error occured");
        res.redirect('/admin/dashboard') 
       }
       else
       {
         req.flash("success","Appointment assigned successfully")
         res.redirect("/admin/dashboard");
       }
  });
})


module.exports = router;
