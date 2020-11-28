'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.head = exports.options = exports.del = exports.patch = exports.put = exports.post = exports.get = exports.request = exports.getRequest = exports.getServer = void 0
var supertest_1 = __importDefault(require('supertest'))
var config_1 = require('./config')
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
 * Generate a SuperTest requets and add some helper functions.
 * @param path The path to execute the request to.
 * @param method The method used for this request.
 */
var getRequest = function (path, method) {
  // Build the request
  var server = exports.getServer()
  var request = supertest_1.default(server)[method](path)
  // Add the `bearer()` method.
  request.bearer = function (token) {
    return request.set('Authorization', 'Bearer ' + token)
  }
  // Add the `json()` method.
  request.json = function () {
    return request.set('Accept', 'application/json')
  }
  return request
}
exports.getRequest = getRequest
/**
 * The SuperTest object.
 */
exports.request = supertest_1.default
/**
 * Run a GET request using SuperTest and the server set with `use()`.
 * @param path The path to get.
 */
var get = function (path) {
  return exports.getRequest(path, 'get')
}
exports.get = get
/**
 * Run a POST request using SuperTest and the server set with `use()`.
 * @param path The path to post to.
 */
var post = function (path) {
  return exports.getRequest(path, 'post')
}
exports.post = post
/**
 * Run a PUT request using SuperTest and the server set with `use()`.
 * @param path The path to request.
 */
var put = function (path) {
  return exports.getRequest(path, 'put')
}
exports.put = put
/**
 * Run a PATCH request using SuperTest and the server set with `use()`.
 * @param path The path to request.
 */
var patch = function (path) {
  return exports.getRequest(path, 'patch')
}
exports.patch = patch
/**
 * Run a DELETE request using SuperTest and the server set with `use()`.
 * @param path The path to request.
 */
var del = function (path) {
  return exports.getRequest(path, 'delete')
}
exports.del = del
/**
 * Run an OPTIONS request using SuperTest and the server set with `use()`.
 * @param path The path to request.
 */
var options = function (path) {
  return exports.getRequest(path, 'options')
}
exports.options = options
/**
 * Run an HEAD request using SuperTest and the server set with `use()`.
 * @param path The path to request.
 */
var head = function (path) {
  return exports.getRequest(path, 'head')
}
exports.head = head
