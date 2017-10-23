const api = require('../api.js')
const ui = require('./ui.js')
const getFormFields = require('../../../lib/get-form-fields')

const onAddRound = function (event) {
  event.preventDefault()
  const data = getFormFields(this)
  api.create(data, event)
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
  onAddRound
}
