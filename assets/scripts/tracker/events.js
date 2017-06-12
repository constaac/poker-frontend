'use strict'

const ui = require('./ui.js')
const logic = require('./logic.js')

const addHandlers = () => {
  $('#seat-button-2').on('click', ui.onSetSeat2)
  $('#seat-button-3').on('click', ui.onSetSeat3)
  $('#seat-button-4').on('click', ui.onSetSeat4)
  $('#seat-button-5').on('click', ui.onSetSeat5)
  $('#seat-button-6').on('click', ui.onSetSeat6)
  $('#seat-button-7').on('click', ui.onSetSeat7)
  $('#seat-button-8').on('click', ui.onSetSeat8)
  $('#seat-button-9').on('click', ui.onSetSeat9)
  $('#seat-button-10').on('click', ui.onSetSeat10)
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
