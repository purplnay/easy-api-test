const assert = require('assert')
const { suite, test, get, localStorage } = require('../../../dist')

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

    await get(`/recipes/${recipe.id}`).expect(200, recipe)
  })

  // Check if an invalid ID returns 404
  test('Get 404 when the recipe does not exist', async () => {
    await get('/recipes/ayaya').expect(404)
  })
})
