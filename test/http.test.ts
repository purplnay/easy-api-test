import expect from 'expect'
import express from 'express'
import { createServer, Server } from 'http'
import { get, post, use } from '../src'

describe('HTTP request/response helper functions', () => {
  it('should throw if no server was provided', async () => {
    await expect(async () => await get('/')).rejects.toThrow()
  })

  describe('#IRequest', () => {
    let server: Server

    before(done => {
      // Create a simple express app
      const app = express()

      // Echo the path and HTTP headers
      app.use((req, res) => {
        res.json({
          ...req.headers,
          path: req.path,
        })
      })

      // Create an HTTP server and start it
      server = createServer(app)
      server.listen(() => done())

      use(server)
    })

    after(done => {
      // Stop the server
      server.close(() => done())
    })

    describe('#json()', () => {
      it('should set the Accept header as JSON', async () => {
        const path = '/testing-json'
        const response = await get(path).json()

        expect(response.body).toHaveProperty('path', path)
        expect(response.body).toHaveProperty('accept', 'application/json')
      })
    })

    describe('#bearer()', () => {
      it('should set the bearer as Authorization token', async () => {
        const path = '/testing-bearer'
        const token = 'one two three'
        const response = await post(path).bearer(token)

        expect(response.body).toHaveProperty('path', path)
        expect(response.body).toHaveProperty('authorization', `Bearer ${token}`)
      })
    })
  })
})
