'use strict'

const config = require('../config.js')
const store = require('../store')

const save = function (data) {
  return $.ajax({
    headers: {
      'Authorization': 'Token token=' + store.userToken
    },
    url: config.apiOrigin + '/players/save',
    method: 'PATCH',
    data
  })
}

const signIn = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/sign-in',
    method: 'POST',
    data
  })
    .then((response) => {
      store.userToken = response.user.token
      store.userID = response.user.id
      store.userEmail = response.user.email
      store.userName = response.user.name
    })
}

const logout = function (data) {
  return $.ajax({
    headers: {
      'Authorization': 'Token token=' + store.userToken
    },
    url: config.apiOrigin + '/sign-out/' + store.userID,
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
    url: config.apiOrigin + '/change-password/' + store.userID,
    method: 'PATCH',
    data
  })
}

module.exports = {
  save,
  signIn,
  logout,
  changePassword
}
