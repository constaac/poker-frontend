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

const load = function (data) {
  return $.ajax({
    headers: {
      'Authorization': 'Token token=' + store.userToken
    },
    url: config.apiOrigin + '/player',
    method: 'PATCH',
    data
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
  load,
  logout,
  changePassword
}
