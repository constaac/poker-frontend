'use strict'

const ui = require('./ui.js')

const addHandlers = () => {
  $('#set-seats-button').on('click', ui.onSetSeats)
}

module.exports = {
  addHandlers
}
