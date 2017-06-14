'use strict'

const config = require('../config.js')
const store = require('../store')
const ui = require('./ui.js')
const logic = require('./logic.js')

const createPlayerHelper = function () {
  let data = {}
  const thisIndex = $('#seat-selector').val()
  // Hasn't been saved yet
  if (logic.game['p' + thisIndex].id === undefined) {
    // Is user attempting to save
    if (logic.game['p' + thisIndex].is_user) {
      data = {
        name: logic.game['p' + thisIndex].name
      }
      createPlayer(data)
        .then(ui.onCreatePlayerSuccess)
        .catch(ui.onCreatePlayerFailure)
      return
    }
    // User needs to enter a name
    if ($('#player-name-field').val() === '') {
      $('#save-load-status').text('Player needs to be named')
      $('#save-load-status').css('color', 'red')
      setTimeout(function () {
        $('#save-load-status').text('')
        $('#save-load-status').css('color', 'black')
      }, 2000)
      return
    }
    data = {
      name: $('#player-name-field').val()
    }
    createPlayer(data)
      .then(ui.onCreatePlayerSuccess)
      .catch(ui.onCreatePlayerFailure)
  } else {
    data = {
      name: logic.game['p' + thisIndex].name
    }
    createPlayer(data)
      .then(ui.onCreatePlayerSuccess)
      .catch(ui.onCreatePlayerFailure)
  }
}

const createPlayer = function (data) {
  return $.ajax({
    headers: {
      'Authorization': 'Token token=' + store.userToken
    },
    url: config.apiOrigins.production + '/players',
    method: 'POST',
    data: {
      'player': data
    }
  })
}

const onUpdatePlayer = function () {
  const thisIndex = $('#seat-selector').val()
  const thisPlayer = logic.game['p' + thisIndex]
  // Hasn't been created yet
  if (thisPlayer.id === undefined) {
    $('#save-load-status').text('Player needs to be created first')
    $('#save-load-status').css('color', 'red')
    setTimeout(function () {
      $('#save-load-status').text('')
      $('#save-load-status').css('color', 'black')
    }, 2000)
  }
  const thisPlayerID = thisPlayer.id
  const playerData = {}
  playerData.id = thisPlayer.id
  playerData.hand_count = thisPlayer.hand_count
  playerData.call_preflop = thisPlayer.call_preflop_career
  playerData.raise_preflop = thisPlayer.raise_preflop_career
  playerData.call_or_raise_preflop = thisPlayer.call_or_raise_preflop_career
  playerData.reraise_preflop = thisPlayer.reraise_preflop_career =
  playerData.call_to_reraise_preflop = thisPlayer.call_to_raise_preflop_career
  playerData.fold_on_reraise_preflop = thisPlayer.fold_on_reraise_preflop_career
  savePlayer(playerData, thisPlayerID)
    .then(ui.onUpdatePlayerSuccess)
    .catch(ui.onUpdatePlayerFailure)
}

const savePlayer = function (playerdata, id) {
  return $.ajax({
    headers: {
      'Authorization': 'Token token=' + store.userToken
    },
    url: config.apiOrigins.production + '/players/' + id,
    method: 'PATCH',
    data: {
      'player': playerdata
    }
  })
}

const indexPlayers = function () {
  const thisIndex = $('#seat-selector').val()
  const thisName = $('#player-name-field').val()
  if (thisIndex > logic.countSitting()) {
    $('#save-load-status').text('Seat does not exist')
    $('#save-load-status').css('color', 'red')
    setTimeout(function () {
      $('#save-load-status').text('')
      $('#save-load-status').css('color', 'black')
    }, 2000)
    return
  }
  if (thisName === '') {
    $('#save-load-status').text("Enter a player's name")
    $('#save-load-status').css('color', 'red')
    setTimeout(function () {
      $('#save-load-status').text('')
      $('#save-load-status').css('color', 'black')
    }, 2000)
    return
  }
  return $.ajax({
    headers: {
      'Authorization': 'Token token=' + store.userToken
    },
    url: config.apiOrigins.production + '/players',
    method: 'GET'
  })
    .then(ui.onGetPlayersSuccess)
    .catch(ui.onGetPlayersFailure)
}

const deletePlayer = function (data) {
  const thisIndex = $('#seat-selector').val()
  const thisPlayer = logic.game['p' + thisIndex]
  // Hasn't been created yet
  if (thisPlayer.id === undefined) {
    $('#save-load-status').text('Player does not exist on the server')
    $('#save-load-status').css('color', 'red')
    setTimeout(function () {
      $('#save-load-status').text('')
      $('#save-load-status').css('color', 'black')
    }, 2000)
    return
  }
  const thisPlayerID = thisPlayer.id
  return $.ajax({
    headers: {
      'Authorization': 'Token token=' + store.userToken
    },
    url: config.apiOrigins.production + '/players/' + thisPlayerID,
    method: 'DELETE'
  })
    .then(ui.onDeletePlayerSuccess)
    .then(() => {
      thisPlayer.id = undefined
    })
    .catch(ui.onDeletePlayerFailure)
}

module.exports = {
  onUpdatePlayer,
  savePlayer,
  indexPlayers,
  createPlayer,
  createPlayerHelper,
  deletePlayer
}
