'use strict'
const store = require('../store')
const trackerui = require('../tracker/ui.js')
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
}

const signInFailure = (error) => {
  console.error(error)
  $('.signinstatus').html('Sign-in Unsuccessful... Check your password!')
  $('.signinstatus').css('color', 'red')
  setTimeout(function () {
    $('.signinstatus').html('')
  }, 3000)
}

const toggleGameButtons = function () {
  $('#bet-button').attr('disabled', 'disabled')
  $('#call-button').attr('disabled', 'disabled')
  $('#check-button').attr('disabled', 'disabled')
  $('#fold-button').attr('disabled', 'disabled')
}

const logoutSuccess = (data) => {
  $('.start-inline').fadeIn().css('display', 'inline')
  $('.start-display-none').fadeOut().css('display', 'none')
  $('#outcome-indicator').text('')
  $('#seats-table').empty()
  trackerui.resetSeats()
  $('#start-round-btn').css('display', 'block')
  $('#set-table-btn').on('click', () => {
    $('#tableModal').modal('show')
  })
  $('#set-table-btn').removeAttr('disabled')
  $('.dealer-menu-container').css('display', 'none')
  $('.dealer-menu').empty()
  trackerlogic.game.active = false
  toggleGameButtons()
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
