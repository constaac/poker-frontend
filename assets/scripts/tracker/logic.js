'use-strict'

const store = require('../store.js')

const players = []

const Player = function (x) {
  this.name = 'Player ' + x
  this.sitting = false
  this.playing = false
  this.is_user = false
  this.is_dealer = false
  this.hand_count = 0
  this.call_preflop = 0
  this.raise_preflop = 0
  this.reraise_preflop = 0
  this.fold_on_reraise_preflop = 0
}

const makePlayers = function () {
  for (let i = 1; i <= 10; i++) {
    const newPlayer = new Player(i)
    players.push(newPlayer)
    store['p' + i + 'name'] = 'Player ' + i
  }
  console.log(players)
}
makePlayers()

const phases = ['Pre-Flop', 'Flop', 'Turn', 'River']

const game = {
  active: false,
  phase: phases[0],
  first_to_bet: undefined,
  small_blind: undefined,
  big_blind: undefined,
  current_move: undefined,
  playing: [],
  p1: players[0],
  p2: players[1],
  p3: players[2],
  p4: players[3],
  p5: players[4],
  p6: players[5],
  p7: players[6],
  p8: players[7],
  p9: players[8],
  p10: players[9]
}
console.log(game)

const checkSittingPlayers = function () {
  if (game.playing.length > 1) {
    return false
  } else {
    return true
  }
}

const toggleGameButtons = function () {
  if (game.active) {
    $('#bet-button').removeAttr('disabled')
    $('#call-button').removeAttr('disabled')
    $('#check-button').removeAttr('disabled')
    $('#fold-button').removeAttr('disabled')
  } else {
    $('#bet-button').attr('disabled', 'disabled')
    $('#call-button').attr('disabled', 'disabled')
    $('#check-button').attr('disabled', 'disabled')
    $('#fold-button').attr('disabled', 'disabled')
  }
}

const checkEndOfArray = function (x) {
  if (x + 1 === game.playing.length) {
    return true
  }
}

const calcBlinds = function () {
  let startPosition
  for (let i = 0; i < game.playing.length; i++) {
    if (game.playing[i].is_dealer) {
      startPosition = i
    }
  }
  let smallBlind = startPosition + 1
  let bigBlind = smallBlind + 1
  let currentMove = bigBlind + 1
  if (checkEndOfArray(startPosition)) {
    smallBlind = 0
  }
  if (checkEndOfArray(smallBlind)) {
    bigBlind = 0
  }
  if (checkEndOfArray(bigBlind)) {
    currentMove = 0
  }
  if (game.playing.length > 2) {
    game.small_blind = game.playing[smallBlind]
    game.big_blind = game.playing[bigBlind]
    game.current_move = game.playing[currentMove]
  } else {
    game.small_blind = game.playing[startPosition]
    game.big_blind = game.playing[smallBlind]
    game.currentMove = game.playing[startPosition]
  }
}

const displayDealerMenu = function () {
  $('.dealer-menu').empty()
  for (let i = 1; i <= 10; i++) {
    if (game['p' + i].playing) {
      $('.dealer-menu').append('<li><a type="button" class="btn" id="set-dealer-' + i + '">' + game['p' + i].name + '</a></li>')
      $('#set-dealer-' + i).on('click', () => {
        game['p' + i].is_dealer = true
        $('.dealer-menu-container').css('display', 'none')
        game.active = true
        toggleGameButtons()
        calcBlinds()
      })
    }
  }
  $('.dealer-menu-container').css('display', 'inline')
}

const onStartRound = function () {
  for (let j = 1; j <= 10; j++) {
    if (game['p' + j].playing) {
      game.playing.push(game['p' + j])
    }
  }
  if (checkSittingPlayers()) {
    $('#status-indicator').css('color', 'red')
    $('#status-indicator').html('Atleast two players must be sitting.')
    setTimeout(function () {
      $('#status-indicator').html('')
      $('#status-indicator').css('color', 'black')
    }, 2000)
    return
  }
  $('#start-round-btn').fadeOut().css('display', 'none')
  $('#set-table-btn').off('click')
  $('#set-table-btn').attr('disabled', 'disabled')
  displayDealerMenu()
}

const checkPossible = function () {

}

const betPossible = function () {

}

const callPossible = function () {

}

const teststats = function () {
  console.log(game)
  console.log(store)
}

const check = function () {

}

const bet = function () {

}

const call = function () {

}

const fold = function () {

}

module.exports = {
  onStartRound,
  game,
  check,
  bet,
  fold,
  teststats,
  call,
  betPossible,
  checkPossible,
  callPossible
}
