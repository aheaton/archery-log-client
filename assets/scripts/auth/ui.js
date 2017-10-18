'use strict'

const store = require('../store')

const signUpSuccess = function (data) { // this is the object that is created from the ajax request
  $('#sign-up').hide()
  $('#signInFailMessage').hide()
  $('#signUpSuccessMessage').show()
}

const signUpFailure = function () { // this error also comes back from the ajax request
  $('#signUpFailMessage').show()
}

const signInSuccess = function (data) {
  $('#signUpInModal').modal('hide')
  $('.navbar').show()
  $('.title').show()
  $('#newRoundButton').show()
  // $('#signOutButton').show()
  // $('#changePasswordButton').show()
  store.user = data.user // this puts a user property in the store object located in the store file; doing this on signInSucess because comes back from the response here
}

const signInFailure = function () {
  $('#signInFailMessage').show()
  $('#signUpSuccessMessage').hide()
}

const signOutSuccess = function () {
  $('#signUpInModal').modal('show')
  $('#sign-up').show()
  $('#signUpSuccessMessage').hide()
  $('#signUpFailMessage').hide()
  $('#signOutFailMessage').hide()
  $('#signInFailMessage').hide()
  $('.navbar').hide()
  $('.title').hide()
  store.user = null
}

const signOutFailure = function () {
  $('#signOutFailMessage').show()
}

const changePasswordSuccess = function () {
  $('#changePassFailMessage').hide()
  $('#changePassSuccessMessage').show()
  $('#change-password').trigger('reset')
}

const changePasswordFailure = function () {
  $('#changePassFailMessage').show()
  $('#changePassSuccessMessage').hide()
}

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
  changePasswordSuccess,
  changePasswordFailure
}
