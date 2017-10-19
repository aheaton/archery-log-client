'use strict'

const store = require('../store')

const addRoundSuccess = function (data) {
  console.log('Round has been added!')
  store.round = data.round
  $('#addNewRoundModal').modal('hide')
}

const addRoundFailure = function (response) {
  console.error(response)
  $('#addNewRoundFailMessage').show()
}

module.exports = {
  addRoundSuccess,
  addRoundFailure
}
