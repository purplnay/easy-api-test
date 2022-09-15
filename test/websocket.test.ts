import expect from 'expect'
import { createServer, Server } from 'http'
import { AddressInfo } from 'net'
import ws from 'ws'
import { WebSocket, run } from '../src'

describe('WebSocket module', () => {
  let server: Server
  let address: string
  let pong = false

  before(done => {
    server = createServer()
    const wss = new ws.Server({ server })

    wss.on('connection', ws => {
      ws.on('ping', () => {
        pong = true
        ws.pong()
      })

      ws.on('message', data => ws.send(data))
    })

    server.on('listening', () => {
      address = `ws://localhost:${(wss.address() as AddressInfo).port}`
      done()
    })

    server.listen()
  })

  after(done => {
    server.close(done)
  })

  it('should connect to a websocket server', async () => {
    const ws = await WebSocket(address)

    expect(ws.connected).toBe(true)
  })

  it('should wait for the next message', async () => {
    const ws = await WebSocket(address)

    ws.send('Some message')

    const message = await ws.message

    expect(message).toEqual('Some message')
  })

  it('should save consecutive messages in a queue', async () => {
    const ws = await WebSocket(address)

    ws.send('Some message 1')
    ws.send('Some message 2')
    ws.send('Some message 3')

    const message1 = await ws.message
    expect(message1).toEqual('Some message 1')
    const message2 = await ws.message
    expect(message2).toEqual('Some message 2')
    const message3 = await ws.message
    expect(message3).toEqual('Some message 3')
  })

  it('should wait for a pong event when it sends a ping', async () => {
    const ws = await WebSocket(address)

    await ws.ping()

    expect(pong).toBe(true)
  })

  it('should close the websocket connection', async () => {
    const ws = await WebSocket(address)

    ws.close()

    expect(ws.connected).toBe(false)
  })

  it('should accept different parsing methods', async () => {
    const ws = await WebSocket(address, {
      parse: (data: any) => JSON.parse(data.toString()),
      serialize: (data: any) => JSON.stringify(data),
    })

    ws.send({ type: 'A message', content: 'A JSON message' })

    const message = await ws.message

    expect(message.type).toBe('A message')
    expect(message.content).toBe('A JSON message')
  })

  it('should close all the connections when the tests end', async () => {
    const ws1 = await WebSocket(address)
    const ws2 = await WebSocket(address)

    await run()

    expect(ws1.connected).toBe(false)
    expect(ws2.connected).toBe(false)
  })
})
