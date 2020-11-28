import 'colors'
import { Resolvable } from './utils'
export interface EasyTest {
  name: string
  fn: Resolvable
}
/**
 * Register a test.
 * @param name The name of the test.
 * @param fn The function to run for this test.
 */
export declare const test: (name: string, fn: Resolvable) => void
/**
 * Register a suite.
 * @param name The name of the suite.
 * @param fn The function that registers tests to that suite.
 */
export declare const suite: (name: string, fn: () => void) => void
