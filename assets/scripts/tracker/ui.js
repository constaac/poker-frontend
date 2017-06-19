'use strict'

const setSeatsNumber = require('../templates/table.handlebars')
const logic = require('./logic.js')
const store = require('../store.js')
const api = require('./api.js')

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
        if (logic.game['p' + k].is_user) {
          logic.resetPlayer(k)
          $('#playername' + k).val('Player ' + k)
        }
        logic.game['p' + k].is_user = false
        $('#playername' + k).removeAttr('disabled')
      }
      if (this.checked) {
        logic.game['p' + i].is_user = true
        logic.game['p' + i].name = store.userName
        $('#playername' + i).val(store.userName)
        $('#playername' + i).attr('disabled', true)
      }
    })
  }
}

const openSetSeats = () => {
  $('#tableModal').modal('toggle')
}

const populateDropdown = function (count) {
  $('#seat-selector').empty()
  $('#seat-selector').append('<option value="1" selected>1</option>')
  for (let y = 2; y <= count; y++) {
    $('#seat-selector').append('<option value="' + y + '">' + y + '</option>')
  }
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
  populateDropdown(count)
}

const onSaveSuccess = function (response) {
  logic.game['p' + $('#seat-selector').val()].id = response.player.id
  logic.game['p' + $('#seat-selector').val()].name = response.player.name
  const seatNumber = $('#seat-selector').val()
  $('#error-indicator').html('' + $('#playername' + seatNumber).val() + ' saved!')
  $('#error-indicator').css('color', 'green')
  $('#error-indicator').css('display', 'inline')
  setTimeout(function () {
    $('#error-indicator').html('')
    $('#error-indicator').css('color', 'black')
    $('#error-indicator').css('display', 'none')
  }, 2000)
  console.log(response)
}

const onSaveFailure = function () {
  $('#error-indicator').html('Player save failed!')
  $('#error-indicator').css('color', 'red')
  $('#error-indicator').css('display', 'inline')
  setTimeout(function () {
    $('#error-indicator').html('')
    $('#error-indicator').css('color', 'black')
    $('#error-indicator').css('display', 'none')
  }, 2000)
  console.log('save failed')
}

module.exports = {
  onSetSeatButton,
  openSetSeats,
  resetSeats,
  onSaveSuccess,
  onSaveFailure
}
