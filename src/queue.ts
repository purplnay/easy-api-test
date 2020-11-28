import { hrtime } from 'process'
import { config } from './config'
import { handlers } from './handlers'
import { EasyTest } from './register'
import { formatTestName, hrtimeToMs, Resolvable, resolveFn } from './utils'

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
export const runTest = async (test: EasyTest): Promise<Error | void> => {
  let startTime
  let endTime
  let duration
  let textTimer

  if (config.log) {
    process.stdout.write(`${formatTestName(test)}: ${'RUNNING'.yellow}`)
  }

  try {
    startTime = hrtime()
    await test.fn()
  } catch (error) {
    endTime = process.hrtime(startTime)
    duration = hrtimeToMs(endTime)
    textTimer = `(${duration}ms)`

    if (duration > 300) {
      textTimer = textTimer.yellow
    }

    if (config.log) {
      process.stdout.cursorTo(0)
      process.stdout.write(
        `${formatTestName(test)}: ${'FAIL'.red.bold} ${textTimer}\n`
      )

      process.stdout.write(`${error}\n`)
    }

    return error
  }

  endTime = process.hrtime(startTime)
  duration = hrtimeToMs(endTime)
  textTimer = `(${duration}ms)`

  if (duration > 300) {
    textTimer = textTimer.yellow
  }

  if (config.log) {
    process.stdout.cursorTo(0)
    process.stdout.write(
      `${formatTestName(test)}: ${'SUCCESS'.green.bold} ${textTimer}\n`
    )
  }
}

/**
 * Run the registered tests and the start/end handlers.
 */
export const run = async (): Promise<void> => {
  // Run the start handlers
  await runHandlers(handlers.start)

  if (config.log) {
    process.stdout.write('\n\n')
  }

  // Run the tests
  for (let item of queue) {
    // Check if the item is a suite or a single test
    if (Array.isArray(item.tests)) {
      // Set suite context
      setContext(item.name)
      config.log && process.stdout.write(`${getContext()}:\n`)

      // Run the tests
      for (let test of item.tests) {
        const error = await runTest(test)

        if (error && config.exitOnFail) {
          await runHandlers(handlers.end)
          return process.exit()
        }
      }

      // Reset the context
      config.log && process.stdout.write('\n\n')
      setContext(null)
    } else {
      const error = await runTest(item as EasyTest)

      if (error && config.exitOnFail) {
        await runHandlers(handlers.end)
        return process.exit()
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
