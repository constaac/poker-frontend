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
        $('#playername' + k).text('Player ' + k)
      }
      if (this.checked) {
        logic.game['p' + i].is_user = true
        logic.game['p' + i].name = store.userName
        $('#playername' + i).text(store.userName)
      }
    })
  }
}

const openSetSeats = () => {
  $('#tableModal').modal('toggle')
}

const onSetSeatButton = (count) => {
  resetSeats()
  $('.load-save-menu').css('display', 'block')
  const tempArray = []
  for (let i = 1; i <= count; i++) {
    tempArray.push(i)
  }
  const showSeatsHtml = setSeatsNumber({ list: tempArray })
  $('#seats-table').empty()
  $('#seats-table').append(showSeatsHtml)
  setOnCheckBox(count)
  setOnCheckRadio(count)
}

module.exports = {
  onSetSeatButton,
  openSetSeats,
  resetSeats
}
