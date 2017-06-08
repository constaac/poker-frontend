'use strict'
const store = require('../store')

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
  $('.hidebutton').css('display', 'none')
  $('.start-display-none').css('display', 'inline')
  $('.start-display-none-logout').css('display', 'inline')
  $('.start-display-none-password').css('display', 'inline')
  $('.login-status').text('Signed in as ' + store.userEmail)
  $('#welcome-message').css('display', 'none')
  $('#gameboard').css('display', 'block')
  $('.history-display-container').css('display', 'inline')
  $('.game-note').css('display', 'inline')
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
  $('.login-status').text('')
  $('.hidebutton').css('display', 'inline')
  $('.start-display-none-logout').css('display', 'none')
  $('.start-display-none-password').css('display', 'none')
  $('#welcome-message').css('display', 'block')
  $('#gameboard').css('display', 'none')
  $('.gameid-indicator').text('')
  $('.game-history').empty()
  $('.empty-game-history').css('display', 'none')
  $('.history-display-container').css('display', 'none')
  $('.history-radios').prop('checked', false)
  $('#radio1').prop('checked', true)
  $('.game-note').css('display', 'none')
  $('#outcome-indicator').text('')
  gamelogic.resetCurrentStats()
  resetGameBoard()
}

const logoutFailure = () => {
  $('.login-status').text('Error logging out!')
}

const changePasswordSuccess = (data) => {
  $('.passwordstatus').html('Password Change Successful!')
  $('.passwordstatus').css('color', 'green')
  setTimeout(function () {
    $('.passwordstatus').html('')
  }, 3000)
}

const changePasswordFailure = (error) => {
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
