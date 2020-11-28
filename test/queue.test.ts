import expect from 'expect'
import { end, run, start, test, suite } from '../src'

describe('Queue execution order', () => {
  it('should execute tests in registered order', async () => {
    let done = false

    test('Test 1', () => {
      expect(done).toBe(false)
    })

    test('Test 2', () => {
      done = true
    })

    await run()

    expect(done).toBe(true)
  })

  it('should execute suites the registered order', async () => {
    let done = false

    suite('Suite 1', () => {
      test('Test 1', () => {
        expect(done).toBe(false)
      })
    })

    suite('Suite 2', () => {
      test('Test 2', () => {
        done = true
      })
    })

    await run()

    expect(done).toBe(true)
  })

  it('should execute suite tests in the registered order', async () => {
    let done1 = false
    let done2 = false

    suite('Tests suite', () => {
      test('Test 1', () => {
        done1 = true
        expect(done2).toBe(false)
      })

      test('Test 2', () => {
        done2 = true
        expect(done1).toBe(true)
      })
    })

    await run()

    expect(done2).toBe(true)
  })

  it('should execute suites and tests in the registered order', async () => {
    let done1 = false
    let done2 = false
    let done3 = false
    let done4 = false
    let done5 = false

    test('Test 1', () => {
      done1 = true
      expect(done2).toBe(false)
      expect(done3).toBe(false)
      expect(done4).toBe(false)
      expect(done5).toBe(false)
    })

    suite('Suite 1', () => {
      test('Test 2', () => {
        expect(done1).toBe(true)
        done2 = true
        expect(done3).toBe(false)
        expect(done4).toBe(false)
        expect(done5).toBe(false)
      })

      test('Test 3', () => {
        expect(done1).toBe(true)
        expect(done2).toBe(true)
        done3 = true
        expect(done4).toBe(false)
        expect(done5).toBe(false)
      })
    })

    test('Test 4', () => {
      expect(done1).toBe(true)
      expect(done2).toBe(true)
      expect(done3).toBe(true)
      done4 = true
      expect(done5).toBe(false)
    })

    suite('Suite 2', () => {
      test('Test 5', () => {
        expect(done1).toBe(true)
        expect(done2).toBe(true)
        expect(done3).toBe(true)
        expect(done4).toBe(true)
        done5 = true
      })
    })

    await run()

    expect(done1).toBe(true)
    expect(done2).toBe(true)
    expect(done3).toBe(true)
    expect(done4).toBe(true)
    expect(done5).toBe(true)
  })

  it('should execute start handlers in the registered order', async () => {
    let done1 = false
    let done2 = false

    start(() => {
      done1 = true
      expect(done2).toBe(false)
    })

    start(() => {
      expect(done1).toBe(true)
      done2 = true
    })

    await run()

    expect(done2).toBe(true)
  })

  it('should execute end handlers in the registered order', async () => {
    let done1 = false
    let done2 = false

    end(() => {
      done1 = true
      expect(done2).toBe(false)
    })

    end(() => {
      expect(done1).toBe(true)
      done2 = true
    })

    await run()

    expect(done2).toBe(true)
  })

  it('should execute start handlers, tests, then end handlers', async () => {
    let done1 = false
    let done2 = false
    let done3 = false

    start(() => {
      done1 = true
      expect(done2).toBe(false)
      expect(done3).toBe(false)
    })

    test('Test', () => {
      expect(done1).toBe(true)
      done2 = true
      expect(done3).toBe(false)
    })

    end(() => {
      expect(done1).toBe(true)
      expect(done2).toBe(true)
      done3 = true
    })

    await run()

    expect(done3).toBe(true)
  })

  it('should accept end handlers declaration before start handlers declaration', async () => {
    let done1 = false
    let done2 = false

    end(() => {
      expect(done1).toBe(true)
      done2 = true
    })

    start(() => {
      done1 = true
      expect(done2).toBe(false)
    })

    await run()

    expect(done2).toBe(true)
  })
})
