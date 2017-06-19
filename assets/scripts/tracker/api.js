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

const destroy = function (data) {
  return $.ajax({
    headers: {
      'Authorization': 'Token token=' + store.userToken
    },
    url: config.apiOrigin + '/players/' + data,
    method: 'DELETE'
  })
}

const index = function () {
  return $.ajax({
    headers: {
      'Authorization': 'Token token=' + store.userToken
    },
    url: config.apiOrigin + '/players',
    method: 'GET'
  })
}

module.exports = {
  save,
  load,
  destroy,
  index
}
