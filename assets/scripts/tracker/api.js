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

  }
}

const createPlayer = function (data) {
  return $.ajax({
    headers: {
      'Authorization': 'Token token=' + store.userToken
    },
    url: config.apiOrigins.development + '/players',
    method: 'POST',
    data: {
      'player': data
    }
  })
}

const updatePlayer = function (playerdata, id) {
  return $.ajax({
    headers: {
      'Authorization': 'Token token=' + store.userToken
    },
    url: config.apiOrigins.development + '/players/' + id,
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
    url: config.apiOrigins.development + '/players',
    method: 'GET'
  })
    .then(ui.onGetPlayersSuccess)
    .catch(ui.onGetPlayersFailure)
}

const logout = function (data) {
  return $.ajax({
    headers: {
      'Authorization': 'Token token=' + store.userToken
    },
    url: config.apiOrigins.development + '/sign-out/' + store.userID,
    method: 'DELETE'
  })
    .then(function () {
      store.userToken = undefined
      store.userID = undefined
    })
}

module.exports = {
  updatePlayer,
  indexPlayers,
  logout,
  createPlayer,
  createPlayerHelper
}
