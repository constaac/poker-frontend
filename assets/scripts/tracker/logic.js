'use-strict'

const store = require('../store.js')

const players = []

const Player = function (x) {
  this.id = undefined
  this.name = 'Player ' + x
  this.sitting = false
  this.playing = false
  this.is_user = false
  this.is_dealer = false
  this.hand_count = 0
  this.hand_count_career = 0
  this.call_preflop = 0
  this.call_preflop_career = 0
  this.raise_preflop = 0
  this.raise_preflop_career = 0
  this.has_raised_preflop = false
  this.has_raised_or_called_preflop = false
  this.call_or_raise_preflop = 0
  this.call_or_raise_preflop_career = 0
  this.reraise_preflop = 0
  this.reraise_preflop_career = 0
  this.has_reraised_preflop = false
  this.call_to_raise_preflop = 0
  this.call_to_raise_preflop_career = 0
  this.has_called_to_raise_preflop = false
  this.has_called_or_reraised_to_raise_preflop = false
  this.fold_on_reraise_preflop = 0
  this.fold_on_reraise_preflop_career = 0
  this.personal_bet_count = 0
}

const makePlayers = function () {
  for (let i = 1; i <= 10; i++) {
    const newPlayer = new Player(i)
    players.push(newPlayer)
    store['p' + i + 'name'] = 'Player ' + i
  }
}
makePlayers()

const phases = ['Pre-Flop', 'Flop', 'Turn', 'River']

