'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.end = exports.start = exports.handlers = void 0
/**
 * The start and end handlers for the test session.
 */
exports.handlers = {
  start: [],
  end: [],
}
/**
 * Register a start handler.
 *
 * This function will run before the tests start, along with the other
 * registered start handlers.
 *
 * The handlers are executed in the order they were registered.
 * @param fn A function to run before the tests.
 */
var start = function (fn) {
  exports.handlers.start.push(fn)
}
exports.start = start
/**
 * Register an end handler.
 *
 * This function will run when the tests have ended, along with the other
 * registered end handlers.
 *
 * The handlers are executed in the order they were registered.
 */
var end = function (fn) {
  exports.handlers.end.push(fn)
}
exports.end = end
