'use strict'

const config = require('../config.js')
const store = require('../store')

const signUp = function (data) {
  return $.ajax({
    url: config.apiOrigins.development + '/sign-up',
    method: 'POST',
    data
  })
}

const signIn = function (data) {
  return $.ajax({
    url: config.apiOrigins.development + '/sign-in',
    method: 'POST',
    data
  })
    .then((response) => {
      store.userToken = response.user.token
      store.userID = response.user.id
      store.userEmail = response.user.email
    })
}

const logout = function (data) {
  return $.ajax({
    headers: {
      'Authorization': 'Token token=' + store.userToken
    },
    url: config.apiOrigins.development + '/sign-out/' + store.userID,
    method: 'DELETE'
  })
    .then(function () {
      store.userToken = undefined
      store.userID = undefined
    })
}

const changePassword = function (data) {
  return $.ajax({
    headers: {
      'Authorization': 'Token token=' + store.userToken
    },
    url: config.apiOrigins.development + '/change-password/' + store.userID,
    method: 'PATCH',
    data
  })
}

module.exports = {
  signUp,
  signIn,
  logout,
  changePassword
}
