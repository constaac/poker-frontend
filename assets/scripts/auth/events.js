'use strict'

const getFormFields = require(`../../../lib/get-form-fields`)
const api = require('./api')
const ui = require('./ui')

const onSignUp = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.signUp(data)
  .then(ui.signUpSuccess)
  .catch(ui.signUpFailure)
}

const onLogin = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.signIn(data)
    .then(ui.signInSuccess)
    .catch(ui.signInFailure)
}

const onLogout = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.logout(data)
    .then(ui.logoutSuccess)
    .catch(ui.logoutFailure)
}

const onChangePassword = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.changePassword(data)
    .then(ui.changePasswordSuccess)
    .catch(ui.changePasswordFailure)
}

const addHandlers = () => {
  $('#signup-form').on('submit', onSignUp)
  $('#login-form').on('submit', onLogin)
  $('#logout-form').on('submit', onLogout)
  $('#password-form').on('submit', onChangePassword)
  $('#passwordModal').on('hidden.bs.modal', ui.onClosePasswordPrompt)
  $('#loginModal').on('hidden.bs.modal', ui.onCloseLoginPrompt)
  $('#accountCreateModal').on('hidden.bs.modal', ui.onCloseSignupPrompt)
}

module.exports = {
  addHandlers
}
