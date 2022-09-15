import 'colors'
import { hrtime } from 'process'
import { config } from './config'
import { handlers } from './handlers'
import { clearLine, newLine, writeLine } from './logger'
import { EasyTest } from './register'
import { formatTestName, hrtimeToMs, Resolvable, resolveFn } from './utils'
import { closeConnections } from './websocket'

/**
 * A test or a suite.
 * @internal
 */
export interface QueueItem {
  name: string
  fn?: Resolvable
  tests?: EasyTest[]
}

/**
 * The test queue.
 * @internal
 */
export let queue: QueueItem[] = []

/**
 * The current suite name, or null if none.
 * @internal
 */
let _context: string | null = null

/**
 * Get the current suite name, or null if none.
 * @internal
 */
export const getContext = (): string | null => {
  return _context
}

/**
 * Set the current suite name, or null if none.
 * @param context The current suite name.
 * @internal
 */
export const setContext = (context: string | null) => {
  _context = context
}

/**
 * Run handlers.
 * @param handlers The handlers to run.
 * @internal
 */
export const runHandlers = async (handlers: Resolvable[]): Promise<void> => {
  for (let handler of handlers) {
    await resolveFn(handler)
  }
}

/**
 * Run a test.
 * @param test The test to run.
 * @internal
 */
export const runTest = async (test: EasyTest): Promise<[boolean, any]> => {
  let startTime
  let endTime
  let duration
  let textTimer

  if (config.log) {
    writeLine(`${formatTestName(test)}: ${'RUNNING'.yellow}`)
  }

  try {
    startTime = hrtime()
    await test.fn()
  } catch (error: any) {
    endTime = process.hrtime(startTime)
    duration = hrtimeToMs(endTime)
    textTimer = `(${duration}ms)`

    if (duration > 300) {
      textTimer = textTimer.yellow
    }

    if (config.log) {
      clearLine()
      writeLine(`${formatTestName(test)}: ${'FAIL'.red.bold} ${textTimer}`)
      newLine()
      writeLine(`${error}`)
      newLine()
    }

    return [true, error]
  }

  endTime = process.hrtime(startTime)
  duration = hrtimeToMs(endTime)
  textTimer = `(${duration}ms)`

  if (duration > 300) {
    textTimer = textTimer.yellow
  } else {
    textTimer = textTimer.grey
  }

  if (config.log) {
    clearLine()
    writeLine(`${formatTestName(test)}: ${'PASS'.green} ${textTimer}`)
    newLine()
  }

  return [false, null]
}

/**
 * Run the registered tests and the start/end handlers.
 */
export const run = async (): Promise<void> => {
  // Add the WebSocket closing to the end handlers
  // Add it first to avoid errors when end handlers would close
  // a WebSocket server.
  handlers.end.unshift(closeConnections)

  // Run the start handlers
  await runHandlers(handlers.start)

  if (config.log) {
    newLine()
  }

  // Run the tests
  for (let item of queue) {
    // Check if the item is a suite or a single test
    if (Array.isArray(item.tests)) {
      // Set suite context
      setContext(item.name)
      writeLine(`${getContext()}:`.grey)
      newLine()

      // Run the tests
      for (let test of item.tests) {
        const [hasError, error] = await runTest(test)

        if (hasError) {
          // Run the end handlers and throw the error
          await runHandlers(handlers.end)
          throw error
        }
      }

      // Reset the context
      newLine()
      setContext(null)
    } else {
      const [hasError, error] = await runTest(item as EasyTest)

      if (hasError) {
        // Run the end handlers and throw the error
        await runHandlers(handlers.end)
        throw error
      }
    }
  }

  // Run the end handlers
  await runHandlers(handlers.end)

  // Clear the queue (to avoid project's unit testing bugs)
  handlers.start = []
  handlers.end = []
  queue = []
}
