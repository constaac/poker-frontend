'use strict'

const setSeatsNumber = require('../templates/table.handlebars')
const logic = require('./logic.js')
const store = require('../store.js')
const config = require('../config.js')
const helper = require('./helper.js')

const resetSeats = function () {
  for (let i = 1; i <= 10; i++) {
    logic.resetPlayer(i)
    $('#playername ' + i).text('Player ' + 1)
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

const indexForUser = function () {
  return $.ajax({
    headers: {
      'Authorization': 'Token token=' + store.userToken
    },
    url: config.apiOrigins.production + '/players',
    method: 'GET'
  })
}

const setOnCheckRadio = function (x) {
  for (let i = 1; i <= x; i++) {
    $('#radio' + i).change(function () {
      const count = x
      if (this.checked) {
        // try to save player here (make api call in helper)
        indexForUser()
          .then((response) => {
            for (let k = 1; k <= count; k++) {
              if (logic.game['p' + k].is_user === true) {
                logic.resetPlayer(k)
                $('#playername' + k).text('Player ' + k)
              }
            }
            return response
          })
          .then(helper.onGetUserSuccess)
          .then(() => {
            logic.game['p' + i].is_user = true
            logic.game['p' + i].id = store.userID
            logic.game['p' + i].name = store.userName
            $('#playername' + i).text(store.userName)
          })
          .catch(helper.onGetUserFailure)
      }
    })
  }
}

const openSetSeats = () => {
  $('#tableModal').modal('toggle')
}

const onSetSeat2 = () => {
  resetSeats()
  $('.load-save-menu').css('display', 'block')
  const showSeatsHtml = setSeatsNumber({ list: [1, 2] })
  $('#seats-table').empty()
  $('#seats-table').append(showSeatsHtml)
  setOnCheckBox(2)
  setOnCheckRadio(2)
}

const onSetSeat3 = () => {
  resetSeats()
  $('.load-save-menu').css('display', 'block')
  const showSeatsHtml = setSeatsNumber({ list: [1, 2, 3] })
  $('#seats-table').empty()
  $('#seats-table').append(showSeatsHtml)
  setOnCheckBox(3)
  setOnCheckRadio(3)
}

const onSetSeat4 = () => {
  resetSeats()
  $('.load-save-menu').css('display', 'block')
  const showSeatsHtml = setSeatsNumber({ list: [1, 2, 3, 4] })
  $('#seats-table').empty()
  $('#seats-table').append(showSeatsHtml)
  setOnCheckBox(4)
  setOnCheckRadio(4)
}

const onSetSeat5 = () => {
  resetSeats()
  $('.load-save-menu').css('display', 'block')
  const showSeatsHtml = setSeatsNumber({ list: [1, 2, 3, 4, 5] })
  $('#seats-table').empty()
  $('#seats-table').append(showSeatsHtml)
  setOnCheckBox(5)
  setOnCheckRadio(5)
}

const onSetSeat6 = () => {
  resetSeats()
  $('.load-save-menu').css('display', 'block')
  const showSeatsHtml = setSeatsNumber({ list: [1, 2, 3, 4, 5, 6] })
  $('#seats-table').empty()
  $('#seats-table').append(showSeatsHtml)
  setOnCheckBox(6)
  setOnCheckRadio(6)
}

const onSetSeat7 = () => {
  resetSeats()
  $('.load-save-menu').css('display', 'block')
  const showSeatsHtml = setSeatsNumber({ list: [1, 2, 3, 4, 5, 6, 7] })
  $('#seats-table').empty()
  $('#seats-table').append(showSeatsHtml)
  setOnCheckBox(7)
  setOnCheckRadio(7)
}

const onSetSeat8 = () => {
  resetSeats()
  $('.load-save-menu').css('display', 'block')
  const showSeatsHtml = setSeatsNumber({ list: [1, 2, 3, 4, 5, 6, 7, 8] })
  $('#seats-table').empty()
  $('#seats-table').append(showSeatsHtml)
  setOnCheckBox(8)
  setOnCheckRadio(8)
}

const onSetSeat9 = () => {
  resetSeats()
  $('.load-save-menu').css('display', 'block')
  const showSeatsHtml = setSeatsNumber({ list: [1, 2, 3, 4, 5, 6, 7, 8, 9] })
  $('#seats-table').empty()
  $('#seats-table').append(showSeatsHtml)
  setOnCheckBox(9)
  setOnCheckRadio(9)
}

const onSetSeat10 = () => {
  resetSeats()
  $('.load-save-menu').css('display', 'block')
  const showSeatsHtml = setSeatsNumber({ list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] })
  $('#seats-table').empty()
  $('#seats-table').append(showSeatsHtml)
  setOnCheckBox(10)
  setOnCheckRadio(10)
}

const onGetPlayersSuccess = function (response) {
  let thisPlayer
  const thisName = $('#player-name-field').val()
  const thisIndex = $('#seat-selector').val()
  for (let k = 1; k <= 10; k++) {
    if ($('#playername' + k).text() === $('#player-name-field').val()) {
      logic.resetPlayer(k)
      $('#playername' + k).text('Player ' + k)
      logic.game['p' + k].playing = $('#checkbox' + k).prop('checked')
      logic.game['p' + k].sitting = true
    }
  }
  for (let i = 0; i < response.players.length; i++) {
    if (response.players[i].name === thisName) {
      thisPlayer = response.players[i]
      setLoadedPlayer(thisPlayer, thisIndex, false)
    }
  }
  if (thisPlayer === undefined) {
    $('#save-load-status').text('Player Not Found')
    $('#save-load-status').css('color', 'red')
    setTimeout(function () {
      $('#save-load-status').text('')
      $('#save-load-status').css('color', 'black')
    }, 2000)
    return
  }
  $('#save-load-status').text('Player successfully loaded!')
  $('#save-load-status').css('color', 'black')
  setTimeout(function () {
    $('#save-load-status').text('')
    $('#save-load-status').css('color', 'black')
  }, 2000)
}

const onCreatePlayerSuccess = function (response) {
  const index = $('#seat-selector').val()
  $('#playername' + index).text(response.player.name)
  $('#save-load-status').text('Player saved!')
  $('#save-load-status').css('color', 'green')
  setTimeout(function () {
    $('#save-load-status').text('')
    $('#save-load-status').css('color', 'black')
  }, 2000)
}

const onCreatePlayerFailure = function (response) {
  $('#save-load-status').text("Couldn't save. Name may be taken.")
  $('#save-load-status').css('color', 'red')
  setTimeout(function () {
    $('#save-load-status').text('')
    $('#save-load-status').css('color', 'black')
  }, 2000)
}

const setLoadedPlayer = function (data, index, isUser) {
  logic.resetPlayer(index)
  $('#playername' + index).text(data.name)
  logic.game['p' + index].name = data.name
  logic.game['p' + index].id = data.id
  logic.game['p' + index].hand_count = data.hand_count
  logic.game['p' + index].call_preflop_career = data.call_preflop
  logic.game['p' + index].raise_preflop_career = data.raise_preflop
  logic.game['p' + index].call_or_raise_preflop_career = data.call_or_raise_preflop
  logic.game['p' + index].reraise_preflop_career = data.reraise_preflop
  logic.game['p' + index].call_to_raise_preflop_career = data.call_to_reraise_preflop
  logic.game['p' + index].fold_on_reraise_preflop_career = data.fold_on_reraise_preflop
  if ($('#checkbox' + index).prop('checked')) {
    logic.game['p' + index].playing = true
  }
  logic.game['p' + index].sitting = true
  if (isUser) {
    logic.game['p' + index].is_user = true
  }
}

const onGetPlayersFailure = function (response) {
  $('#save-load-status').text('Error Loading Players')
  $('#save-load-status').css('color', 'red')
  setTimeout(function () {
    $('#save-load-status').text('')
    $('#save-load-status').css('color', 'black')
  }, 2000)
}

const onUpdatePlayerSuccess = function () {
  $('#save-load-status').text('Player information stored!')
  $('#save-load-status').css('color', 'green')
  setTimeout(function () {
    $('#save-load-status').text('')
    $('#save-load-status').css('color', 'black')
  }, 2000)
}

const onUpdatePlayerFailure = function () {
  $('#save-load-status').text('Error saving player information!')
  $('#save-load-status').css('color', 'red')
  setTimeout(function () {
    $('#save-load-status').text('')
    $('#save-load-status').css('color', 'black')
  }, 2000)
}

const onDeletePlayerSuccess = function () {
  $('#save-load-status').text('Player deleted from the server!')
  $('#save-load-status').css('color', 'green')
  setTimeout(function () {
    $('#save-load-status').text('')
    $('#save-load-status').css('color', 'black')
  }, 2000)
}

const onDeletePlayerFailure = function () {
  $('#save-load-status').text('Error deleting player information!')
  $('#save-load-status').css('color', 'red')
  setTimeout(function () {
    $('#save-load-status').text('')
    $('#save-load-status').css('color', 'black')
  }, 2000)
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
  resetSeats,
  onGetPlayersFailure,
  onGetPlayersSuccess,
  onCreatePlayerFailure,
  onCreatePlayerSuccess,
  onUpdatePlayerFailure,
  onUpdatePlayerSuccess,
  onDeletePlayerFailure,
  onDeletePlayerSuccess
}
