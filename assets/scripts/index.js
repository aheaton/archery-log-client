'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')

$(() => {
  setAPIOrigin(location, config)
})

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  $('#changePasswordModal').on('hidden.bs.modal', (event) => $('#change-password').get(0).reset()) // this clears out forms
  $('#changePasswordButton').on('click', function () {
    $('#changePasswordModal').modal('show')
  })
  $('.signUpForm').hide()
  $('.signUpLink').on('click', function () {
    $('.signUpForm').toggle()
  })
})
