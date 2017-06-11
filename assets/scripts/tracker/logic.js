'use-strict'

const p1 = {sitting: false, playing: false, is_user: false}
const p2 = {sitting: false, playing: false, is_user: false}
const p3 = {sitting: false, playing: false, is_user: false}
const p4 = {sitting: false, playing: false, is_user: false}
const p5 = {sitting: false, playing: false, is_user: false}
const p6 = {sitting: false, playing: false, is_user: false}
const p7 = {sitting: false, playing: false, is_user: false}
const p8 = {sitting: false, playing: false, is_user: false}
const p9 = {sitting: false, playing: false, is_user: false}
const p10 = {sitting: false, playing: false, is_user: false}

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
  game.active = true
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
