const api = require('../api.js')
const ui = require('./ui.js')
const getFormFields = require('../../../lib/get-form-fields')

const onSignUp = function (event) {
  const data = getFormFields(this) // data: this is the result of the object that is created from the event handler and is formatted via the getFormFields function
  event.preventDefault()
  api.signUp(data)
    .then(ui.signUpSuccess)
    .catch(ui.signUpFailure)
}

const onSignIn = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  api.signIn(data, event) // this is where the signIn function from the api file is actually being invoked and that is why the api file is required rather than the other way around -- need to require file where you are invoking the function
    .then(ui.signInSuccess)
    .catch(ui.signInFailure)
}

const onSignOut = function (event) {
  event.preventDefault()
  api.signOut()
    .then(ui.signOutSuccess)
    .catch(ui.signOutFailure)
}

const onChangePassword = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  api.changePassword(data)
    .then(ui.changePasswordSuccess)
    .catch(ui.changePasswordFailure)
}

// after successful sign in, get the rounds associated to the user and display them
const getRounds = function (event) {
  event.preventDefault()
  api.index()
    .then(ui.getRoundsSuccess)
    .catch(ui.getRoundsFailure)
}

const addHandlers = () => {
  $('#signUpInModal').modal('show') // this shows the sign up and sign in modal on page load
  $('#signUpInModal').on('hidden.bs.modal', (event) => {
    $('#sign-in').get(0).reset()
    $('#sign-up').get(0).reset()
  })
  $('#changePasswordModal').on('hidden.bs.modal', (event) => $('#change-password').get(0).reset()) // this clears out forms
  $('#changePasswordButton').on('click', function () {
    $('#changePasswordModal').modal('show')
  })
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
  $('#sign-out').on('click', onSignOut)
  $('#change-password').on('submit', onChangePassword)
  $('#newRoundButton').on('click', function () {
    $('#addNewRoundModal').modal('show')
  })
  $('#newRoundButton').on('click', function () {
    $('#addNewRoundFailMessage').hide()
  })
  $('#changePasswordButton').on('click', function () {
    $('#changePassFailMessage').hide()
  })
  $('#changePasswordButton').on('click', function () {
    $('#changePassSuccessMessage').hide()
  })
  $('.deleteRoundButton').on('click', function () {
    $('#deleteRoundFailMessage').hide()
  })
  $('.signUpLink').on('click', function () {
    $('#signUpFailMessage').hide()
    $('#sign-up').get(0).reset()
  })
  $('.signUpLink').on('click', function () {
    $('#sign-up').toggle()
  })
}

module.exports = {
  addHandlers,
  onSignUp,
  onSignIn,
  onSignOut,
  onChangePassword,
  getRounds
}
