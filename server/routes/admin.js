const express = require("express");
const session = require("express-session");
const con = require("../database/sql_connect");
const bcrypt = require('bcrypt')

var router = express.Router();

function protectLogin(req, res, next) {
  if (!session.userID) {
    console.log("Login to continue");
    return res.redirect("/admin");
  } else if (session.userType === "customer") {
    console.log("logged in as customer");
    res.redirect("/admin/customer");
  } else {
    next();
  }
}

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

  router.get('/addUpdateEmployee', protectLogin, (req, res)=>{
    res.render('addUpdateEmployee')
  })

  router.get('/addUpdateCustomer', protectLogin, (req, res)=>{
    res.render('addUpdateCustomer')
  })

  router.get('/addCustomer', protectLogin, (req, res)=>{
    res.render('addCustomer')
  })

  function already (email) {
    const q0 = `SELECT * FROM customer WHERE email="${email}";`
    con.query(q0, (err, result) => {
      if (err) {
        throw err
      }
      if (result.length === 0) {
        return 'not found'
      } else {
        return 'found'
      }
    })
  }

  router.post('/addCustomer',async function(req, res) {
    const { name,email,password,street,city,state,mobile } = req.body
    if(already(email)==='found'){
        console.log('This email is already registered')
        res.redirect('/admin/addCustomer')
    }
    else{
        const hash = await bcrypt.hash(password, 5)
        // const query=`INSERT INTO customer (id,name,email,mobile,street,city,state,password) VALUES ('${id}','${name}','${email}','${mobile}','${address}','${city}','${state}','${hash}')`

        const query ="INSERT INTO customer (name,email,password,street,city,state,mobile) VALUES (?,?,?,?,?,?,?)"
        con.query(query,[name,email,hash,street,city,state,mobile], (err,result) =>{
           if (err){
               console.log(err);
               console.log('Something went wrong')
           } else {
           console.log('successfully admin has added Customer');
           }
        })
        res.redirect('/admin/addCustomer')
        
    }
})

router.get('/updateCustomer', protectLogin, (req, res)=>{
  res.render('updateCustomer')
})

router.post('/updateCustomer',async function(req, res) {
  const { id,exampleRadios,correctedInfo } = req.body
  // console.log(correctedInfo)
  if(exampleRadios==='option1'){
    const query ="UPDATE customer SET name=? WHERE id=?"
    con.query(query,[correctedInfo,id], (err,result) =>{
       if (err){
           console.log(err);
           console.log('Something went wrong')
       } 
       else {
       console.log('successfully inserted name');
       }
    })
  }
  else if(exampleRadios==='option2'){
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
  else if(exampleRadios==='option3'){
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
  else if(exampleRadios==='option4'){
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
  else if(exampleRadios==='option5'){
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
  else if(exampleRadios==='option6'){
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
  res.redirect('/admin/updateCustomer')
})

  
  router.get('/updateEmployee', protectLogin, (req, res)=>{
    res.render('updateEmployee')
  })

  router.post('/updateEmployee',async function(req, res) {
    const { id,exampleRadios,correctedInfo } = req.body
    // console.log(correctedInfo)
    if(exampleRadios==='option1'){
      const query ="UPDATE employee SET name=? WHERE id=?"
      con.query(query,[correctedInfo,id], (err,result) =>{
         if (err){
             console.log(err);
             console.log('Something went wrong')
         } 
         else {
         console.log('successfully inserted name');
         }
      })
    }
    else if(exampleRadios==='option2'){
      const query ="UPDATE employee SET post=? WHERE id=?"
      con.query(query,[correctedInfo,id], (err,result) =>{
         if (err){
             console.log(err);
             console.log('Something went wrong')
         } 
         else {
         console.log('successfully inserted post');
         }
      })
    }
    else if(exampleRadios==='option3'){
      const query ="UPDATE employee SET email=? WHERE id=?"
      con.query(query,[correctedInfo,id], (err,result) =>{
         if (err){
             console.log(err);
             console.log('Something went wrong')
         } 
         else {
         console.log('successfully inserted eamil');
         }
      })
    }
    else if(exampleRadios==='option4'){
      const query ="UPDATE employee SET contact_no=? WHERE id=?"
      con.query(query,[correctedInfo,id], (err,result) =>{
         if (err){
             console.log(err);
             console.log('Something went wrong')
         } 
         else {
         console.log('successfully inserted contact no.');
         }
      })
    }
    else if(exampleRadios==='option5'){
      const query ="UPDATE employee SET street=? WHERE id=?"
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
    else if(exampleRadios==='option6'){
      const query ="UPDATE employee SET city=? WHERE id=?"
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
    else if(exampleRadios==='option7'){
      const query ="UPDATE employee SET state=? WHERE id=?"
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
    res.redirect('/admin/updateEmployee')
})

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
  
  router.get('/addEmployee', protectLogin, (req, res)=>{
      res.render('add-employee')
    })
  router.post('/addEmployee',async function(req, res) {
      const { name,post,email,mobile,street,city,state } = req.body
      console.log(post)
      if (post=='1') var postValue='Ford';
      else if(post=='2') var postValue='Technician';
      else if(post=='3') var postValue='Manager';
      console.log(postValue)
      const query ="INSERT INTO employee (name, post, email, contact_no, street, city, state)  VALUES (?,?,?,?,?,?,?)"
          con.query(query,[name,postValue,email,mobile,street,city,state], (err,result) =>{
             if (err){
                 console.log(err);
                 console.log('Something went wrong')
                 res.redirect('/register')
             } else {
             console.log('successfully added Employee');
             }
          })
          res.redirect('/admin/addEmployee')
  })

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
  module.exports = router;
