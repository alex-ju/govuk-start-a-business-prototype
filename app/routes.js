const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line

router.get('/not-relevant/:id', function (req, res, next) {
  req.session.data['not-relevant'].push(req.params.id)
  res.sendStatus(200)
})

router.get('/relevant/:id', function (req, res, next) {
  for (var i = req.session.data['not-relevant'].length - 1; i >= 0; i--) {
    if (req.session.data['not-relevant'][i] === req.params.id) {
      req.session.data['not-relevant'].splice(i, 1)
    }
  }
  res.sendStatus(200)
})

router.get('/not-completed/:id', function (req, res, next) {
  for (var i = req.session.data.completed.length - 1; i >= 0; i--) {
    if (req.session.data.completed[i] === req.params.id) {
      req.session.data.completed.splice(i, 1)
    }
  }
  res.sendStatus(200)
})

router.get('/completed/:id', function (req, res, next) {
  req.session.data.completed.push(req.params.id)
  res.sendStatus(200)
})

router.get('/next-steps/:mode?', function (req, res, next) {
  let notRelevantList = false

  if (req.params.mode === 'not-relevant') {
    notRelevantList = true
  }

  res.render('next-steps', { notRelevantList })
})

module.exports = router
