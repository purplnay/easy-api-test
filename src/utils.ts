import { getContext } from './queue'
import { EasyTest } from './register'

/**
 * A function that is resolvable by the system.
 * It should return nothing or a promise resolving with nothing.
 */
export type Resolvable = () => Promise<void> | void

/**
 * Convert hrtime's [seconds, nanoseconds] to milliseconds.
 * @param time The returned value from `hrtime()`.
 * @internal
 */
export const hrtimeToMs = (time: number[]): number => {
  const seconds = time[0] * 1_000_000_000 // Seconds to nanoseconds
  const nanoseconds = time[1]
  const ms = (seconds + nanoseconds) / 1_000_000 // Nanoseconds to ms

  // No decimal
  return Math.floor(ms)
}

/**
 * Format the test name depending on the context.
 * @param test The test to format the name of.
 * @internal
 */
export const formatTestName = (test: EasyTest): string => {
  if (getContext() === null) {
    return `- ${test.name}`
  }

  return `   - ${test.name}`
}

/**
 * Resolve a Resolvable function.
 * @param fn The function to resolve.
 * @internal
 */
export const resolveFn = (fn: Resolvable): Promise<void> => {
  return new Promise((resolve, reject) => {
    let result

    // Try to run the function
    try {
      result = fn()
    } catch (error) {
      return reject(error)
    }

    // Wait for result or resolve already
    if (result instanceof Promise) {
      result
        .then(() => {
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    } else {
      resolve()
    }
  })
}
