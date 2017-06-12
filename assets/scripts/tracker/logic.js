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
  this.personal_bet_count = 0
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
  phase_count: 0,
  first_to_bet: undefined,
  small_blind: undefined,
  big_blind: undefined,
  current_move: undefined,
  current_move_index: undefined,
  current_bet_count: undefined,
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
    game.playing[bigBlind].personal_bet_count = 1
    game.current_move = game.playing[currentMove]
    game.current_move_index = currentMove
  } else {
    game.small_blind = game.playing[startPosition]
    game.big_blind = game.playing[smallBlind]
    game.playing[smallBlind].personal_bet_count = 1
    game.first_to_bet = game.playing[startPosition]
    game.current_move = game.playing[startPosition]
    game.current_move_index = startPosition
  }
  game.phase_count = 0
  game.phase = phases[0]
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
        $('#status-indicator').text(game.current_move.name + "'s turn.")
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

const setCurrentMove = function (x) {
  let currentMoveHolder = x + 1
  if (currentMoveHolder === game.playing.length) {
    currentMoveHolder = 0
  }
  game.current_move_index = currentMoveHolder
  game.current_move = game.playing[currentMoveHolder]
}

const setPersonalBetCountsZero = function () {
  for (let i = 0; i < game.playing.length; i++) {
    game.playing[i].personal_bet_count = 0
  }
}

const setCurrentBet = function () {
  if (game.phase === phases[0]) {
    game.current_bet_count = 1
  } else {
    game.current_bet_count = 0
  }
}

const incrementPhase = function () {
  game.phase_count += 1
  game.phase = phases[game.phase_count]
}

const updateCurrentBet = function () {

}

const checkPossible = function () {

}

const betPossible = function () {

}

const callPossible = function () {

}

const check = function () {

}

const bet = function () {

}

const call = function () {

}

const fold = function () {

}

// TEMPORARY FUNCTION
const teststats = function () {
  console.log(game)
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
  callPossible,
  setCurrentMove,
  setCurrentBet,
  updateCurrentBet,
  setPersonalBetCountsZero
}
