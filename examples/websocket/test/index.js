const { test, WebSocket, end, run } = require('../../../dist')
const assert = require('assert')

// Import the server
const server = require('../src')

test('Connect to WebSocket server', async () => {
  // Connect to the websocket server
  const ws = await WebSocket('ws://localhost:3000')

  assert(ws.connected === true)
})

test('Echo the messages sent to the server', async () => {
  const ws = await WebSocket('ws://localhost:3000')

  // Send 'Hello'
  ws.send('Hello')

  // Get the next message from the server
  const message = await ws.message

  // Check if it is what we expected
  assert(message === 'You said: Hello')
})

end(() => {
  // Close the server after the tests end
  server.close()
})

// Run the tests
run()
