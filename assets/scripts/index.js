'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')

$(() => {
  setAPIOrigin(location, config)
})

const authEvents = require('./auth/events.js')
const roundEvents = require('./rounds/events.js')
// const roundEvents = require('./rounds/events.js')

// On document ready
$(() => {
  authEvents.addHandlers()
  roundEvents.addHandlers()
})
