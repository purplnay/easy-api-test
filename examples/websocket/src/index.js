const { createServer } = require('http')
const ws = require('ws')

// Create an HTTP server
const server = createServer()

// Create a websocket server on port 3000
const wss = new ws.Server({ server })

// Listen to connection events
wss.on('connection', ws => {
  // Listen to socket message events
  ws.on('message', data => {
    // Send 'You said :' followed by the message.
    ws.send(`You said: ${data.toString()}`)
  })
})

server.listen(3000)

module.exports = server
