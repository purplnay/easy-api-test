import { EasyTest } from './register'
/**
 * A function that is resolvable by the system.
 * It should return nothing or a promise resolving with nothing.
 */
export declare type Resolvable = () => Promise<void> | void
/**
 * Convert hrtime's [second, nanoseconds] to milliseconds.
 * @param time The returned value from `hrtime()`.
 */
export declare const hrtimeToMs: (time: number[]) => number
/**
 * Format the test name depending on the context.
 * @param name The name of the test.
 */
export declare const formatTestName: (test: EasyTest) => string
/**
 * Resolve a Resolvable function.
 * @param fn The function to resolve.
 */
export declare const resolveFn: (fn: Resolvable) => Promise<void>
