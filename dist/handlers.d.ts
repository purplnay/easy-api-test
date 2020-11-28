import { Resolvable } from './utils'
/**
 * Setup and teardown functions.
 */
export interface Handlers {
  start: Resolvable[]
  end: Resolvable[]
}
/**
 * The start and end handlers for the test session.
 */
export declare const handlers: Handlers
/**
 * Register a start handler.
 *
 * This function will run before the tests start, along with the other
 * registered start handlers.
 *
 * The handlers are executed in the order they were registered.
 * @param fn A function to run before the tests.
 */
export declare const start: (fn: Resolvable) => void
/**
 * Register an end handler.
 *
 * This function will run when the tests have ended, along with the other
 * registered end handlers.
 *
 * The handlers are executed in the order they were registered.
 */
export declare const end: (fn: Resolvable) => void
