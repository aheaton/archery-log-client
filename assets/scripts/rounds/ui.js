'use strict'

const store = require('../store')
const authUI = require('../auth/ui.js')
const api = require('../api.js')

const addRoundSuccess = function (data, event) {
  console.log('Round has been added!')
  store.round = data.round
  $('#addNewRoundModal').modal('hide')
  $('.all-rounds').html('') // this hides all rounds
  api.index(event)
    .then(authUI.getRoundsSuccess)
    .catch(authUI.getRoundsFailure)
}

const addRoundFailure = function (response) {
  console.error(response)
  $('#addNewRoundFailMessage').show()
}

module.exports = {
  addRoundSuccess,
  addRoundFailure
}
