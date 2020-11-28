import expect from 'expect'
import { test, run, suite } from '../src'

describe('Tests and suites registration', () => {
  it('should register a test', async () => {
    let done = false

    test('Change done to true', () => {
      done = true
    })

    await run()

    expect(done).toBe(true)
  })

  it('should register a suite', async () => {
    let done = false

    suite('Suite test', () => {
      test('Change done to true', () => {
        done = true
      })
    })

    await run()

    expect(done).toBe(true)
  })

  it('should reject nested suites', () => {
    expect(() => {
      suite('First suite', () => {
        suite('Second suite', () => {})
      })
    }).toThrow()
  })
})
