'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.del = exports.patch = exports.put = exports.post = exports.get = exports.getServer = exports.localStorage = exports.sleep = void 0
var supertest_1 = __importDefault(require('supertest'))
var config_1 = require('./config')
/**
 * A helper function that returns a promise resolving after `time` ms.
 * @param time The time to wait in milliseconds.
 */
var sleep = function (time) {
  return new Promise(function (resolve) {
    setTimeout(
      function () {
        resolve()
      },
      time > 0 ? time : 0
    )
  })
}
exports.sleep = sleep
/**
 * A localStorage object, similar to the one in the browser except that it
 * stores values as JSON objects, not as strings.
 */
exports.localStorage = {
  getItem: function (key) {
    var value = this[key]
    if (value !== undefined) {
      return value
    }
  },
  setItem: function (key, value) {
    if (typeof this[key] === 'function') return
    this[key] = JSON.parse(JSON.stringify(value))
  },
  removeItem: function (key) {
    if (typeof this[key] !== 'function') {
      delete this[key]
    }
  },
  clear: function () {
    var _this = this
    Object.keys(this).forEach(function (key) {
      if (typeof _this[key] !== 'function') {
        delete _this[key]
      }
    })
  },
}
/**
 * Get the config's server or throw an error if none was set.
 */
var getServer = function () {
  if (config_1.config.app === null) {
    if (config_1.config.log) {
      process.stdout.write(
        '\nYou must declare which server to use in order to use requests.\n'.red
      )
      process.stdout.write('You can declare it with the `use()` function.\n')
    }
    throw new Error('No server provided.')
  }
  return config_1.config.app
}
exports.getServer = getServer
/**
 * Run a GET request using SuperTest and the server set with `use()`.
 * @param path The path to get.
 */
var get = function (path) {
  var server = exports.getServer()
  return supertest_1.default(server).get(path)
}
exports.get = get
/**
 * Run a POST request using SuperTest and the server set with `use()`.
 * @param path The path to post to.
 */
var post = function (path) {
  var server = exports.getServer()
  return supertest_1.default(server).post(path)
}
exports.post = post
/**
 * Run a PUT request using SuperTest and the server set with `use()`.
 * @param path The path to request.
 */
var put = function (path) {
  var server = exports.getServer()
  return supertest_1.default(server).put(path)
}
exports.put = put
/**
 * Run a PATCH request using SuperTest and the server set with `use()`.
 * @param path The path to request.
 */
var patch = function (path) {
  var server = exports.getServer()
  return supertest_1.default(server).patch(path)
}
exports.patch = patch
/**
 * Run a DELETE request using SuperTest and the server set with `use()`.
 * @param path The path to request.
 */
var del = function (path) {
  var server = exports.getServer()
  return supertest_1.default(server).delete(path)
}
exports.del = del
