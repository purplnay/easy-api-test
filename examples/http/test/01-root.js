const { suite, test, get, post } = require('../../../dist')

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
