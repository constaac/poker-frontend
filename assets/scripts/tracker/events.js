'use strict'

const ui = require('./ui.js')
const logic = require('./logic.js')
const api = require('./api.js')

const checkPlayerNameChanged = function (seatID) {
  if ($('#playername' + seatID).val() === ('Player ' + seatID)) {
    return true
  }
}

const checkEmptyPlayerName = function (seatID) {
  if (($('#playername' + seatID).val() === '')) {
    $('#error-indicator').html("Player Name can't be empty")
    $('#error-indicator').css('color', 'red')
    $('#error-indicator').css('display', 'inline')
    setTimeout(function () {
      $('#error-indicator').html('')
      $('#error-indicator').css('color', 'black')
      $('#error-indicator').css('display', 'none')
    }, 2000)
    return true
  } else if (checkPlayerNameChanged(seatID)) {
    $('#error-indicator').html("Player Name can't be 'Player " + seatID + "'")
    $('#error-indicator').css('color', 'red')
    $('#error-indicator').css('display', 'inline')
    setTimeout(function () {
      $('#error-indicator').html('')
      $('#error-indicator').css('color', 'black')
      $('#error-indicator').css('display', 'none')
    }, 2000)
    return true
  } else {
    return false
  }
}

const onSaveButton = function () {
  const seatID = $('#seat-selector').val()
  if (checkEmptyPlayerName(seatID)) {
    return
  }
  const data = {player: {}}
  const player = logic.game['p' + seatID]
  const handCount = player.hand_count + player.hand_count_career
  const callPreflop = player.call_preflop + player.call_preflop_career
  const raisePreflop = player.raise_preflop + player.raise_preflop_career
  const callOrRaisePreflop = player.call_or_raise_preflop + player.call_or_raise_preflop_career
  const reraisePreflop = player.reraise_preflop + player.reraise_preflop_career
  const callToRaisePreflop = player.call_to_raise_preflop + player.call_to_raise_preflop_career
  const foldOnReraisePreflop = player.fold_on_reraise_preflop + player.fold_on_reraise_preflop_career
  const temp = data.player
  temp.name = $('#playername' + seatID).val()
  temp.hand_count = handCount
  temp.call_preflop = callPreflop
  temp.raise_preflop = raisePreflop
  temp.call_or_raise_preflop = callOrRaisePreflop
  temp.reraise_preflop = reraisePreflop
  temp.call_to_raise_preflop = callToRaisePreflop
  temp.fold_on_reraise_preflop = foldOnReraisePreflop
  api.save(data)
    .then(ui.onSaveSuccess)
    .catch(ui.onSaveFailure)
}

const onLoadButton = function () {
  const seatID = $('#seat-selector').val()
  if (checkEmptyPlayerName(seatID)) {
    return
  }
  const data = {player: {}}
  const player = $('#playername' + seatID).val()
  const temp = data.player
  temp.name = player
  api.load(data)
    .then(ui.onLoadSuccess)
    .catch(ui.onLoadFailure)
}

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
  $('#save-button').on('click', onSaveButton)
  $('#load-button').on('click', onLoadButton)
}

module.exports = {
  addHandlers
}
