'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.localStorage = exports.sleep = void 0
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
