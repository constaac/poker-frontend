'use strict'

const logic = require('./logic.js')
const store = require('../store.js')

const onGetUserSuccess = function (response) {
  const indexOfCheckbox = $('input:radio[name ="user"]:checked').val()
  for (let i = 0; i < response.players.length; i++) {
    if (response.players[i].name === store.userName) {
      const newData = response.players[i]
      setLoadedPlayer(newData, indexOfCheckbox, 5)
      return
    }
  }
  $('#save-load-status').text('First time loading your history: Please "create" a save for your user')
  $('#save-load-status').css('color', 'red')
  setTimeout(function () {
    $('#save-load-status').text('')
    $('#save-load-status').css('color', 'black')
  }, 4000)
}

const setLoadedPlayer = function (data, index, isUser) {
  console.log(data)
  const player = logic.game['p' + index]
  logic.resetPlayer(index)
  $('#playername' + index).text(data.name)
  player.name = data.name
  player.id = data.id
  // BELOW SHOULD BE userPLAYERID
  store.userID = data.id
  player.hand_count = data.hand_count
  player.call_preflop_career = data.call_preflop
  player.raise_preflop_career = data.raise_preflop
  player.call_or_raise_preflop_career = data.call_or_raise_preflop
  player.reraise_preflop_career = data.reraise_preflop
  player.call_to_raise_preflop_career = data.call_to_reraise_preflop
  player.fold_on_reraise_preflop_career = data.fold_on_reraise_preflop
  if (isUser === 5) {
    player.is_user = true
  }
}

const onGetUserFailure = function (response) {
  $('#save-load-status').text("Error Loading User's Career Data")
  $('#save-load-status').css('color', 'red')
  setTimeout(function () {
    $('#save-load-status').text('')
    $('#save-load-status').css('color', 'black')
  }, 2000)
}

module.exports = {
  onGetUserFailure,
  onGetUserSuccess
}