let game = {
  active: false,
  phase: phases[0],
  phase_count: 0,
  first_to_bet: undefined,
  first_to_bet_index: undefined,
  small_blind: undefined,
  big_blind: undefined,
  current_move: undefined,
  current_move_index: undefined,
  current_bet_count: 0,
  count_matching_current_bet: 0,
  count_checked: 0,
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

const checkSittingPlayers = function () {
  if (game.playing.length > 1) {
    return false
  } else {
    return true
  }
}

const resetPlayer = function (x) {
  const seat = game['p' + x]
  seat.id = undefined
  seat.name = 'Player ' + x
  seat.playing = $('#checkbox' + x).is(':checked')
  seat.is_dealer = false
  seat.hand_count = 0
  seat.hand_count_career = 0
  seat.call_preflop = 0
  seat.call_preflop_career = 0
  seat.raise_preflop = 0
  seat.raise_preflop_career = 0
  seat.has_raised_preflop = false
  seat.has_raised_or_called_preflop = false
  seat.call_or_raise_preflop = 0
  seat.call_or_raise_preflop_career = 0
  seat.reraise_preflop = 0
  seat.reraise_preflop_career = 0
  seat.has_reraised_preflop = false
  seat.call_to_raise_preflop = 0
  seat.call_to_raise_preflop_career = 0
  seat.has_called_to_raise_preflop = false
  seat.has_called_or_reraised_to_raise_preflop = false
  seat.fold_on_reraise_preflop = 0
  seat.fold_on_reraise_preflop_career = 0
  seat.personal_bet_count = 0
}

const resetAllPlayers = function () {
  for (let i = 1; i <= 10; i++) {
    const seat = game['p' + i]
    seat.id = undefined
    seat.name = 'Player ' + i
    seat.is_dealer = false
    seat.hand_count = 0
    seat.hand_count_career = 0
    seat.call_preflop = 0
    seat.call_preflop_career = 0
    seat.raise_preflop = 0
    seat.raise_preflop_career = 0
    seat.has_raised_preflop = false
    seat.has_raised_or_called_preflop = false
    seat.call_or_raise_preflop = 0
    seat.call_or_raise_preflop_career = 0
    seat.reraise_preflop = 0
    seat.reraise_preflop_career = 0
    seat.has_reraised_preflop = false
    seat.call_to_raise_preflop = 0
    seat.call_to_raise_preflop_career = 0
    seat.has_called_to_raise_preflop = false
    seat.has_called_or_reraised_to_raise_preflop = false
    seat.fold_on_reraise_preflop = 0
    seat.fold_on_reraise_preflop_career = 0
    seat.personal_bet_count = 0
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
  if (x === game.playing.length) {
    return true
  } else {
    return false
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
  if (checkEndOfArray(smallBlind)) {
    smallBlind = 0
  }
  let bigBlind = smallBlind + 1
  if (checkEndOfArray(bigBlind)) {
    bigBlind = 0
  }
  let currentMove = bigBlind + 1
  if (checkEndOfArray(currentMove)) {
    currentMove = 0
  }
  if (game.playing.length > 2) {
    game.small_blind = game.playing[smallBlind]
    game.big_blind = game.playing[bigBlind]
    game.playing[bigBlind].personal_bet_count = 1
    const tempFirstToBet = players.find((element) => { return element === game.playing[currentMove] })
    game.first_to_bet = tempFirstToBet
    game.first_to_bet_index = currentMove
    game.current_move = game.playing[currentMove]
    game.current_move_index = currentMove
  } else {
    game.small_blind = game.playing[startPosition]
    game.big_blind = game.playing[smallBlind]
    game.playing[smallBlind].personal_bet_count = 1
    const tempFirstToBet = players.find((element) => { return element === game.playing[startPosition] })
    game.first_to_bet = tempFirstToBet
    game.first_to_bet_index = startPosition
    game.current_move = game.playing[startPosition]
    game.current_move_index = startPosition
  }
  game.phase_count = 0
  game.phase = phases[0]
  setCurrentBet(true)
  game.count_matching_current_bet = 1
}

const displayDealerMenu = function () {
  $('.dealer-menu').empty()
  for (let i = 1; i <= 10; i++) {
    game['p' + i].name = $('#playername' + i).val()
    if (game['p' + i].playing) {
      $('.dealer-menu').append('<li><a type="button" class="btn" id="set-dealer-' + i + '">' + game['p' + i].name + '</a></li>')
      $('#set-dealer-' + i).on('click', () => {
        game['p' + i].is_dealer = true
        $('.dealer-menu-container').css('display', 'none')
        game.active = true
        toggleGameButtons()
        calcBlinds()
        $('#status-indicator').text(game.current_move.name + "'s turn.")
        for (let t = 0; t < game.playing.length; t++) {
          game.playing[t].hand_count += 1
        }
      })
    }
  }
  $('.dealer-menu-container').css('display', 'inline')
}

const onStartRound = function () {
  for (let j = 1; j <= 10; j++) {
    if (game['p' + j].playing) {
      game['p' + j].is_dealer = false
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
  $('#status-indicator').text('Select the Dealer.')
}

const setCurrentMove = function (x) {
  // PROBLEM MAY LIE HERE
  let currentMoveHolder = x + 1
  if (currentMoveHolder === game.playing.length) {
    currentMoveHolder = 0
  }
  game.current_move_index = currentMoveHolder
  const tempCurrentPlayer = players.find((element) => { return element === game.playing[currentMoveHolder] })
  game.current_move = tempCurrentPlayer
}

const setPersonalBetCountsZero = function () {
  for (let i = 0; i < game.playing.length; i++) {
    game.playing[i].personal_bet_count = 0
  }
}

const setCurrentBet = function (condition) {
  if (game.phase === phases[0]) {
    game.current_bet_count = 1
    game.count_matching_current_bet = 1
  } else {
    game.current_bet_count = 0
    game.count_matching_current_bet = 0
    if (condition) {
      return
    } else {
      setPersonalBetCountsZero()
    }
  }
}

const incrementPhase = function (condition) {
  if (condition) {
    game.phase_count = 0
    game.phase = phases[0]
    setCurrentBet()
    return
  } else if (game.phase_count < 3) {
    game.phase_count += 1
    game.phase = phases[game.phase_count]
    setCurrentBet()
    game.count_checked = 0
    game.count_matching_current_bet = 0
    game.current_move = game.first_to_bet
    const tempFirstToBetIndex = game.playing.findIndex((element) => { return element === game.current_move })
    game.current_move_index = tempFirstToBetIndex
    $('#status-indicator').html('The ' + game.phase + " has begun. It's " + game.current_move.name + "'s move.")
  } else if (game.phase_count === 3) {
    triggerEndOfRound()
    return
  }
}

const checkPossible = function () {
  if (game.current_move.personal_bet_count === game.current_bet_count) {
    return true
  } else {
    return false
  }
}

const betPossible = function () {
  if (game.current_move.personal_bet_count <= game.current_bet_count) {
    return true
  } else {
    return false
  }
}

const callPossible = function () {
  if (game.current_move.personal_bet_count < game.current_bet_count) {
    return true
  } else {
    return false
  }
}

const positionBehindBigBlind = function () {
  const bigBlindIndex = game.playing.findIndex((element) => { return element === game.big_blind })
  if (bigBlindIndex === (game.current_move_index + 1)) {
    return true
  } else {
    return false
  }
}

const allCalled = function () {
  // add function to check if phase 1 and allow big blind to check/bet
  if (game.phase_count === 0 && game.current_bet_count === 1 && positionBehindBigBlind()) {
    return false
  }
  if (game.count_matching_current_bet === game.playing.length) {
    return true
  } else {
    return false
  }
}

const allChecked = function () {
  // add function to check if phase 1 and allow big blind to check/bet
  if (game.count_checked === game.playing.length) {
    return true
  } else {
    return false
  }
}

const testRaise = function () {
  if (game.current_move.personal_bet_count < game.current_bet_count) {
    return true
  }
}

const testReRaise = function () {
  if ((game.current_bet_count - game.current_move.personal_bet_count) > 1) {
    return true
  }
}

const check = function () {
  if (checkPossible()) {
    game.count_checked += 1
    if (allChecked() || allCalled()) {
      if (game.phase_count === 3) {
        triggerEndOfRound()
        return
      }
      incrementPhase()
      return
    }
    setCurrentMove(game.current_move_index)
    $('#status-indicator').html(game.current_move.name + "'s move.")
  } else {
    $('#status-indicator').html(game.current_move.name + "'s move. A Check isn't possible.")
  }
}

const testPFR = function () {
  if (testRaise() && !(game.current_move.has_raised_preflop) && game.phase_count === 0) {
    game.current_move.has_raised_preflop = true
    game.current_move.raise_preflop += 1
    if (game.current_move.has_raised_or_called_preflop === false) {
      game.current_move.call_or_raise_preflop += 1
    }
    game.current_move.has_raised_or_called_preflop = true
  }
}

const testVPIP = function () {
  if (!(game.current_move.has_raised_or_called_preflop) && game.phase_count === 0) {
    game.current_move.call_preflop += 1
    game.current_move.call_or_raise_preflop += 1
    game.current_move.has_raised_or_called_preflop = true
  }
}

const test3BetReRaise = function () {
  if (testReRaise() && game.phase_count === 0 && !(game.current_move.has_reraised_preflop)) {
    game.current_move.has_reraised_preflop = true
    game.current_move.has_called_or_reraised_to_raise_preflop = true
    game.current_move.reraise_preflop += 1
  }
}

const test3BetCallToRaise = function () {
  if ((game.current_bet_count > 1) && (game.phase_count === 0) && !(game.current_move.has_called_or_reraised_to_raise_preflop)) {
    game.current_move.has_called_to_raise_preflop = true
    game.current_move.has_called_or_reraised_to_raise_preflop = true
    game.current_move.call_to_raise_preflop += 1
  }
}

const bet = function () {
  if (betPossible()) {
    testPFR()
    test3BetReRaise()
    game.count_matching_current_bet = 1
    game.current_bet_count += 1
    // check reraise goes here
    game.current_move.personal_bet_count = game.current_bet_count
    game.count_checked = 0
    setCurrentMove(game.current_move_index)
    $('#status-indicator').html(game.current_move.name + "'s move.")
  } else {
    $('#status-indicator').html(game.current_move.name + "'s move. A Bet/Raise isn't possible.")
  }
}

const call = function () {
  if (callPossible()) {
    testVPIP()
    test3BetCallToRaise()
    game.count_matching_current_bet += 1
    if (allCalled()) {
      incrementPhase()
      return
    }
    setCurrentMove(game.current_move_index)
    $('#status-indicator').html(game.current_move.name + "'s move.")
  } else {
    $('#status-indicator').html(game.current_move.name + "'s move. A Call isn't possible.")
  }
}

const fold = function () {
  const index = game.playing.findIndex((element) => { return element === game.current_move })
  let indexNext = index + 1
  if (checkEndOfArray(indexNext)) {
    indexNext = 0
  }
  game.first_to_bet = game.playing[indexNext]
  game.first_to_bet_index = indexNext
  game.playing.splice(index, 1)
  game.current_move_index -= 1
  setCurrentMove(game.current_move_index)
  if (game.playing.length < 2) {
    triggerEndOfRound()
    return
  }
  $('#status-indicator').html(game.current_move.name + "'s move.")
}

// RENAME this function
const resetHasRaisedOrCalledPreflop = function () {
  for (let i = 0; i < players.length; i++) {
    players[i].has_raised_or_called_preflop = false
    players[i].has_raised_preflop = false
    players[i].has_reraised_preflop = false
    players[i].has_called_to_raise_preflop = false
    players[i].has_called_or_reraised_to_raise_preflop = false
  }
}

// Call to perform all actions when a round ends
const triggerEndOfRound = function (condition) {
  $('#status-indicator').html('This round is over.')
  game = {
    active: false,
    phase: phases[0],
    phase_count: 0,
    first_to_bet: undefined,
    first_to_bet_index: undefined,
    small_blind: undefined,
    big_blind: undefined,
    current_move: undefined,
    current_move_index: undefined,
    current_bet_count: 0,
    count_matching_current_bet: 0,
    count_checked: 0,
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
  resetHasRaisedOrCalledPreflop()
  $('#start-round-btn').css('display', 'block')
  $('#set-table-btn').on('click', () => {
    $('#tableModal').modal('show')
  })
  $('#set-table-btn').removeAttr('disabled')
  $('.dealer-menu-container').css('display', 'none')
  $('.dealer-menu').empty()
  $('#start-round-btn').css('display', 'block')
  $('#set-table-btn').on('click', () => {
    $('#tableModal').modal('show')
  })
  $('#set-table-btn').removeAttr('disabled')
  $('.dealer-menu-container').css('display', 'none')
  $('.dealer-menu').empty()
  toggleGameButtons()
  setPersonalBetCountsZero()
  if (condition) {
    $('#status-indicator').html('')
  }
}

// TEMPORARY FUNCTION
const teststats = function () {
  $('#stats-table').empty()
  $('#stats-table').append('<thead><tr><th>Name</th><th>Hands Seen</th><th>VPIP %</th><th>PFR %</th><th>3Bet % PreFlop</th></tr></thead>')
  for (let i = 0; i < players.length; i++) {
    if (players[i].sitting) {
      const totalHands = players[i].hand_count + players[i].hand_count_career
      if (totalHands === 0) {
        $('#stats-table').append('<tr><td>' + players[i].name + '</td><td>' + totalHands + '</td><td>' + 0 + '</td><td>' + 0 + '</td><td>' + 0 + '</td></tr>')
      } else {
        const totalRaisesOrCallsPF = players[i].call_or_raise_preflop + players[i].call_or_raise_preflop_career
        const totalRaisesPF = players[i].raise_preflop + players[i].raise_preflop_career
        const totalReRaisePF = players[i].reraise_preflop + players[i].reraise_preflop_career
        const totalCallToRaisePF = players[i].call_to_raise_preflop + players[i].call_to_raise_preflop_career
        const VPIP = ((totalRaisesOrCallsPF / totalHands) * 100).toFixed(1)
        const PFR = ((totalRaisesPF / totalHands) * 100).toFixed(1)
        let ThreeBetPF = ((totalReRaisePF / (totalReRaisePF + totalCallToRaisePF)) * 100).toFixed(1)
        if ((totalReRaisePF === 0) && (totalCallToRaisePF === 0)) {
          ThreeBetPF = 0
        }
        $('#stats-table').append('<tr><td>' + players[i].name + '</td><td>' + totalHands + '</td><td>' + VPIP + '%</td><td>' + PFR + '%</td><td>' + ThreeBetPF + '%</td></tr>')
      }
    }
  }
  $('#statisticsModal').modal('show')
}

// <tr><td>some shit</td><td>4%</td><td>25%</td><td>30%</td></tr>

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
  setPersonalBetCountsZero,
  incrementPhase,
  triggerEndOfRound,
  allCalled,
  positionBehindBigBlind,
  resetPlayer,
  resetAllPlayers
}
