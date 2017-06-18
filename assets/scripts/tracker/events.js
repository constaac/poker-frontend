'use strict'

const ui = require('./ui.js')
const logic = require('./logic.js')

const addHandlers = () => {
  for (let j = 1; j <= 10; j++) {
    $('#seat-button-' + j).on('click', () => {
      ui.onSetSeatButton(j)
    })
  }
  $('#start-round-btn').on('click', logic.onStartRound)
  $('#set-table-btn').on('click', ui.openSetSeats)
  $('#teststats').on('click', logic.teststats)
  $('#bet-button').on('click', logic.bet)
  $('#call-button').on('click', logic.call)
  $('#check-button').on('click', logic.check)
  $('#fold-button').on('click', logic.fold)
}

module.exports = {
  addHandlers
}
