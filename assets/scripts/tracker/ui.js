'use strict'

const setSeatsNumber = require('../templates/table.handlebars')
const logic = require('./logic.js')
const store = require('../store.js')

const resetSeats = function () {
  for (let i = 1; i <= 10; i++) {
    logic.game['p' + i].sitting = false
    logic.game['p' + i].playing = false
    logic.game['p' + i].is_user = false
  }
}

const setOnCheckBox = function (x) {
  for (let i = 1; i <= x; i++) {
    $('#checkbox' + i).change(function () {
      if (this.checked) {
        logic.game['p' + i].playing = true
      } else {
        logic.game['p' + i].playing = false
      }
    })
    logic.game['p' + i].sitting = true
    logic.game['p' + i].playing = true
  }
}

const setOnCheckRadio = function (x) {
  for (let i = 1; i <= x; i++) {
    $('#radio' + i).change(function () {
      const count = x
      for (let k = 1; k <= count; k++) {
        logic.game['p' + k].is_user = false
        logic.game['p' + k].name = store['p' + k + 'name']
      }
      if (this.checked) {
        logic.game['p' + i].is_user = true
        logic.game['p' + i].name = store.userName
      }
    })
  }
}

const openSetSeats = () => {
  $('#tableModal').modal('toggle')
}

const onSetSeat2 = () => {
  resetSeats()
  const showSeatsHtml = setSeatsNumber({ list: [1, 2] })
  $('#seats-table').empty()
  $('#seats-table').append(showSeatsHtml)
  setOnCheckBox(2)
  setOnCheckRadio(2)
}

const onSetSeat3 = () => {
  resetSeats()
  const showSeatsHtml = setSeatsNumber({ list: [1, 2, 3] })
  $('#seats-table').empty()
  $('#seats-table').append(showSeatsHtml)
  setOnCheckBox(3)
  setOnCheckRadio(3)
}

const onSetSeat4 = () => {
  resetSeats()
  const showSeatsHtml = setSeatsNumber({ list: [1, 2, 3, 4] })
  $('#seats-table').empty()
  $('#seats-table').append(showSeatsHtml)
  setOnCheckBox(4)
  setOnCheckRadio(4)
}

const onSetSeat5 = () => {
  resetSeats()
  const showSeatsHtml = setSeatsNumber({ list: [1, 2, 3, 4, 5] })
  $('#seats-table').empty()
  $('#seats-table').append(showSeatsHtml)
  setOnCheckBox(5)
  setOnCheckRadio(5)
}

const onSetSeat6 = () => {
  resetSeats()
  const showSeatsHtml = setSeatsNumber({ list: [1, 2, 3, 4, 5, 6] })
  $('#seats-table').empty()
  $('#seats-table').append(showSeatsHtml)
  setOnCheckBox(6)
  setOnCheckRadio(6)
}

const onSetSeat7 = () => {
  resetSeats()
  const showSeatsHtml = setSeatsNumber({ list: [1, 2, 3, 4, 5, 6, 7] })
  $('#seats-table').empty()
  $('#seats-table').append(showSeatsHtml)
  setOnCheckBox(7)
  setOnCheckRadio(7)
}

const onSetSeat8 = () => {
  resetSeats()
  const showSeatsHtml = setSeatsNumber({ list: [1, 2, 3, 4, 5, 6, 7, 8] })
  $('#seats-table').empty()
  $('#seats-table').append(showSeatsHtml)
  setOnCheckBox(8)
  setOnCheckRadio(8)
}

const onSetSeat9 = () => {
  resetSeats()
  const showSeatsHtml = setSeatsNumber({ list: [1, 2, 3, 4, 5, 6, 7, 8, 9] })
  $('#seats-table').empty()
  $('#seats-table').append(showSeatsHtml)
  setOnCheckBox(9)
  setOnCheckRadio(9)
}

const onSetSeat10 = () => {
  resetSeats()
  const showSeatsHtml = setSeatsNumber({ list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] })
  $('#seats-table').empty()
  $('#seats-table').append(showSeatsHtml)
  setOnCheckBox(10)
  setOnCheckRadio(10)
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
  onSetSeat10,
  openSetSeats,
  resetSeats
}
