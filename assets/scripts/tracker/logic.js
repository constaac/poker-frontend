'use-strict'

const p1 = {name: 'Player 1', sitting: false, playing: false, is_user: false, is_dealer: false}
const p2 = {name: 'Player 2', sitting: false, playing: false, is_user: false, is_dealer: false}
const p3 = {name: 'Player 3', sitting: false, playing: false, is_user: false, is_dealer: false}
const p4 = {name: 'Player 4', sitting: false, playing: false, is_user: false, is_dealer: false}
const p5 = {name: 'Player 5', sitting: false, playing: false, is_user: false, is_dealer: false}
const p6 = {name: 'Player 6', sitting: false, playing: false, is_user: false, is_dealer: false}
const p7 = {name: 'Player 7', sitting: false, playing: false, is_user: false, is_dealer: false}
const p8 = {name: 'Player 8', sitting: false, playing: false, is_user: false, is_dealer: false}
const p9 = {name: 'Player 9', sitting: false, playing: false, is_user: false, is_dealer: false}
const p10 = {name: 'Player 10', sitting: false, playing: false, is_user: false, is_dealer: false}

const game = {active: false, p1: p1, p2: p2, p3: p3, p4: p4, p5: p5, p6: p6, p7: p7, p8: p8, p9: p9, p10: p10}

const checkSittingPlayers = function () {
  let count = 0
  for (let i = 1; i <= 10; i++) {
    if (game['p' + i].playing) {
      count++
    }
  }
  if (count > 1) {
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
      })
    }
  }
  $('.dealer-menu-container').css('display', 'inline')
}

const startRound = function () {
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

const teststats = function () {
  console.log(game)
}

const check = function () {

}

const bet = function () {

}

const fold = function () {

}

module.exports = {
  startRound,
  game,
  check,
  bet,
  fold,
  teststats,
  p1,
  p2,
  p3,
  p4,
  p5,
  p6,
  p7,
  p8,
  p9,
  p10
}
