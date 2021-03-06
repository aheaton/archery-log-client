'use strict'

const store = require('../store')
const showRoundsTemplate = require('../templates/rounds.handlebars')
const api = require('../api.js')
const getFormFields = require('../../../lib/get-form-fields')

const signUpSuccess = function (data) { // this is the object that is created from the ajax request
  $('#sign-up').hide()
  $('#signInFailMessage').hide()
  $('#signUpSuccessMessage').show()
  $('.signUpLink').hide()
}

const signUpFailure = function () { // this error also comes back from the ajax request
  $('#signUpFailMessage').show()
}

const signInSuccess = function (data, event) {
  store.user = data.user // this puts a user property in the store object located in the store file; doing this on signInSucess because comes back from the response here
  $('#signUpInModal').modal('hide')
  $('.navbar').show()
  $('.title').show()
  $('#newRoundButton').show()
  api.index()
    .then(getRoundsSuccess)
    .catch(getRoundsFailure)
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
  $('.all-rounds').empty()
  $('#newRoundButton').hide()
  $('#getRoundsButton').hide()
}

const signOutFailure = function () {
  $('#signOutFailMessage').show()
  setTimeout(() => { $('#signOutFailMessage').hide() }, 3000)
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

let round = '' // id used for editing round, coming from Handlebars
let deleteRoundID = '' // id used for deleting round, coming from Handlebars
const getRoundsSuccess = function (data) {
  $('#getRoundsFailMessage').hide()
  const showRoundsHtml = showRoundsTemplate({ rounds: data.rounds }) // this is putting the data object that contains all the rounds into a rounds object it can use when the method defined in HandleBars is invoked
  $('.all-rounds').html(showRoundsHtml)
  $('.editRoundButton').on('click', function () { // need to put this click handler here because the button needs to be loaded into the DOM before I can put a click handler on it (i.e. cannot put this event listener into memory on page load like the others)
    $('#editRoundModal').modal('show')
  })
  $('.editRoundButton').on('click', function (event) { // this shows the information in the edit modal of the round clicked
    event.preventDefault()
    round = $(this).data('id')
    api.show(round)
      .then(onShowRoundSuccess)
      .catch(onShowRoundFailure)
  })
  $('.editRoundButton').on('click', function () {
    $('#updateRoundFailMessage').hide()
  })
  $('#edit-round').on('submit', function (event) { // this allows you to edit the information in the modal and submit it
    const data = getFormFields(this)
    event.preventDefault()
    api.update(round, data)
      .then(onUpdateRoundSuccess)
      .catch(onUpdateRoundFailure)
  })
  $('.deleteRoundButton').on('click', function () {
    $('#deleteConfirmModal').modal('show')
    deleteRoundID = $(this).data('id')
  })
  $('#deleteConfirmButton').on('click', function (event) {
    event.preventDefault()
    api.destroy(deleteRoundID)
      .then(onDeleteSuccess)
      .catch(onDeleteFailure)
  })
  $('.deleteRoundButton').on('click', function () {
    $('#deleteRoundFailMessage').hide()
  })
}

const getRoundsFailure = function (response) {
  $('#getRoundsFailMessage').show()
  setTimeout(() => { $('#getRoundsFailMessage').hide() }, 3000)
}

const onDeleteSuccess = function () {
  $('#deleteRoundFailMessage').hide()
  $('#deleteConfirmModal').modal('hide')
  api.index()
    .then(getRoundsSuccess)
    .catch(getRoundsFailure)
}

const onDeleteFailure = function (response) {
  $('#deleteRoundFailMessage').show()
}

const onShowRoundSuccess = function (round) {
  $('#showRoundFailMessage').hide()
  $('#roundDate').val(round.round.date) // need round here twice because my round object is nested within another round object based on how I am passing it in
  $('#roundRangeName').val(round.round.range_name)
  $('#roundRangeType').val(round.round.range_type)
  $('#roundBowClass').val(round.round.bow_class)
  $('#roundArrowsPerEnd').val(round.round.arrows_per_end)
  $('#roundNumberOfEnds').val(round.round.number_of_ends)
  $('#roundTotalScore').val(round.round.total_score)
}

const onShowRoundFailure = function (response) {
  $('#showRoundFailMessage').show()
  setTimeout(() => { $('#showRoundFailMessage').hide() }, 3000)
}

const onUpdateRoundSuccess = function (event) {
  $('#updateRoundFailMessage').hide()
  $('#editRoundModal').modal('hide')
  $('.all-rounds').html('') // this hides all rounds
  api.index()
    .then(getRoundsSuccess)
    .catch(getRoundsFailure)
}

const onUpdateRoundFailure = function (response) {
  $('#updateRoundFailMessage').show()
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
