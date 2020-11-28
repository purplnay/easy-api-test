'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.suite = exports.test = exports.run = exports.del = exports.patch = exports.put = exports.post = exports.get = exports.localStorage = exports.sleep = exports.end = exports.start = exports.use = exports.exitOnFailure = exports.disableLogs = void 0
var config_1 = require('./config')
Object.defineProperty(exports, 'disableLogs', {
  enumerable: true,
  get: function () {
    return config_1.disableLogs
  },
})
Object.defineProperty(exports, 'exitOnFailure', {
  enumerable: true,
  get: function () {
    return config_1.exitOnFailure
  },
})
Object.defineProperty(exports, 'use', {
  enumerable: true,
  get: function () {
    return config_1.use
  },
})
var handlers_1 = require('./handlers')
Object.defineProperty(exports, 'start', {
  enumerable: true,
  get: function () {
    return handlers_1.start
  },
})
Object.defineProperty(exports, 'end', {
  enumerable: true,
  get: function () {
    return handlers_1.end
  },
})
var helpers_1 = require('./helpers')
Object.defineProperty(exports, 'sleep', {
  enumerable: true,
  get: function () {
    return helpers_1.sleep
  },
})
Object.defineProperty(exports, 'localStorage', {
  enumerable: true,
  get: function () {
    return helpers_1.localStorage
  },
})
Object.defineProperty(exports, 'get', {
  enumerable: true,
  get: function () {
    return helpers_1.get
  },
})
Object.defineProperty(exports, 'post', {
  enumerable: true,
  get: function () {
    return helpers_1.post
  },
})
Object.defineProperty(exports, 'put', {
  enumerable: true,
  get: function () {
    return helpers_1.put
  },
})
Object.defineProperty(exports, 'patch', {
  enumerable: true,
  get: function () {
    return helpers_1.patch
  },
})
Object.defineProperty(exports, 'del', {
  enumerable: true,
  get: function () {
    return helpers_1.del
  },
})
var queue_1 = require('./queue')
Object.defineProperty(exports, 'run', {
  enumerable: true,
  get: function () {
    return queue_1.run
  },
})
var register_1 = require('./register')
Object.defineProperty(exports, 'test', {
  enumerable: true,
  get: function () {
    return register_1.test
  },
})
Object.defineProperty(exports, 'suite', {
  enumerable: true,
  get: function () {
    return register_1.suite
  },
})
