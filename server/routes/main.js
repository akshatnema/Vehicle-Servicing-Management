const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.render('index', {error: req.flash('error'), success: req.flash('success')})
})

router.get('/register', (req, res) => {
    res.render('register', {error: req.flash('error'), success: req.flash('success')})
  })

router.get('/admin', (req, res) => {
    res.render('admin-login', {error: req.flash('error'), success: req.flash('success')})
  })

module.exports = router;