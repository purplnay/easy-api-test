'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.use = exports.exitOnFailure = exports.disableLogs = exports.config = void 0
/**
 * The test session configuration.
 */
exports.config = {
  exitOnFailure: false,
  log: true,
  app: null,
}
/**
 * Disable the logs to the console.
 */
var disableLogs = function () {
  exports.config.log = false
}
exports.disableLogs = disableLogs
/**
 * Exit the test session if a test fails.
 * The end handlers would still be executed before exiting.
 */
var exitOnFailure = function () {
  exports.config.exitOnFailure = false
}
exports.exitOnFailure = exitOnFailure
/**
 * Define which server or server handler (e.g an Express app) to use.
 * @param app The server instance or server handler to use.
 */
var use = function (app) {
  exports.config.app = app
}
exports.use = use
