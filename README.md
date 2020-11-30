# Easy API Test

![Version](https://img.shields.io/npm/v/easy-api-test)
[![Build Status](https://travis-ci.com/purplnay/easy-api-test.svg?branch=main)](https://travis-ci.com/purplnay/easy-api-test)
![License](https://img.shields.io/npm/l/easy-api-test)
![Love](https://img.shields.io/badge/Made%20with-%E2%9D%A4%20-purple)

## API testing, but it's easy.

<br>

Easy API Test lets you write tests to check that you're API is behaving the way you expect it to. The tests are run in the order you decide, so you easily can test an entire user flow.

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

const { use, test, get, localStorage } = require('easy-api-test')

// Tell Easy API Test which URL we'll be testing
use('http://localhost:3000/)

// Define a test
test('Create a user', async () => {
  const response = await post('/users')
    .send({ username: 'Nay' })
    .expect(200)
  
  // Save the user for later use
  localStorage.setItem('user', response.body)
})

// And another one
test('Get a user', async () => {
  // Tests run in the defined order, so localStorage always contains the user.
  const user = localStorage.getItem('user')

  await get(`/users/${user.id}`)
    .expect(200, user)
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

The code for the example is available [here](./example/README.md).

### Creating a project

Let's say we are building an Express app that exposes an API like this:

```text
- /             {*}     -> Say 'hello'
- /recipes      {GET}   -> Get all the recipes
- /recipes/:id  {GET}   -> Get a recipe by ID
- /recipes      {POST}  -> Create a recipe
```

First, let's create a new folder:

```bash
mkdir my-recipe-api
```

Move to the project's directory:

```bash
cd my-recipe-api
```

Initialize a new NPM project:

```bash
npm init -y
```

### Installing the dependencies

We are going to use [express](https://www.npmjs.com/package/express) and [body-parser](https://www.npmjs.com/package/body-parser) to parse JSON. Let's install them:

```bash
npm install --save express body-parser
```

And for our tests, [easy-api-test](https://www.npmjs.com/package/easy-api-test) is all that we will need, let's install it as a dev dependency:

```bash
npm install --save-dev easy-api-test
```

### Writing the app

To keep things clean, we are going to create an `src/` folder that will contain our code, and a `test/` folder that will contain our test files.

Let's start by writing our app in the `src/` folder, in a file that we will name `app.js`.

```javascript
// src/app.js

const http = require('http')

// Import express and body-parser
const express = require('express')
const bodyParser = require('body-parser')

// Create a new express app
const app = express()

// This is were we will store the recipes
const recipes = []

// Add the bodyParser's JSON middleware to our app
app.use(bodyParser.json())

// We return 'hello' at the root, regardless of the method
app.all('/', (req, res) => {
  res.end('hello')
})

// We return all the recipes at /recipes
app.get('/recipes', (req, res) => {
  res.json(recipes)
})

// We return a recipe by id, or 404 if it does no exist
app.get('/recipes/:id', (req, res) => {
  if (recipes[req.params.id]) {
    return res.json(recipes[req.params.id])
  }

  res.statusCode = 404
  res.end()
})

// We create a new recipe
app.post('/recipes', (req, res) => {
  // Check if the fields are correct
  if (req.body.name && req.body.content) {
    // Create the recipe
    const recipe = {
      id: recipes.length,
      name: req.body.name,
      content: req.body.content
    }

    recipes.push(recipe)

    // And return it
    return res.json(recipe)
  }

  // Send a 400 'Bad request' error if the fields were not correct
  res.statusCode = 400
  res.end()
})

// Wrap the app into a Server instance and export it
module.exports = http.createServer(app)
```

We can create an `src/index.js` file to run our app:

```javascript
// src/index.js

const app = require('./app')

// Start the app
app.listen()
```

### Writing the tests

Our tests will be written in the `test` folder, let's start by creating a `test/index.js` file:

```javascript
// test/index.js

// Import what we'll need and our server
const { use, start, end, run } = require('easy-api-test')
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
 * We will import our tests here
 */

// Run the tests.
run()
```

What this file does, for now, is:

- Telling Easy API Test that we will be testing `http://localhost:3000/`.
- Start the server before the tests begin
- Close the server after the tests ran, or after a test failed.

Now, we will write our tests! Let's start by testing the root `/` path of our API. Remember? It should always return 'hello', let's write a test in `test/root.js`:

```javascript
//test/root.js

const { suite, test, get, post } = require('easy-api-test')

// Suites are optional, but they let us group tests together, which
// makes visual feedback clearer
suite('/ Root', () => {
  // Tests require a name, and a function to run
  test('Say hello', async () => {
    await get('/').expect(200, 'hello') // Expect status 200 and content 'hello'
  })

  test('Say hello even with the POST method', async () => {
    await post('/').expect(200, 'hello')
  })
})
```

Tests will run in the same order as you declared them.

Here, we used `get()` and `post()`. These are helper methods built on top of [SuperTest](https://www.npmjs.com/package/supertest), hence their API is available for you to use, along with some [extra methods](https://purplnay.github.io/easy-api-test/interfaces/irequest.html).

Anything that throws will work in the tests, so feel free to use any library you wish!

So, we created our tests for `/`, but we now need to add them to our test pipeline in `test/index.js`:

```javascript
// test/index.js

const { use, start, end, run } = require('easy-api-test')
const app = require('../src/app')

use('http://localhost:3000/')

start(() => {
  return new Promise(resolve => {
    app.listen(3000, resolve)
  })
})

end(() => {
  app.close()
})

/**
 * We import our tests here
 */
require('./root')

run()
```

Next, we want to test our `/recipes` endpoint. We don't have any recipe yet, so let's test if our API creates recipes as expected in a new file `test/create-recipe.js`:

```javascript
// test/create-recipe.js

const assert = require('assert')
const { suite, test, post, localStorage } = require('easy-api-test')

suite('/recipes Create new recipes', () => {
  // Let's first see if our API rejects invalid recipes
  test('Reject an invalid recipe', async () => {
    // We expect a 400 error in case of incorrect fields
    await post('/recipes').send({ ayaya: 'clap' }).expect(400)
  })

  // Now let's test creating a recipe
  test('Create a valid recipe', async () => {
    const recipe = {
      name: 'tomatoes',
      content: 'Put tomatoes in a plate.',
    }

    const response = await post('/recipes').send(recipe)

    // We can use `assert` to test anything
    assert.strictEqual(response.status, 200)
    assert.strictEqual(response.body.name, recipe.name)

    // localStorage is a helper object from Easy API Test, to store data
    // and retrieve it easily in later tests.
    localStorage.setItem('recipe', response.body)
  })
})
```

It might sound scary to have stateful tests where one test requires the result of another test, but don't worry, this actually is intended! We are not testing units of our application, we are testing an actual user flow through the API. If one test crashes, the test suites will end, so you will not have a test missing some external data.

Let's add this new test suite to our pipeline in `test/index.js`:

```javascript
// test/index.js

const { use, start, end, run } = require('easy-api-test')
const app = require('../src/app')

use('http://localhost:3000/')

start(() => {
  return new Promise(resolve => {
    app.listen(3000, resolve)
  })
})

end(() => {
  app.close()
})

/**
 * We import our tests here
 */
require('./root')
require('./create-recipe')

run()
```

And let's finish by writing tests for the `/recipes` GET endpoint, and `/recipes/:id` endpoint in a file nammed `test/get-recipe.js`:

```javascript
// test/get-recipe.js

const assert = require('assert')
const { suite, test, get, localStorage } = require('easy-api-test')

suite('/recipes Get recipes', () => {

  // This will run after we have created our recipe, so if the endpoint works,
  // it should return an array with at least 1 element.
  test('Get all the recipes', async () => {
    const response = await get('/recipes')
    
    assert(response.body.length > 0)
  })

  test('Get a recipe by id', async () => {
    // Our recipe is in the localStorage, so we can grab its ID
    const recipe = localStorage.getItem('recipe')

    await get(`/recipes/${recipe.id}`)
      .expect(200, recipe)
  })

  // Check if an invalid ID returns 404
  test('Get 404 when the recipe does not exist', async () => {
    await get('/recipes/ayaya')
      .expect(404)
  })
})
```

And again, add this to our pipeline:

```javascript
// test/index.js

const { use, start, end, run } = require('easy-api-test')
const app = require('../src/app')

use('http://localhost:3000/')

start(() => {
  return new Promise(resolve => {
    app.listen(3000, resolve)
  })
})

end(() => {
  app.close()
})

/**
 * We import our tests here
 */
require('./root')
require('./create-recipe')
require('./get-recipe')

run()
```

That's it! Now let's see if our app works as expect by running the tests:

```bash
node test/index.js
```

and the result:

```bash
/ Root:
   - Say hello: PASS (29ms)
   - Say hello even with the POST method: PASS (4ms)

/recipes Create new recipes:
   - Reject an invalid recipe: PASS (15ms)
   - Create a valid recipe: PASS (6ms)

/recipes Get recipes:
   - Get all the recipes: PASS (3ms)
   - Get a recipe by id: PASS (4ms)
   - Get 404 when the recipe does not exist: PASS (2ms)
```
<!-- prettier-ignore-end -->

## Contributions

The Code of Conduct is available [here](./CODE_OF_CONDUCT.md).

If you wish to help to improve Easy API Test by adding new features, performance improvements or documentation corrections, you can do so by forking the [repository](https://github.com/purplnay/easy-api-test), applying your changes and sending a pull request.

If you enconter any issue regarding the repository, or wish to suggest new features, you can fill an [issue](https://github.com/purplnay/easy-api-test/issues). Make sure to check that your issue doesn't exist yet.
