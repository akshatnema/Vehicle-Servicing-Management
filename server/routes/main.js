const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.render('index')
})

router.get('/register', (req, res) => {
    res.render('register')
  })

router.get('/admin', (req, res) => {
    res.render('admin-login')
  })

module.exports = router;