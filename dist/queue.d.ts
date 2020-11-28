import { EasyTest } from './register'
import { Resolvable } from './utils'
/**
 * A test or a suite.
 */
export interface QueueItem {
  name: string
  fn?: Resolvable
  tests?: EasyTest[]
}
/**
 * The test queue.
 */
export declare let queue: QueueItem[]
/**
 * Get the current suite name, or null if none.
 */
export declare const getContext: () => string | null
/**
 * Set the current suite name, or null if none.
 * @param context The current suite name.
 */
export declare const setContext: (context: string | null) => void
/**
 * Run handlers.
 * @param handlers The handlers to run.
 */
export declare const runHandlers: (handlers: Resolvable[]) => Promise<void>
/**
 * Run a test.
 * @param test The test to run.
 */
export declare const runTest: (test: EasyTest) => Promise<Error | void>
/**
 * Run the registered tests and the start/end handlers.
 */
export declare const run: () => Promise<undefined>
