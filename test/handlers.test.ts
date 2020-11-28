import expect from 'expect'
import { end, run, start } from '../src'

describe('Start and end handlers registration', () => {
  it('should register a start handler', async () => {
    let done = false

    start(() => {
      done = true
    })

    await run()

    expect(done).toBe(true)
  })

  it('should register multiple start handlers', async () => {
    let done1 = false
    let done2 = false

    start(() => {
      done1 = true
    })

    start(() => {
      done2 = true
    })

    await run()

    expect(done1).toBe(true)
    expect(done2).toBe(true)
  })

  it('should register an end handler', async () => {
    let done = false

    end(() => {
      done = true
    })

    await run()

    expect(done).toBe(true)
  })

  it('should register multiple end handlers', async () => {
    let done1 = false
    let done2 = false

    end(() => {
      done1 = true
    })

    end(() => {
      done2 = true
    })

    await run()

    expect(done1).toBe(true)
    expect(done2).toBe(true)
  })
})
