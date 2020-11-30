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

// We return a recipe by id
app.get('/recipes/:id', (req, res) => {
  const id = req.params.id

  // Check if the recipe exists
  if (recipes[id]) {
    return res.json(recipes[id])
  }

  // Send a 404 'Not found' error if the id does not exist.
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
