'use strict'

const setSeatsNumber = require('../templates/table.handlebars')
const logic = require('./logic.js')
const store = require('../store.js')
const api = require('./api.js')

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
        logic.resetPlayer(i)
        const data = {player: {}}
        data.player.name = store.userName
        api.load(data)
          .then((response) => {
            logic.resetPlayer(i)
            const person = logic.game['p' + i]
            const holder = response.player
            person.id = holder.id
            person.call_or_raise_preflop_career = holder.call_or_raise_preflop
            person.call_preflop_career = holder.call_preflop
            person.call_to_raise_preflop_career = holder.call_to_reraise_preflop
            person.fold_on_reraise_preflop_career = holder.fold_on_reraise_preflop
            person.hand_count_career = holder.hand_count
            person.raise_preflop_career = holder.raise_preflop
            person.reraise_preflop_career = holder.reraise_preflop
            person.name = store.userName
          })
          .then(() => {
            return
          })
          .catch(() => {
            api.create(data)
              .then((response) => {
                logic.resetPlayer(i)
                const person = logic.game['p' + i]
                const holder = response.player
                person.id = holder.id
                person.call_or_raise_preflop_career = holder.call_or_raise_preflop
                person.call_preflop_career = holder.call_preflop
                person.call_to_raise_preflop_career = holder.call_to_reraise_preflop
                person.fold_on_reraise_preflop_career = holder.fold_on_reraise_preflop
                person.hand_count_career = holder.hand_count
                person.raise_preflop_career = holder.raise_preflop
                person.reraise_preflop_career = holder.reraise_preflop
                person.name = store.userName
              })
              .then(() => {
                $('#error-indicator').html('' + store.userName + ' initialized!')
                $('#error-indicator').css('color', 'green')
                $('#error-indicator').css('display', 'inline')
                setTimeout(function () {
                  $('#error-indicator').html('')
                  $('#error-indicator').css('color', 'black')
                  $('#error-indicator').css('display', 'none')
                }, 2000)
              })
              .catch(() => {
                $('#error-indicator').html("Couldn't initialize User, please save")
                $('#error-indicator').css('color', 'red')
                $('#error-indicator').css('display', 'inline')
                setTimeout(function () {
                  $('#error-indicator').html('')
                  $('#error-indicator').css('color', 'black')
                  $('#error-indicator').css('display', 'none')
                }, 2000)
              })
          })
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

// TODO Modify to retain currently sitting players
const onSetSeatButton = (count) => {
  logic.resetAllPlayers()
  $('.load-save-menu').css('display', 'block')
  const tempArray = []
  for (let k = 1; k <= 10; k++) {
    logic.game['p' + k].playing = false
    logic.game['p' + k].sitting = false
  }
  for (let i = 1; i <= count; i++) {
    tempArray.push(i)
    logic.game['p' + i].playing = true
    logic.game['p' + i].sitting = true
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
}

const onLoadSuccess = function (response) {
  const seatNumber = $('#seat-selector').val()
  logic.resetPlayer(seatNumber)
  const person = logic.game['p' + seatNumber]
  const holder = response.player
  person.id = holder.id
  person.name = holder.name
  person.call_or_raise_preflop_career = holder.call_or_raise_preflop
  person.call_preflop_career = holder.call_preflop
  person.call_to_raise_preflop_career = holder.call_to_reraise_preflop
  person.fold_on_reraise_preflop_career = holder.fold_on_reraise_preflop
  person.hand_count_career = holder.hand_count
  person.raise_preflop_career = holder.raise_preflop
  person.reraise_preflop_career = holder.reraise_preflop
  $('#error-indicator').html('' + $('#playername' + seatNumber).val() + ' loaded!')
  $('#error-indicator').css('color', 'green')
  $('#error-indicator').css('display', 'inline')
  setTimeout(function () {
    $('#error-indicator').html('')
    $('#error-indicator').css('color', 'black')
    $('#error-indicator').css('display', 'none')
  }, 2000)
}

const onLoadFailure = function () {
  $('#error-indicator').html('Player not found!')
  $('#error-indicator').css('color', 'red')
  $('#error-indicator').css('display', 'inline')
  setTimeout(function () {
    $('#error-indicator').html('')
    $('#error-indicator').css('color', 'black')
    $('#error-indicator').css('display', 'none')
  }, 2000)
}

const onDeleteSuccess = function (response) {
  const seatNumber = $('#seat-selector').val()
  logic.resetPlayer(seatNumber)
  $('#playername' + seatNumber).val('Player ' + seatNumber)
  $('#error-indicator').html('' + $('#playername' + seatNumber).val() + ' deleted')
  $('#error-indicator').css('color', 'green')
  $('#error-indicator').css('display', 'inline')
  setTimeout(function () {
    $('#error-indicator').html('')
    $('#error-indicator').css('color', 'black')
    $('#error-indicator').css('display', 'none')
  }, 2000)
}

const onDeleteFailure = function () {
  $('#error-indicator').html('Player not found!')
  $('#error-indicator').css('color', 'red')
  $('#error-indicator').css('display', 'inline')
  setTimeout(function () {
    $('#error-indicator').html('')
    $('#error-indicator').css('color', 'black')
    $('#error-indicator').css('display', 'none')
  }, 2000)
}

const onIndexSuccess = function (response) {
  $('.player-index-container').css('display', 'block')
  $('#list-button').css('display', 'none')
  $('#list-button-hide').css('display', 'inline')
  const sortedArray = response.players
  sortedArray.sort(function (a, b) {
    return a.name.localeCompare(b.name)
  })
  for (let i = 0; i < sortedArray.length; i++) {
    $('#player-index').append('<li>' + sortedArray[i].name + '</li>')
  }
}

const onListHide = function () {
  $('.player-index-container').css('display', 'none')
  $('#player-index').empty()
  $('#list-button').css('display', 'inline')
  $('#list-button-hide').css('display', 'none')
}

const onIndexFailure = function () {
  $('#error-indicator').html('Error Loading List')
  $('#error-indicator').css('color', 'red')
  $('#error-indicator').css('display', 'inline')
  setTimeout(function () {
    $('#error-indicator').html('')
    $('#error-indicator').css('color', 'black')
    $('#error-indicator').css('display', 'none')
  }, 2000)
  $('#player-index-container').css('display', 'none')
}

module.exports = {
  onSetSeatButton,
  openSetSeats,
  onSaveSuccess,
  onSaveFailure,
  onLoadSuccess,
  onLoadFailure,
  onDeleteSuccess,
  onDeleteFailure,
  onIndexFailure,
  onIndexSuccess,
  onListHide
}
