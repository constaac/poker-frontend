'use strict'

const setSeatsNumber = require('../templates/table.handlebars')

const onSetSeat2 = () => {
  const showSeatsHtml = setSeatsNumber({ list: [1, 2] })
  $('#seats-table').empty()
  $('#seats-table').append(showSeatsHtml)
}

const onSetSeat3 = () => {
  const showSeatsHtml = setSeatsNumber({ list: [1, 2, 3] })
  $('#seats-table').empty()
  $('#seats-table').append(showSeatsHtml)
}

const onSetSeat4 = () => {
  const showSeatsHtml = setSeatsNumber({ list: [1, 2, 3, 4] })
  $('#seats-table').empty()
  $('#seats-table').append(showSeatsHtml)
}

const onSetSeat5 = () => {
  const showSeatsHtml = setSeatsNumber({ list: [1, 2, 3, 4, 5] })
  $('#seats-table').empty()
  $('#seats-table').append(showSeatsHtml)
}

const onSetSeat6 = () => {
  const showSeatsHtml = setSeatsNumber({ list: [1, 2, 3, 4, 5, 6] })
  $('#seats-table').empty()
  $('#seats-table').append(showSeatsHtml)
}

const onSetSeat7 = () => {
  const showSeatsHtml = setSeatsNumber({ list: [1, 2, 3, 4, 5, 6, 7] })
  $('#seats-table').empty()
  $('#seats-table').append(showSeatsHtml)
}

const onSetSeat8 = () => {
  const showSeatsHtml = setSeatsNumber({ list: [1, 2, 3, 4, 5, 6, 7, 8] })
  $('#seats-table').empty()
  $('#seats-table').append(showSeatsHtml)
}

const onSetSeat9 = () => {
  const showSeatsHtml = setSeatsNumber({ list: [1, 2, 3, 4, 5, 6, 7, 8, 9] })
  $('#seats-table').empty()
  $('#seats-table').append(showSeatsHtml)
}

const onSetSeat10 = () => {
  const showSeatsHtml = setSeatsNumber({ list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] })
  $('#seats-table').empty()
  $('#seats-table').append(showSeatsHtml)
}

module.exports = {
  onSetSeat2,
  onSetSeat3,
  onSetSeat4,
  onSetSeat5,
  onSetSeat6,
  onSetSeat7,
  onSetSeat8,
  onSetSeat9,
  onSetSeat10
}
