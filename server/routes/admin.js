const express = require("express");
const session = require("express-session");
const con = require("../database/sql_connect");

var router = express.Router();

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
router.post('/login', (req, res) => {
    const { aemail, apass } = req.body
    const password = '12345'
    const admin='admin@gmail.com'
    if(aemail===admin && apass===password) {
        session.userType='admin'
        session.userID='10000'
        res.redirect('/admin/dashboard')
    }
    else{
        console.log('Wrong Credentials')
        res.redirect('/admin')
    }
  })


router.post('/logout', (req, res) => {
    console.log('logout successfully')
    session.userID = null
    session.userType = null
    res.redirect('/')
  })
router.get("/dashboard", protectLogin, (req, res) => {
  res.render("adminDashboard");
});

router.get("/customerView", function (req, res, next) {
  var sql = "SELECT * FROM customer";
  con.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render("customerView", { title: "Customer Details", userData: data });
  });
});

router.get('/employeeView', function(req, res, next) {
  var sql='SELECT * FROM employee';
  con.query(sql, function (err, data, fields) {
  if (err) throw err;
  res.render('employeeView', { title: 'Employee Details', userData: data});
});
});

router.get('/feedbackView', function(req, res, next) {
  var sql='SELECT * FROM feedback';
  con.query(sql, function (err, data, fields) {
  if (err) throw err;
  res.render('feedbackView', { title: 'Feedbacks', userData: data});
});
});

router.get('/deleteEmployee', protectLogin, (req, res)=>{
  res.render('deleteEmployee')
})

router.post('/deleteEmployee',async function(req, res) {
  const { id,email } = req.body
  // DELETE FROM `employee` WHERE 0
      const query ="DELETE FROM employee WHERE id=? AND email=?"
      con.query(query,[id,email], (err,result) =>{
         if (err){
             console.log(err);
             console.log('Something went wrong')
         } else {
         console.log('successfully deleted  Employee!');
         }
         res.redirect('/admin/deleteEmployee')
      })
  });

  router.get('/deleteCustomer', protectLogin, (req, res)=>{
    res.render('deleteCustomer')
  })

  router.post('/deleteCustomer',async function(req, res) {
    const { id,email } = req.body
    // DELETE FROM `employee` WHERE 0
        const query ="DELETE FROM customer WHERE id=? AND email=?"
        con.query(query,[id,email], (err,result) =>{
           if (err){
               console.log(err);
               console.log('Something went wrong')
           } else {
           console.log('successfully deleted Customer!');
           }
           res.redirect('/admin/deleteCustomer')
        })
    });
  
    
  router.get('/services', function(req, res, next) {
      var sql='SELECT * FROM job';
      userID='admin@gmail.com'
      con.query(sql, function (err, data, fields) {
      if (err) throw err;
      res.render('services', { title: 'JOBS', userData: data,id:userID});
    });
  });
  

  router.get('/appointments', function(req, res, next) {
      var sql='SELECT * FROM job_card_details';
      con.query(sql, function (err, data, fields) {
      if (err) throw err;
      res.render('viewAppointment', { title: 'JOBS', userData: data});
    });
  });
  module.exports = router;
