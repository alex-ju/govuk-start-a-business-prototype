// Core dependencies
const fs = require('fs')

// NPM dependencies
const getKeypath = require('keypather/get')
const marked = require('marked')
const path = require('path')
const portScanner = require('portscanner')
const inquirer = require('inquirer')
const request = require('sync-request')

// Local dependencies
const config = require('../app/config.js')

// Variables
var releaseUrl = null

// Require core and custom filters, merges to one object
// and then add the methods to Nunjucks environment
exports.addNunjucksFilters = function (env) {
  var coreFilters = require('./core_filters.js')(env)
  var customFilters = require('../app/filters.js')(env)
  var filters = Object.assign(coreFilters, customFilters)
  Object.keys(filters).forEach(function (filterName) {
    env.addFilter(filterName, filters[filterName])
  })
}

// Add Nunjucks function called 'checked' to populate radios and checkboxes
exports.addCheckedFunction = function (env) {
  env.addGlobal('checked', function (name, value) {
    // Check data exists
    if (this.ctx.data === undefined) {
      return ''
    }

    // Use string keys or object notation to support:
    // checked("field-name")
    // checked("['field-name']")
    // checked("['parent']['field-name']")
    name = !name.match(/[.[]/g) ? `['${name}']` : name
    var storedValue = getKeypath(this.ctx.data, name)

    // Check the requested data exists
    if (storedValue === undefined) {
      return ''
    }

    var checked = ''

    // If data is an array, check it exists in the array
    if (Array.isArray(storedValue)) {
      if (storedValue.indexOf(value) !== -1) {
        checked = 'checked'
      }
    } else {
      // The data is just a simple value, check it matches
      if (storedValue === value) {
        checked = 'checked'
      }
    }
    return checked
  })
}

// Find an available port to run the server on
exports.findAvailablePort = function (app, callback) {
  var port = null

  // When the server starts, we store the port in .port.tmp so it tries to restart
  // on the same port
  try {
    port = Number(fs.readFileSync(path.join(__dirname, '/../.port.tmp')))
  } catch (e) {
    port = Number(process.env.PORT || config.port)
  }

  console.log('')

  // Check port is free, else offer to change
  portScanner.findAPortNotInUse(port, port + 50, '127.0.0.1', function (error, availablePort) {
    if (error) { throw error }
    if (port === availablePort) {
      // Port is free, return it via the callback
      callback(port)
    } else {
      // Port in use - offer to change to available port
      console.error('ERROR: Port ' + port + ' in use - you may have another prototype running.\n')

      // Ask user if they want to change port
      inquirer.prompt([{
        name: 'changePort',
        message: 'Change to an available port?',
        type: 'confirm'
      }]).then(answers => {
        if (answers.changePort) {
          // User answers yes
          port = availablePort
          fs.writeFileSync(path.join(__dirname, '/../.port.tmp'), port.toString())
          console.log('Changed to port ' + port)

          callback(port)
        } else {
          // User answers no - exit
          console.log('\nYou can set a new default port in server.js, or by running the server with PORT=XXXX')
          console.log("\nExit by pressing 'ctrl + c'")
          process.exit(0)
        }
      })
    }
  })
}

// Redirect HTTP requests to HTTPS
exports.forceHttps = function (req, res, next) {
  var protocol = req.headers['x-forwarded-proto']
  // Glitch returns a comma separated list for x-forwarded-proto
  // We need the first to determine if running on https
  if (protocol) {
    protocol = protocol.split(',').shift()
  }

  if (protocol !== 'https') {
    console.log('Redirecting request to https')
    // 302 temporary - this is a feature that can be disabled
    return res.redirect(302, 'https://' + req.get('Host') + req.url)
  }

  // Mark proxy as secure (allows secure cookies)
  req.connection.proxySecure = true
  next()
}

// Synchronously get the URL for the latest release on GitHub and cache it
exports.getLatestRelease = function () {
  if (releaseUrl !== null) {
    // Release URL already exists
    console.log('Release url cached:', releaseUrl)
    return releaseUrl
  } else {
    // Release URL doesn't exist
    try {
      console.log('Getting latest release from GitHub')

      var res = request(
        'GET',
        'https://api.github.com/repos/alphagov/govuk-prototype-kit/releases/latest',
        {
          headers: { 'user-agent': 'node.js' }
        }
      )
      var data = JSON.parse(res.getBody('utf8'))

      // Cache releaseUrl before we return it
      releaseUrl = `https://github.com/alphagov/govuk-prototype-kit/archive/${data.name}.zip`

      console.log('Release URL is', releaseUrl)
      return releaseUrl
    } catch (err) {
      console.log("Couldn't retrieve release URL")
      return 'https://github.com/alphagov/govuk-prototype-kit/releases/latest'
    }
  }
}

// Try to match a request to a template, for example a request for /test
// would look for /app/views/test.html
// and /app/views/test/index.html

function renderPath (path, res, next) {
  // Try to render the path
  res.render(path, function (error, html) {
    if (!error) {
      // Success - send the response
      res.set({ 'Content-type': 'text/html; charset=utf-8' })
      res.end(html)
      return
    }
    if (!error.message.startsWith('template not found')) {
      // We got an error other than template not found - call next with the error
      next(error)
      return
    }
    if (!path.endsWith('/index')) {
      // Maybe it's a folder - try to render [path]/index.html
      renderPath(path + '/index', res, next)
      return
    }
    // We got template not found both times - call next to trigger the 404 page
    next()
  })
}

exports.matchRoutes = function (req, res, next) {
  var path = req.path

  // Remove the first slash, render won't work with it
  path = path.substr(1)

  // If it's blank, render the root index
  if (path === '') {
    path = 'index'
  }

  renderPath(path, res, next)
}

// Try to match a request to a Markdown file and render it
exports.matchMdRoutes = function (req, res) {
  var docsPath = '/../docs/documentation/'
  if (fs.existsSync(path.join(__dirname, docsPath, req.params[0] + '.md'), 'utf8')) {
    var doc = fs.readFileSync(path.join(__dirname, docsPath, req.params[0] + '.md'), 'utf8')
    var html = marked(doc)
    res.render('documentation_template', { document: html })
    return true
  }
  return false
}

// Store data from POST body or GET query in session
var storeData = function (input, data) {
  for (var i in input) {
    // any input where the name starts with _ is ignored
    if (i.indexOf('_') === 0) {
      continue
    }

    var val = input[i]

    // Delete values when users unselect checkboxes
    if (val === '_unchecked' || val === ['_unchecked']) {
      delete data[i]
      continue
    }

    // Remove _unchecked from arrays of checkboxes
    if (Array.isArray(val)) {
      var index = val.indexOf('_unchecked')
      if (index !== -1) {
        val.splice(index, 1)
      }
    } else if (typeof val === 'object') {
      // Store nested objects that aren't arrays
      if (typeof data[i] !== 'object') {
        data[i] = {}
      }

      // Add nested values
      storeData(val, data[i])
      continue
    }

    data[i] = val
  }
}

// Get session default data from file
let sessionDataDefaults = {}

const sessionDataDefaultsFile = path.join(__dirname, '/../app/data/session-data-defaults.js')

try {
  sessionDataDefaults = require(sessionDataDefaultsFile)
} catch (e) {
  console.error('Could not load the session data defaults from app/data/session-data-defaults.js. Might be a syntax error?')
}

// Middleware - store any data sent in session, and pass it to all views
exports.autoStoreData = function (req, res, next) {
  if (!req.session.data) {
    req.session.data = {}
  }

  req.session.data = Object.assign({}, sessionDataDefaults, req.session.data)

  const companies = {
    // Participant 1
    '12746208': {
      'company-name': 'R & C Catering Limited',
      'company-number': '12746208',
      'company-type': 'Private Limited Company',
      'company-sector': 'Event catering activities', // Event catering activities
      'company-address': '9 Bell Crescent, Manchester, M11 3UA',
      'company-address-street': '9 Bell Crescent',
      'company-address-city': 'Manchester',
      'company-address-postcode': 'M11 3UA',
      'company-borough': 'Manchester City Council',

      'officer-name': 'Chelsea Marie Connolly',
      'officer-dob-month': '1',
      'officer-dob-year': '1993',
      'officer-address-street': '9 Bell Crescent',
      'officer-address-city': 'Manchester',
      'officer-address-postcode': 'M11 3UA'
    },
    // Participant 2
    '12206929': {
      'company-name': 'Shrivi Limited',
      'company-number': '12206929',
      'company-type': 'Private Limited Company',
      'company-sector': 'Food and beverage', // Non-specialised wholesale trade
      'company-address': '112 Central Road, Dartford, DA1 5UN',
      'company-address-street': '112 Central Road',
      'company-address-city': 'Dartford',
      'company-address-postcode': 'DA1 5UN',
      'company-borough': 'Dartford Borough Council',

      'officer-name': 'Raghu Jakkula',
      'officer-dob-month': '6',
      'officer-dob-year': '1983',
      'officer-address-street': '112 Central Road',
      'officer-address-city': 'Dartford',
      'officer-address-postcode': 'DA1 5UN'
    },
    // Participant 3
    '12927782': {
      'company-name': 'Gregec Limited',
      'company-number': '12927782',
      'company-type': 'Private Limited Company',
      'company-sector': 'Food and beverage', // Retail sale via mail order houses or via Internet
      'company-address': 'Flat 25 Mandara Place, Yeoman Street, London, SE8 5ET',
      'company-address-street': 'Flat 25 Mandara Place, Yeoman Street',
      'company-address-city': 'London',
      'company-address-postcode': 'SE8 5ET',
      'company-borough': 'Lewisham London Borough Council',

      'officer-name': 'Grzegorz Aleksander Cienski',
      'officer-dob-month': '10',
      'officer-dob-year': '1988',
      'officer-address-street': 'Flat 25 Mandara Place, Yeoman Street',
      'officer-address-city': 'London',
      'officer-address-postcode': 'SE8 5ET'
    },
    // Participant 4
    '12482815': {
      'company-name': 'Italia Solutions UK Ltd',
      'company-number': '12482815',
      'company-type': 'Private Limited Company',
      'company-sector': 'Other retail sale of food in specialised stores', // Other retail sale of food in specialised stores
      'company-address': 'Fen Place Farm East Street, Turners Hill, Crawley, RH10 4QA',
      'company-address-street': 'Fen Place Farm East Street',
      'company-address-city': 'Turners Hill',
      'company-address-postcode': 'RH10 4QA',
      'company-borough': 'Crawley Borough Council',

      'officer-name': 'Anita Dawn McGuigan',
      'officer-dob-month': '12',
      'officer-dob-year': '1985',
      'officer-address-street': 'Fen Place Farm, East Street',
      'officer-address-city': 'Turners Hill',
      'officer-address-postcode': 'RH10 4QA'
    },
    // Participant 5
    '12625236': {
      'company-name': 'Mastertaps by Foley Ltd',
      'company-number': '12625236',
      'company-type': 'Private Limited Company',
      'company-sector': 'Food and beverage', // Cold drawing of bars
      'company-address': '7 Oaklands Park Drive, Rhiwderin, Newport, NP10 8RB',
      'company-address-street': '7 Oaklands Park Drive',
      'company-address-city': 'Rhiwderin',
      'company-address-postcode': 'NP10 8RB',
      'company-borough': 'Newport City Council',

      'officer-name': 'Nick Edward Foley',
      'officer-dob-month': '6',
      'officer-dob-year': '1984',
      'officer-address-street': '7 Oaklands Park Drive',
      'officer-address-city': 'Rhiwderin',
      'officer-address-postcode': 'NP10 8RB'
    }
  }

  const crn = req.params.crn || req.session.data.crn

  req.session.data.company = companies[crn]

  storeData(req.body, req.session.data)
  storeData(req.query, req.session.data)

  // Send session data to all views

  res.locals.data = {}

  for (var j in req.session.data) {
    res.locals.data[j] = req.session.data[j]
  }

  next()
}

exports.handleCookies = function (app) {
  return function handleCookies (req, res, next) {
    const COOKIE_NAME = 'seen_cookie_message'
    const cookie = req.cookies[COOKIE_NAME]

    if (cookie === 'yes') {
      app.locals.shouldShowCookieMessage = false
      return next()
    }

    const maxAgeInDays = 28
    res.cookie(COOKIE_NAME, 'yes', {
      maxAge: maxAgeInDays * 24 * 60 * 60 * 1000,
      httpOnly: true
    })

    app.locals.shouldShowCookieMessage = true

    next()
  }
}
