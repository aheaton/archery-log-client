const api = require('../api.js')
const ui = require('./ui.js')
const getFormFields = require('../../../lib/get-form-fields')

const onSignUp = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  api.signUp(data)
    .then(ui.signUpSuccess)
    .catch(ui.signUpFailure)
}

const onSignIn = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  api.signIn(data)
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

const onAddRound = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  console.log('this is my data', data)
  api.create(data)
    .then(ui.addRoundSuccess)
    .catch(ui.addRoundFailure)
}

const addHandlers = () => {
  $('#addNewRoundModal').on('hidden.bs.modal', (event) => {
    $('#add-round').get(0).reset()
  })
  $('#add-round').on('submit', onAddRound)
}

module.exports = {
  addHandlers,
  onSignUp,
  onSignIn,
  onSignOut,
  onChangePassword,
  onAddRound
}
