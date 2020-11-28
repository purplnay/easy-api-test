'use strict'
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1]
          return t[1]
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === 'function' &&
        (g[Symbol.iterator] = function () {
          return this
        }),
      g
    )
    function verb(n) {
      return function (v) {
        return step([n, v])
      }
    }
    function step(op) {
      if (f) throw new TypeError('Generator is already executing.')
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y['return']
                  : op[0]
                  ? y['throw'] || ((t = y['return']) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t
          if (((y = 0), t)) op = [op[0] & 2, t.value]
          switch (op[0]) {
            case 0:
            case 1:
              t = op
              break
            case 4:
              _.label++
              return { value: op[1], done: false }
            case 5:
              _.label++
              y = op[1]
              op = [0]
              continue
            case 7:
              op = _.ops.pop()
              _.trys.pop()
              continue
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0
                continue
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1]
                break
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1]
                t = op
                break
              }
              if (t && _.label < t[2]) {
                _.label = t[2]
                _.ops.push(op)
                break
              }
              if (t[2]) _.ops.pop()
              _.trys.pop()
              continue
          }
          op = body.call(thisArg, _)
        } catch (e) {
          op = [6, e]
          y = 0
        } finally {
          f = t = 0
        }
      if (op[0] & 5) throw op[1]
      return { value: op[0] ? op[1] : void 0, done: true }
    }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.run = exports.runTest = exports.runHandlers = exports.setContext = exports.getContext = exports.queue = void 0
var process_1 = require('process')
var config_1 = require('./config')
var handlers_1 = require('./handlers')
var utils_1 = require('./utils')
/**
 * The test queue.
 */
exports.queue = []
/**
 * The current suite name, or null if none.
 */
var _context = null
/**
 * Get the current suite name, or null if none.
 */
var getContext = function () {
  return _context
}
exports.getContext = getContext
/**
 * Set the current suite name, or null if none.
 * @param context The current suite name.
 */
var setContext = function (context) {
  _context = context
}
exports.setContext = setContext
/**
 * Run handlers.
 * @param handlers The handlers to run.
 */
var runHandlers = function (handlers) {
  return __awaiter(void 0, void 0, void 0, function () {
    var _i, handlers_2, handler
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          ;(_i = 0), (handlers_2 = handlers)
          _a.label = 1
        case 1:
          if (!(_i < handlers_2.length)) return [3 /*break*/, 4]
          handler = handlers_2[_i]
          return [4 /*yield*/, utils_1.resolveFn(handler)]
        case 2:
          _a.sent()
          _a.label = 3
        case 3:
          _i++
          return [3 /*break*/, 1]
        case 4:
          return [2 /*return*/]
      }
    })
  })
}
exports.runHandlers = runHandlers
/**
 * Run a test.
 * @param test The test to run.
 */
var runTest = function (test) {
  return __awaiter(void 0, void 0, void 0, function () {
    var startTime, endTime, duration, textTimer, error_1
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          if (config_1.config.log) {
            process.stdout.write(
              utils_1.formatTestName(test) + ': ' + 'RUNNING'.yellow
            )
          }
          _a.label = 1
        case 1:
          _a.trys.push([1, 3, , 4])
          startTime = process_1.hrtime()
          return [4 /*yield*/, test.fn()]
        case 2:
          _a.sent()
          return [3 /*break*/, 4]
        case 3:
          error_1 = _a.sent()
          endTime = process.hrtime(startTime)
          duration = utils_1.hrtimeToMs(endTime)
          textTimer = '(' + duration + 'ms)'
          if (duration > 300) {
            textTimer = textTimer.yellow
          }
          if (config_1.config.log) {
            process.stdout.cursorTo(0)
            process.stdout.write(
              utils_1.formatTestName(test) +
                ': ' +
                'FAIL'.red.bold +
                ' ' +
                textTimer +
                '\n'
            )
            process.stdout.write(error_1 + '\n')
          }
          return [2 /*return*/, error_1]
        case 4:
          endTime = process.hrtime(startTime)
          duration = utils_1.hrtimeToMs(endTime)
          textTimer = '(' + duration + 'ms)'
          if (duration > 300) {
            textTimer = textTimer.yellow
          }
          if (config_1.config.log) {
            process.stdout.cursorTo(0)
            process.stdout.write(
              utils_1.formatTestName(test) +
                ': ' +
                'SUCCESS'.green.bold +
                ' ' +
                textTimer +
                '\n'
            )
          }
          return [2 /*return*/]
      }
    })
  })
}
exports.runTest = runTest
/**
 * Run the registered tests and the start/end handlers.
 */
var run = function () {
  return __awaiter(void 0, void 0, void 0, function () {
    var _i, queue_1, item, _a, _b, test_1, error, error
    return __generator(this, function (_c) {
      switch (_c.label) {
        case 0:
          // Run the start handlers
          return [4 /*yield*/, exports.runHandlers(handlers_1.handlers.start)]
        case 1:
          // Run the start handlers
          _c.sent()
          if (config_1.config.log) {
            process.stdout.write('\n\n')
          }
          ;(_i = 0), (queue_1 = exports.queue)
          _c.label = 2
        case 2:
          if (!(_i < queue_1.length)) return [3 /*break*/, 12]
          item = queue_1[_i]
          if (!Array.isArray(item.tests)) return [3 /*break*/, 8]
          // Set suite context
          exports.setContext(item.name)
          config_1.config.log &&
            process.stdout.write('\n\n' + exports.getContext() + ':\n')
          ;(_a = 0), (_b = item.tests)
          _c.label = 3
        case 3:
          if (!(_a < _b.length)) return [3 /*break*/, 7]
          test_1 = _b[_a]
          return [4 /*yield*/, exports.runTest(test_1)]
        case 4:
          error = _c.sent()
          if (!(error && config_1.config.exitOnFailure)) return [3 /*break*/, 6]
          return [4 /*yield*/, exports.runHandlers(handlers_1.handlers.end)]
        case 5:
          _c.sent()
          return [2 /*return*/, process.exit()]
        case 6:
          _a++
          return [3 /*break*/, 3]
        case 7:
          // Reset the context
          config_1.config.log && process.stdout.write('\n\n')
          exports.setContext(null)
          return [3 /*break*/, 11]
        case 8:
          return [4 /*yield*/, exports.runTest(item)]
        case 9:
          error = _c.sent()
          if (!(error && config_1.config.exitOnFailure))
            return [3 /*break*/, 11]
          return [4 /*yield*/, exports.runHandlers(handlers_1.handlers.end)]
        case 10:
          _c.sent()
          return [2 /*return*/, process.exit()]
        case 11:
          _i++
          return [3 /*break*/, 2]
        case 12:
          // Run the end handlers
          return [
            4 /*yield*/,
            exports.runHandlers(handlers_1.handlers.end),
            // Clear the queue (to avoid project's unit testing bugs)
          ]
        case 13:
          // Run the end handlers
          _c.sent()
          // Clear the queue (to avoid project's unit testing bugs)
          handlers_1.handlers.start = []
          handlers_1.handlers.end = []
          exports.queue = []
          return [2 /*return*/]
      }
    })
  })
}
exports.run = run
