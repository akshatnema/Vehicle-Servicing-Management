const express = require('express')
const session = require('express-session')
const con = require('../database/sql_connect')

var router = express.Router()

function protectLogin (req, res, next) {
    if (!session.userID) {
      console.log('Login to continue')
      return res.redirect('/admin')
    } else if (session.userType === 'customer') {
      console.log('logged in as customer')
      res.redirect('/admin/customer')
    } else {
      next()
    }
  }

router.get('/dashboard', protectLogin, (req, res)=>{
    res.render('adminDashboard')
})

router.get('/customerView', function(req, res, next) {
  var sql='SELECT * FROM customer';
  con.query(sql, function (err, data, fields) {
  if (err) throw err;
  res.render('customerView', { title: 'Customer Details', userData: data});
});
});

router.get('/employeeView', function(req, res, next) {
  var sql='SELECT * FROM employee';
  con.query(sql, function (err, data, fields) {
  if (err) throw err;
  res.render('employeeView', { title: 'Employee Details', userData: data});
});
});

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