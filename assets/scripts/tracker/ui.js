'use strict'

const setSeatsNumber = require('../templates/table.handlebars')

const onSetSeats = () => {
  const showSeatsHtml = setSeatsNumber({ list: [1, 2, 3, 4] })
  $('#seats-table').empty()
  $('#seats-table').append(showSeatsHtml)
}

module.exports = {
  onSetSeats
}
