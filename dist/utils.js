'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.resolveFn = exports.formatTestName = exports.hrtimeToMs = void 0
var queue_1 = require('./queue')
/**
 * Convert hrtime's [second, nanoseconds] to milliseconds.
 * @param time The returned value from `hrtime()`.
 */
var hrtimeToMs = function (time) {
  var seconds = time[0] * 1000000000 // Seconds to nanoseconds
  var nanoseconds = time[1]
  var ms = (seconds + nanoseconds) / 1000000 // Nanoseconds to ms
  // No decimal
  return Math.floor(ms)
}
exports.hrtimeToMs = hrtimeToMs
/**
 * Format the test name depending on the context.
 * @param name The name of the test.
 */
var formatTestName = function (test) {
  if (queue_1.getContext() === null) {
    return '- ' + test.name
  }
  return '   - ' + test.name
}
exports.formatTestName = formatTestName
/**
 * Resolve a Resolvable function.
 * @param fn The function to resolve.
 */
var resolveFn = function (fn) {
  return new Promise(function (resolve, reject) {
    var result
    // Try to run the function
    try {
      result = fn()
    } catch (error) {
      return reject(error)
    }
    // Wait for result or resolve already
    if (result instanceof Promise) {
      result
        .then(function () {
          resolve()
        })
        .catch(function (error) {
          reject(error)
        })
    } else {
      resolve()
    }
  })
}
exports.resolveFn = resolveFn
