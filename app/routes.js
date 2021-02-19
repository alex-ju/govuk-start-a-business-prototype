const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line
router.get('/next-steps/:mode?', function (req, res, next) {
  let notRelevantList = false

  if (req.params.mode === 'not-relevant') {
    notRelevantList = true
  }

  res.render('next-steps', { notRelevantList })
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
