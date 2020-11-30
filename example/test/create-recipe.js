const assert = require('assert')
const { suite, test, post, localStorage } = require('../../dist')

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
