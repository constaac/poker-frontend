'use strict'

const trackerlogic = require('../tracker/logic.js')

const signUpSuccess = () => {
  $('.signupstatus').html('Account Creation Successful!')
  $('.signupstatus').css('color', 'green')
  setTimeout(function () {
    $('.signupstatus').html('')
    $('#accountCreateModal').modal('hide')
  }, 2000)
}

const signUpFailure = (response) => {
  $('.signupstatus').html('Unsuccessful!  Passwords may not match / Account may already exist')
  $('.signupstatus').css('color', 'red')
  setTimeout(function () {
    $('.signupstatus').html('')
  }, 3000)
}

const signInSuccess = (data) => {
  $('#loginModal').modal('toggle')
  $('.start-inline').fadeOut().css('display', 'none')
  $('.start-display-none').fadeIn().css('display', 'inline')
  trackerlogic.resetAllPlayers()
  trackerlogic.game.playing = []
}

const signInFailure = (error) => {
  console.error(error)
  $('.signinstatus').html('Sign-in Unsuccessful... Check your password!')
  $('.signinstatus').css('color', 'red')
  setTimeout(function () {
    $('.signinstatus').html('')
  }, 3000)
}

const logoutSuccess = (data) => {
  $('.start-inline').fadeIn().css('display', 'inline')
  $('.start-display-none').fadeOut().css('display', 'none')
  $('#outcome-indicator').text('')
  $('#seats-table').empty()
  trackerlogic.resetAllPlayers()
  trackerlogic.triggerEndOfRound(true)
  for (let i = 1; i <= 10; i++) {
    trackerlogic.game['p' + i].sitting = false
  }
  $('#status-indicator').text('Welcome! Set the Table and then Begin a Round')
  $('.load-save-menu').css('display', 'none')
  $('#seat-selector').val('1')
  $('#player-name-field').val('')
}

const logoutFailure = () => {
}

const changePasswordSuccess = (data) => {
  $('.passwordstatus').html('Password Change Successful!')
  $('.passwordstatus').css('color', 'green')
  setTimeout(function () {
    $('.passwordstatus').html('')
  }, 3000)
}

const changePasswordFailure = () => {
  $('.passwordstatus').html('Password Change Unsuccessful...')
  $('.passwordstatus').css('color', 'red')
  setTimeout(function () {
    $('.passwordstatus').html('')
  }, 3000)
}

const onClosePasswordPrompt = () => {
  $('.passwordstatus').text('')
}

const onCloseLoginPrompt = () => {
  $('.signinstatus').text('')
}

const onCloseSignupPrompt = () => {
  $('.signupstatus').text('')
}

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  logoutSuccess,
  logoutFailure,
  changePasswordFailure,
  changePasswordSuccess,
  onClosePasswordPrompt,
  onCloseLoginPrompt,
  onCloseSignupPrompt
}
