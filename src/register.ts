import 'colors'
import { config } from './config'
import { newLine, writeLine } from './logger'
import { queue, setContext, getContext } from './queue'
import { Resolvable } from './utils'

/**
 * A test.
 * @internal
 */
export interface EasyTest {
  name: string
  fn: Resolvable
}

/**
 * Register a test.
 * @param name The name of the test.
 * @param fn The function to run for this test.
 */
export const test = (name: string, fn: Resolvable): void => {
  if (getContext() === null) {
    queue.push({ name, fn })
  } else {
    queue[queue.length - 1].tests?.push({ name, fn })
  }
}

/**
 * Register a suite.
 * @param name The name of the suite.
 * @param fn The function that registers tests to that suite.
 */
export const suite = (name: string, fn: () => void): void => {
  if (getContext() !== null) {
    if (config.log) {
      newLine()
      writeLine(
        `Suite "${name.bold}" cannot be declared inside "${
          (getContext() as string).bold
        }".`.red
      )
      newLine()
    }

    throw new Error('Suites cannot be nested.')
  }

  setContext(name)
  queue.push({ name, tests: [] })
  fn()
  setContext(null)
}
