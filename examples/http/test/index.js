// Import what we'll need and our server
const { use, start, end, run } = require('../../../dist')
const app = require('../src/app')

// We can tell Easy API Test which URL to test,
// here we will use the port 3000
use('http://localhost:3000/')

// Any function passed to `start()` will run before the tests
start(() => {
  // Return a promise that resolves once the server started
  return new Promise(resolve => {
    app.listen(3000, resolve)
  })
})

// Any function passed to `stop()` will run after the tests, even
// if a test has failed.
end(() => {
  app.close()
})

/**
 * We import our tests here
 */
require('./01-root')
require('./02-create-recipe')
require('./03-get-recipe')

// Run the tests.
run()
