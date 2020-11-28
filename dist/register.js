'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.suite = exports.test = void 0
require('colors')
var config_1 = require('./config')
var queue_1 = require('./queue')
/**
 * Register a test.
 * @param name The name of the test.
 * @param fn The function to run for this test.
 */
var test = function (name, fn) {
  var _a
  if (queue_1.getContext() === null) {
    queue_1.queue.push({ name: name, fn: fn })
  } else {
    ;(_a = queue_1.queue[queue_1.queue.length - 1].tests) === null ||
    _a === void 0
      ? void 0
      : _a.push({ name: name, fn: fn })
  }
}
exports.test = test
/**
 * Register a suite.
 * @param name The name of the suite.
 * @param fn The function that registers tests to that suite.
 */
var suite = function (name, fn) {
  if (queue_1.getContext() !== null) {
    if (config_1.config.log) {
      process.stdout.write(
        (
          '\nSuite "' +
          name.bold +
          '" cannot be declared inside "' +
          queue_1.getContext().bold +
          '".\n'
        ).red
      )
    }
    throw new Error('Suites cannot be nested.')
  }
  queue_1.setContext(name)
  queue_1.queue.push({ name: name, tests: [] })
  fn()
  queue_1.setContext(null)
}
exports.suite = suite
