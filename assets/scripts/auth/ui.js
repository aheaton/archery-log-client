'use strict'

const store = require('../store')
const showRoundsTemplate = require('../templates/rounds.handlebars')
const api = require('../api.js')

const signUpSuccess = function (data) { // this is the object that is created from the ajax request
  $('#sign-up').hide()
  $('#signInFailMessage').hide()
  $('#signUpSuccessMessage').show()
  $('.signUpLink').hide()
}

const signUpFailure = function () { // this error also comes back from the ajax request
  $('#signUpFailMessage').show()
}

const signInSuccess = function (data) {
  store.user = data.user // this puts a user property in the store object located in the store file; doing this on signInSucess because comes back from the response here
  $('#signUpInModal').modal('hide')
  $('.navbar').show()
  $('.title').show()
  $('#newRoundButton').show()
  $('#getRoundsButton').show()
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
  $('.signUpLink').show()
  $('#sign-up').hide()
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

const getRoundsSuccess = function (data) {
  console.log('Get Rounds Success!')
  const showRoundsHtml = showRoundsTemplate({ rounds: data.rounds }) // this is putting the data object that contains all the rounds into a rounds object it can use when the method defined in HandleBars is invoked
  $('.all-rounds').append(showRoundsHtml)
  $('.editRoundButton').on('click', function () { // need to put this click handler here because the button needs to be loaded into the DOM before I can put a click handler on it (i.e. cannot put this event listener into memory on page load like the others)
    $('#editRoundModal').modal('show')
  })
  $('.deleteRoundButton').on('click', function (event) {
    event.preventDefault()
    $(this).parent().hide()
    console.log('this is the round I want to delete', $(this).data('id'))
    const round = $(this).data('id')
    api.destroy(round)
      .then(onDeleteSuccess)
      .catch(onDeleteFailure)
  })
}

const onDeleteSuccess = function () {
  console.log('Delete success!')
}

const onDeleteFailure = function (response) {
  console.error(response)
  $('#editRoundFailMessage').show()
}

const getRoundsFailure = function (response) {
  console.error(response)
  $('#getRoundsFailMessage').show()
}

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
  changePasswordSuccess,
  changePasswordFailure,
  getRoundsSuccess,
  getRoundsFailure
}
