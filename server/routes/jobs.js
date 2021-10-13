var express = require('express');
var router = express.Router();
const con = require('../database/sql_connect')
// another routes also appear here
// this script to fetch data from MySQL databse table
router.get('/services', function(req, res, next) {
    var sql='SELECT * FROM job';
    con.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render('services', { title: 'JOBS', userData: data});
  });
});
module.exports = router;