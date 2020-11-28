import { Resolvable } from './utils'

/**
 * Setup and teardown functions.
 * @internal
 */
export interface Handlers {
  start: Resolvable[]
  end: Resolvable[]
}

/**
 * The start and end handlers for the test session.
 * @internal
 */
export const handlers: Handlers = {
  start: [],
  end: [],
}

/**
 * Register a start handler.
 *
 * This function will run before the tests start, along with the other
 * registered start handlers.
 *
 * The handlers are executed in the order they were registered.
 * @param fn A function to run before the tests.
 */
export const start = (fn: Resolvable): void => {
  handlers.start.push(fn)
}

/**
 * Register an end handler.
 *
 * This function will run when the tests have ended, along with the other
 * registered end handlers.
 *
 * The handlers are executed in the order they were registered.
 */
export const end = (fn: Resolvable): void => {
  handlers.end.push(fn)
}
