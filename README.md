# Easy API Test

![License](https://img.shields.io/npm/l/easy-api-test)
![Version](https://img.shields.io/npm/v/easy-api-test)
![Love](https://img.shields.io/badge/Made%20with-%E2%9D%A4%20-purple)

## API testing, but it's easy.

<br>

Easy API Test lets you write tests to check that you're API is behaving the way you expect it to.

The libary's API is meant to be simple. No configuration, no CLI, no need to install extra dependencies to get your Babel or Typescript tests to work.

Uses the great **[SuperTest](https://www.npmjs.com/package/supertest)** package for the request helper functions.

## Documentation

You can find the full API reference [here](https://purplnay.github.io/easy-api-test).

## Installation

- Using **NPM**:

  ```bash
  npm install -D easy-api-test
  ```

- Using **Yarn**:
  ```bash
  yarn add -D easy-api-test
  ```

## Usage

<!-- prettier-ignore-start -->
```javascript
// test.js

import expect from 'expect'
import { use, test, get } from 'easy-api-test'
import { server } from './src/server.js'

// Tell Easy API Test which server we'll be using
use(server)

// Define a test
test('Get a nice recipe', async () => {
  const response = await get('/recipes/nice')
  const recipe = response.body

  expect(recipe).toBe('nice')
})

// And another one
test('Get a secret recipe with a bearer token', async () => {
  await get('/recipes/secret')
    .bearer('My Bearer Token')
    .expect(200, {
      isSecretRecipe: true
    })
})

// Run the tests
run()
```
<!-- prettier-ignore-end -->

To run the tests that you wrote in `test.js`, you simply need to execute the script:

- With **JavaScript** (node):

  ```bash
  node test.js
  ```

- With **ES6+** ([Babel](https://www.npmjs.com/package/@babel/node)):

  ```bash
  babel-node test.js
  ```

- With **Typescript** ([ts-node](https://www.npmjs.com/package/ts-node)):
  ```bash
  ts-node test.ts
  ```

## Example

<!-- prettier-ignore-start -->
Let's say we are building an Express app that exposes an API like this:

```text
GET   /auth      - Get a bearer token
GET   /users     - Get all the users
GET   /users/:id - Get a user by id
PATCH /users     - Updates a user using a bearer token
```

We can create a new file `test/index.js` with this content:

```javascript
// test/index.js

import assert from 'assert'
import { use, exitOnFail, start, end, run } from 'easy-api-test'
import { app } from '../src/app' // Our express app
import { db } from '../src/db' // Some DB module

// Tell Easy API Test which server to use
use(app)

// End the test session if one test fails
exitOnFail()

// Everything defined in `start()` will run before the tests start.
start(async () => {
  await db.connect() // Connect to our db before the tests start
})

// Same as `start()`, but this runs when the tests have ended, or
// after a test has failed if you used `exitOnFail()`.
end(async () => {
  await db.disconnect()
})

/**
 *
 * We will put our tests here, just before run().
 *
 */

// Run the tests
run()
```

We can write our tests directly in `test/index.js`, but let's avoid loooong files of code.

Instead, we'll write the tests for the `/auth` endpoint in the file `test/auth.js` and the tests for the `/users` endpoint in the file `test/users.js`.

```javascript
// test/auth.js

import assert from 'assert'
import { get, test, suite, localStorage } from 'easy-api-test'

// Suites let you group tests together, under a same 'namespace'.
suite('Auth Endpoint', () => {
  test('Get a bearer token', async () => {
    const response = await get('/auth')

    // Test if we received a response
    assert(typeof response.body.token === 'string')

    // This is a helper object that behaves like localStorage
    localStorage.setItem('token', response.body.token)
  })
})
```

Now, let's write the tests for the `/users` endpoint:

```javascript
// test/users.js

import assert from 'assert'
import { suite, test, get, patch, localStorage } from 'easy-api-test'

suite('Users Endpoint', () => {
  test('Get all the users', async () => {
    // .json() asks the server for a JSON resposne (Accept: application/json)
    const response = await get('/users').json()

    assert(Array.isArray(response.body))
  })

  test('Get one user by id', async () => {
    // Easy API Test uses SuperTest under the hood, so all the methods
    // available in SuperTest are available here as well.
    await get('/users/1')
      .json()
      .expect(200, {
        id: 1
      })
  })

  test('Update a user using a bearer token', async () => {
    await patch('/users')
      .json()
      .bearer(localStorage.token) // using .getItem() or .setItem() is optional
      .expect(200)
  })
})
```

Our tests are ready! Let's now add them to our `test/index.js` file, before the `run()` function. The tests will be executed in the same order as they were added.

```javascript
// test/index.js (final result)

import assert from 'assert'
import { use, exitOnFail, start, end, run } from 'easy-api-test'
import { app } from '../src/app' // Our express app
import { db } from '../src/db' // Some DB module

use(app)
exitOnFail()

start(async () => {
  await db.connect()
})

end(async () => {
  await db.disconnect()
})


// Import the tests in the order we wish to run them.
import './auth'
import './users'

// Run the tests
run()
```

That's it! Now you can run your tests using the command line:

```
node test/index.js
```

Make sure to use a runner that can handle your code (e.g node, babel-node, ts-node). I used `node` here just as an example.

Anyways, you can know easily add new endpoints to your API, write some simple tests, run the tests, and make sure everything is working properly!

<!-- prettier-ignore-end -->

## Contributions

The Code of Conduct is available [here](./CODE_OF_CONDUCT.md).

If you wish to help to improve Easy API Test by adding new features, performance improvements or documentation corrections, you can do so by forking the [repository](https://github.com/purplnay/easy-api-test), applying your changes and sending a pull request.

If you enconter any issue regarding the repository, or wish to suggest new features, you can fill an [issue](https://github.com/purplnay/easy-api-test/issues). Make sure to check that your issue doesn't exist yet.
