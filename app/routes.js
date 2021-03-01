const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line
router.get('/next-steps/', function (req, res, next) {
  req.session.data.ref = null
  if (req.session.data.crn) {
    res.render('next-steps')
  } else {
    res.redirect('/')
  }
})

router.get('/question/:question', function (req, res, next) {
  if (req.query.ref) {
    req.session.data.ref = req.query.ref
  } else {
    req.session.data.ref = null
  }
  next()
})

router.get('/email-confirmation/:crn?', function (req, res, next) {
  if (req.params.crn) {
    req.session.data.crn = req.params.crn
    res.redirect('/email-confirmation')
  } else {
    res.render('email-confirmation')
  }
})

module.exports = router
